import { useCallback, useState } from 'react'

import { FirebaseError } from 'firebase/app'
import {
  browserPopupRedirectResolver,
  signInWithPopup,
  AuthProvider,
  UserCredential,
} from 'firebase/auth'
import { useAuth } from 'reactfire'

import type { Maybe } from './types'

type State<Data, ErrorType> =
  | {
      data: Data
      loading: false
      success: true
      error: Maybe<ErrorType>
    }
  | {
      data: undefined
      loading: true
      success: false
      error: Maybe<ErrorType>
    }
  | {
      data: undefined
      loading: false
      success: false
      error: Maybe<ErrorType>
    }

export function useRequestState<Data = unknown, ErrorType = unknown>() {
  const [state, setState] = useState<State<Data, ErrorType>>({
    loading: false,
    success: false,
    error: undefined,
    data: undefined,
  })

  const setLoading = useCallback((loading: boolean) => {
    setState({
      loading,
      success: false,
      data: undefined,
      error: undefined,
    })
  }, [])

  const setData = useCallback((data: Data) => {
    setState({
      data,
      success: true,
      loading: false,
      error: undefined,
    })
  }, [])

  const setError = useCallback((error: ErrorType) => {
    setState({
      error,
      data: undefined,
      loading: false,
      success: false,
    })
  }, [])

  return {
    state,
    setState,
    setLoading,
    setData,
    setError,
  }
}

export function useSignInWithProvider() {
  const auth = useAuth()

  const { state, setLoading, setData, setError } = useRequestState<
    UserCredential,
    FirebaseError
  >()

  const singInWithProvider = useCallback(
    async (provider: AuthProvider) => {
      setLoading(true)

      try {
        const credential = await signInWithPopup(
          auth,
          provider,
          browserPopupRedirectResolver,
        )

        setData(credential)
      } catch (error) {
        setError(error as FirebaseError)
      }
    },
    [auth, setData, setError, setLoading],
  )

  return [singInWithProvider, state] as [
    typeof singInWithProvider,
    typeof state,
  ]
}
