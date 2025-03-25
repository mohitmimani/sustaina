"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Leaf, MessageSquare, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" ref={heroRef}>
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ y, opacity }}
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-300/20 dark:bg-emerald-700/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-teal-300/20 dark:bg-teal-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-blue-300/20 dark:bg-blue-700/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <Badge className="w-fit bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900">
              AI-Powered Sustainability
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white leading-tight">
              Reduce Waste with <span className="text-emerald-500">AI</span> and{" "}
              <span className="text-teal-500">Telegram</span> Integration
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg">
              Sustaina partners with supermarkets to send digital receipts and
              expiry alerts via Telegram, helping you track purchases, reduce
              waste, and earn rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="rounded-full text-base px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 group">
                <span>Join via Telegram</span>
                <MessageSquare className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full text-base px-8 py-6"
              >
                <span>Become a Partner Store</span>
                <Store className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      {i}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-bold">500+</span> partner stores
                nationwide
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[700px] md:h-[700px] rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-slate-700/20">
              <Image
                src="/hero_section.png"
                alt="Sustaina Dashboard"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-3xl" />
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    Carbon Footprint
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Reduced by 24% this month
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-6 -left-6 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700/20"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    Telegram Alerts
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    1,243 expiry alerts sent today
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
