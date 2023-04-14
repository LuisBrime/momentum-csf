import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import dbConnect from '@/lib/db/client'
import { Student } from '@/lib/db/models'
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
    const { type, url } = req.body
    if (type === 'virtual' && !url) {
      res.status(400).json({ error: 'Missing URL for type' })
      return
    }

    const studentId = session!.user!.email!.split('@')[0].toUpperCase()
    const student = await Student.findOneAndUpdate(
      { matricula: studentId },
      { $set: { 'visualSupport.type': type, 'visualSupport.url': url } },
    )
    const cleanedStudent = {
      id: student!.matricula,
      name: student!.names,
      registrationDate: student!.registrationDate.toString(),
      registeredGroup: student!.registeredGroup!,
      visualSupport: { type, url: url ?? null },
    }
    res.status(201).json({ data: cleanedStudent })
  } else {
    res.status(400).json({ error: 'Method not valid' })
  }
}
