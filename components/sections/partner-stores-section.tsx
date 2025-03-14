"use client";

import { motion } from "motion/react";
import { Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StoreCard } from "@/store-card";

export function PartnerStoresSection() {
  const partnerStores = [
    {
      name: "GreenMart",
      logo: "/greenmart_logo.jpeg",
      locations: 24,
    },
    {
      name: "EcoFresh Market",
      logo: "/ecofresh_logo.jpeg",
      locations: 12,
    },
    {
      name: "Nature's Basket",
      logo: "/naturesbasket_logo.jpeg",
      locations: 35,
    },
    {
      name: "Organic Valley",
      logo: "/organicvalley_logo.jpeg",
      locations: 18,
    },
    {
      name: "Sustainable Foods",
      logo: "/sustainablefoods_logo.jpeg",
      locations: 9,
    },
    {
      name: "EarthWise Grocers",
      logo: "/earthgrocers_logo.jpeg",
      locations: 15,
    },
  ];

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
      id="partners"
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden"
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
            Our Partner Stores
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Join the growing network of eco-conscious stores using Sustaina to
            reduce waste and increase customer loyalty.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {partnerStores.map((store, index) => (
            <StoreCard key={index} store={store} variants={itemVariants} />
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Button className="rounded-full text-base px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
            Become a Partner Store
            <Store className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
