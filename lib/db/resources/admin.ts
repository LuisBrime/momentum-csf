import dbConnect from '../client'
import { Admin } from '../models'

export async function getAdminType(email: string): Promise<Number | undefined> {
  await dbConnect()

  const admin = await Admin.findOne({
    email: email.toLowerCase(),
  })
  if (!Boolean(admin)) return

  return admin.adminType as Number
}

export async function validate(email: string): Promise<Boolean> {
  await dbConnect()

  const admin = await Admin.findOne({
    email: email.toLowerCase(),
  })
  return Boolean(admin)
}
