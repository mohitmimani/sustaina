import { Telegraf } from "telegraf";
import { PrismaClient } from "@prisma/client";
import * as cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || "");
const prisma = new PrismaClient();

// Schedule cron job
cron.schedule("0 */12 * * *", async () => {
  console.log("Running expiry check...");

  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 3);

  try {
    // Find items that expire in the next 3 days
    const expiringItems = await prisma.item.findMany({
      where: {
        expiry: {
          gte: today,
          lte: threeDaysFromNow,
        },
        isConsumed: false,
      },
      include: {
        receipt: {
          include: {
            user: true,
          },
        },
      },
    });

    // Group by user
    const userItemsMap = new Map();

    expiringItems.forEach((item) => {
      const userId = item.receipt.userId;
      const chatId = item.receipt.user.telegramChatId;

      if (!chatId) return; // Skip if no telegram connection

      if (!userItemsMap.has(chatId)) {
        userItemsMap.set(chatId, []);
      }

      userItemsMap.get(chatId).push({
        name: item.name,
        expiry: item.expiry,
      });
    });
    console.log(userItemsMap);
    // Send reminders to each user
    for (const [chatId, items] of userItemsMap.entries()) {
      const message =
        `🚨 EXPIRY ALERT! 🚨\n\n🗒️ You have ${items.length} item${
          items.length > 1 ? "s" : ""
        } about to expire:\n\n` +
        items
          .map((item) => {
            const days = Math.ceil(
              (item.expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
            );
            let emoji = "🟢"; // Far from expiry
            if (days <= 1) {
              emoji = "🔴"; // Critical - expires today or tomorrow
            } else if (days <= 2) {
              emoji = "🟠"; // Warning - expires soon
            }
            return `${emoji} ${item.name}: Expires in ${days} day${
              days !== 1 ? "s" : ""
            } (${item.expiry.toLocaleDateString()})`;
          })
          .join("\n") +
        "\n\n💡 Tip: Consider using these items soon to avoid food waste!";

      await bot.telegram.sendMessage(chatId, message);
    }
  } catch (error) {
    console.error("Error sending expiry reminders:", error);
  }
});
// Launch the bot
bot
  .launch()
  .then(() => console.log("Telegram bot is running..."))
  .catch((err) => console.error("Error starting bot:", err));

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

export default bot;
