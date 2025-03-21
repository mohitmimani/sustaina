"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, PieChart as PieChartIcon } from "lucide-react";
import { itemVariants, containerVariants } from "./impact-variants";
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
import { useTheme } from "next-themes";

// Monthly Impact Chart Component
export function MonthlyImpactChart() {
  const { theme } = useTheme();

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

  const { monthlyData } = data;
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
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                {/* Grid lines for better visibility */}
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.3}
                  className="dark:stroke-white-700"
                />

                {/* X Axis */}
                {theme === "dark" ? (
                  <XAxis dataKey="month" stroke="#D1D5DB" />
                ) : (
                  <XAxis dataKey="month" stroke="#000" />
                )}

                {/* Y Axis */}
                {theme === "dark" ? (
                  <YAxis stroke="#D1D5DB" />
                ) : (
                  <YAxis stroke="#000" />
                )}

                {/* Tooltip for hover data */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--tooltip-bg)",
                    borderColor: "var(--tooltip-border)",
                    borderRadius: "4px",
                  }}
                />

                <Legend />

                {/* Lines */}
                <Line
                  type="monotone"
                  dataKey="recycled"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  className="dark:stroke-blue-400"
                />
                <Line
                  type="monotone"
                  dataKey="composted"
                  stroke="#10B981"
                  strokeWidth={2}
                  className="dark:stroke-emerald-400"
                />
                <Line
                  type="monotone"
                  dataKey="landfill"
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

  const { wasteByCategory } = data;

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
              <PieChart width={250} height={250}>
                <Pie
                  data={wasteByCategory}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ category, amount }) =>
                    `${category}: ${amount < 0 ? "Negative" : amount}`
                  }
                >
                  {wasteByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.category === "FOOD"
                          ? "#10B981"
                          : entry.recyclable
                          ? "#3B82F6"
                          : "#F59E0B"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--tooltip-bg)",
                    borderColor: "var(--tooltip-border)",
                    color: "var(--foreground)",
                  }}
                  wrapperStyle={{ color: "var(--foreground)" }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Legend
                  wrapperStyle={{
                    color: "var(--foreground)",
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
