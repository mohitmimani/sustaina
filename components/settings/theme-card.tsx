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

export function ThemeCard({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800 dark:text-green-400">
            {theme === "light" ? (
              <Sun className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            ) : (
              <Moon className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            )}
            Theme Settings
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Customize your visual experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-green-100 dark:border-green-900/30">
            <div className="flex items-center">
              {theme === "light" ? (
                <Sun className="h-5 w-5 mr-2 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 mr-2 text-indigo-500" />
              )}
              <span className="dark:text-gray-200">Dark Mode</span>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div>
          <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-green-100 dark:border-green-900/30">
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-500" />
              <span className="dark:text-gray-200">Language</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 dark:text-gray-300 mr-2">English</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
