"use client"

import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Receipt } from "@/types/receipt"

interface ReceiptListProps {
  receipts: Receipt[]
  limit?: number
}

export function ReceiptList({ receipts, limit }: ReceiptListProps) {
  const displayReceipts = limit ? receipts.slice(0, limit) : receipts

  if (displayReceipts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <FileText className="h-12 w-12 text-gray-300 mb-2" />
        <p className="text-gray-500">No receipts found</p>
        <p className="text-sm text-gray-400">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {displayReceipts.map((receipt) => (
        <Dialog key={receipt.id}>
          <DialogTrigger asChild>
            <li className="flex items-center justify-between p-2 rounded-lg bg-white border border-green-100 hover:border-green-200 transition-colors cursor-pointer">
              <div>
                <p className="font-medium text-sm">{receipt.name}</p>
                <p className="text-xs text-gray-500">{receipt.date}</p>
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
                <span className="text-sm font-medium">{receipt.amount}</span>
              </div>
            </li>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{receipt.name}</DialogTitle>
              <DialogDescription>
                {receipt.date} • {receipt.amount} total waste
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <h4 className="text-sm font-medium mb-2">Waste Breakdown</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receipt.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <DialogFooter>
              <Button variant="outline">Edit</Button>
              <Button>Download PDF</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </ul>
  )
}

