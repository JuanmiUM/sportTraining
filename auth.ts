import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import NextAuth from "next-auth"
import { UserRole } from "@prisma/client"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/iniciar-sesion",
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true

      const existingUser = await getUserById(user.id as string)
      if (!existingUser) return false

      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user)
        session.user.id = token.sub

      if (token.role && session.user)
        session.user.role = token.role as UserRole

      if (token.name && session.user)
        session.user.name = token.name

      if (token.email && session.user)
        session.user.email = token.email

      if (token.image && session.user)
        session.user.image = token.image as string

      if (token.remember && session.user)
        session.user.remember = token.remember as boolean

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      token.role = existingUser.role
      token.name = existingUser.name
      token.email = existingUser.email
      token.image = existingUser.image
      token.remember = existingUser.recordarme as boolean

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})