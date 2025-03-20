"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ReceiptFilters } from "@/components/receipts/receipt-filters";
import { ReceiptList } from "@/components/receipts/receipt-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Item } from "@/prisma/generated/zod";
import {
  ReceiptWithoutId,
  ReceiptWithoutIdSchema,
} from "@/lib/schema/extended";
import { AddReceiptButton } from "@/components/receipts/add-receipt-button";

async function fetchReceipts(): Promise<ReceiptWithoutId[]> {
  const response = await fetch("/api/receipts");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return data.map((item: Item) => ReceiptWithoutIdSchema.safeParse(item).data);
}

export default function ReceiptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState("date-desc");

  const { data: receipts = [], isLoading } = useQuery({
    queryKey: ["receipts"],
    queryFn: fetchReceipts,
    staleTime: 0, // Ensures data is always fresh
    refetchOnMount: true,
  });

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

  const sortedReceipts = [...filteredReceipts].sort((a, b) => {
    if (sortOrder === "date-desc") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOrder === "date-asc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortOrder === "amount-desc") {
      return Number.parseFloat(b.amount) - Number.parseFloat(a.amount);
    } else if (sortOrder === "amount-asc") {
      return Number.parseFloat(a.amount) - Number.parseFloat(b.amount);
    }
    return 0;
  });

  if (isLoading) {
    <Skeleton className="h-24 w-full mb-4" />;
  }
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800 dark:text-green-400 hidden md:block">Receipts</h1>
        <AddReceiptButton />
      </div>

      <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
        <CardHeader>
          <CardTitle>All Receipts</CardTitle>
          <CardDescription>
            Browse and manage your waste tracking entries
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ReceiptFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {isLoading ? (
            <>
              <Skeleton className="h-24 w-full mb-4" />
              <Skeleton className="h-24 w-full mb-4" />
              <Skeleton className="h-24 w-full mb-4" />
              <Skeleton className="h-24 w-full mb-4" />
            </>
          ) : (
            <ReceiptList receipts={sortedReceipts} />
          )}
        </CardContent>
      </Card>
    </>
  );
}
