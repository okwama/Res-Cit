import { Session } from './../../node_modules/next-auth/core/types.d';
import { getServerSession, NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./connect";
import bcrypt from "bcrypt"; // For password hashing

declare module "next-auth" {interface Session {
    user: User & {
      isAdmin: Boolean
    }
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean
  }
}
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

// Check if user exists and password matches
if (user && await bcrypt.compare(credentials?.password ?? '', user.password)) {
  return user; // Return user object if credentials are valid
}
        return null; // Return null if user not found or password doesn't match
      }
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });
      token.isAdmin = userInDb?.isAdmin!;
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);