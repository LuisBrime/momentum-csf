import { PropsWithChildren, useEffect } from 'react'

import { useAuth, useSigninCheck } from 'reactfire'
import { useRouter } from 'next/router'

const GuardedPage = ({
  children,
  whenSignedOut,
}: PropsWithChildren<{ whenSignedOut?: string }>) => {
  const auth = useAuth()
  const { status } = useSigninCheck()
  const { replace } = useRouter()

  useEffect(() => {
    if (status !== 'success') return

    const listener = auth.onAuthStateChanged(user => {
      const shouldLogOut = !user && whenSignedOut

      if (shouldLogOut) {
        if (window.location.pathname !== whenSignedOut) {
          replace(whenSignedOut)
        }
      }
    })

    return () => listener()
  }, [auth, replace, status, whenSignedOut])

  return <>{children}</>
}

export default GuardedPage
