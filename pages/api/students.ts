import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import dbConnect from '@/lib/db/client'
import { Group, Student } from '@/lib/db/models'
import { ClientStudent } from '@/lib/types'

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

    const studentId = session!.user!.email!.split('@')[0]
    await Group.updateOne({ _id: groupId }, { leftInscriptions: leftIns! - 1 })
    const student = await Student.findOneAndUpdate(
      { matricula: studentId },
      { registeredGroup: groupId },
    )
    const cleanedStudent = {
      id: student!.matricula,
      name: student!.names,
      registrationDate: student!.registrationDate.toString(),
      registeredGroup: groupId,
    }
    res.status(201).json({ data: cleanedStudent })
  } else {
    res.status(400).json({ error: 'Method not valid' })
  }
}
