"use client";

import { motion } from "framer-motion";
<<<<<<< HEAD:app/impact/page.tsx
import { Leaf, Droplets, TreePine, Factory, TrendingUp, Calendar, Target } from "lucide-react";
=======
import {
  Leaf,
  Droplets,
  TreePine,
  Factory,
  TrendingUp,
  Calendar,
  Target,
  Home,
  FileText,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
>>>>>>> main:app/dashboard/impact/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data for the line chart (monthly impact)
const monthlyData = [
  { month: "Jan", water: 120, trees: 8, co2: 45 },
  { month: "Feb", water: 150, trees: 10, co2: 55 },
  { month: "Mar", water: 180, trees: 12, co2: 65 },
  { month: "Apr", water: 200, trees: 15, co2: 75 },
  { month: "May", water: 220, trees: 18, co2: 85 },
  { month: "Jun", water: 250, trees: 20, co2: 95 },
];

// Sample data for the pie chart (impact distribution)
const impactData = [
  { name: "Water Saved", value: 250, color: "#3B82F6" },
  { name: "Trees Equivalent", value: 20, color: "#10B981" },
  { name: "CO2 Reduced", value: 95, color: "#F59E0B" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function ImpactPage() {
  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Environmental Impact</h1>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              variants={itemVariants}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-emerald-500" />
              </div>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold text-green-800 mb-4"
            >
              Your Environmental Impact
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Track your contribution to environmental sustainability through water conservation,
              carbon reduction, and tree preservation.
            </motion.p>
          </div>

<<<<<<< HEAD:app/impact/page.tsx
          {/* Impact Cards */}
=======
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100/50 transition-colors"
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
                href="/dashboard/impact"
                className="flex items-center p-2 rounded-lg bg-green-100/50 text-green-800 hover:bg-green-100 transition-colors"
              >
                <Leaf className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Environmental Impact</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
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
                Environmental Impact
              </h1>
            </div>
          </div>
        </header>

        {/* Impact Content */}
        <main className="flex-1 overflow-y-auto p-6">
>>>>>>> main:app/dashboard/impact/page.tsx
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
<<<<<<< HEAD:app/impact/page.tsx
            <motion.div variants={itemVariants}>
              <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Droplets className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Water Saved</h3>
                      <p className="text-2xl font-bold text-blue-500">250L</p>
                    </div>
=======
            {/* Header Section */}
            <div className="text-center mb-12">
              <motion.div variants={itemVariants} className="inline-block mb-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-emerald-500" />
                </div>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold text-green-800 mb-4"
              >
                Your Environmental Impact
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Track your contribution to environmental sustainability through
                water conservation, carbon reduction, and tree preservation.
              </motion.p>
            </div>

            {/* Impact Cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <motion.div variants={itemVariants}>
                <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <Droplets className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Water Saved
                        </h3>
                        <p className="text-2xl font-bold text-blue-500">250L</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Equivalent to 100 days of drinking water for one person
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                        <TreePine className="h-6 w-6 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Trees Equivalent
                        </h3>
                        <p className="text-2xl font-bold text-emerald-500">
                          20
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Equivalent to 1.5 acres of forest carbon sequestration
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                        <Factory className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          CO2 Reduced
                        </h3>
                        <p className="text-2xl font-bold text-amber-500">
                          95kg
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Equivalent to 500km of car travel emissions
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Charts Section */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Monthly Impact Line Chart */}
              <motion.div variants={itemVariants}>
                <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      Monthly Impact Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="water"
                          stroke="#3B82F6"
                          name="Water (L)"
                        />
                        <Line
                          type="monotone"
                          dataKey="trees"
                          stroke="#10B981"
                          name="Trees"
                        />
                        <Line
                          type="monotone"
                          dataKey="co2"
                          stroke="#F59E0B"
                          name="CO2 (kg)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Impact Distribution Pie Chart */}
              <motion.div variants={itemVariants}>
                <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800">
                      <Target className="h-5 w-5 mr-2 text-green-600" />
                      Impact Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={impactData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {impactData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Impact Timeline */}
            <motion.div variants={itemVariants}>
              <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <Calendar className="h-5 w-5 mr-2 text-green-600" />
                    Impact Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-100 hover:shadow-md transition-shadow"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {data.month}
                          </h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-blue-600">
                              <Droplets className="h-4 w-4 mr-1" />
                              {data.water}L water saved
                            </div>
                            <div className="flex items-center text-sm text-emerald-600">
                              <TreePine className="h-4 w-4 mr-1" />
                              {data.trees} trees
                            </div>
                            <div className="flex items-center text-sm text-amber-600">
                              <Factory className="h-4 w-4 mr-1" />
                              {data.co2}kg CO2 reduced
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-200 text-green-700 hover:bg-green-50"
                        >
                          View Details
                        </Button>
                      </div>
                    ))}
>>>>>>> main:app/dashboard/impact/page.tsx
                  </div>
                  <p className="text-sm text-gray-600">
                    Equivalent to 100 days of drinking water for one person
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                      <TreePine className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Trees Equivalent</h3>
                      <p className="text-2xl font-bold text-emerald-500">20</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Equivalent to 1.5 acres of forest carbon sequestration
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                      <Factory className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">CO2 Reduced</h3>
                      <p className="text-2xl font-bold text-amber-500">95kg</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Equivalent to 500km of car travel emissions
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Charts Section */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Monthly Impact Line Chart */}
            <motion.div variants={itemVariants}>
              <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Monthly Impact Trend
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="water"
                        stroke="#3B82F6"
                        name="Water (L)"
                      />
                      <Line
                        type="monotone"
                        dataKey="trees"
                        stroke="#10B981"
                        name="Trees"
                      />
                      <Line
                        type="monotone"
                        dataKey="co2"
                        stroke="#F59E0B"
                        name="CO2 (kg)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Impact Distribution Pie Chart */}
            <motion.div variants={itemVariants}>
              <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <Target className="h-5 w-5 mr-2 text-green-600" />
                    Impact Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={impactData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {impactData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Impact Timeline */}
          <motion.div variants={itemVariants}>
            <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Impact Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-100 hover:shadow-md transition-shadow"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">{data.month}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-sm text-blue-600">
                            <Droplets className="h-4 w-4 mr-1" />
                            {data.water}L water saved
                          </div>
                          <div className="flex items-center text-sm text-emerald-600">
                            <TreePine className="h-4 w-4 mr-1" />
                            {data.trees} trees
                          </div>
                          <div className="flex items-center text-sm text-amber-600">
                            <Factory className="h-4 w-4 mr-1" />
                            {data.co2}kg CO2 reduced
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-green-200 text-green-700 hover:bg-green-50"
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
