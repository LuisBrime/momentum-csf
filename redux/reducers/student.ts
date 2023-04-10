import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ClientStudent } from '@/lib/types'

import { hydrateAction } from './base'

export interface StudentState {
  student?: ClientStudent
  hasStartedRegistry: boolean
}

const initialState: StudentState = { hasStartedRegistry: false }

const studentSlice = createSlice({
  initialState,
  name: 'student',
  reducers: {
    setStudent(state: StudentState, action: PayloadAction<ClientStudent>) {
      state.student = action.payload
    },
    setHasStartedRegistry(state: StudentState, action: PayloadAction<boolean>) {
      state.hasStartedRegistry = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(hydrateAction, (state, action) => {
      state.student = action.payload.student.student
      state.hasStartedRegistry = action.payload.student.hasStartedRegistry
    })
  },
})

export default studentSlice.reducer

export const { setHasStartedRegistry, setStudent } = studentSlice.actions
