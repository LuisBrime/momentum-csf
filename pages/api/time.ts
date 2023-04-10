import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from './auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Date } | { error: string }>,
) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).json({ error: 'No sesion' })
      return
    }
    const currentDate = new Date()
    res.status(200).json({ data: currentDate })
  } else {
    res.status(400).json({ error: 'Method not valid' })
  }
}
