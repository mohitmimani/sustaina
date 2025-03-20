"use client";

import { StatsChart } from "@/components/statistics/stats-chart";
import { WasteBreakdown } from "@/components/statistics/waste-breakdown";
import { CommunityComparison } from "@/components/statistics/community-comparison";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

import type { Stats } from "@/types/stats";
import Link from "next/link";

const fetchStats = async (): Promise<Stats> => {
  const response = await fetch("/api/receipts/stats");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function StatisticsPage() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery<Stats>({ queryKey: ["stats"], queryFn: fetchStats });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading stats</div>;
  }
  if (!stats?.wasteByCategory) {
    return <div>Not enough data</div>;
  }
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800 dark:text-green-400 hidden md:block">Statistics</h1>
        <p className="text-gray-600">
          Detailed analysis of your waste management and recycling habits
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StatsChart stats={stats} />
        <WasteBreakdown stats={stats} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CommunityComparison
          userRate={70}
          communityAverage={55}
          topPerformers={85}
        />

        <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
          <CardHeader>
            <CardTitle>Monthly Progress</CardTitle>
            <CardDescription>Your recycling rate over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
              <div>
                <p className="text-sm text-gray-600">Current Month</p>
                <p className="text-2xl font-bold text-green-700">100%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Change</p>
                <p className="text-lg font-medium text-green-600">+0%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
            <CardDescription>Your positive contribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">CO₂ Reduced</span>
              <span className="font-medium">
                {(stats.recycled * 2.5).toFixed(1)} kg
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Water Saved</span>
              <span className="font-medium">
                {(stats.recycled * 13.3).toFixed(1)} liters
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Trees Equivalent</span>
              <span className="font-medium">
                {(stats.recycled * 0.17).toFixed(1)} trees
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
