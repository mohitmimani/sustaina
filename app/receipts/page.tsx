"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileDock } from "@/components/layout/mobile-dock";
import { Header } from "@/components/layout/header";
import { ReceiptFilters } from "@/components/receipts/receipt-filters";
import { ReceiptList } from "@/components/receipts/receipt-list";

const { useSession } = authClient;

// Mock data for receipts
const receipts = [
  {
    id: 1,
    name: "Grocery Store",
    date: "May 15, 2023",
    amount: "12.5kg",
    type: "Mixed",
    items: [
      { name: "Plastic packaging", weight: "3.2kg", category: "Recycle" },
      { name: "Food waste", weight: "5.1kg", category: "Compost" },
      { name: "Paper bags", weight: "2.7kg", category: "Recycle" },
      { name: "Non-recyclables", weight: "1.5kg", category: "Landfill" },
    ],
  },
  {
    id: 2,
    name: "Farmers Market",
    date: "May 12, 2023",
    amount: "8.2kg",
    type: "Compost",
    items: [
      { name: "Vegetable scraps", weight: "4.5kg", category: "Compost" },
      { name: "Fruit peels", weight: "3.7kg", category: "Compost" },
    ],
  },
  {
    id: 3,
    name: "Electronics Store",
    date: "May 10, 2023",
    amount: "5.7kg",
    type: "Recycle",
    items: [
      { name: "Cardboard boxes", weight: "3.2kg", category: "Recycle" },
      { name: "Plastic packaging", weight: "1.8kg", category: "Recycle" },
      { name: "Styrofoam", weight: "0.7kg", category: "Landfill" },
    ],
  },
  {
    id: 4,
    name: "Department Store",
    date: "May 5, 2023",
    amount: "3.1kg",
    type: "Landfill",
    items: [
      {
        name: "Non-recyclable plastics",
        weight: "2.1kg",
        category: "Landfill",
      },
      { name: "Mixed materials", weight: "1.0kg", category: "Landfill" },
    ],
  },
  {
    id: 5,
    name: "Coffee Shop",
    date: "May 3, 2023",
    amount: "1.2kg",
    type: "Recycle",
    items: [
      { name: "Paper cups", weight: "0.8kg", category: "Recycle" },
      { name: "Plastic lids", weight: "0.4kg", category: "Recycle" },
    ],
  },
  {
    id: 6,
    name: "Restaurant",
    date: "May 1, 2023",
    amount: "4.5kg",
    type: "Compost",
    items: [
      { name: "Food waste", weight: "3.5kg", category: "Compost" },
      { name: "Paper napkins", weight: "1.0kg", category: "Compost" },
    ],
  },
  {
    id: 7,
    name: "Hardware Store",
    date: "April 28, 2023",
    amount: "7.8kg",
    type: "Mixed",
    items: [
      { name: "Cardboard", weight: "5.2kg", category: "Recycle" },
      { name: "Plastic packaging", weight: "1.8kg", category: "Recycle" },
      { name: "Misc waste", weight: "0.8kg", category: "Landfill" },
    ],
  },
  {
    id: 8,
    name: "Bookstore",
    date: "April 25, 2023",
    amount: "2.3kg",
    type: "Recycle",
    items: [
      { name: "Paper bags", weight: "1.5kg", category: "Recycle" },
      { name: "Receipts", weight: "0.3kg", category: "Recycle" },
      { name: "Plastic wrapping", weight: "0.5kg", category: "Recycle" },
    ],
  },
];

export default function ReceiptsPage() {
  const isMobile = useIsMobile();
  const { data: session, isPending, error } = useSession();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState("date-desc");

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  // Filter and sort receipts
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

  // Sort receipts
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

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Mobile Dock */}
      {isMobile && <MobileDock />}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden ${
          isMobile ? "pb-20" : ""
        }`}
      >
        {/* Header */}
        <Header
          session={session}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Receipts Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-green-800">Receipts</h1>
            <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Receipt
            </Button>
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

              <ReceiptList receipts={sortedReceipts} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
