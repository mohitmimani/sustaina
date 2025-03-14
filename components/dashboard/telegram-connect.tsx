"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare } from "lucide-react"

interface TelegramConnectProps {
  isTelegramConnected: boolean
  setIsTelegramConnected: (connected: boolean) => void
}

export function TelegramConnect({ isTelegramConnected, setIsTelegramConnected }: TelegramConnectProps) {
  const { toast } = useToast()

  const connectTelegram = () => {
    setIsTelegramConnected(true)
    toast({
      title: "Telegram Bot Connected",
      description: "You can now receive updates and submit receipts via Telegram.",
    })
  }

  if (isTelegramConnected) {
    return null
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
            <p className="text-sm text-gray-500">Receive updates and submit receipts via Telegram</p>
          </div>
        </div>
        <Button
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          onClick={connectTelegram}
        >
          Connect Now
        </Button>
      </CardContent>
    </Card>
  )
}

