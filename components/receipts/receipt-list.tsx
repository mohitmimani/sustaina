"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import {
  FileText,
  CheckCircle,
  XCircle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { downloadReceiptPDF, calculateWasteCost } from "@/lib/pdfGenerator"; // Import the PDF functions
import type { ItemWithoutId, ReceiptWithoutId } from "@/lib/schema/extended";

interface ReceiptListProps {
  receipts: ReceiptWithoutId[];
  limit?: number;
}

export function ReceiptList({ receipts, limit }: ReceiptListProps) {
  const displayReceipts = limit ? receipts.slice(0, limit) : receipts;

  if (displayReceipts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-2" />
        <p className="text-gray-500 dark:text-gray-400">No receipts found</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Try adjusting your filters
        </p>
      </div>
    );
  }
  console.log(displayReceipts);
  return (
    <ul className="space-y-3">
      {displayReceipts.map((receipt) => (
        <ReceiptItem key={receipt.id} receipt={receipt} />
      ))}
    </ul>
  );
}

function ReceiptItem({ receipt }: { receipt: ReceiptWithoutId }) {
  const [items, setItems] = useState<ItemWithoutId[]>([]);
  const updateItem = (updatedItem: ItemWithoutId) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };
  const [loading, setLoading] = useState<string | undefined | null>(undefined);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    setItems(receipt.items ?? []);
  }, [receipt.items, setItems]);

  // Calculate consumption stats - memoized to avoid recalculation on re-renders
  const consumptionStats = useMemo(() => {
    const totalItems = items.length;
    if (totalItems === 0) return { percent: 0, consumed: 0, total: 0 };

    const consumedItems = items.filter((item) => item.isConsumed).length;
    const percent = Math.round((consumedItems / totalItems) * 100);

    return {
      percent,
      consumed: consumedItems,
      total: totalItems,
    };
  }, [items]);

  // Calculate waste category breakdown
  const wasteCategoryBreakdown = useMemo(() => {
    const totalItems = items.length;
    if (totalItems === 0) return { RECYCLE: 0, COMPOST: 0, LANDFILL: 0 };

    const categories = {
      RECYCLE: 0,
      COMPOST: 0,
      LANDFILL: 0,
    };

    items.forEach((item) => {
      if (item.wasteCategory) {
        categories[item.wasteCategory]++;
      } else if (item.wasteCategory === "RECYCLE") {
        categories.RECYCLE++;
      } else if (item.wasteCategory === "COMPOST") {
        categories.COMPOST++;
      } else if (item.wasteCategory === "Landfill") {
        categories.LANDFILL++;
      }
    });

    return {
      RECYCLE: Math.round((categories.RECYCLE / totalItems) * 100),
      COMPOST: Math.round((categories.COMPOST / totalItems) * 100),
      LANDFILL: Math.round((categories.LANDFILL / totalItems) * 100),
    };
  }, [items]);

  const toggleConsumedStatus = async (item: ItemWithoutId) => {
    setLoading(item.id);
    try {
      const updatedItem = { ...item, isConsumed: !item.isConsumed };

      const response = await fetch(`/api/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) throw new Error("Failed to update item");

      updateItem(updatedItem);
    } catch (error) {
      console.error("Error toggling item status:", error);
    } finally {
      setLoading(null);
    }
  };

  // Function to handle PDF download
  const handleDownloadPDF = async () => {
    setDownloadingPDF(true);
    try {
      // Create a receipt object with the current state of items
      const receiptWithCurrentItems = {
        ...receipt,
        items: items,
      };

      await downloadReceiptPDF(receiptWithCurrentItems, headerRef);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setDownloadingPDF(false);
    }
  };

  // Calculate waste cost
  const wasteCost = useMemo(() => {
    return calculateWasteCost({
      ...receipt,
      items: items,
    });
  }, [receipt, items]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="flex flex-col p-3 rounded-lg bg-white dark:bg-gray-900 border border-green-100 dark:border-green-900/30 hover:border-green-200 dark:hover:border-green-800 transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex-grow">
              <p className="font-medium text-sm dark:text-gray-200">
                {receipt.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {receipt.date.toISOString().split("T")[0] + ""}
              </p>
            </div>

            {/* Consumption Status Indicator */}
            <div className="flex flex-col items-center mr-3 min-w-[60px]">
              <div className="flex items-center mb-1">
                <span className="text-xs font-medium mr-1">
                  {consumptionStats.percent}%
                </span>
                {consumptionStats.percent >= 50 ? (
                  <CheckCircle className="h-3 w-3 text-green-500" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500" />
                )}
              </div>
              <Progress
                value={consumptionStats.percent}
                className="h-1.5 w-full"
                indicatorClassName={
                  consumptionStats.percent >= 75
                    ? "bg-green-500"
                    : consumptionStats.percent >= 50
                    ? "bg-green-400"
                    : consumptionStats.percent >= 25
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }
              />
            </div>
          </div>

          {/* Waste Category Breakdown */}
          <div className="mt-3 space-y-1.5">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Waste Breakdown:
            </p>
            <div className="flex items-center gap-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${wasteCategoryBreakdown.RECYCLE}%` }}
                ></div>
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400 min-w-[30px]">
                {wasteCategoryBreakdown.RECYCLE}%
              </span>
              <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900">
                ♻️ Recycle
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${wasteCategoryBreakdown.COMPOST}%` }}
                ></div>
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 min-w-[30px]">
                {wasteCategoryBreakdown.COMPOST}%
              </span>
              <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900">
                🌱 Compost
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-gray-500 h-2.5 rounded-full"
                  style={{ width: `${wasteCategoryBreakdown.LANDFILL}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 min-w-[30px]">
                {wasteCategoryBreakdown.LANDFILL}%
              </span>
              <Badge className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900">
                🚮 Landfill
              </Badge>
            </div>
          </div>
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-10/12 overflow-auto max-h-screen dark:border-gray-700 dark:bg-gray-800">
        <div ref={headerRef}>
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">
              {receipt.name}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              {receipt.date.toISOString().split("T")[0] + ""} • Rs{" "}
              {receipt.amount}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Waste Cost: Rs {wasteCost.toFixed(2)}
            </span>
            <Badge
              className={
                receipt.type === "GROCERIES"
                  ? "bg-blue-100 text-blue-800"
                  : receipt.type === "ELECTRONICS"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {receipt.type}
            </Badge>
          </div>
        </div>
        <div className="py-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium dark:text-gray-200">
              Waste Breakdown
            </h4>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="mr-2">
                Consumed: {consumptionStats.consumed}/{consumptionStats.total}
              </span>
              <Progress
                value={consumptionStats.percent}
                className="h-1.5 w-16"
                indicatorClassName={
                  consumptionStats.percent >= 75
                    ? "bg-green-500"
                    : consumptionStats.percent >= 50
                    ? "bg-green-400"
                    : consumptionStats.percent >= 25
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }
              />
            </div>
          </div>

          {/* Waste Category Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            <div className="flex flex-col items-center p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                ♻️ Recyclable
              </span>
              <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
                {wasteCategoryBreakdown.RECYCLE}%
              </span>
              <span className="text-xs text-blue-500 dark:text-blue-400">
                {items.filter((i) => i.wasteCategory === "RECYCLE").length}{" "}
                items
              </span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-green-50 dark:bg-green-950/50">
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                🌱 Compostable
              </span>
              <span className="text-lg font-bold text-green-700 dark:text-green-300">
                {wasteCategoryBreakdown.COMPOST}%
              </span>
              <span className="text-xs text-green-500 dark:text-green-400">
                {items.filter((i) => i.wasteCategory === "COMPOST").length}{" "}
                items
              </span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                🚮 Landfill
              </span>
              <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                {wasteCategoryBreakdown.LANDFILL}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {items.filter((i) => i.wasteCategory === "LANDFILL").length}{" "}
                items
              </span>
            </div>
          </div>

          <Table className="dark:text-gray-200">
            <TableHeader>
              <TableRow className="dark:border-gray-700">
                <TableHead>Item</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead className="w-16">Consumed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => {
                // Check if item is expired
                const isExpired =
                  item.expiry && new Date(item.expiry + "") < new Date();

                return (
                  <TableRow
                    key={item.id || index}
                    className={
                      isExpired
                        ? "bg-red-50 dark:bg-red-950/30"
                        : "dark:border-gray-700"
                    }
                  >
                    <TableCell className="flex items-center space-x-2">
                      <span className="font-medium">{item.name}</span>
                      {item.quantity && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          x {item.quantity}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{item.weight || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          item.wasteCategory === "RECYCLE"
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300"
                            : item.wasteCategory === "COMPOST"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                        }
                      >
                        {item.wasteCategory}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.expiry ? (
                        <span
                          className={
                            isExpired
                              ? "text-red-600 dark:text-red-400 font-medium"
                              : ""
                          }
                        >
                          {new Date(item.expiry + "").toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      <div
                        className={cn(
                          "flex items-center justify-center cursor-pointer",
                          loading === item.id && "opacity-50 cursor-wait"
                        )}
                        onClick={() => !loading && toggleConsumedStatus(item)}
                      >
                        {item.isConsumed ? (
                          <ToggleRight className="h-6 w-6 text-green-500" />
                        ) : (
                          <ToggleLeft className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button onClick={handleDownloadPDF} disabled={downloadingPDF}>
            {downloadingPDF ? "Generating..." : "Download PDF"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
