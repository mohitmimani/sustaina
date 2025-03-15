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
    </motion.div>
  );
}

// Security Card
export function SecurityCard() {
  return (
    <motion.div variants={itemVariants}>
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
