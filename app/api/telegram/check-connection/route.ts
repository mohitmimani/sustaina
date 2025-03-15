// app/api/telegram/check-connection/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Get user session
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has Telegram connected
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { telegramChatId: true, telegramUsername: true },
    });

    if (user?.telegramChatId) {
      return NextResponse.json({
        connected: true,
        username: user.telegramUsername || "Unknown",
      });
    }

    return NextResponse.json({ connected: false });
  } catch (error) {
    console.error("Error checking Telegram connection:", error);
    return NextResponse.json(
      { error: "Failed to check connection status" },
      { status: 500 }
    );
  }
}
