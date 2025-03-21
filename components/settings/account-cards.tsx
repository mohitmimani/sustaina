"use client";

import { motion } from "framer-motion";
import { User, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { itemVariants } from "./settings-variants";

// Profile Information Card
export function ProfileCard({ userName, userEmail }: { userName?: string; userEmail?: string }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800 dark:text-green-400">
            <User className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Profile Information
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Manage your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-green-100 dark:border-green-900/30">
              <span className="dark:text-gray-200">{userName || "User Name"}</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-green-100 dark:border-green-900/30">
              <span className="dark:text-gray-200">{userEmail || "user@example.com"}</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Security Card
export function SecurityCard() {
  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800 dark:text-green-400">
            <Lock className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Security
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Manage your account security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-green-100 dark:border-green-900/30">
              <span className="dark:text-gray-200">••••••••</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Two-Factor Authentication
            </label>
            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-green-100 dark:border-green-900/30">
              <span className="dark:text-gray-200">Disabled</span>
              <Switch />
            </div>
          </div>
          <Button variant="outline" className="w-full border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-slate-900">
            Security Settings
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Account Cards Grid Component
export function AccountCardsGrid({ userName, userEmail }: { userName?: string; userEmail?: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProfileCard userName={userName} userEmail={userEmail} />
      <SecurityCard />
    </div>
  );
}
