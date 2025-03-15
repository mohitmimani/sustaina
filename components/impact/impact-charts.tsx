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
      <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm h-full">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-700 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Monthly Impact Trends
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyImpactData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="water"
                  stroke="#3B82F6"
                  name="Water (L)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="trees"
                  stroke="#10B981"
                  name="Trees"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="co2"
                  stroke="#F59E0B"
                  name="CO2 (kg)"
                  strokeWidth={2}
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
      <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm h-full">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-700 flex items-center">
            <PieChartIcon className="h-5 w-5 mr-2 text-green-600" />
            Impact Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={impactDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {impactDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
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
