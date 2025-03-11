"use client"

import { motion } from "framer-motion"

export function ImpactStatsSection() {
  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const statItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section className="py-16 md:py-24 bg-emerald-600 dark:bg-emerald-800 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={statsVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white"
        >
          <motion.div variants={statItemVariants} className="text-center">
            <p className="text-5xl font-bold mb-2">2.4M</p>
            <p className="text-emerald-100">Tons of Waste Prevented</p>
          </motion.div>
          <motion.div variants={statItemVariants} className="text-center">
            <p className="text-5xl font-bold mb-2">8.7M</p>
            <p className="text-emerald-100">Telegram Alerts Sent</p>
          </motion.div>
          <motion.div variants={statItemVariants} className="text-center">
            <p className="text-5xl font-bold mb-2">500+</p>
            <p className="text-emerald-100">Partner Stores</p>
          </motion.div>
          <motion.div variants={statItemVariants} className="text-center">
            <p className="text-5xl font-bold mb-2">$3.2M</p>
            <p className="text-emerald-100">Customer Savings</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

