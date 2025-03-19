import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { Message } from "ai";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GOOGLE_API_KEY,
});
// Configure the Google Gemini model
const gemini = google("gemini-2.0-flash-001", {});
const unauthorizedResponse = NextResponse.json(
  { error: "Unauthorized" },
  { status: 401 }
);
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return unauthorizedResponse;
  }
  const { messages }: { messages: Message[] } = await req.json();

  // Convert the messages to a format that Gemini can understand
  const prompt = messages
    .map(
      (message) =>
        `${message.role === "user" ? "User" : "Assistant"}: ${message.content}`
    )
    .join("\n");

  // System prompt to guide the model's behavior
  const systemPrompt = `
    You are an eco-friendly assistant specialized in waste management and sustainability.
    Help users track their waste receipts and provide tips on reducing waste, recycling properly, 
    and living more sustainably. Be informative, encouraging, and practical.
    
    When users mention specific items they've purchased or disposed of, provide information on:
    1. How to properly recycle or dispose of the item
    2. Eco-friendly alternatives if applicable
    3. Environmental impact of the item
    
    Always maintain a positive, supportive tone and encourage sustainable choices.
  `;

  // Stream the response from the model
  const result = streamText({
    model: gemini,
    prompt,
    system: systemPrompt,
  });

  return result.toDataStreamResponse();
}
