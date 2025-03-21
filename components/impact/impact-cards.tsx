"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Droplets,
  TreePine,
  Factory,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { itemVariants, containerVariants } from "./impact-variants";

// Sample data for the line chart (monthly impact)
export const monthlyData = [
  { month: "Jan", water: 120, trees: 8, co2: 45 },
  { month: "Feb", water: 150, trees: 10, co2: 55 },
  { month: "Mar", water: 180, trees: 12, co2: 65 },
  { month: "Apr", water: 200, trees: 15, co2: 75 },
  { month: "May", water: 220, trees: 18, co2: 85 },
  { month: "Jun", water: 250, trees: 20, co2: 95 },
];

// Sample data for the pie chart (impact distribution)
export const impactData = [
  { name: "Water Saved", value: 250, color: "#3B82F6" },
  { name: "Trees Equivalent", value: 20, color: "#10B981" },
  { name: "CO2 Reduced", value: 95, color: "#F59E0B" },
];

// Header Section Component
export function ImpactHeader() {
  return (
    <div className="text-center mb-12">
      <motion.div variants={itemVariants} className="inline-block mb-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <Leaf className="h-8 w-8 text-emerald-500" />
        </div>
      </motion.div>
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold text-green-800 mb-4"
      >
        Your Environmental Impact
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-lg text-gray-600 max-w-2xl mx-auto"
      >
        Track your contribution to environmental sustainability through water
        conservation, carbon reduction, and tree preservation.
      </motion.p>
    </div>
  );
}

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
  const bgColorClass = `bg-${color}-100`;
  const textColorClass = `text-${color}-500`;

  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div
              className={`w-12 h-12 rounded-full ${bgColorClass} flex items-center justify-center mr-4`}
            >
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className={`text-2xl font-bold ${textColorClass}`}>{value}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">{description}</p>
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
        icon={<Droplets className="h-6 w-6 text-blue-500" />}
        title="Water Saved"
        value="250L"
        description="Equivalent to 100 days of drinking water for one person"
        color="blue"
      />
      <ImpactMetricCard
        icon={<TreePine className="h-6 w-6 text-emerald-500" />}
        title="Trees Equivalent"
        value="20"
        description="Equivalent to 1.5 acres of forest carbon sequestration"
        color="emerald"
      />
      <ImpactMetricCard
        icon={<Factory className="h-6 w-6 text-amber-500" />}
        title="CO2 Reduced"
        value="95kg"
        description="Equivalent to 500km of car travel emissions"
        color="amber"
      />
    </motion.div>
  );
}

// Monthly Impact Line Chart Component
export function MonthlyImpactChart() {
  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Monthly Impact Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="water"
                stroke="#3B82F6"
                name="Water (L)"
              />
              <Line
                type="monotone"
                dataKey="trees"
                stroke="#10B981"
                name="Trees"
              />
              <Line
                type="monotone"
                dataKey="co2"
                stroke="#F59E0B"
                name="CO2 (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Impact Distribution Pie Chart Component
export function ImpactDistributionChart() {
  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <Target className="h-5 w-5 mr-2 text-green-600" />
            Impact Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={impactData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {impactData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
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
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <MonthlyImpactChart />
      <ImpactDistributionChart />
    </motion.div>
  );
}

// Impact Timeline Component
export function ImpactTimeline() {
  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <Calendar className="h-5 w-5 mr-2 text-green-600" />
            Impact Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-100 hover:shadow-md transition-shadow"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{data.month}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center text-sm text-blue-600">
                      <Droplets className="h-4 w-4 mr-1" />
                      {data.water}L water saved
                    </div>
                    <div className="flex items-center text-sm text-emerald-600">
                      <TreePine className="h-4 w-4 mr-1" />
                      {data.trees} trees
                    </div>
                    <div className="flex items-center text-sm text-amber-600">
                      <Factory className="h-4 w-4 mr-1" />
                      {data.co2}kg CO2 reduced
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
