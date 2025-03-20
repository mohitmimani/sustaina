"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, TreePine, Factory, Calendar } from "lucide-react";
import { itemVariants, containerVariants } from "./impact-variants";
import { timelineData } from "./impact-data";

// Timeline Item Component
interface TimelineItemProps {
  month: string;
  waterSaved: string;
  treesEquivalent: string;
  co2Reduced: string;
}

export function TimelineItem({ 
  month, 
  waterSaved, 
  treesEquivalent, 
  co2Reduced
}: TimelineItemProps) {
  // Extract just the month name without the year
  const monthOnly = month.split(' ')[0];
  
  return (
    <motion.div 
      variants={itemVariants}
      className="mb-1.5"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border border-green-100 dark:border-green-900/30 shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-2">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-1.5">
                <span className="text-green-600 dark:text-green-400 text-xs">{monthOnly.substring(0, 3)}</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200">{monthOnly}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[0.9rem]">
              <div className="flex items-center">
                <Droplets className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400 mr-1" />
                <span className="text-blue-600 dark:text-blue-300">{waterSaved} water saved</span>
              </div>
              <div className="flex items-center">
                <TreePine className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400 mr-1" />
                <span className="text-emerald-600 dark:text-emerald-300">{treesEquivalent} trees</span>
              </div>
              <div className="flex items-center">
                <Factory className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400 mr-1" />
                <span className="text-amber-600 dark:text-amber-300">{co2Reduced} CO2 reduced</span>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/50 -mr-1 -mb-0.5 h-5 text-xs px-1.5">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Impact Timeline Component
export function ImpactTimeline() {
  return (
    <motion.div
      variants={containerVariants}
      className="mb-8"
    >
      <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold flex items-center text-green-700 dark:text-green-400">
              <Calendar className="h-5 w-5 mr-2 text-green-600 dark:text-green-300" />
              Impact Timeline
            </h3>
          </div>
          <div className="space-y-1.5">
            {timelineData.map((item) => (
              <TimelineItem
                key={item.month}
                month={item.month}
                waterSaved={item.waterSaved}
                treesEquivalent={item.treesEquivalent}
                co2Reduced={item.co2Reduced}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
