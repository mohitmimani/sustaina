"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  BarChart3,
  FileText,
  Home,
  Leaf,
  LogOut,
  Plus,
  Recycle,
  Settings,
  Trash2,
  Upload,
  User,
  FileBarChart,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const { useSession } = authClient;

export default function Dashboard() {
  const router = useRouter();

  const { data: session, isPending, error, refetch } = useSession();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock data for the dashboard
  const recentReceipts = [
    {
      id: 1,
      name: "Grocery Store",
      date: "May 15, 2023",
      amount: "12.5kg",
      type: "Mixed",
    },
    {
      id: 2,
      name: "Farmers Market",
      date: "May 12, 2023",
      amount: "8.2kg",
      type: "Compost",
    },
    {
      id: 3,
      name: "Electronics Store",
      date: "May 10, 2023",
      amount: "5.7kg",
      type: "Recycle",
    },
    {
      id: 4,
      name: "Department Store",
      date: "May 5, 2023",
      amount: "3.1kg",
      type: "Landfill",
    },
  ];

  const stats = {
    total: 100,
    recycled: 70,
    composted: 20,
    landfill: 10,
  };

  // Calculate environmental impact
  const treesEquivalent = (stats.recycled * 0.17).toFixed(1);
  const waterSaved = (stats.recycled * 13.3).toFixed(1);
  const co2Reduced = (stats.recycled * 2.5).toFixed(1);

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
      <motion.div
        initial={{ x: -20, opacity: 0.8 }}
        animate={{ x: 0, opacity: 1 }}
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white/80 backdrop-blur-md border-r border-green-100 shadow-sm transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-green-100 flex items-center justify-center">
          <div
            className={`flex items-center ${
              isSidebarOpen ? "justify-start" : "justify-center"
            }`}
          >
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Sustaina Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            {isSidebarOpen && (
              <span className="font-bold text-green-800 text-xl">Sustaina</span>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 rounded-lg bg-green-100/50 text-green-800 hover:bg-green-100 transition-colors"
              >
                <Home className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/receipts"
                className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100/50 transition-colors"
              >
                <FileText className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Receipts</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/statistics"
                className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100/50 transition-colors"
              >
                <BarChart3 className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Statistics</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/impact"
                className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100/50 transition-colors"
              >
                <Leaf className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Environmental Impact</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100/50 transition-colors"
              >
                <Settings className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Settings</span>}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-green-100">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-red-100/50 hover:text-red-700"
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/login"); // redirect to login page
                  },
                },
              });
            }}
          >
            <LogOut className="h-5 w-5 mr-3" />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur-md border-b border-green-100 shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
              <h1 className="text-xl font-bold text-green-800">
                Eco-Friendly Waste Receipt Tracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="outline"
                className="bg-green-100/50 text-green-800 border-green-200"
              >
                <Leaf className="h-3 w-3 mr-1" />
                Eco Level: Advanced
              </Badge>
              <Avatar>
                <AvatarImage
                  src={session?.user.image || ""}
                  alt={session?.user.name}
                />
                <AvatarFallback className="bg-green-100 text-green-800">
                  {session?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Recent Receipts */}
            <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-green-600" />
                  Recent Receipts
                </CardTitle>
                <CardDescription>
                  Your latest waste tracking entries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recentReceipts.map((receipt) => (
                    <li
                      key={receipt.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-green-100 hover:border-green-200 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-sm">{receipt.name}</p>
                        <p className="text-xs text-gray-500">{receipt.date}</p>
                      </div>
                      <div className="flex items-center">
                        <Badge
                          className={`mr-2 ${
                            receipt.type === "Recycle"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : receipt.type === "Compost"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : receipt.type === "Landfill"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }`}
                        >
                          {receipt.type}
                        </Badge>
                        <span className="text-sm font-medium">
                          {receipt.amount}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  View All Receipts
                </Button>
              </CardFooter>
            </Card>

            {/* Statistics */}
            <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                  Statistics
                </CardTitle>
                <CardDescription>
                  Your waste management breakdown
                </CardDescription>
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
                <Button
                  variant="ghost"
                  className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  View Detailed Statistics
                </Button>
              </CardFooter>
            </Card>

            {/* Actions & Impact */}
            <div className="space-y-6">
              {/* Actions Card */}
              <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-green-600" />
                    Actions
                  </CardTitle>
                  <CardDescription>
                    Quick access to common tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Receipt
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Data
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <FileBarChart className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Environmental Impact Card */}
              <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold flex items-center">
                    <Leaf className="h-5 w-5 mr-2 text-green-600" />
                    Your Impact
                  </CardTitle>
                  <CardDescription>
                    Environmental benefits of your efforts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">💧</span>
                      <span className="text-sm">Water Saved</span>
                    </div>
                    <span className="font-bold text-blue-700">
                      {waterSaved} liters
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 border border-green-100">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">🌳</span>
                      <span className="text-sm">Trees Equivalent</span>
                    </div>
                    <span className="font-bold text-green-700">
                      {treesEquivalent} trees
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">☁️</span>
                      <span className="text-sm">CO₂ Reduced</span>
                    </div>
                    <span className="font-bold text-gray-700">
                      {co2Reduced} kg
                    </span>
                  </div>
                </CardContent>
              </Card>
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
      <div className="w-64 bg-white/80 backdrop-blur-md border-r border-green-100 shadow-sm">
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
