import mongoose from 'mongoose'

export interface IGroup {
  groupId: string
  sessionDate: Date
  moderator: string
  evaluators: string[]
  salon: string
  leftInscriptions: Number
  isIB: boolean
}

const groupSchema = new mongoose.Schema<IGroup>(
  {
    groupId: String,
    sessionDate: { required: true, type: Date },
    moderator: { required: true, type: String },
    evaluators: [{ required: true, type: String }],
    salon: { required: true, type: String },
    leftInscriptions: { required: true, type: Number },
    isIB: { required: true, default: false, type: Boolean },
  },
  { collection: 'groups', versionKey: false },
)

export const Group =
  mongoose.models.groups || mongoose.model<IGroup>('groups', groupSchema)
