import NextAuth from 'next-auth'
import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { validateStudent } from '@/lib/db'

export const authOptions: AuthOptions = {
  callbacks: {
    async signIn({ profile }) {
      console.log(`---------------Sign In request: ${profile}`)
      if (!profile?.email?.endsWith('@tec.mx')) {
        console.log(`---------------Invalid email`)
        return false
      }
      
      const id = profile!.email!.split('@')[0]
      const isValidStudent = await validateStudent(id)
      if (!isValidStudent) {
        console.log(`---------------
          Not a valid student:
          ${profile}
          ${id}
        `)
      }
      return isValidStudent
    },
  },
  pages: {
    error: '/auth/error',
    signIn: '/',
    newUser: '/registro',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.FIREBASE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.FIREBASE_OAUTH_CLIENT_SECRET!,
    }),
  ],
}

export default NextAuth(authOptions)
