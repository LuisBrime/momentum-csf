import NextAuth from 'next-auth'
import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { validateStudent } from '@/lib/db'

export const authOptions: AuthOptions = {
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email?.endsWith('@tec.mx')) {
        return false
      }

      const id = profile!.email!.split('@')[0]
      const isValidStudent = await validateStudent(id)
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
