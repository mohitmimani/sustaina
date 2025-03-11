"use client";

import type React from "react";

import { motion } from "motion/react";

import { Card, CardContent } from "@/components/ui/card";

interface ProcessStepProps {
  step: {
    step: number;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  isActive: boolean;
  variants: any;
}

export function ProcessStep({ step, isActive, variants }: ProcessStepProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
      className={`group ${
        isActive ? "scale-105" : ""
      } transition-all duration-300`}
    >
      <Card
        className={`h-full rounded-2xl border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 ${
          isActive ? "ring-2 ring-emerald-500 dark:ring-emerald-400" : ""
        }`}
      >
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative">
            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">
              {step.step}
            </span>
            {step.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
            {step.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            {step.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
