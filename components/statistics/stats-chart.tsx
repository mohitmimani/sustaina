"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Stats } from "@/types/stats";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface StatsChartProps {
  stats: Stats;
}

const chartConfig = {
  recycled: { color: "hsl(var(--chart-1))" },
  composted: { color: "hsl(var(--chart-2))" },
  landfill: { color: "hsl(var(--chart-3))" },
};

export function StatsChart({ stats }: StatsChartProps) {
  return (
    <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
      <CardHeader>
        <CardTitle>Waste Management Trends</CardTitle>
        <CardDescription>Track your progress over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 w-full md:w-auto">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="area">Area Chart</TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="space-y-4">
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <BarChart data={stats.monthlyData}>
                  <YAxis />
                  <Bar dataKey="recycled" fill="#3b82f6" />
                  <Bar dataKey="composted" fill="#22c55e" />
                  <Bar dataKey="landfill" fill="#ef4444" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </BarChart>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="line" className="space-y-4">
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <LineChart data={stats.monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line type="monotone" dataKey="recycled" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="composted" stroke="#22c55e" />
                  <Line type="monotone" dataKey="landfill" stroke="#ef4444" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="area" className="space-y-4">
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <AreaChart data={stats.monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Area
                    type="monotone"
                    dataKey="recycled"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                  />
                  <Area
                    type="monotone"
                    dataKey="composted"
                    stroke="#22c55e"
                    fill="#22c55e"
                  />
                  <Area
                    type="monotone"
                    dataKey="landfill"
                    stroke="#ef4444"
                    fill="#ef4444"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
