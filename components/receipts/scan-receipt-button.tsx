"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ReceiptWithoutId } from "@/lib/schema/extended";

interface ScanReceiptButtonProps {
  onScanComplete: (data: ReceiptWithoutId) => void;
}

export function ScanReceiptButton({ onScanComplete }: ScanReceiptButtonProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setProgress(10);

    try {
      // Create form data to send the image
      const formData = new FormData();
      formData.append("receipt", file);

      setProgress(30);

      // Send to our API endpoint
      const response = await fetch("/api/scan-receipt", {
        method: "POST",
        body: formData,
      });

      setProgress(70);

      if (!response.ok) {
        throw new Error("Failed to scan receipt");
      }

      const data = await response.json();
      setProgress(100);

      // Pass the extracted data back to the parent component
      onScanComplete(data);

      toast({
        title: "Receipt scanned successfully",
        description: "The receipt data has been extracted.",
      });
    } catch (error) {
      console.error("Error scanning receipt:", error);
      toast({
        title: "Error scanning receipt",
        description:
          "Failed to scan receipt. Please try again or enter details manually.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
      setProgress(0);
      // Reset the file input
      e.target.value = "";
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        id="receipt-upload"
        accept="image/*"
        capture="environment"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
        disabled={isScanning}
      />
      <Button
        type="button"
        variant="outline"
        className={`w-full ${isScanning ? "opacity-70" : ""}`}
        disabled={isScanning}
      >
        <Scan className="mr-2 h-4 w-4" />
        {isScanning ? "Scanning..." : "Scan Receipt"}
      </Button>
      {isScanning && <Progress value={progress} className="h-1 mt-2" />}
    </div>
  );
}
