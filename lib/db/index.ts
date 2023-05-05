import dbConnect from './client'
import { Student, VisualSupport } from './models'
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
  const hasVisualSupport =
    student!.visualSupport && student!.visualSupport.get('type')

  let visualSupport
  if (hasVisualSupport) {
    const vsMap = student!.visualSupport?.toObject()
    visualSupport = {
      type: vsMap.get('type'),
      url: vsMap.get('url') ?? null,
    }
  }

  return {
    id: student!.matricula,
    name: student!.names,
    registrationDate: student!.registrationDate.toString(),
    registeredGroup: student!.registeredGroup ?? null,
    visualSupport: visualSupport ?? null,
  }
}
