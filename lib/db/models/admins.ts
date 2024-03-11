import mongoose from 'mongoose'

export interface IAdmin {
  email: string
  adminType: Number
}

const adminSchema = new mongoose.Schema<IAdmin>(
  {
    email: { required: true, type: String },
    adminType: { required: true, type: Number },
  },
  { collection: 'admins', versionKey: false },
)

export const Admin =
  mongoose.models.admins || mongoose.model<IAdmin>('admins', adminSchema)
