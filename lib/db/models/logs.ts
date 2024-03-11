import mongoose from 'mongoose'

import { LogType } from '@/lib/types'

export interface ILog {
  createdAt: Date
  type: LogType
  relatedId: string
  previousValue?: string
  newValue: string
  changedBy: string
}

const logSchema = new mongoose.Schema<ILog>(
  {
    createdAt: { required: true, type: Date },
    type: { required: true, type: String },
    relatedId: { required: true, type: String },
    previousValue: String,
    newValue: { required: true, type: String },
    changedBy: { required: true, type: String },
  },
  { collection: 'logs', versionKey: false },
)

export const Log: mongoose.Model<ILog> =
  mongoose.models.logs || mongoose.model<ILog>('logs', logSchema)
