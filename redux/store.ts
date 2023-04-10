import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { student } from './reducers'

const makeStore = () =>
  configureStore({
    reducer: { student },
  })

export type Store = ReturnType<typeof makeStore>

export type RootState = ReturnType<Store['getState']>

export type AppDispatch = Store['dispatch']

export const wrapper = createWrapper<Store>(makeStore)
