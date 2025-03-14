"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import { ReceiptList } from "@/components/receipts/receipt-list";
import type { Receipt } from "@/types/receipt";
import Link from "next/link";

interface RecentReceiptsProps {
  receipts: Receipt[];
}

export function RecentReceipts({ receipts }: RecentReceiptsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredReceipts = receipts.filter((receipt) => {
    if (
      activeTab !== "all" &&
      receipt.type.toLowerCase() !== activeTab.toLowerCase()
    ) {
      return false;
    }
    if (
      searchQuery &&
      !receipt.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm md:col-span-2 lg:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-green-600" />
            Recent Receipts
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Filter className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>Your latest waste tracking entries</CardDescription>
        <div className="mt-2 space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search receipts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="recycle">Recycle</TabsTrigger>
              <TabsTrigger value="compost">Compost</TabsTrigger>
              <TabsTrigger value="landfill">Landfill</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ReceiptList receipts={filteredReceipts} limit={4} />
      </CardContent>
      <CardFooter>
        <Link href="/dashboard/receipts" className="flex w-full justify-center">
          <Button
            variant="ghost"
            className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            View All Receipts
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
