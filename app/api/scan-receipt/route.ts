import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { auth } from "@/lib/auth";

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GOOGLE_API_KEY,
});
const unauthorizedResponse = NextResponse.json(
  { error: "Unauthorized" },
  { status: 401 }
);
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user?.id) {
      return unauthorizedResponse;
    }
    // Parse the multipart form data
    const formData = await request.formData();
    const receiptFile = formData.get("receipt") as File;

    if (!receiptFile) {
      return NextResponse.json(
        { error: "No receipt image provided" },
        { status: 400 }
      );
    }

    // Convert the file to base64
    const buffer = await receiptFile.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    // Use Gemini to analyze the receipt
    const { text: analysisResult } = await generateText({
      model: google("gemini-2.0-flash-001"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
        You are a receipt analyzer. Extract the following information from this receipt image:
        1. Store or receipt name
        2. Total amount
        3. Receipt type (GROCERIES, ELECTRONICS, CLOTHING, or OTHER)
        4. List of items with their:
         - Name
         - Price
         - Quantity (default to 1 if not specified)
         - Weight and unit (if available)
         - Material category (choose from ['PAPER','PLASTIC','FOOD','GLASS','METAL','OTHER'])
         - Waste category (choose from ['RECYCLE','COMPOST','LANDFILL'] if you can determine it)
         - Expiry (default to null if not specified)
         - Brand (default to null if not specified)
         - IsConsumed (default to null if not specified)
        
        Format your response as a JSON object with the following structure:
        {
        "name": "string",
        "amount": "string",
        "type": "GROCERIES|ELECTRONICS|CLOTHING|OTHER",
        "items": [
          {
          "name": "string",
          "price": number,
          "quantity": number,
          "weight": number (optional),
          "weightUnit": "string" (optional),
          "materialCategory": "PAPER|PLASTIC|FOOD|GLASS|METAL|OTHER",
          "wasteCategory": "RECYCLE|COMPOST|LANDFILL" (optional),
          "expiry": "string" (optional),
          "brand": "string" (optional),
          "isConsumed": boolean (optional)
          }
        ]
        }
        
        Only return the JSON object, nothing else.
        `,
            },
            {
              type: "file",
              data: base64Image,
              mimeType: "image/jpeg",
            },
          ],
        },
      ],
    });

    // Parse the JSON response from Gemini
    let parsedData;
    try {
      // Find JSON in the response (in case Gemini adds extra text)
      const jsonMatch = analysisResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found in the response");
      }
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      return NextResponse.json(
        {
          error: "Failed to parse receipt data",
          rawResponse: analysisResult,
        },
        { status: 500 }
      );
    }

    // Return the extracted data
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Error processing receipt:", error);
    return NextResponse.json(
      { error: "Failed to process receipt" },
      { status: 500 }
    );
  }
}
