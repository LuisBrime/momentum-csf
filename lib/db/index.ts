import dbConnect from './client'
import { Student } from './models'
import { ClientStudent } from '../types'

export async function validateStudent(id: string): Promise<boolean> {
  await dbConnect()
  const student = await Student.findOne({ matricula: id })
  if (!student) return false
  return true
}

export async function retrieveStudent(id: string): Promise<ClientStudent> {
  await dbConnect()
  const student = await Student.findOne({ matricula: id })
  return {
    id: student!.matricula,
    name: student!.names,
    registrationDate: student!.registrationDate.toString(),
    registeredGroup: student!.registeredGroup ?? null,
    visualSupport: student!.visualSupport
      ? {
          type: student!.visualSupport.type,
          url: student!.visualSupport.url ?? null,
        }
      : null,
  }
}
