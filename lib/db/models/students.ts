import mongoose from 'mongoose'

export interface IStudent {
  matricula: string
  registrationDate: Date
  names: string
  surnames: string
  grade: Number
  registeredGroup?: string
}

const studentSchema = new mongoose.Schema<IStudent>(
  {
    matricula: { unique: true, required: true, type: String },
    registrationDate: { required: true, type: Date },
    names: { required: true, type: String },
    surnames: { required: true, type: String },
    grade: { required: true, type: Number },
    registeredGroup: String,
  },
  { versionKey: false },
)

export const Student: mongoose.Model<IStudent> =
  mongoose.models.students ||
  mongoose.model<IStudent>('students', studentSchema)
