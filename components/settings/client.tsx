"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountCardsGrid } from "@/components/settings/account-cards";
import { ThemeCard } from "@/components/settings/theme-card";
import { NotificationCard } from "@/components/settings/notification-card";
import { PrivacyCard } from "@/components/settings/privacy-card";
import { containerVariants } from "@/components/settings/settings-variants";

const { useSession } = authClient;
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { theme, setTheme } = useTheme();

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Settings</h1>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 h-14">
            <TabsTrigger value="account" className="text-base py-3">
              Account
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-base py-3">
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-base py-3">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="text-base py-3">
              Privacy
            </TabsTrigger>
          </TabsList>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Account Settings */}
            <TabsContent value="account" className="mt-0">
              <AccountCardsGrid
                userName={session?.user?.name || undefined}
                userEmail={session?.user?.email || undefined}
              />
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance" className="mt-0">
              <ThemeCard theme={theme || "light"} toggleTheme={toggleTheme} />
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications" className="mt-0">
              <NotificationCard />
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy" className="mt-0">
              <PrivacyCard />
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
}
