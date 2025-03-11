"use client"

import { motion } from "framer-motion"
import { BarChart3, MessageSquare, Receipt, Trophy } from "lucide-react"

import { FeatureCard } from "@/components/ui/feature-card"

export function FeaturesSection() {
  const features = [
    {
      icon: <Receipt className="h-10 w-10 text-emerald-500" />,
      title: "AI Receipt Analysis",
      description:
        "Our AI scans and analyzes receipts to track purchases, identify patterns, and suggest waste reduction strategies.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-emerald-500" />,
      title: "Telegram Alerts",
      description:
        "Receive timely Telegram notifications about expiring products to minimize food waste and save money.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-emerald-500" />,
      title: "Consumption Tracking",
      description:
        "Monitor your consumption patterns with AI-powered insights that help you make more sustainable choices.",
    },
    {
      icon: <Trophy className="h-10 w-10 text-emerald-500" />,
      title: "Rewards System",
      description:
        "Earn points for sustainable actions and redeem them for eco-friendly products or discounts at partner stores.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section id="features" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-40 left-20 w-72 h-72 bg-blue-300/10 dark:bg-blue-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-teal-300/10 dark:bg-teal-700/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4"
          >
            AI-Powered Features
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-300">
            Our intelligent platform helps you track, analyze, and improve your environmental impact with intuitive
            features.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

