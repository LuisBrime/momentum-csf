import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import * as db from '@/lib/db'
import { getErrorString, validateSession } from '@/lib/api/utils'

import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: any } | { error: string }>,
) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions)
    const { validated, status } = await validateSession(session, true)
    if (!validated) {
      res.status(status!).json({ error: getErrorString(status!) ?? '' })
      return
    }

    const { groupId } = req.query

    if (!groupId) {
      res.status(400).json({ error: 'Invalid request' })
      return
    }

    const students = await db.Group.getRegisteredStudents(groupId as string)
    res.status(200).json({ data: students })
  } else {
    res.status(400).json({ error: 'Method not valid' })
  }
}
