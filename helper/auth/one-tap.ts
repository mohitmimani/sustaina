import { authClient } from "@/lib/auth-client";

export const oneTapCall = async () => {
  try {
    await authClient.oneTap({
      callbackURL: "/", // redirect '/' route after login
      cancelOnTapOutside: true, // cancel oneTap when user Taps outside the oneTap component
      context: "signin", // signin or signup or use
      autoSelect: true, // auto select the account to be true
    });
  } catch (error) {
    console.log(error);
  }
};
