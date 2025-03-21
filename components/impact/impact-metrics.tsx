"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Droplets, TreePine, Factory } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { itemVariants, containerVariants } from "./impact-variants";
import { impactMetrics } from "./impact-data";

// Impact Metric Card Component
interface ImpactMetricCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
}

export function ImpactMetricCard({ icon, title, value, description, color }: ImpactMetricCardProps) {
  const bgColorClass = `bg-${color}-100 dark:bg-${color}-900/30`;
  const textColorClass = `text-${color}-500 dark:text-${color}-400`;

  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-full ${bgColorClass} flex items-center justify-center mr-4`}>
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">{title}</h3>
              <p className={`text-2xl font-bold ${textColorClass}`}>{value}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Impact Cards Grid Component
export function ImpactMetricsGrid() {
  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      <ImpactMetricCard 
        icon={<Droplets className="h-6 w-6 text-blue-500 dark:text-blue-400" />}
        title="Water Saved"
        value={impactMetrics.water.value}
        description={impactMetrics.water.description}
        color={impactMetrics.water.color}
      />
      <ImpactMetricCard 
        icon={<TreePine className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />}
        title="Trees Equivalent"
        value={impactMetrics.trees.value}
        description={impactMetrics.trees.description}
        color={impactMetrics.trees.color}
      />
      <ImpactMetricCard 
        icon={<Factory className="h-6 w-6 text-amber-500 dark:text-amber-400" />}
        title="CO2 Reduced"
        value={impactMetrics.co2.value}
        description={impactMetrics.co2.description}
        color={impactMetrics.co2.color}
      />
    </motion.div>
  );
}
