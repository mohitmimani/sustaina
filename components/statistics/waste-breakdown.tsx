"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Stats } from "@/types/stats";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface WasteBreakdownProps {
  stats: Stats;
}

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#8b5cf6",
  "#6b7280",
];

export function WasteBreakdown({ stats }: WasteBreakdownProps) {
  return (
    <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm">
      <CardHeader>
        <CardTitle className="dark:text-gray-300">
          Waste Breakdown by Category
        </CardTitle>
        <CardDescription className="dark:text-gray-400">
          Detailed analysis of your waste composition
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="flex justify-center items-center h-[300px] dark:bg-slate-900 p-4 rounded-lg">
          <PieChart width={250} height={250}>
            <Pie
              data={stats.wasteByCategory}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {stats.wasteByCategory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
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
        </div>

        <div className="overflow-x-auto">
          <Table className="dark:bg-slate-900">
            <TableHeader>
              <TableRow className="dark:text-gray-300">
                <TableHead className="dark:text-gray-300">Category</TableHead>
                <TableHead className="dark:text-gray-300">Amount</TableHead>
                <TableHead className="dark:text-gray-300">Recyclable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.wasteByCategory.map((item) => (
                <TableRow
                  key={item.category}
                  className="dark:border-green-900/30"
                >
                  <TableCell className="dark:text-gray-300">
                    {item.category}
                  </TableCell>
                  <TableCell className="dark:text-gray-300">
                    {item.amount} unit
                  </TableCell>
                  <TableCell>
                    {item.recyclable ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400">
                        Yes
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400">
                        No
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
