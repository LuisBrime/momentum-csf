import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import dbConnect from '@/lib/db/client'
import { Group } from '@/lib/db/models'
import { ClientGroup } from '@/lib/types'

import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: ClientGroup[] } | { error: string }>,
) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).json({ error: 'No session' })
      return
    }

    await dbConnect()
    const groups = await Group.find({ leftInscriptions: { $gt: 0 } })

    if (!groups) {
      res.status(200).json({ data: [] })
      return
    }

    const cleanedGroups = groups.map(group => ({
      id: group.id,
      sessionDate: group.sessionDate,
      moderator: group.moderator,
      evaluators: group.evaluators,
      salon: group.salon,
    }))

    res.status(200).json({ data: cleanedGroups })
  } else {
    res.status(400).json({ error: 'Method not valid' })
  }
}
