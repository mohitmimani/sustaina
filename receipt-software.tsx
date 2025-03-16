"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Printer, Save } from "lucide-react"
import Barcode from "react-barcode"

// Receipt Data Types
interface Item {
  id: number
  name: string
  price: number
  quantity: number
  expiryDate?: string // Optional expiry date for the product
}

interface ReceiptData {
  id: string
  items: Item[]
  subtotal: number
  tax: number
  total: number
  date: Date
  expiryDate: Date // Stored but not displayed on receipt
}

// Utility Functions
const saveReceipt = (receiptData: ReceiptData): void => {
  // In a real app, this would save to a database or localStorage
  const receipts = getReceipts()
  receipts.push(receiptData)
  localStorage.setItem("receipts", JSON.stringify(receipts))
}

const getReceipts = (): ReceiptData[] => {
  if (typeof window === "undefined") return []

  const receiptsJson = localStorage.getItem("receipts")
  if (!receiptsJson) return []

  try {
    const receipts = JSON.parse(receiptsJson)
    // Convert string dates back to Date objects
    return receipts.map((receipt: any) => ({
      ...receipt,
      date: new Date(receipt.date),
      expiryDate: new Date(receipt.expiryDate),
    }))
  } catch (error) {
    console.error("Error parsing receipts:", error)
    return []
  }
}

const isReceiptExpired = (receiptId: string): boolean => {
  const receipts = getReceipts()
  const receipt = receipts.find((r) => r.id === receiptId)

  if (!receipt) return true // If receipt not found, consider it expired

  const now = new Date()
  return now > receipt.expiryDate
}

const generateReceiptId = (): string => {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `${timestamp}${random}`.substring(0, 12)
}

// Receipt Generator Component
function ReceiptGenerator({ items }: { items: Item[] }) {
  const [receiptId, setReceiptId] = useState("")
  const [expiryDate, setExpiryDate] = useState<Date>()

  // Generate a unique receipt ID and set expiry date (30 days from now)
  useEffect(() => {
    setReceiptId(generateReceiptId())

    // Set expiry date to 30 days from now (stored but not displayed)
    const today = new Date()
    const expiry = new Date()
    expiry.setDate(today.getDate() + 30)
    setExpiryDate(expiry)
  }, [])

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.07 // Assuming 7% tax
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  // Fixed width of 76mm (approximately 287px at 96 DPI)
  const receiptWidth = "76mm"

  return (
    <div
      className="bg-white mx-auto font-mono text-sm print:text-xs border border-gray-200 shadow-sm print:shadow-none print:border-none"
      style={{
        width: receiptWidth,
        maxWidth: "100%",
      }}
    >
      <div className="p-2 print:p-1 space-y-2 print:space-y-1">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-bold text-lg print:text-base">SUPERMARKET</h1>
          <p className="text-xs print:text-[10px]">VIT Bhopal, Madhya Pradesh 466114</p>
          <p className="text-xs print:text-[10px]">Tel: (+91) XXX-XXX-XXXX0</p>
          <div className="border-t border-b border-dashed my-1 print:my-0.5"></div>
        </div>

        {/* Receipt Info */}
        <div className="text-xs print:text-[10px]">
          <p>Receipt #: {receiptId}</p>
          <p>Date: {format(new Date(), "MM/dd/yyyy HH:mm:ss")}</p>
          <p>Cashier: STAFF001</p>
          <div className="border-b border-dashed my-1 print:my-0.5"></div>
        </div>

        {/* Items */}
        <div>
          <table className="w-full text-xs print:text-[10px]">
            <thead>
              <tr>
                <th className="text-left">ITEM</th>
                <th className="text-right">QTY</th>
                <th className="text-right">PRICE</th>
                <th className="text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="text-left">{item.name}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">${item.price.toFixed(2)}</td>
                  <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-b border-dashed my-1 print:my-0.5"></div>
        </div>

        {/* Totals */}
        <div className="space-y-0.5">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (7%):</span>
            <span>${calculateTax().toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>TOTAL:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="border-b border-dashed my-1 print:my-0.5"></div>
        </div>

        {/* Payment Method */}
        <div className="space-y-0.5">
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span>CASH</span>
          </div>
          <div className="flex justify-between">
            <span>Amount Paid:</span>
            <span>${Math.ceil(calculateTotal()).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Change:</span>
            <span>${(Math.ceil(calculateTotal()) - calculateTotal()).toFixed(2)}</span>
          </div>
          <div className="border-b border-dashed my-1 print:my-0.5"></div>
        </div>

        {/* Barcode */}
        <div className="flex justify-center">
          <Barcode value={receiptId} width={1.2} height={40} fontSize={10} margin={0} displayValue={true} />
        </div>

        {/* Footer */}
        <div className="text-center text-xs print:text-[10px]">
          <p>Thank you for shopping with us!</p>
          <p>Please keep your receipt for returns</p>
          <p>www.supermarket.com</p>
        </div>
      </div>
    </div>
  )
}

// Main Application Component
export default function ReceiptApp() {
  const [items, setItems] = useState([
    { id: 101, name: "Harry Potter", price: 999.99, quantity: 1, expiryDate: "2025-12-31" },
  ])
  const [newItem, setNewItem] = useState({ name: "", price: "", quantity: "1", expiryDate: "" })

  const addItem = () => {
    if (newItem.name && newItem.price) {
      setItems([
        ...items,
        {
          id: Date.now(),
          name: newItem.name,
          price: Number.parseFloat(newItem.price),
          quantity: Number.parseInt(newItem.quantity) || 1,
          expiryDate: newItem.expiryDate || undefined,
        },
      ])
      setNewItem({ name: "", price: "", quantity: "1", expiryDate: "" })
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const printReceipt = () => {
    window.print()
  }

  const saveReceiptData = () => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.07
    const total = subtotal + tax

    const today = new Date()
    const expiry = new Date()
    expiry.setDate(today.getDate() + 30)

    const receiptData: ReceiptData = {
      id: generateReceiptId(),
      items: [...items],
      subtotal,
      tax,
      total,
      date: today,
      expiryDate: expiry,
    }

    saveReceipt(receiptData)
    alert("Receipt saved successfully!")
  }

  const isProductExpired = (expiryDate?: string): boolean => {
    if (!expiryDate) return false
    const now = new Date()
    const expiry = new Date(expiryDate)
    return now > expiry
  }

  return (
    <main className="container mx-auto p-4 grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Receipt Generator</CardTitle>
          <CardDescription>Add items to generate a receipt</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-5">
                <Label htmlFor="item-name">Item Name</Label>
                <Input
                  id="item-name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Product name"
                />
              </div>
              <div className="col-span-3">
                <Label htmlFor="item-price">Price</Label>
                <Input
                  id="item-price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="item-qty">Qty</Label>
                <Input
                  id="item-qty"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  placeholder="1"
                  type="number"
                  min="1"
                />
              </div>
              <div className="col-span-5">
                <Label htmlFor="item-expiry">Expiry Date</Label>
                <Input
                  id="item-expiry"
                  value={newItem.expiryDate}
                  onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                  placeholder="YYYY-MM-DD"
                  type="date"
                />
              </div>
              <div className="col-span-2 flex items-end">
                <Button onClick={addItem} className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>

            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Item</th>
                    <th className="text-right p-2">Qty</th>
                    <th className="text-right p-2">Price</th>
                    <th className="text-right p-2">Total</th>
                    <th className="text-center p-2">Status</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2">{item.name}</td>
                      <td className="text-right p-2">{item.quantity}</td>
                      <td className="text-right p-2">${item.price.toFixed(2)}</td>
                      <td className="text-right p-2">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="text-center p-2">
                        {item.expiryDate && (
                          <span className={isProductExpired(item.expiryDate) ? "text-red-500" : "text-green-500"}>
                            {isProductExpired(item.expiryDate) ? "Expired" : "Valid"}
                          </span>
                        )}
                      </td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="h-8 w-8 p-0">
                          ×
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={printReceipt}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button onClick={saveReceiptData}>
                <Save className="h-4 w-4 mr-2" />
                Save Receipt
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="print:w-full">
        <ReceiptGenerator items={items} />
      </div>
    </main>
  )
}

