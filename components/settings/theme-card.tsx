"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Globe, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { itemVariants } from "./settings-variants";

// Theme Settings Card
export function ThemeCard({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  return (
    <motion.div variants={itemVariants}>
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
    </motion.div>
  );
} 
