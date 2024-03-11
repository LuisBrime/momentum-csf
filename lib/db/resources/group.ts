import dbConnect from '../client'
import { Group, Student } from '../models'
import { groupToClient, studentToClient } from '../utils'
import { ClientAdminGroup, ClientGroup, ClientStudent } from '../../types'

export async function getAll(): Promise<ClientAdminGroup[]> {
  await dbConnect()

  const dbGroups = await Group.find()
  const groups = dbGroups.map(g => groupToClient(g, true) as ClientAdminGroup)

  return groups
}

export async function get(
  id: string,
  toAdmin = false,
): Promise<ClientAdminGroup | ClientGroup | undefined> {
  await dbConnect()

  const dbGroup = await Group.findOne({ groupId: id })

  if (!dbGroup) return

  if (toAdmin) {
    return groupToClient(dbGroup, true) as ClientAdminGroup
  }

  return groupToClient(dbGroup) as ClientGroup
}

export async function getRegisteredStudents(
  id: string,
): Promise<ClientStudent[]> {
  await dbConnect()

  const dbStudents = await Student.find({ registeredGroup: id })
  const students = dbStudents.map(s => studentToClient(s, true))
  return students
}
