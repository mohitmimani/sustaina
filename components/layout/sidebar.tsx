"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  BarChart3,
  Leaf,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const router = useRouter();
  return (
    <AnimatePresence>
      {(isSidebarOpen || !isMobile) && (
        <motion.div
          initial={{ x: -20, opacity: 0.8 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-white/80 backdrop-blur-md border-r border-green-100 shadow-sm transition-all duration-300 flex flex-col ${
            isMobile ? "fixed z-40 h-full" : ""
          }`}
        >
          <div className="p-4 border-b border-green-100 flex items-center justify-center">
            <div
              className={`flex items-center ${
                isSidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Leaf className="h-8 w-8 text-emerald-500 mr-2" />

              {isSidebarOpen && (
                <span className="font-bold text-green-800 text-xl">
                  Sustaina
                </span>
              )}
            </div>
            {isMobile && isSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className={`flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100/50 transition-colors ${
                    pathname === "/dashboard" ? "bg-green-100" : ""
                  }`}
                >
                  <Home className="h-5 w-5 mr-3" />
                  {isSidebarOpen && <span>Dashboard</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/receipts"
                  className={`flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100/50 transition-colors ${
                    pathname === "/dashboard/receipts" ? "bg-green-100" : ""
                  }`}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  {isSidebarOpen && <span>Receipts</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/statistics"
                  className={`flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100/50 transition-colors ${
                    pathname === "/dashboard/statistics" ? "bg-green-100" : ""
                  }`}
                >
                  <BarChart3 className="h-5 w-5 mr-3" />
                  {isSidebarOpen && <span>Statistics</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/impact"
                  className={`flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100/50 transition-colors ${
                    pathname === "/dashboard/impact" ? "bg-green-100" : ""
                  }`}
                >
                  <Leaf className="h-5 w-5 mr-3" />
                  {isSidebarOpen && <span>Environmental Impact</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className={`flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100/50 transition-colors ${
                    pathname === "/dashboard/settings" ? "bg-green-100" : ""
                  }`}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  {isSidebarOpen && <span>Settings</span>}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t border-green-100">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-red-100/50 hover:text-red-700"
              onClick={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login"); // redirect to login page
                    },
                  },
                });
              }}
            >
              <LogOut className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>Logout</span>}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
