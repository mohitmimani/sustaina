"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Leaf,
  Send,
  Recycle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import {
  ReceiptWithoutId,
  ReceiptWithoutIdSchema,
} from "@/lib/schema/extended";
import { ReceiptList } from "../receipts/receipt-list";
import { useQuery } from "@tanstack/react-query";
import { Item } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { AddReceiptButton } from "../receipts/add-receipt-button";
import { motion, AnimatePresence } from "motion/react";

export default function EcoChat() {
  const [showReceiptPanel, setShowReceiptPanel] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const fetchReceipts = async (): Promise<ReceiptWithoutId[]> => {
    const response = await fetch("/api/receipts");
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return data.map(
      (item: Item) => ReceiptWithoutIdSchema.safeParse(item).data
    );
  };

  const { data: receipts = [], isLoading: isLoadingReceipts } = useQuery({
    queryKey: ["receipts"],
    queryFn: fetchReceipts,
    staleTime: 0,
    refetchOnMount: true,
  });

  const toggleReceiptPanel = () => {
    setShowReceiptPanel(!showReceiptPanel);
  };

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chat",
      initialMessages: [
        {
          id: "welcome-message",
          role: "assistant",
          content:
            "Hi there! I'm your eco assistant. I can help with sustainable waste management and suggest recipes based on your receipts. Click on any receipt to get personalized suggestions!",
        },
        {
          id: "system-prompt",
          role: "system",
          content: `You are an eco-friendly assistant specialized in waste management and sustainability.
Help users track their waste receipts and provide tips on reducing waste, recycling properly,
and living more sustainably. Be informative, encouraging, and practical.

When users mention specific items they've purchased or disposed of, provide information on:
1. How to properly recycle or dispose of the item
2. Eco-friendly alternatives if applicable
3. Environmental impact of the item

Always maintain a positive, supportive tone and encourage sustainable choices.

Purchased item : ${JSON.stringify(receipts)}

Don't expicitly mention the receipt,items unless mentioned.`,
        },
      ],
      onFinish: () => setIsTyping(false),
    });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(true);
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col lg:h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-4rem)] overflow-hidden justify-start items-start p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="flex items-center gap-4 mb-4 w-full">
        <AddReceiptButton />
        <Button
          variant="ghost"
          className="lg:hidden ml-auto hover:bg-green-100 transition-colors"
          onClick={toggleReceiptPanel}
        >
          {showReceiptPanel ? <ChevronLeft /> : <ChevronRight />}
          <span className="ml-2">
            {showReceiptPanel ? "Hide" : "Show"} Receipts
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0 w-full">
        <AnimatePresence mode="wait">
          {(showReceiptPanel || window.innerWidth >= 768) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="py-0 flex flex-col overflow-hidden border-green-200 shadow-lg h-full bg-white/80 backdrop-blur-sm">
                <CardHeader className="py-3 px-4 bg-gradient-to-r from-green-100 to-green-50">
                  <div className="flex items-center text-green-800 font-medium">
                    <Recycle className="h-4 w-4 mr-2" />
                    Your Receipts
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full p-4">
                    {isLoadingReceipts ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-green-600" />
                      </div>
                    ) : receipts.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-sm text-muted-foreground">
                          No receipts yet. Add or upload a receipt to get
                          started.
                        </p>
                      </div>
                    ) : (
                      <ReceiptList receipts={receipts} />
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <Card
          className={cn(
            "flex flex-col overflow-hidden border-green-200 shadow-lg bg-white/80 backdrop-blur-sm py-0",
            showReceiptPanel ? "lg:col-span-3" : "col-span-full"
          )}
        >
          <CardHeader className="py-3 px-4 bg-gradient-to-r from-green-100 to-green-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-green-800 font-medium">
                <Leaf className="h-4 w-4 mr-2" />
                Eco Assistant
              </div>
            </div>
          </CardHeader>

          <CardContent
            className="flex-1 p-0 overflow-hidden"
            ref={chatContainerRef}
          >
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                <AnimatePresence>
                  {messages.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-8"
                    >
                      <Leaf className="h-12 w-12 mx-auto text-green-300 mb-3" />
                      <p className="text-muted-foreground">
                        Ask me about eco-friendly waste management or select a
                        receipt for personalized suggestions!
                      </p>
                    </motion.div>
                  ) : (
                    messages.map(
                      (message) =>
                        message.role !== "system" && (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              "flex",
                              message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                            )}
                          >
                            <div
                              className={cn(
                                "max-w-[80%] rounded-lg px-4 py-2 shadow-sm",
                                message.role === "user"
                                  ? "bg-gradient-to-r from-green-600 to-green-500 text-white"
                                  : "bg-white text-gray-800"
                              )}
                            >
                              <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                          </motion.div>
                        )
                    )
                  )}
                </AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center"
                  >
                    <div className="max-w-[80%] rounded-lg px-4 py-2 bg-red-100 text-red-800">
                      <p>Something went wrong. Please try again.</p>
                    </div>
                  </motion.div>
                )}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-green-600"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-t">
            <form onSubmit={handleFormSubmit} className="flex gap-2 w-full">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about eco-friendly waste management..."
                className="flex-1 border-green-200 focus-visible:ring-green-500 bg-white/80"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
