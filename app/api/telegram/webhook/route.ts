import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import TelegramBot from "node-telegram-bot-api";

// Initialize Telegram bot for sending messages
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || "", {
  polling: false,
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const update = await request.json();

    // Handle "/start" command with connection parameters
    if (update.message?.text?.startsWith("/start")) {
      const chatId = update.message.chat.id;
      const username = update.message.from.username;

      const params = update.message.text.split(/[\s_]+/);
      console.log(params);
      // Check if this is a connection request with the right parameter
      if (
        params.length >= 3 &&
        (params[1] === "connect_sustaina" || params[1] === "connectSustaina")
      ) {
        const connectionToken = params[2];

        // Find pending connection with this token
        const pendingConnection =
          await prisma.telegramPendingConnection.findFirst({
            where: {
              connectionToken,
              expiresAt: { gt: new Date() },
            },
          });

        if (pendingConnection) {
          // Update user with Telegram details
          await prisma.user.update({
            where: { id: pendingConnection.userId },
            data: {
              telegramChatId: chatId.toString(),
              telegramUsername: username,
            },
          });

          // Delete the pending connection
          await prisma.telegramPendingConnection.delete({
            where: { id: pendingConnection.id },
          });

          // Send confirmation message
          await bot.sendMessage(
            chatId,
            "🎉 Successfully connected to Sustaina!\n\n" +
              "You'll now receive notifications about:\n" +
              "• New purchases tracked\n" +
              "• Items about to expire\n" +
              "• Weekly waste reduction insights\n\n" +
              "You can respond with 'Used [item]' or 'Finished [item]' to log consumption."
          );
        } else {
          // Invalid or expired token
          await bot.sendMessage(
            chatId,
            "⚠️ Connection failed. The link you used may be expired or invalid.\n\n" +
              "Please try connecting again from the Sustaina website."
          );
        }
      } else {
        // Regular start command
        await bot.sendMessage(
          chatId,
          "👋 Welcome to Sustaina Bot!\n\n" +
            "To connect your Sustaina account, please use the 'Connect with Telegram' button on the Sustaina website."
        );
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error handling Telegram webhook:", error);
    return new NextResponse(null, { status: 500 });
  }
}

// Specify that this route should accept the raw body
export const config = {
  api: {
    bodyParser: false,
  },
};
