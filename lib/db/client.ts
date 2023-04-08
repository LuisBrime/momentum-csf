import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!Boolean(MONGODB_URI)) {
  throw new Error('MONGODB_URI not defined')
}

let cached = global.mongoose

if (!Boolean(cached)) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (Boolean(cached!.conn)) return cached!.conn

  if (!Boolean(cached!.promise)) {
    const opts = { bufferCommands: false }
    mongoose.set('strictQuery', true)
    cached!.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then(mongoose => mongoose)
  }

  try {
    cached!.conn = await cached!.promise
  } catch (e) {
    cached!.promise = null
    throw e
  }

  return cached!.conn
}

export default dbConnect
