import { Session } from 'next-auth'

import * as db from '@/lib/db'

interface SessionValidation {
  validated: boolean
  status?: number
}

export async function validateSession(
  session: Session | null,
  validateAdmin = false,
): Promise<SessionValidation> {
  if (!session) return { validated: false, status: 401 }

  if (validateAdmin) {
    const email = session!.user!.email!
    if (!(await db.Admin.validate(email))) {
      console.log(`INVALID ADMIN ${email}`)
      return { validated: false, status: 403 }
    }
  }

  return { validated: true }
}

export function getErrorString(status: number): string | undefined {
  if (status === 401) {
    return 'No session'
  } else if (status === 403) {
    return 'Forbiden'
  }
}
