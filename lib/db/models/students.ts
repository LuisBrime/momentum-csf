import mongoose from 'mongoose'

export interface VisualSupport {
  type: 'virtual' | 'physical'
  url?: string
}

export interface IStudent {
  matricula: string
  registrationDate: Date
  names: string
  surnames: string
  // grade: Number
  registeredGroup?: string
  visualSupport?: mongoose.Types.Map<VisualSupport>
}

const studentSchema = new mongoose.Schema<IStudent>(
  {
    matricula: { unique: true, required: true, type: String },
    registrationDate: { required: true, type: Date },
    names: { required: true, type: String },
    surnames: { required: true, type: String },
    // grade: { required: true, type: Number },
    registeredGroup: String,
    visualSupport: { type: Map, of: String },
  },
  { collection: 'students_segunda', versionKey: false },
)

export const Student: mongoose.Model<IStudent> =
  mongoose.models.students_segunda ||
  mongoose.model<IStudent>('students_segunda', studentSchema)
