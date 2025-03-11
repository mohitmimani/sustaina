"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Bell, Gift, Receipt, Sparkles, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProcessStep } from "@/components/ui/process-step";

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const howItWorks = [
    {
      step: 1,
      title: "Shop at Partner Stores",
      description:
        "Make purchases at any of our partner supermarkets and marts across the country.",
      icon: <Store className="h-10 w-10 text-emerald-500" />,
    },
    {
      step: 2,
      title: "Receive Digital Receipts",
      description:
        "Get your receipts delivered instantly via Telegram instead of paper receipts.",
      icon: <Receipt className="h-10 w-10 text-emerald-500" />,
    },
    {
      step: 3,
      title: "AI Analyzes Your Purchases",
      description:
        "Our AI system analyzes your shopping patterns and product expiry dates.",
      icon: <Sparkles className="h-10 w-10 text-emerald-500" />,
    },
    {
      step: 4,
      title: "Get Timely Alerts",
      description:
        "Receive Telegram notifications before your products expire to reduce waste.",
      icon: <Bell className="h-10 w-10 text-emerald-500" />,
    },
    {
      step: 5,
      title: "Earn Sustainability Points",
      description:
        "Gain points for reducing waste and making sustainable choices.",
      icon: <Gift className="h-10 w-10 text-emerald-500" />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === howItWorks.length ? 1 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, howItWorks.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
  };

  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 bg-white dark:bg-slate-900 relative overflow-hidden"
      ref={sectionRef}
    >
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
            How Sustaina Works
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Our AI-powered platform connects shoppers with partner stores for a
            seamless, sustainable shopping experience.
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-emerald-200 dark:bg-emerald-800 -translate-y-1/2 z-0" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10"
          >
            {howItWorks.map((step, index) => (
              <ProcessStep
                key={index}
                step={step}
                isActive={activeStep === step.step}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <Button className="rounded-full text-base px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
            Find Partner Stores Near You
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
