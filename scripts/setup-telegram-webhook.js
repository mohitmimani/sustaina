// scripts/setup-telegram-webhook.ts
// Run this script once to set up your webhook with Telegram

import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

async function setupWebhook() {
  console.log("hi");
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const WEBHOOK_URL = process.env.NEXT_PUBLIC_APP_URL + "/api/telegram/webhook";
  const SECRET_TOKEN = process.env.TELEGRAM_WEBHOOK_SECRET; // Create a random string for this

  if (!BOT_TOKEN) {
    console.error("Missing TELEGRAM_BOT_TOKEN in environment variables");
    process.exit(1);
  }

  if (!WEBHOOK_URL) {
    console.error("Missing NEXT_PUBLIC_APP_URL in environment variables");
    process.exit(1);
  }

  try {
    // First, delete any existing webhook
    await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`);

    // Then, set the new webhook
    const response = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
      {
        params: {
          url: WEBHOOK_URL,
          secret_token: SECRET_TOKEN,
          allowed_updates: JSON.stringify(["message", "callback_query"]),
        },
      }
    );

    console.log("Webhook setup response:", response.data);

    // Verify the webhook is set up correctly
    const statusResponse = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`
    );
    console.log("Webhook status:", statusResponse.data);
  } catch (error) {
    console.error("Error setting up webhook:", error);
  }
}

setupWebhook();
