"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, PieChart as PieChartIcon } from "lucide-react";
import { itemVariants, containerVariants } from "./impact-variants";
import { monthlyImpactData, impactDistributionData } from "./impact-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Monthly Impact Chart Component
export function MonthlyImpactChart() {
  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm h-full">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-400 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Monthly Impact Trends
          </h3>
          <div className="h-64 dark:bg-slate-900 rounded-md p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyImpactData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                {/* Grid lines for better visibility */}
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} className="dark:stroke-white-700" />
                
                {/* X Axis */}
                <XAxis
                  dataKey="month"
                  stroke="#000"
                  tick={{ fill: "#000" }} // Light mode
                  className="dark:stroke-white-300 dark:tick-fill-white-300"
                />

                {/* Y Axis */}
                <YAxis
                  stroke="#000"
                  tick={{ fill: "#000" }} // Light mode
                  className="dark:stroke-white-300 dark:tick-fill-white-300"
                />

                {/* Tooltip for hover data */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    color: "white",
                    borderRadius: "6px",
                  }}
                />

                <Legend />
                
                {/* Lines */}
                <Line
                  type="monotone"
                  dataKey="water"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  className="dark:stroke-blue-400"
                />
                <Line
                  type="monotone"
                  dataKey="trees"
                  stroke="#10B981"
                  strokeWidth={2}
                  className="dark:stroke-emerald-400"
                />
                <Line
                  type="monotone"
                  dataKey="co2"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  className="dark:stroke-amber-400"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Impact Distribution Chart Component
export function ImpactDistributionChart() {
  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm h-full">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-400 flex items-center">
            <PieChartIcon className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Impact Distribution
          </h3>
          <div className="h-64 dark:bg-slate-900 rounded-md p-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={impactDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {impactDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="dark:fill-current"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    color: "white",
                    borderRadius: "6px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Charts Grid Component
export function ChartsGrid() {
  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
    >
      <MonthlyImpactChart />
      <ImpactDistributionChart />
    </motion.div>
  );
}
