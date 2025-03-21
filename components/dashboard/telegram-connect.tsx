"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Check, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
const { useSession } = authClient;

export function TelegramConnect() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTelegramConnected, setIsTelegramConnected] = useState(false);

  const botUsername = process.env.NEXT_PUBLIC_BOT_USERNAME;
  const startParameter = process.env.NEXT_PUBLIC_START_PARAMETER;
  const { data: session, isPending, error } = useSession();
  const userId = session?.user?.id;

  const connectionToken = `${userId}${Date.now()}`;

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch("/api/telegram/check-connection", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.connected) {
          setIsTelegramConnected(true);
          setUsername(data.username);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error checking Telegram connection:", error);
        setIsLoading(false);
      }
    };
    checkConnection();
  }, []);

  const handleConnect = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("telegram_connection_token", connectionToken);
    }

    fetch("/api/telegram/initiate-connection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ connectionToken }),
    });

    const telegramDeepLink = `https://t.me/${botUsername}?start=${startParameter}_${connectionToken}`;
    window.open(telegramDeepLink, "_blank");

    const checkInterval = setInterval(async () => {
      try {
        const response = await fetch("/api/telegram/check-connection", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.connected) {
          setIsTelegramConnected(true);
          setUsername(data.username);
          clearInterval(checkInterval);
        }
      } catch (error) {
        console.error("Error checking connection status:", error);
      }
    }, 3000);

    setTimeout(() => clearInterval(checkInterval), 120000);
  };

  const handleDisconnect = async () => {
    try {
      await fetch("/api/telegram/disconnect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsTelegramConnected(false);
      setUsername("");
    } catch (error) {
      console.error("Error disconnecting Telegram:", error);
    }
  };

  if (isLoading) {
    return (
      <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm mb-6">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Skeleton className="h-10 w-10 rounded-full mr-4" />
            <div>
              <Skeleton className="h-5 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <Skeleton className="h-9 w-[100px]" />
        </CardContent>
      </Card>
    );
  }

  if (isTelegramConnected) {
    return (
      <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm mb-6 transition-all">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-green-100 p-3 rounded-full mr-4 sm:mr-5">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-700 flex items-center gap-2 dark:text-green-400 hidden md:block">
                Connected to Telegram
                <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full">
                  Active
                </span>
              </h3>
              <p className="text-sm text-gray-600 mt-1 flex items-center">
                <span className="font-medium">@{username}</span>
                <span className="mx-2 text-gray-400 sm:flex hidden">•</span>
                <span className="text-gray-500 sm:flex hidden">
                  Receiving notifications
                </span>
              </p>
            </div>
          </div>
          <Button
            onClick={handleDisconnect}
            variant="outline"
            className="border-red-200 hover:bg-red-50 hover:text-red-600 text-red-500 transition-colors"
          >
            Disconnect
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-blue-100 dark:border-green-900/30 shadow-sm mb-6 hover:border-blue-200 dark:hover:border-green-400 transition-all">
      <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="bg-blue-100 dark:bg-green-900/30 p-3 rounded-full mr-5">
            <MessageSquare className="h-6 w-6 text-blue-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-green-400">
              Connect Telegram Bot
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Get instant notifications and submit receipts via chat
            </p>
          </div>
        </div>  
        <Button
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center gap-2 px-5"
          onClick={handleConnect}
        >
          Connect <ExternalLink className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
