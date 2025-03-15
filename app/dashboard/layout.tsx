"use client";

import { ReactNode, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileDock } from "@/components/layout/mobile-dock";
import { Header } from "@/components/layout/header";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const { useSession } = authClient;

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const { data: session, isPending, error } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (session === null && !isPending) {
      router.push("/login");
    }
  }, [session, router, isPending]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error.message}
      </div>
    );
  }
  if (session === null) {
    return null;
  }
  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Mobile Dock */}
      {isMobile && <MobileDock />}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden ${
          isMobile ? "pb-20" : ""
        }`}
      >
        {/* Header */}
        <Header
          session={session}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
