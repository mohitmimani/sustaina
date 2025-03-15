"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronRight,
  Globe,
  Lock,
  Moon,
  Shield,
  Sun,
  User,
  Mail,
  MessageSquare,
  AlertCircle,
  Lightbulb,
  BarChart3,
} from "lucide-react";
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
import { useTheme } from "next-themes";

const { useSession } = authClient;

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { theme, setTheme } = useTheme();

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Settings</h1>

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
                  <Button
                    variant="outline"
                    className="w-full border-green-200 text-green-700 hover:bg-green-50"
                  >
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
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={toggleTheme}
                  />
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
                      <span className="font-medium text-gray-900">
                        Email Notifications
                      </span>
                      <p className="text-sm text-gray-500">
                        Receive updates via email
                      </p>
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
                      <span className="font-medium text-gray-900">
                        Telegram Notifications
                      </span>
                      <p className="text-sm text-gray-500">
                        Get instant alerts on Telegram
                      </p>
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
                      <span className="font-medium text-gray-900">
                        Expiry Alerts
                      </span>
                      <p className="text-sm text-gray-500">
                        Get notified before items expire
                      </p>
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
                      <span className="font-medium text-gray-900">
                        Sustainability Tips
                      </span>
                      <p className="text-sm text-gray-500">
                        Receive eco-friendly suggestions
                      </p>
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
                      <span className="font-medium text-gray-900">
                        Share Usage Data
                      </span>
                      <p className="text-sm text-gray-500">
                        Help us improve by sharing anonymous usage statistics
                      </p>
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
                      <span className="font-medium text-gray-900">
                        Personalized Recommendations
                      </span>
                      <p className="text-sm text-gray-500">
                        Get tailored suggestions based on your usage patterns
                      </p>
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
                      <span className="font-medium text-gray-900">
                        Allow Anonymous Analytics
                      </span>
                      <p className="text-sm text-gray-500">
                        Help us understand how to improve our services
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
