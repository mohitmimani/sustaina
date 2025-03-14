"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileDock } from "@/components/layout/mobile-dock";
import { Header } from "@/components/layout/header";
import { TelegramConnect } from "@/components/dashboard/telegram-connect";
import { RecentReceipts } from "@/components/dashboard/recent-receipts";
import { StatsSummary } from "@/components/dashboard/stats-summary";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { EnvironmentalImpact } from "@/components/dashboard/environmental-impact";

const { useSession } = authClient;

// Mock data for the dashboard
const recentReceipts = [
  {
    id: 1,
    name: "Grocery Store",
    date: "May 15, 2023",
    amount: "12.5kg",
    type: "Mixed",
    items: [
      { name: "Plastic packaging", weight: "3.2kg", category: "Recycle" },
      { name: "Food waste", weight: "5.1kg", category: "Compost" },
      { name: "Paper bags", weight: "2.7kg", category: "Recycle" },
      { name: "Non-recyclables", weight: "1.5kg", category: "Landfill" },
    ],
  },
  {
    id: 2,
    name: "Farmers Market",
    date: "May 12, 2023",
    amount: "8.2kg",
    type: "Compost",
    items: [
      { name: "Vegetable scraps", weight: "4.5kg", category: "Compost" },
      { name: "Fruit peels", weight: "3.7kg", category: "Compost" },
    ],
  },
  {
    id: 3,
    name: "Electronics Store",
    date: "May 10, 2023",
    amount: "5.7kg",
    type: "Recycle",
    items: [
      { name: "Cardboard boxes", weight: "3.2kg", category: "Recycle" },
      { name: "Plastic packaging", weight: "1.8kg", category: "Recycle" },
      { name: "Styrofoam", weight: "0.7kg", category: "Landfill" },
    ],
  },
  {
    id: 4,
    name: "Department Store",
    date: "May 5, 2023",
    amount: "3.1kg",
    type: "Landfill",
    items: [
      {
        name: "Non-recyclable plastics",
        weight: "2.1kg",
        category: "Landfill",
      },
      { name: "Mixed materials", weight: "1.0kg", category: "Landfill" },
    ],
  },
];

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

export default function Dashboard() {
  const isMobile = useIsMobile();
  const { data: session, isPending, error, refetch } = useSession();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTelegramConnected, setIsTelegramConnected] = useState(false);

  // Calculate environmental impact
  const treesEquivalent = (stats.recycled * 0.17).toFixed(1);
  const waterSaved = (stats.recycled * 13.3).toFixed(1);
  const co2Reduced = (stats.recycled * 2.5).toFixed(1);

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  if (isPending) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Card className="w-[400px] backdrop-blur-md bg-white/70 border-green-100">
          <CardHeader>
            <CardTitle className="text-red-600">Authentication Error</CardTitle>
            <CardDescription>
              There was a problem loading your session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              {error.message || "Please try logging in again."}
            </p>
            <Button onClick={() => refetch()} className="w-full">
              Try Again
            </Button>
          </CardContent>
          <CardFooter>
            <Link
              href="/login"
              className="text-sm text-green-600 hover:underline w-full text-center"
            >
              Return to Login
            </Link>
          </CardFooter>
        </Card>
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

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Telegram Bot Connection Card */}
          <TelegramConnect
            isTelegramConnected={isTelegramConnected}
            setIsTelegramConnected={setIsTelegramConnected}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Recent Receipts */}
            <RecentReceipts receipts={recentReceipts} />

            {/* Statistics */}
            <StatsSummary stats={stats} />

            {/* Actions & Impact */}
            <div className="space-y-6 md:col-span-3 lg:col-span-1">
              {/* Actions Card */}
              <QuickActions />

              {/* Environmental Impact Card */}
              <EnvironmentalImpact
                treesEquivalent={treesEquivalent}
                waterSaved={waterSaved}
                co2Reduced={co2Reduced}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Loading skeleton
function DashboardSkeleton() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-white/80 backdrop-blur-md border-r border-green-100 shadow-sm hidden md:block">
        <div className="p-4 border-b border-green-100">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/70 backdrop-blur-md border-b border-green-100 shadow-sm p-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="backdrop-blur-md bg-white/70 border border-green-100 shadow-sm rounded-lg p-6"
              >
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-12 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
