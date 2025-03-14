"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Calendar,
  Leaf,
  Recycle,
  Trash2,
  FileBarChart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Stats } from "@/types/stats";
import Link from "next/link";

interface StatsSummaryProps {
  stats: Stats;
}

export function StatsSummary({ stats }: StatsSummaryProps) {
  return (
    <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm md:col-span-2 lg:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
            Statistics
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Calendar className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>This Week</DropdownMenuItem>
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
              <DropdownMenuItem>This Year</DropdownMenuItem>
              <DropdownMenuItem>All Time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription>Your waste management breakdown</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Waste</span>
            <span className="font-medium">{stats.total}kg</span>
          </div>
          <Progress value={100} className="h-2 bg-gray-100" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <Recycle className="h-4 w-4 mr-1 text-blue-600" />
              Recycled
            </span>
            <span className="font-medium">{stats.recycled}kg</span>
          </div>
          <Progress
            value={stats.recycled}
            className="h-2 bg-gray-100"
            indicatorClassName="bg-blue-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <Leaf className="h-4 w-4 mr-1 text-green-600" />
              Composted
            </span>
            <span className="font-medium">{stats.composted}kg</span>
          </div>
          <Progress
            value={stats.composted}
            className="h-2 bg-gray-100"
            indicatorClassName="bg-green-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <Trash2 className="h-4 w-4 mr-1 text-red-600" />
              Landfill
            </span>
            <span className="font-medium">{stats.landfill}kg</span>
          </div>
          <Progress
            value={stats.landfill}
            className="h-2 bg-gray-100"
            indicatorClassName="bg-red-500"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href="/dashboard/statistics"
          className="flex w-full justify-center"
        >
          <Button
            variant="ghost"
            className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            View Detailed Statistics
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
