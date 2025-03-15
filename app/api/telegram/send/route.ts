import { getTelegramClient } from "@/lib/telegram-client";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { phoneNumber, message } = await req.json();

  if (!phoneNumber || !message) {
    return new Response(
      JSON.stringify({
        error: "Phone number and message are required",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Validate phone number
  const phoneNumberStr = phoneNumber.replace("@sustaina.com", "");
  console.log(phoneNumberStr);
  const phoneNumberRegex = /^\+\d+$/;
  if (!phoneNumberRegex.test(phoneNumberStr)) {
    return new Response(JSON.stringify({ error: "Invalid phone number" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const client = await getTelegramClient();

    // Fetch the user entity using the phone number
    const user = await client.getEntity(phoneNumberStr);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found!" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

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
