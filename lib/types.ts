export interface ClientGroup {
  id: string
  sessionDate: string
  moderator: string
  evaluators: string[]
  salon: string
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
}
