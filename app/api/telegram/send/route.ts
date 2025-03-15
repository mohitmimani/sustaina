import { getTelegramClient } from "@/lib/telegram-client";
import { type NextRequest } from "next/server";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export async function POST(req: NextRequest) {
  const { phoneNumber, message } = await req.json();

  const botUsername = process.env.BOT_USERNAME;
  const startParameter = process.env.START_PARAMETER;

  if (!phoneNumber || !message || !botUsername || !startParameter) {
    return new Response(
      JSON.stringify({
        error:
          "Phone number, message, botUsername, and startParameter are required",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Validate phone number
  const phoneNumberObj = parsePhoneNumberFromString(
    phoneNumber.replace("@sustaina.com", "")
  );
  if (!phoneNumberObj || !phoneNumberObj.isValid()) {
    return new Response(JSON.stringify({ error: "Invalid phone number" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const client = await getTelegramClient();

    // Fetch the user entity using the phone number
    const user = await client.getEntity(
      phoneNumber.replace("@sustaina.com", "")
    );

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found!" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create the deep link
    const connectionToken = `${phoneNumber}_${Date.now()}`;
    const telegramDeepLink = `https://t.me/${botUsername}?start=${startParameter}_${connectionToken}`;

    // Send message
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const links = message.match(urlRegex);

    let formattedMessage = message;
    if (links) {
      for (const link of links) {
        formattedMessage = formattedMessage.replace(
          link,
          `<a href="${link}">${link}</a>`
        );
      }
    }
    formattedMessage += `\n\nPlease be a part of Sustaina. Start the process at <a href='${telegramDeepLink}'>${telegramDeepLink}</a>`;

    await client.sendMessage(user.id, {
      message: formattedMessage,
      parseMode: "html",
    });

    return new Response(`Message sent!`, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
