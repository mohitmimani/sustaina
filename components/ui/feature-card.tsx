"use client"

import type React from "react"

import { motion } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode
    title: string
    description: string
  }
  variants: any
}

export function FeatureCard({ feature, variants }: FeatureCardProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
      className="group"
    >
      <Card className="h-full rounded-2xl border-none shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/20">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{feature.title}</h3>
          <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

