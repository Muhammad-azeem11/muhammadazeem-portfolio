// src/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  pages: { signIn: "/admin/login", error: "/admin/login" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } }).catch(() => null);
        if (user && user.password) {
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return { id: user.id, email: user.email, name: user.name, role: user.role };
          }
        }

        const envAdminEmail = process.env.ADMIN_EMAIL?.trim();
        const envAdminPassword = process.env.ADMIN_PASSWORD;
        if (
          envAdminEmail &&
          envAdminPassword &&
          email.toLowerCase() === envAdminEmail.toLowerCase() &&
          password === envAdminPassword
        ) {
          return {
            id: user?.id ?? "env-admin",
            email: envAdminEmail,
            name: user?.name ?? "Muhammad Azeem",
            role: "admin",
          };
        }

        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role ?? "user";
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const allowedEmails = (process.env.ADMIN_ALLOWED_EMAILS ?? "").split(",").map(e => e.trim());
        if (allowedEmails.length > 0 && user.email && !allowedEmails.includes(user.email)) return false;
        
        const existingUser = await prisma.user.findUnique({ where: { email: user.email! } });
        if (existingUser && existingUser.role !== "admin") return false;
      }
      return true;
    },
  },
  trustHost: true,
});
