import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ClientStudent } from '@/lib/types'

import { hydrateAction } from './base'

export interface StudentState {
  student?: ClientStudent
  userType: Number
  hasStartedRegistry: boolean
}

const initialState: StudentState = { hasStartedRegistry: false, userType: 0 }

const studentSlice = createSlice({
  initialState,
  name: 'student',
  reducers: {
    setStudent(state: StudentState, action: PayloadAction<ClientStudent>) {
      state.student = action.payload
    },
    setUserType(state: StudentState, action: PayloadAction<Number>) {
      state.userType = action.payload
    },
    setHasStartedRegistry(state: StudentState, action: PayloadAction<boolean>) {
      state.hasStartedRegistry = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(hydrateAction, (state, action) => {
      state.student = action.payload.student.student
      state.userType = action.payload.student.userType
      state.hasStartedRegistry = action.payload.student.hasStartedRegistry
    })
  },
})

export default studentSlice.reducer

export const { setHasStartedRegistry, setStudent, setUserType } =
  studentSlice.actions
