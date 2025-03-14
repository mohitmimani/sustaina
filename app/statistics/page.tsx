"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileDock } from "@/components/layout/mobile-dock";
import { Header } from "@/components/layout/header";
import { StatsChart } from "@/components/statistics/stats-chart";
import { WasteBreakdown } from "@/components/statistics/waste-breakdown";
import { CommunityComparison } from "@/components/statistics/community-comparison";

const { useSession } = authClient;

// Mock data for statistics
const stats = {
  total: 100,
  recycled: 70,
  composted: 20,
  landfill: 10,
  monthlyData: [
    { month: "Jan", recycled: 65, composted: 15, landfill: 20 },
    { month: "Feb", recycled: 68, composted: 17, landfill: 15 },
    { month: "Mar", recycled: 70, composted: 20, landfill: 10 },
    { month: "Apr", recycled: 72, composted: 22, landfill: 6 },
    { month: "May", recycled: 75, composted: 20, landfill: 5 },
  ],
  wasteByCategory: [
    { category: "Paper", amount: 30, recyclable: true },
    { category: "Plastic", amount: 25, recyclable: true },
    { category: "Food", amount: 20, recyclable: true },
    { category: "Glass", amount: 15, recyclable: true },
    { category: "Metal", amount: 5, recyclable: true },
    { category: "Other", amount: 5, recyclable: false },
  ],
};

export default function StatisticsPage() {
  const isMobile = useIsMobile();
  const { data: session, isPending, error } = useSession();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Mobile Dock */}
      {isMobile && <MobileDock />}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden ${
          isMobile ? "pb-20" : ""
        }`}
      >
        {/* Header */}
        <Header
          session={session}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Statistics Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-green-800">Statistics</h1>
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
                    <p className="text-2xl font-bold text-green-700">75%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Change</p>
                    <p className="text-lg font-medium text-green-600">+3%</p>
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
        </main>
      </div>
    </div>
  );
}
