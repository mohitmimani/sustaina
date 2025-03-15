"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TelegramConnectProps {
  isTelegramConnected: boolean;
  setIsTelegramConnected: (connected: boolean) => void;
}

export function TelegramConnect({
  isTelegramConnected,
  setIsTelegramConnected,
}: TelegramConnectProps) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const botUsername = "Sustaina_Bot";
  const startParameter = "connectSustaina";
  const userId = localStorage.getItem("sustaina_user_id") || "";
  const connectionToken = `${userId}_${Date.now()}`;

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
  }, [setIsTelegramConnected]);

  const handleConnect = () => {
    localStorage.setItem("telegram_connection_token", connectionToken);

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
      <div className="connected-status">
        <div className="status-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="check-icon"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Connected to Telegram
        </div>
        <p>Receiving notifications as: @{username}</p>
        <Button onClick={handleDisconnect} className="disconnect-button">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm mb-6">
      <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="bg-blue-100 p-2 rounded-full mr-4">
            <MessageSquare className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium">Connect Telegram Bot</h3>
            <p className="text-sm text-gray-500">
              Receive updates and submit receipts via Telegram
            </p>
          </div>
        </div>
        <Button
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          onClick={handleConnect}
        >
          Connect Now
        </Button>
      </CardContent>
    </Card>
  );
}
