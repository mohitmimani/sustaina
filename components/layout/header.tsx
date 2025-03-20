"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Leaf, Menu } from "lucide-react";
import { User, Session } from "better-auth";

interface HeaderProps {
  session: {
    user: User;
    session: Session;
  } | null;
  isMobile: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export function Header({
  session,
  isMobile,
  isSidebarOpen,
  setIsSidebarOpen,
}: HeaderProps) {
  return (
    <header className="bg-white/70 dark:bg-slate-900 backdrop-blur-md border-b border-green-100 dark:border-green-900/30 shadow-sm p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4"
            >
              <Menu className="h-5 w-5 dark:text-gray-300" />
            </Button>
          )}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="mr-4"
            >
              <Menu className="h-5 w-5 dark:text-gray-300" />
            </Button>
          )}
          <h1 className="text-xl font-bold text-green-800 dark:text-green-400 hidden md:block">
            Eco-Friendly Waste Receipt Tracker
          </h1>
          <h1 className="text-lg font-bold text-green-800 dark:text-green-400 md:hidden">
            Sustaina
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Badge
            variant="outline"
            className="bg-green-100/50 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-900/30 hidden sm:flex"
          >
            <Leaf className="h-3 w-3 mr-1 dark:text-green-400" />
            Eco Level: Advanced
          </Badge>
          <Avatar>
            <AvatarImage
              src={session?.user.image || ""}
              alt={session?.user.name}
            />
            <AvatarFallback className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400">
              {session?.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
