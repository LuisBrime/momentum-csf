export enum Program {
  PBT = 'pbt',
  PBM = 'pbm',
  PBI = 'pbi',
}

export enum LogType {
  SessionChange = 'sessionChange',
  StudentSession = 'studentSession',
}

export interface ClientGroup {
  id: string
  sessionDate: string
  moderator: string
  evaluators: string[]
  salon: string
}

export interface ClientAdminGroup extends ClientGroup {
  isIB: boolean
  leftInscriptions: number
}

export interface ClientStudent {
  id: string
  name: string
  registrationDate: string
  registeredGroup: string | null
  visualSupport: {
    type: 'virtual' | 'physical'
    url: string | null
  } | null
  program: Program
}

export interface ClientLog {
  createdAt: string
  type: LogType
  relatedId: string
  previousValue: string | null
  newValue: string
  changedBy: string
}
