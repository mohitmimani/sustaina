import { authClient } from "@/lib/auth-client";

export const magicSignIn = async (email: string) => {
  try {
    const { data, error } = await authClient.signIn.magicLink({
      email: `${email}@sustaina.com`,
      //   callbackURL: "/dashboard", //redirect after successful login (optional)
    });
    if (error) {
      console.error(error);
      return;
    }
    // console.log("Magic link sent to user");
    // console.log("Google sign-in successful");
  } catch (error) {
    console.error(error);
  }
};
