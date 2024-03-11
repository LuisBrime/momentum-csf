import dbConnect from '../client'
import { Log } from '../models'
import { logToClient } from '../utils'
import { ClientLog, LogType } from '../../types'

export async function logAction(
  id: string,
  type: LogType,
  newValue: string,
  changedBy: string,
  previousValue?: string,
): Promise<ClientLog> {
  await dbConnect()

  const log = new Log()
  log.createdAt = new Date()
  log.type = type
  log.relatedId = id
  log.previousValue = previousValue
  log.newValue = newValue
  log.changedBy = changedBy

  await log.save()
  return logToClient(log)
}

export async function getFromId(id: string): Promise<ClientLog[]> {
  await dbConnect()

  const dbLogs = await Log.find({ relatedId: id })
  return dbLogs.map(l => logToClient(l))
}
