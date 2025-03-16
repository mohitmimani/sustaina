"use client";

import { useEffect, useMemo, useState } from "react";
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
import type { ReceiptWithItems } from "@/lib/schema/extended";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Item } from "@/prisma/generated/zod";
import { useItemStore } from "@/store/itemStore";

interface ReceiptListProps {
  receipts: ReceiptWithItems[];
  limit?: number;
}

export function ReceiptList({ receipts, limit }: ReceiptListProps) {
  const displayReceipts = limit ? receipts.slice(0, limit) : receipts;

  if (displayReceipts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <FileText className="h-12 w-12 text-gray-300 mb-2" />
        <p className="text-gray-500">No receipts found</p>
        <p className="text-sm text-gray-400">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {displayReceipts.map((receipt) => (
        <ReceiptItem key={receipt.id} receipt={receipt} />
      ))}
    </ul>
  );
}

function ReceiptItem({ receipt }: { receipt: ReceiptWithItems }) {
  const { items, setItems, updateItem } = useItemStore();
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    setItems(receipt.items);
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

  const toggleConsumedStatus = async (item: Item) => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="flex items-center justify-between p-3 rounded-lg bg-white border border-green-100 hover:border-green-200 transition-colors cursor-pointer">
          <div className="flex-grow">
            <p className="font-medium text-sm">{receipt.name}</p>
            <p className="text-xs text-gray-500">{receipt.date + ""}</p>
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

          <div className="flex items-center">
            <Badge
              className={`mr-2 ${
                receipt.type === "Recycle"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  : receipt.type === "Compost"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : receipt.type === "Landfill"
                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
              }`}
            >
              {receipt.type}
            </Badge>
          </div>
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{receipt.name}</DialogTitle>
          <DialogDescription>
            {receipt.date + ""} • Rs {receipt.amount}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Waste Breakdown</h4>
            <div className="flex items-center text-xs text-gray-500">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-16">Consumed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id || index}>
                  <TableCell className="flex items-center">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.weight}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        item.category === "Recycle"
                          ? "bg-blue-100 text-blue-800"
                          : item.category === "Compost"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {item.category}
                    </Badge>
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
                        <ToggleLeft className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button>Download PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
