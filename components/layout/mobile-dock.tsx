"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, FileText, BarChart3, Leaf, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

export function MobileDock() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-green-100 dark:border-green-900/30 shadow-lg z-50 p-2 md:hidden"
    >
      <div className="flex justify-around items-center">
        {/* Home */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center p-2 ${
            pathname === "/dashboard" ? "bg-green-200 dark:bg-green-900" : ""
          }`}
        >
          <Home
            className={`h-6 w-6 ${
              pathname === "/dashboard"
                ? "text-green-800 dark:text-green-300"
                : "text-gray-600 dark:text-green-400"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              pathname === "/dashboard"
                ? "text-green-800 dark:text-green-300"
                : "text-gray-600 dark:text-green-400"
            }`}
          >
            Home
          </span>
        </Link>

        {/* Receipts */}
        <Link
          href="/dashboard/receipts"
          className={`flex flex-col items-center p-2 ${
            pathname === "/dashboard/receipts"
              ? "bg-green-200 dark:bg-green-900"
              : ""
          }`}
        >
          <FileText
            className={`h-6 w-6 ${
              pathname === "/dashboard/receipts"
                ? "text-green-800 dark:text-green-300"
                : "text-gray-600 dark:text-green-400"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              pathname === "/dashboard/receipts"
                ? "text-green-800 dark:text-green-300"
                : "text-gray-600 dark:text-green-400"
            }`}
          >
            Receipts
          </span>
        </Link>

        {/* Add Receipt */}
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-green-500 text-white border-green-400 shadow-md flex items-center justify-center"
          onClick={() => router.push("/add-receipt")}
        >
          <Plus className="h-6 w-6 text-white dark:text-green-400" />
        </Button>

        {/* Stats */}
        <Link
          href="/dashboard/statistics"
          className={`flex flex-col items-center p-2 ${
            pathname === "/dashboard/statistics"
              ? "bg-green-200 dark:bg-green-900"
              : ""
          }`}
        >
          <BarChart3
            className={`h-6 w-6 ${
              pathname === "/dashboard/statistics"
                ? "text-green-800 dark:text-green-300"
                : "text-gray-600 dark:text-green-400"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              pathname === "/dashboard/statistics"
                ? "text-green-800 dark:text-green-300"
                : "text-gray-600 dark:text-green-400"
            }`}
          >
            Stats
          </span>
        </Link>

        {/* Impact */}
        <Link
          href="/dashboard/impact"
          className={`flex flex-col items-center p-2 ${
            pathname === "/dashboard/impact"
              ? "bg-green-200 dark:bg-green-900"
              : ""
          }`}
        >
          <Leaf
            className={`h-6 w-6 ${
              pathname === "/dashboard/impact"
                ? "text-green-800 dark:text-green-300"
                : "text-gray-600 dark:text-green-400"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              pathname === "/dashboard/impact"
                ? "text-green-800 dark:text-green-300"
                : "text-gray-600 dark:text-green-400"
            }`}
          >
            Impact
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
