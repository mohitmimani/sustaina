"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Loader2, Mail, RotateCcw, Send, UserX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { googleSignIn } from "@/helper/auth/googleSignIn";
import { magicSignIn } from "@/helper/auth/magicSignIn";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isLoading, setIsLoading] = useState(false);
  const [isUserFound, setIsUserFound] = useState(true);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await magicSignIn(`${countryCode}${phoneNumber}`);
    setIsLoading(false);

    if (res === "User not found") {
      setIsUserFound(false);
    } else {
      setMagicLinkSent(true);
    }
  };

  const handleBackToLogin = () => {
    setIsUserFound(true);
    setMagicLinkSent(false);
    setPhoneNumber("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-md bg-white/70 rounded-3xl shadow-lg border border-green-100 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <Leaf className="w-20 h-20 text-emerald-500" />
              </motion.div>
              <h1 className="text-2xl font-bold text-green-800">
                Welcome to Sustaina
              </h1>
              <p className="text-gray-600 mt-2">
                AI-powered sustainability tracking
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isUserFound && !magicLinkSent ? (
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSendMagicLink}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        onClick={googleSignIn}
                        className="w-full flex items-center justify-center gap-2 py-6 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-xl shadow-sm transition-all"
                      >
                        <Image
                          src="/google.svg"
                          alt="Google"
                          width={24}
                          height={24}
                        />
                        <span>Continue with Google</span>
                      </Button>
                    </motion.div>

                    <div className="relative flex items-center">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="flex-shrink mx-4 text-gray-500 text-sm">
                        or
                      </span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <div className="flex gap-2 items-center">
                        <Select
                          value={countryCode}
                          onValueChange={setCountryCode}
                        >
                          <SelectTrigger className="w-[100px] rounded-xl bg-white border-gray-200">
                            <SelectValue placeholder="+91" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+91">+91 (IN)</SelectItem>
                            <SelectItem value="+1">+1 (US)</SelectItem>
                            <SelectItem value="+44">+44 (UK)</SelectItem>
                            <SelectItem value="+49">+49 (DE)</SelectItem>
                            <SelectItem value="+33">+33 (FR)</SelectItem>
                          </SelectContent>
                        </Select>
                        <motion.div
                          whileFocus={{ scale: 1.01 }}
                          className="flex-1"
                        >
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full rounded-xl bg-white border-gray-200 focus:ring-green-500 focus:border-green-500 py-6"
                          />
                        </motion.div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        We&apos;ll send a secure login link to your Telegram.
                      </p>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button
                      type="submit"
                      className="w-full py-6 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                      disabled={isLoading || !phoneNumber}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      Send Magic Link
                    </Button>
                  </motion.div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/signup"
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </motion.form>
              ) : magicLinkSent ? (
                <motion.div
                  key="magic-link-sent"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="text-center space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto bg-green-100 rounded-full p-4 w-24 h-24 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <Mail className="h-12 w-12 text-green-600" />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      Magic Link Sent!
                    </h3>
                    <p className="text-gray-600">
                      We&apos;ve sent a login link to your Telegram account
                      connected to {countryCode} {phoneNumber}.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-3"
                  >
                    <p className="text-sm text-gray-500">
                      The link will expire in 5 minutes.
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleBackToLogin}
                        variant="outline"
                        className="w-full py-4 rounded-xl border border-gray-200 text-gray-700 font-medium"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Back to Login
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="user-not-found"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="text-center space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto bg-red-100 rounded-full p-4 w-24 h-24 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <UserX className="h-12 w-12 text-red-600" />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-red-800 mb-2">
                      User Not Found
                    </h3>
                    <p className="text-gray-600">
                      We couldn&apos;t find an account associated with{" "}
                      {countryCode} {phoneNumber}.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleBackToLogin}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Try Again
                      </Button>
                    </motion.div>

                    <p className="text-sm text-gray-600 mt-2">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/signup"
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-100 text-center text-xs text-gray-500">
            <div className="flex justify-center space-x-4">
              <Link href="/privacy" className="hover:text-green-600">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-green-600">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
