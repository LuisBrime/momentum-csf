import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from './store'

const selectStudentState = (state: RootState) => state.student

export const selectStudent = createSelector(
  selectStudentState,
  state => state.student,
)

export const selectUserType = createSelector(
  selectStudentState,
  state => state.userType,
)

export const selectHasStartedRegistry = createSelector(
  selectStudentState,
  state => state.hasStartedRegistry,
)
