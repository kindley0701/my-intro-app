// lib/auth.ts

import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// NextAuthの設定
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'name', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const admin = await prisma.admin.findUnique({
          where: { name: credentials.name },
        });

        if (!admin) return null;

        const isValid = await bcrypt.compare(credentials.password, admin.password);
        if (!isValid) return null;

        return {
          id: admin.id.toString(),
          name: admin.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
