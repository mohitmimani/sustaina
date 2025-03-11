"use client";
import LoginPage from "@/components/sections/login-page";
import { oneTapCall } from "@/helper/auth/one-tap";
import React, { useEffect } from "react";

const SignIn = (props) => {
  useEffect(() => {
    oneTapCall();
  }, []);
  return <LoginPage />;
};

export default SignIn;
