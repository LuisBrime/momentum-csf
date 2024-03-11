import { IGroup, ILog, IStudent } from './models'
import {
  ClientAdminGroup,
  ClientGroup,
  ClientLog,
  ClientStudent,
} from '../types'

export function groupToClient(
  group: IGroup,
  toAdmin = false,
): ClientGroup | ClientAdminGroup {
  let g = {
    id: group.groupId,
    sessionDate: group.sessionDate.toString(),
    moderator: group.moderator,
    evaluators: group.evaluators,
    salon: group.salon,
  } as ClientGroup

  if (toAdmin) {
    return {
      ...g,
      leftInscriptions: group.leftInscriptions,
    } as ClientAdminGroup
  }

  return g
}

export function studentToClient(
  student: IStudent,
  fullName = false,
): ClientStudent {
  const hasVisualSupport =
    student.visualSupport && Boolean(student.visualSupport.get('type'))

  let visualSupport
  if (hasVisualSupport) {
    const vsMap = student!.visualSupport?.toObject()
    visualSupport = {
      type: vsMap.get('type'),
      url: vsMap.get('url') ?? null,
    }
  }

  return {
    id: student.matricula,
    name: fullName ? `${student.names} ${student.surnames}` : student.names,
    registrationDate: student.registrationDate.toString(),
    registeredGroup: student.registeredGroup ?? null,
    visualSupport: visualSupport ?? null,
    program: student.program,
  }
}

export function logToClient(log: ILog): ClientLog {
  return {
    createdAt: log.createdAt.toString(),
    type: log.type,
    relatedId: log.relatedId,
    previousValue: log.previousValue ?? null,
    newValue: log.newValue,
    changedBy: log.changedBy,
  }
}
