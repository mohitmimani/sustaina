import { authClient } from "@/lib/auth-client";

export const magicSignUp = async (name: string, email: string) => {
  try {
    const { data, error } = await authClient.signIn.magicLink({
      email: `${email}@sustaina.com`,

      name: name,
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
