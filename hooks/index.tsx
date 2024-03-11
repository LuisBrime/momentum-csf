import { useCallback } from 'react'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

export const useResponseHandler = () => {
  const { replace } = useRouter()

  const handleResponse = useCallback(
    async (status: number): Promise<{ shouldReturn: boolean }> => {
      if (status === 401 || status === 403) {
        const { url } = await signOut({ redirect: false, callbackUrl: '/' })
        replace(url)
        return { shouldReturn: true }
      }

      return { shouldReturn: false }
    },
    [replace, signOut],
  )

  return { handleResponse }
}
