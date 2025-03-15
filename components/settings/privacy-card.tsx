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

// Privacy Card
export function PrivacyCard() {
  return (
    <motion.div variants={itemVariants}>
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
    </motion.div>
  );
} 
