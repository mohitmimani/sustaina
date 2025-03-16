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
  ResponsiveContainer,
  Rectangle,
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
            <div className="h-[300px] w-full">
              <ChartContainer
                config={chartConfig}
                className="h-full w-full -ml-5 [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-none"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Bar
                      dataKey="recycled"
                      fill="#3b82f6"
                      activeBar={
                        <Rectangle
                          fill="rgba(59, 130, 246, 0.5)"
                          stroke="#3b82f6"
                        />
                      }
                    />
                    <Bar
                      dataKey="composted"
                      fill="#22c55e"
                      activeBar={
                        <Rectangle
                          fill="rgba(34, 197, 94, 0.5)"
                          stroke="#22c55e"
                        />
                      }
                    />
                    <Bar
                      dataKey="landfill"
                      fill="#ef4444"
                      activeBar={
                        <Rectangle
                          fill="rgba(239, 68, 68, 0.5)"
                          stroke="#ef4444"
                        />
                      }
                    />
                    <ChartTooltip
                      wrapperClassName="bg-slate-900 backdrop-blur-md"
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="line" className="space-y-4">
            <div className="h-[300px] w-full">
              <ChartContainer
                config={chartConfig}
                className="h-full w-full -ml-5"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Line type="monotone" dataKey="recycled" stroke="#3b82f6" />
                    <Line
                      type="monotone"
                      dataKey="composted"
                      stroke="#22c55e"
                    />
                    <Line type="monotone" dataKey="landfill" stroke="#ef4444" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="area" className="space-y-4">
            <div className="h-[300px] w-full">
              <ChartContainer
                config={chartConfig}
                className="h-full w-full -ml-5"
              >
                <ResponsiveContainer width="100%" height="100%">
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
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
