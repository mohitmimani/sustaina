"use server";

import { authClient } from "@/lib/auth-client";
import prisma from "@/lib/prisma";

export const magicSignIn = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: `${email}@sustaina.com`,
      },
    });

    if (user?.email === `${email}@sustaina.com`) {
      const { data, error } = await authClient.signIn.magicLink({
        email: `${email}@sustaina.com`,

        callbackURL: "/dashboard",
      });
      if (error) {
        console.error(error);
        return;
      }
    } else {
      return "User not found";
    }
  } catch (error) {
    console.error(error);
  }
};
