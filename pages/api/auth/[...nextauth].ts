import NextAuth from 'next-auth'
import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import * as db from '@/lib/db'

export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token, profile }) {
      if (!Boolean(profile) || !Boolean(profile!.email)) return token

      return {
        userType: (await db.Admin.getAdminType(profile!.email!)) ?? 0,
        ...token,
      }
    },
    async session({ token, session }) {
      return { userType: token.userType, ...session }
    },
    async signIn({ profile }) {
      if (!profile?.email?.endsWith('@tec.mx')) {
        console.log(`---------------Invalid email ${profile?.email}`)
        return false
      }

      const id = profile!.email!.split('@')[0].toUpperCase()
      const isValidStudent = await db.Student.validateStudent(id)
      if (!isValidStudent) {
        console.log(`---------------
          Not a valid student:
          ${profile.email}
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
