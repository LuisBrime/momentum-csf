import dbConnect from '../client'
import { Student } from '../models'
import { studentToClient } from '../utils'
import { ClientStudent } from '../../types'

interface StudentQuery {
  matricula?: string
  name?: string
  program?: string
}

export async function getAll(
  query?: StudentQuery,
  fullName = false,
): Promise<ClientStudent[]> {
  await dbConnect()

  let matriculaQuery = '^A0'
  if (query?.matricula && query!.matricula.length > 0) {
    matriculaQuery = query!.matricula!
  }

  let q: any = { matricula: { $regex: matriculaQuery } }
  if (query?.name) {
    const reg = new RegExp(`.*${query!.name}.*`, 'i')
    q = { surnames: reg }
  } else if (query?.program) {
    q = { program: query!.program!.toLowerCase() }
  }

  const dbStudents = await (Student.find(q).sort({
    registrationDate: 'asc',
  }))
  const students = dbStudents.map(s => studentToClient(s, fullName))

  return students
}

export async function validateStudent(id: string): Promise<boolean> {
  await dbConnect()
  const student = await Student.findOne({ matricula: id })
  return Boolean(!!student)
}

export async function retrieveStudent(
  id: string,
  fullName = false,
): Promise<ClientStudent | undefined> {
  await dbConnect()
  const student = await Student.findOne({ matricula: id })

  if (!student) return

  return studentToClient(student, fullName)
}
