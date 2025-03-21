"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Stats } from "@/types/stats";
import { useQuery } from "@tanstack/react-query";

import { Leaf } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const fetchStats = async (): Promise<Stats> => {
  const response = await fetch("/api/receipts/stats");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function EnvironmentalImpact() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery<Stats>({ queryKey: ["stats"], queryFn: fetchStats });

  if (isLoading) {
    return (
      <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Your Impact
          </CardTitle>
          <CardDescription>
            Environmental benefits of your efforts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-2" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <div>Error loading stats</div>;
  }

  const treesEquivalent = ((stats?.recycled ?? 0) * 2.5).toFixed(1);
  const waterSaved = ((stats?.recycled ?? 0) * 13.3).toFixed(1);
  const co2Reduced = ((stats?.recycled ?? 0) * 0.17).toFixed(1);

  return (
    <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <Leaf className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
          Your Impact
        </CardTitle>
        <CardDescription>
          Environmental benefits of your efforts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900/50">
          <div className="flex items-center">
            <span className="text-2xl mr-2">💧</span>
            <span className="text-sm dark:text-gray-100">Water Saved</span>
          </div>
          <span className="font-bold text-blue-700 dark:text-blue-400">
            {waterSaved} liters
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-900/50">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🌳</span>
            <span className="text-sm dark:text-gray-100">Trees Equivalent</span>
          </div>
          <span className="font-bold text-green-700 dark:text-green-400">
            {treesEquivalent} trees
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600">
          <div className="flex items-center">
            <span className="text-2xl mr-2">☁️</span>
            <span className="text-sm dark:text-gray-100">CO₂ Reduced</span>
          </div>
          <span className="font-bold text-gray-700 dark:text-gray-400">
            {co2Reduced} kg
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
