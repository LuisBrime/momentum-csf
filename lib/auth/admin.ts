import * as firebaseAdmin from 'firebase-admin'

const adminConfig = require('./admin_config.json')

const privateKey = process.env.FIREBASE_ADMIN_KEY
const clientEmail = process.env.FIREBASE_ADMIN_EMAIL
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID

if (firebaseAdmin.apps.length === 0 && privateKey && clientEmail && projectId) {
  firebaseAdmin.initializeApp(
    {
      credential: firebaseAdmin.credential.cert(adminConfig),
    },
    'momentunm-admin',
  )
}

export { firebaseAdmin }
