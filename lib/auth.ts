import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { magicLink, oneTap } from "better-auth/plugins";
const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb", // or "mysql", "mongodb", ...etc
  }),
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    oneTap({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    }),
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        console.log("Sending magic link to", email, "with token", token);
        // send email to user
        // We expect  a number to get in email will convert to a temp email
        // like number@sustaina.com
      },
    }),
  ],
});
