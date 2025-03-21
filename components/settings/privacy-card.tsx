"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Shield, BarChart3, Lightbulb } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { itemVariants } from "./settings-variants";

// Privacy Item Component
interface PrivacyItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

export function PrivacyItem({ icon, title, description, color }: PrivacyItemProps) {
  const bgColorClass = `bg-${color}-100 dark:bg-${color}-900/50`;
  
  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-green-100 dark:border-green-900/30">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full ${bgColorClass} flex items-center justify-center mr-3`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium dark:text-gray-200">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <Switch />
    </div>
  );
}

// Privacy Card
export function PrivacyCard() {
  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800 dark:text-green-400">
            <Shield className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Privacy Settings
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Control your data and privacy preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PrivacyItem 
            icon={<BarChart3 className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
            title="Share Usage Data"
            description="Help us improve by sharing anonymous usage statistics"
            color="blue"
          />
          <PrivacyItem 
            icon={<Lightbulb className="h-5 w-5 text-purple-500 dark:text-purple-400" />}
            title="Personalized Recommendations"
            description="Get tailored suggestions based on your usage patterns"
            color="purple"
          />
          <PrivacyItem 
            icon={<Shield className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />}
            title="Allow Anonymous Analytics"
            description="Help us understand how to improve our services"
            color="emerald"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
