"use client";

import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Droplets, TreePine, Factory } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { itemVariants, containerVariants } from "./impact-variants";
import { motion } from "framer-motion";

// Impact Metric Card Component
interface ImpactMetricCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
}

export function ImpactMetricCard({
  icon,
  title,
  value,
  description,
  color,
}: ImpactMetricCardProps) {
  const bgColorClass = `bg-${color}-100 dark:bg-${color}-900/30`;
  const textColorClass = `text-${color}-500 dark:text-${color}-400`;

  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div
              className={`w-12 h-12 rounded-full ${bgColorClass} flex items-center justify-center mr-4`}
            >
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">
                {title}
              </h3>
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["impactStats"],
    queryFn: async () => {
      const response = await fetch("/api/receipts/stats");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const { total, recycled, composted, landfill } = data;

  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      <ImpactMetricCard
        icon={<Droplets className="h-6 w-6 text-blue-500 dark:text-blue-400" />}
        title="Total Waste"
        value={`${total} kg`}
        description="Total waste generated"
        color="blue"
      />
      <ImpactMetricCard
        icon={
          <TreePine className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
        }
        title="Recycled"
        value={`${recycled} kg`}
        description="Total waste recycled"
        color="emerald"
      />
      <ImpactMetricCard
        icon={
          <Factory className="h-6 w-6 text-amber-500 dark:text-amber-400" />
        }
        title="Composted"
        value={`${composted} kg`}
        description="Total waste composted"
        color="amber"
      />
      <ImpactMetricCard
        icon={<Factory className="h-6 w-6 text-red-500 dark:text-red-400" />}
        title="Landfill"
        value={`${landfill} kg`}
        description="Total waste sent to landfill"
        color="red"
      />
    </motion.div>
  );
}
