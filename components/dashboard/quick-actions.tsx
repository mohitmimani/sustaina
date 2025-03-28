"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileBarChart, Settings, User } from "lucide-react";
import { AddReceiptButton } from "../receipts/add-receipt-button";
import Link from "next/link";

export function QuickActions() {
  return (
    <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <Settings className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
          Actions
        </CardTitle>
        <CardDescription className="dark:text-gray-400">
          Quick access to common tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="w-full">
          <AddReceiptButton />
        </div>

        <Link href="/dashboard/statistics" className="w-full">
          <Button
            variant="outline"
            className="border-green-200 dark:border-green-900 text-green-700 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-800/50 w-full text-sm sm:text-base px-2 sm:px-4 h-auto py-2"
          >
            <FileBarChart className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate">View Reports</span>
          </Button>
        </Link>
        <Link href="/dashboard/settings" className="w-full">
          <Button
            variant="outline"
            className="border-green-200 dark:border-green-900 text-green-700 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-800/50 w-full text-sm sm:text-base"
          >
            <User className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate">Profile</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
