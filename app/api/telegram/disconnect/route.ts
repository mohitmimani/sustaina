import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update user to remove Telegram connection
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        telegramChatId: null,
        telegramUsername: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error disconnecting Telegram:", error);
    return NextResponse.json(
      { error: "Failed to disconnect from Telegram" },
      { status: 500 }
    );
  }
}

// app/api/telegram/webhook/route.ts
