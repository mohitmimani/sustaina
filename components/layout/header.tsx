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
    <header className="bg-white/70 backdrop-blur-md border-b border-green-100 shadow-sm p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="mr-4"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-bold text-green-800 hidden md:block">
            Eco-Friendly Waste Receipt Tracker
          </h1>
          <h1 className="text-lg font-bold text-green-800 md:hidden">
            Sustaina
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Badge
            variant="outline"
            className="bg-green-100/50 text-green-800 border-green-200 hidden sm:flex"
          >
            <Leaf className="h-3 w-3 mr-1" />
            Eco Level: Advanced
          </Badge>
          <Avatar>
            <AvatarImage
              src={session?.user.image || ""}
              alt={session?.user.name}
            />
            <AvatarFallback className="bg-green-100 text-green-800">
              {session?.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
