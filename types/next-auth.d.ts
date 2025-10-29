import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      roleId?: string | null
    }
  }

  interface User {
    role: string
    roleId?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    roleId?: string | null
  }
}
