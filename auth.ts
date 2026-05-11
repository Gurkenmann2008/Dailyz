import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: process.env.RESEND_FROM ?? "Dailyz <noreply@dailyz.de>",
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.isPremium = (user as { isPremium?: boolean }).isPremium ?? false;
      return session;
    },
  },
  pages: {
    signIn: "/anmelden",
    error: "/anmelden",
  },
});
