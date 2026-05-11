import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    isPremium?: boolean;
    stripeCustomerId?: string;
  }
  interface Session {
    user: {
      isPremium?: boolean;
    } & DefaultSession["user"];
  }
}
