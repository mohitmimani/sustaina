"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileBarChart, Plus, Settings, Upload, User } from "lucide-react";
import { AddReceiptButton } from "../receipts/add-receipt-button";
import Link from "next/link";

export function QuickActions() {
  return (
    <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm lg:">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <Settings className="h-5 w-5 mr-2 text-green-600" />
          Actions
        </CardTitle>
        <CardDescription>Quick access to common tasks</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <AddReceiptButton />

        <Link href="/dashboard/statistics">
          <Button
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            <FileBarChart className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </Link>
        <Link href="/dashboard/settings">
          <Button
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50 w-full"
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
