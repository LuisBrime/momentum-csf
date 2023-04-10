import mongoose from 'mongoose'

export interface IGroup {
  _id: string
  sessionDate: Date
  moderator: string
  evaluators: string[]
  salon: string
  leftInscriptions: Number
}

const groupSchema = new mongoose.Schema<IGroup>(
  {
    _id: String,
    sessionDate: { required: true, type: Date },
    moderator: { required: true, type: String },
    evaluators: [{ required: true, type: String }],
    salon: { required: true, type: String },
    leftInscriptions: { required: true, type: Number },
  },
  { versionKey: false },
)

export const Group =
  mongoose.models.groups || mongoose.model<IGroup>('groups', groupSchema)
