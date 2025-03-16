import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { ReceiptWithItems } from "@/lib/schema/extended";

/**
 * Calculates the total cost of waste based on consumed and expired items
 * @param receipt The receipt with items to calculate waste cost for
 * @returns The total cost of waste
 */
export const calculateWasteCost = (receipt: ReceiptWithItems): number => {
  return receipt.items.reduce((total, item) => {
    // Only count items that are either consumed or expired
    if (
      item.isConsumed ||
      (item.expiry && new Date(item.expiry).getTime() < Date.now())
    ) {
      // Use the item's cost if available, otherwise use weight as a proxy for cost
      const itemCost = item.price || item.weight;
      return total + (typeof itemCost === "number" ? itemCost : 0);
    }
    return total;
  }, 0);
};

/**
 * Generates and downloads a beautifully formatted PDF for a receipt and its items
 * @param receipt The receipt with items to generate PDF for
 * @param elementRef Optional ref to a DOM element to include as header (e.g., a logo)
 */
export const downloadReceiptPDF = async (
  receipt: ReceiptWithItems,
  elementRef?: React.RefObject<HTMLDivElement> | null
) => {
  try {
    // Create new PDF document in portrait, A4 format
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // PDF dimensions
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    // Add title and date
    pdf.setFontSize(22);
    pdf.setTextColor(44, 62, 80); // Dark blue-gray
    pdf.text(receipt.name, margin, margin + 10);

    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    const dateText = `Date: ${new Date(receipt.date).toLocaleDateString()}`;
    pdf.text(dateText, margin, margin + 20);

    // Calculate total waste cost
    const wasteCost = calculateWasteCost(receipt);

    // Receipt type and amount
    pdf.setFontSize(14);
    pdf.setTextColor(44, 62, 80);
    pdf.text(`Type: ${receipt.type}`, margin, margin + 30);
    pdf.text(`Total Waste: ${receipt.amount}`, margin, margin + 40);
    pdf.text(
      `Total Waste Cost: Rs. ${wasteCost.toFixed(2)}`,
      margin,
      margin + 50
    );

    // Calculate consumption stats
    const totalItems = receipt.items.length;
    const consumedItems = receipt.items.filter(
      (item) => item.isConsumed
    ).length;
    const expiredItems = receipt.items.filter(
      (item) => item.expiry && new Date(item.expiry).getTime() < Date.now()
    ).length;
    const consumptionPercent =
      totalItems > 0 ? Math.round((consumedItems / totalItems) * 100) : 0;

    pdf.text(`Consumption Rate: ${consumptionPercent}%`, margin, margin + 60);
    pdf.text(`Expired Items: ${expiredItems}`, margin, margin + 70);

    // Draw progress bar for consumption
    const barWidth = 100;
    const barHeight = 5;
    const barX = margin;
    const barY = margin + 75;

    // Background bar
    pdf.setFillColor(220, 220, 220);
    pdf.rect(barX, barY, barWidth, barHeight, "F");

    // Progress indicator
    const progressColor =
      consumptionPercent >= 75
        ? [39, 174, 96] // green
        : consumptionPercent >= 50
        ? [46, 204, 113] // lighter green
        : consumptionPercent >= 25
        ? [241, 196, 15] // yellow
        : [231, 76, 60]; // red

    pdf.setFillColor(progressColor[0], progressColor[1], progressColor[2]);
    pdf.rect(barX, barY, barWidth * (consumptionPercent / 100), barHeight, "F");

    // If there's a header element (like a logo), capture and add it
    let currentY = margin + 90;
    if (elementRef?.current) {
      const canvas = await html2canvas(elementRef.current);
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 50;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        pageWidth - margin - imgWidth,
        margin,
        imgWidth,
        imgHeight
      );
    }

    // Add items table headers
    currentY += 10;
    pdf.setFillColor(240, 240, 240);
    pdf.rect(margin, currentY, contentWidth, 10, "F");

    pdf.setFontSize(12);
    pdf.setTextColor(60, 60, 60);
    pdf.setFont("", "bold");

    const colWidth = contentWidth / 5; // 5 columns now
    pdf.text("Item", margin + 3, currentY + 7);
    pdf.text("Weight", margin + colWidth + 3, currentY + 7);
    pdf.text("Category", margin + colWidth * 2 + 3, currentY + 7);
    pdf.text("Status", margin + colWidth * 3 + 3, currentY + 7);
    pdf.text("Cost", margin + colWidth * 4 + 3, currentY + 7);

    // Add items
    pdf.setFont("", "normal");
    currentY += 10;

    receipt.items.forEach((item, index) => {
      const rowHeight = 8;
      const y = currentY + rowHeight * index + 6;

      // Alternating row background for better readability
      if (index % 2 === 0) {
        pdf.setFillColor(250, 250, 250);
        pdf.rect(
          margin,
          currentY + rowHeight * index,
          contentWidth,
          rowHeight,
          "F"
        );
      }

      pdf.text(item.name, margin + 3, y);
      pdf.text(`${item.weight} ${item.weightUnit}`, margin + colWidth + 3, y);

      // Category with color indicator
      const category = item.category;
      pdf.text(category, margin + colWidth * 2 + 3, y);

      // Small colored square for category
      const squareSize = 3;
      let categoryColor = [41, 128, 185]; // blue for recycle

      if (category === "Compost") {
        categoryColor = [46, 204, 113]; // green
      } else if (category === "Landfill") {
        categoryColor = [231, 76, 60]; // red
      }

      pdf.setFillColor(categoryColor[0], categoryColor[1], categoryColor[2]);
      pdf.rect(margin + colWidth * 2 - 2, y - 2, squareSize, squareSize, "F");

      // Status
      let status = "Unknown";
      if (item.isConsumed) {
        status = "Consumed";
      } else if (item.expiry && new Date(item.expiry).getTime() < Date.now()) {
        status = "Expired";
      } else {
        status = "Active";
      }

      pdf.text(status, margin + colWidth * 3 + 3, y);

      // Status indicator circle
      let statusColor = [150, 150, 150]; // gray for unknown

      if (item.isConsumed) {
        statusColor = [46, 204, 113]; // green for consumed
      } else if (item.expiry && new Date(item.expiry).getTime() < Date.now()) {
        statusColor = [231, 76, 60]; // red for expired
      }

      pdf.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
      pdf.circle(margin + colWidth * 3 - 2, y - 2, 1.5, "F");

      // Cost column
      const itemCost = item.price || item.weight;
      const itemCostNumber =
        typeof itemCost === "number" ? itemCost : parseFloat(itemCost);
      pdf.text(
        `Rs. ${itemCostNumber.toFixed(2)}`,
        margin + colWidth * 4 + 3,
        y
      );
    });

    // Add summary section
    const summaryY = currentY + receipt.items.length * 8 + 15;
    pdf.setFillColor(245, 245, 245);
    pdf.rect(margin, summaryY, contentWidth, 40, "F");

    pdf.setFontSize(14);
    pdf.setTextColor(44, 62, 80);
    pdf.text("Summary", margin + 3, summaryY + 10);

    pdf.setFontSize(12);
    pdf.text(`Total Items: ${totalItems}`, margin + 3, summaryY + 20);
    pdf.text(`Consumed Items: ${consumedItems}`, margin + 3, summaryY + 30);
    pdf.text(
      `Expired Items: ${expiredItems}`,
      contentWidth - 80,
      summaryY + 20
    );
    pdf.text(
      `Waste Cost: Rs. ${wasteCost.toFixed(2)}`,
      contentWidth - 80,
      summaryY + 30
    );

    // Add footer with date generated
    const footerY = pageHeight - margin;
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text(`Generated on ${new Date().toLocaleString()}`, margin, footerY);

    // Add QR code (if you want to include a link to the receipt in your system)
    // This would require a QR code generation library
    // pdf.addImage(qrCodeDataUrl, 'PNG', pageWidth - margin - 30, footerY - 30, 30, 30);

    // Save PDF
    pdf.save(`${receipt.name.replace(/\s+/g, "_")}_receipt.pdf`);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};
