"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, MessageSquare, AlertCircle, Lightbulb } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { itemVariants } from "./settings-variants";

// Notification Item Component
interface NotificationItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

export function NotificationItem({ icon, title, description, color }: NotificationItemProps) {
  const bgColorClass = `bg-${color}-100`;
  
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full ${bgColorClass} flex items-center justify-center mr-3`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <Switch />
    </div>
  );
}

// Notification Card
export function NotificationCard() {
  return (
    <motion.div variants={itemVariants}>
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
    </motion.div>
  );
} 
