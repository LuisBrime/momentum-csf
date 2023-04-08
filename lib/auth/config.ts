const configuration = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_AUTH_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  emulator: {
    activeEmulator:
      process.env.NEXT_PUBLIC_FIREBASE_EMULATOR &&
      process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === 'true',
    emulatorHost: [
      'http://',
      process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST,
      ':',
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT,
    ].join(''),
  },
}

export default configuration
