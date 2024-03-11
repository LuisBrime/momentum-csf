import mongoose from 'mongoose'

import { Program } from '@/lib/types'

export interface VisualSupport {
  type: 'virtual' | 'physical'
  url?: string
}

export interface IStudent {
  matricula: string
  registrationDate: Date
  names: string
  surnames: string
  program: Program
  // grade: Number
  registeredGroup?: string
  visualSupport?: mongoose.Types.Map<string>
}

const studentSchema = new mongoose.Schema<IStudent>(
  {
    matricula: { unique: true, required: true, type: String },
    registrationDate: { required: true, type: Date },
    names: { required: true, type: String },
    surnames: { required: true, type: String },
    program: { required: true, type: String },
    // grade: { required: true, type: Number },
    registeredGroup: String,
    visualSupport: { type: Map, of: String },
  },
  { collection: 'students', versionKey: false },
)

export const Student: mongoose.Model<IStudent> =
  mongoose.models.students ||
  mongoose.model<IStudent>('students', studentSchema)
