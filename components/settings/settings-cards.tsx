"use client";

import { ReactNode } from "react";
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

// Profile Information Card
export function ProfileCard({ userName, userEmail }: { userName?: string; userEmail?: string }) {
  return (
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
            <span>{userName || "User Name"}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
            <span>{userEmail || "user@example.com"}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}

// Security Card
export function SecurityCard() {
  return (
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
  );
}

// Theme Settings Card
export function ThemeCard({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  return (
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
  );
}

// Notification Card
export function NotificationCard() {
  return (
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
        <NotificationItem 
          icon={<Mail className="h-5 w-5 text-blue-500" />}
          title="Email Notifications"
          description="Receive updates via email"
          color="blue"
        />
        <NotificationItem 
          icon={<MessageSquare className="h-5 w-5 text-teal-500" />}
          title="Telegram Notifications"
          description="Get instant alerts on Telegram"
          color="teal"
        />
        <NotificationItem 
          icon={<AlertCircle className="h-5 w-5 text-amber-500" />}
          title="Expiry Alerts"
          description="Get notified before items expire"
          color="amber"
        />
        <NotificationItem 
          icon={<Lightbulb className="h-5 w-5 text-emerald-500" />}
          title="Sustainability Tips"
          description="Receive eco-friendly suggestions"
          color="emerald"
        />
      </CardContent>
    </Card>
  );
}

// Privacy Card
export function PrivacyCard() {
  return (
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
        <PrivacyItem 
          icon={<BarChart3 className="h-5 w-5 text-blue-500" />}
          title="Share Usage Data"
          description="Help us improve by sharing anonymous usage statistics"
          color="blue"
        />
        <PrivacyItem 
          icon={<Lightbulb className="h-5 w-5 text-purple-500" />}
          title="Personalized Recommendations"
          description="Get tailored suggestions based on your usage patterns"
          color="purple"
        />
        <PrivacyItem 
          icon={<Shield className="h-5 w-5 text-emerald-500" />}
          title="Allow Anonymous Analytics"
          description="Help us understand how to improve our services"
          color="emerald"
        />
      </CardContent>
    </Card>
  );
}

// Reusable Notification Item Component
interface NotificationItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

function NotificationItem({ icon, title, description, color }: NotificationItemProps) {
  const bgColorClass = `bg-${color}-100`;
  
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full ${bgColorClass} flex items-center justify-center mr-3`}>
          {icon}
        </div>
        <div>
          <span className="font-medium text-gray-900">{title}</span>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Switch defaultChecked />
    </div>
  );
}

// Reusable Privacy Item Component
interface PrivacyItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

function PrivacyItem({ icon, title, description, color }: PrivacyItemProps) {
  const bgColorClass = `bg-${color}-100`;
  
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full ${bgColorClass} flex items-center justify-center mr-3`}>
          {icon}
        </div>
        <div>
          <span className="font-medium text-gray-900">{title}</span>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Switch defaultChecked />
    </div>
  );
} 
