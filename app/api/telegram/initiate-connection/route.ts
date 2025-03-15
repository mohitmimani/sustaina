// app/api/telegram/initiate-connection/route.ts
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

    const body = await request.json();
    const { connectionToken } = body;

    if (!connectionToken) {
      return NextResponse.json(
        { error: "Connection token is required" },
        { status: 400 }
      );
    }

    // Calculate expiry time (30 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30);

    // Create pending connection record
    await prisma.telegramPendingConnection.create({
      data: {
        userId: session.user.id,
        connectionToken,
        expiresAt,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error initiating Telegram connection:", error);
    return NextResponse.json(
      { error: "Failed to initiate connection" },
      { status: 500 }
    );
  }
}
