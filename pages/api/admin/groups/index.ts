import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import * as db from '@/lib/db'

import { authOptions } from '../../auth/[...nextauth]'
import { getErrorString, validateSession } from '@/lib/api/utils'

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

    const groups = await db.Group.getAll()

    res.status(200).json({ data: { groups } })
  } else {
    res.status(400).json({ error: 'Method not valid' })
  }
}
