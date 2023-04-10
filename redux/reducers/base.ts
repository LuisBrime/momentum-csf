import { createAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import type { RootState } from '../store'

export const hydrateAction = createAction<RootState>(HYDRATE)
