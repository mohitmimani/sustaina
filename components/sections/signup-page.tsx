"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Leaf, CheckCircle } from "lucide-react";

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

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await magicSignIn(fullName, `${countryCode}${phoneNumber}`);
    setIsLoading(false);
    setIsSuccess(true);
  };

  // Confetti animation elements
  const generateConfetti = () => {
    return Array.from({ length: 50 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{
          y: -10,
          x: 0,
          opacity: 1,
          scale: 0.8 + Math.random() * 0.5,
        }}
        animate={{
          y: window.innerHeight,
          x: (Math.random() - 0.5) * window.innerWidth * 0.8,
          opacity: 0,
          rotate: Math.random() * 360,
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          ease: "easeOut",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: 8 + Math.random() * 8,
          height: 8 + Math.random() * 8,
          backgroundColor: [
            "#4ade80",
            "#22c55e",
            "#10b981",
            "#14b8a6",
            "#06b6d4",
            "#0ea5e9",
          ][Math.floor(Math.random() * 6)],
          borderRadius: "50%",
          zIndex: 50,
        }}
      />
    ));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4 overflow-hidden">
      {isSuccess && (
        <div className="fixed inset-0 pointer-events-none">
          {generateConfetti()}
        </div>
      )}

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
                <div className="relative w-20 h-20 mx-auto mb-4 flex justify-center items-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    <Leaf className="w-20 h-20 text-emerald-500" />
                  </motion.div>
                </div>
              </motion.div>
              <h1 className="text-2xl font-bold text-green-800">
                Join Sustaina
              </h1>
              <p className="text-gray-600 mt-2">
                Start your sustainability journey today
              </p>
            </div>

            <AnimatePresence>
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-green-800">Success!</h2>
                  <p className="text-gray-600 mt-2">
                    Check your Telegram for a magic link to complete your
                    registration.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSignUp}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <Button
                        onClick={googleSignIn}
                        type="button"
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 py-6 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-xl shadow-sm transition-all"
                      >
                        <Image
                          src="/google.svg"
                          alt="Google"
                          width={24}
                          height={24}
                        />
                        <span>Sign up with Google</span>
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
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <motion.div whileFocus={{ scale: 1.01 }}>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full rounded-xl bg-white border-gray-200 focus:ring-green-500 focus:border-green-500 py-6"
                        />
                      </motion.div>
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
                        We&apos;ll send a secure signup link to your Telegram.
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
                      disabled={isLoading || !phoneNumber || !fullName}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Leaf className="mr-2 h-4 w-4" />
                      )}
                      Get Started
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Log In
                </Link>
              </p>
            </div>
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
