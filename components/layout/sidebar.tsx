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
          } bg-muted text-muted-foreground backdrop-blur-md border-r border-muted/30 shadow-sm transition-all duration-300 flex flex-col ${
            isMobile ? "fixed z-40 h-full" : ""
          }`}
        >
          <div className="p-4 border-b border-green-100 dark:border-green-900/30 flex items-center justify-center">
            <div
              className={`flex items-center ${
                isSidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Leaf className="h-8 w-8 text-emerald-500 dark:text-green-400 mr-2" />
              {isSidebarOpen && (
                <span className="font-bold text-green-800 dark:text-green-400 text-xl">
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
              {[
                { href: "/dashboard", icon: Home, label: "Dashboard" },
                { href: "/dashboard/receipts", icon: FileText, label: "Receipts" },
                { href: "/dashboard/statistics", icon: BarChart3, label: "Statistics" },
                { href: "/dashboard/impact", icon: Leaf, label: "Environmental Impact" },
                { href: "/dashboard/settings", icon: Settings, label: "Settings" },
              ].map(({ href, icon: Icon, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors ${
                      pathname === href ? "bg-green-100 dark:bg-green-900/30" : ""
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {isSidebarOpen && <span>{label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-green-100 dark:border-green-900/30">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-400 hover:bg-red-100/50 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-500"
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
