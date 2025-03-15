"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  Globe,
  Home,
  Leaf,
  Lock,
  LogOut,
  Moon,
  Settings,
  Shield,
  Sun,
  User,
  FileText,
  BarChart3,
  Mail,
  MessageSquare,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";

const { useSession } = authClient;

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light");

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (isPending) {
    return <div>Loading...</div>;
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
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
              <Leaf className="h-5 w-5 text-emerald-500" />
            </div>
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
                className="flex items-center p-2 rounded-lg bg-green-100/50 text-green-800 hover:bg-green-100 transition-colors"
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
              <h1 className="text-xl font-bold text-green-800">Settings</h1>
            </div>
            <Avatar>
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || "User"}
              />
              <AvatarFallback className="bg-green-100 text-green-800">
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Settings Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-14">
              <TabsTrigger value="account" className="text-base py-3">
                Account
              </TabsTrigger>
              <TabsTrigger value="appearance" className="text-base py-3">
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-base py-3">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="text-base py-3">
                Privacy
              </TabsTrigger>
            </TabsList>

            {/* Account Settings */}
            <TabsContent value="account" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800">
                      <User className="h-5 w-5 mr-2 text-green-600" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Manage your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                        <span>{session?.user?.name || "User Name"}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                        <span>{session?.user?.email || "user@example.com"}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800">
                      <Lock className="h-5 w-5 mr-2 text-green-600" />
                      Security
                    </CardTitle>
                    <CardDescription>
                      Manage your account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                        <span>••••••••</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Two-Factor Authentication
                      </label>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                        <span>Disabled</span>
                        <Switch />
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                      Security Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance" className="mt-0">
              <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    {theme === "light" ? (
                      <Sun className="h-5 w-5 mr-2 text-green-600" />
                    ) : (
                      <Moon className="h-5 w-5 mr-2 text-green-600" />
                    )}
                    Theme Settings
                  </CardTitle>
                  <CardDescription>
                    Customize your visual experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                    <div className="flex items-center">
                      {theme === "light" ? (
                        <Sun className="h-5 w-5 mr-2 text-amber-500" />
                      ) : (
                        <Moon className="h-5 w-5 mr-2 text-indigo-500" />
                      )}
                      <span>Dark Mode</span>
                    </div>
                    <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-blue-500" />
                      <span>Language</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">English</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications" className="mt-0">
              <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <Bell className="h-5 w-5 mr-2 text-green-600" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Mail className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Email Notifications</span>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                        <MessageSquare className="h-5 w-5 text-teal-500" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Telegram Notifications</span>
                        <p className="text-sm text-gray-500">Get instant alerts on Telegram</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Expiry Alerts</span>
                        <p className="text-sm text-gray-500">Get notified before items expire</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                        <Lightbulb className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Sustainability Tips</span>
                        <p className="text-sm text-gray-500">Receive eco-friendly suggestions</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy" className="mt-0">
              <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <Shield className="h-5 w-5 mr-2 text-green-600" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>
                    Control your data and privacy preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <BarChart3 className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Share Usage Data</span>
                        <p className="text-sm text-gray-500">Help us improve by sharing anonymous usage statistics</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <Lightbulb className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Personalized Recommendations</span>
                        <p className="text-sm text-gray-500">Get tailored suggestions based on your usage patterns</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                        <Shield className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Allow Anonymous Analytics</span>
                        <p className="text-sm text-gray-500">Help us understand how to improve our services</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
} 
