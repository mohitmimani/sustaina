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
    <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
      <CardHeader>
        <CardTitle>Waste Breakdown by Category</CardTitle>
        <CardDescription>
          Detailed analysis of your waste composition
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div className="flex justify-center items-center h-[300px]">
          <PieChart width={300} height={300}>
            <Pie
              data={stats.wasteByCategory}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
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
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Recyclable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.wasteByCategory.map((item) => (
                <TableRow key={item.category}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.amount}kg</TableCell>
                  <TableCell>
                    {item.recyclable ? (
                      <Badge className="bg-green-100 text-green-800">Yes</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">No</Badge>
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
