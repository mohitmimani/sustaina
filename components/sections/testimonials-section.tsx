"use client"

import { motion } from "framer-motion"

import { TestimonialCard } from "@/components/ui/testimonial-card"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Shopper",
      store: "GreenMart",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "Sustaina has completely changed how I shop. The expiry alerts have reduced my food waste by 70%, and I love earning points for being eco-conscious!",
    },
    {
      name: "Michael Chen",
      role: "Store Manager",
      store: "EcoFresh Market",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "Implementing Sustaina has increased customer loyalty and reduced our paper usage by 90%. Our customers love the Telegram receipts and sustainability rewards.",
    },
    {
      name: "Priya Sharma",
      role: "Sustainability Officer",
      store: "Nature's Basket",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "The analytics provided by Sustaina have helped us identify key areas to reduce waste in our supply chain. It's a win for us, our customers, and the planet.",
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
    <section id="testimonials" className="py-16 md:py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-emerald-300/10 dark:bg-emerald-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-teal-300/10 dark:bg-teal-700/10 rounded-full blur-3xl" />
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
            What Our Users Say
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-300">
            Join thousands of satisfied users who are making a difference with Sustaina.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

