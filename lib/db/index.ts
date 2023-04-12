import dbConnect from './client'
import { Student } from './models'

export async function validateStudent(id: string): Promise<boolean> {
  await dbConnect()
  const student = await Student.findOne({ matricula: id })
  if (!student) {
    console.log(`---------------Cannot find student ${id}`)
    return false
  }
  return true
}

interface ClientStudent {
  id: string
  name: string
  registrationDate: string
  registeredGroup: string | null
}

export async function retrieveStudent(id: string): Promise<ClientStudent> {
  await dbConnect()
  const student = await Student.findOne({ matricula: id })
  return {
    id: student!.matricula,
    name: student!.names,
    registrationDate: student!.registrationDate.toString(),
    registeredGroup: student!.registeredGroup ?? null,
  }
}
