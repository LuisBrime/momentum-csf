import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import * as db from '@/lib/db'
import dbConnect from '@/lib/db/client'
import { Group, Student } from '@/lib/db/models'
import { studentToClient } from '@/lib/db/utils'
import { ClientStudent, LogType } from '@/lib/types'

import { authOptions } from './auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: ClientStudent } | { error: string }>,
) {
  if (req.method === 'PATCH') {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).json({ error: 'No session' })
      return
    }

    await dbConnect()
    const { groupId } = req.body
    const group = await Group.findById(groupId)
    const leftIns = group?.leftInscriptions
    if (!group || leftIns <= 0) {
      res.status(400).json({ error: 'Full Group' })
      return
    }

    await Group.updateOne({ groupId }, { leftInscriptions: leftIns! - 1 })

    const studentId = session!.user!.email!.split('@')[0].toUpperCase()
    const student = await Student.findOneAndUpdate(
      { matricula: studentId },
      { registeredGroup: groupId },
    )

    // Ignore issues to avoid making it
    try {
      db.Log.logAction(
        student!.matricula,
        LogType.StudentSession,
        groupId,
        session!.user!.email!,
      )
    } catch (e) {
      console.log(`Error logging registered group`, e)
    }

    const cleanedStudent = studentToClient(student!)
    // const cleanedStudent = {
    //   id: student!.matricula,
    //   name: student!.names,
    //   registrationDate: student!.registrationDate.toString(),
    //   registeredGroup: groupId,
    //   visualSupport: null,
    // }
    res.status(201).json({ data: cleanedStudent })
  } else {
    res.status(400).json({ error: 'Method not valid' })
  }
}
