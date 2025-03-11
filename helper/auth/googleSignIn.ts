import { authClient } from "@/lib/auth-client";

export const googleSignIn = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
    });
    // console.log("Google sign-in successful");
  } catch (error) {
    console.error("Google sign-in failed", error);
  }
};
