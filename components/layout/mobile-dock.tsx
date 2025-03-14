"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, FileText, BarChart3, Leaf, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function MobileDock() {
  const router = useRouter()

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-green-100 shadow-lg z-50 p-2 md:hidden"
    >
      <div className="flex justify-around items-center">
        <Link href="/dashboard" className="flex flex-col items-center p-2 text-green-800">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/receipts" className="flex flex-col items-center p-2 text-gray-600">
          <FileText className="h-6 w-6" />
          <span className="text-xs mt-1">Receipts</span>
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-green-500 text-white border-green-400 shadow-md flex items-center justify-center"
          onClick={() => router.push("/add-receipt")}
        >
          <Plus className="h-6 w-6" />
        </Button>
        <Link href="/statistics" className="flex flex-col items-center p-2 text-gray-600">
          <BarChart3 className="h-6 w-6" />
          <span className="text-xs mt-1">Stats</span>
        </Link>
        <Link href="/impact" className="flex flex-col items-center p-2 text-gray-600">
          <Leaf className="h-6 w-6" />
          <span className="text-xs mt-1">Impact</span>
        </Link>
      </div>
    </motion.div>
  )
}

