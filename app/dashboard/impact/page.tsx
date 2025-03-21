"use client";

import { motion } from "framer-motion";
import { ImpactHeader } from "@/components/impact/impact-header";
import { ImpactMetricsGrid } from "@/components/impact/impact-metrics";
import { ChartsGrid } from "@/components/impact/impact-charts";
import { ImpactTimeline } from "@/components/impact/impact-timeline";
import { containerVariants } from "@/components/impact/impact-variants";

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-green-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ImpactHeader />
        <ImpactMetricsGrid />
        <ChartsGrid />
        <ImpactTimeline />
      </motion.div>
    </div>
  );
}
