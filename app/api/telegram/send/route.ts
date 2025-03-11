import { getTelegramClient } from "@/lib/telegram-client";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { phoneNumber, message } = await req.json();

  if (!phoneNumber || !message) {
    return new Response(
      JSON.stringify({ error: "Phone number and message are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
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
    // Send message
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const links = message.match(urlRegex);

    if (links) {
      let formattedMessage = message;
      for (const link of links) {
        formattedMessage = formattedMessage.replace(
          link,
          `<a href="${link}">${link}</a>`
        );
      }
      formattedMessage +=
        "\n\nPlease be a part of Sustaina. Start the process at <a href='https://t.me/Sustaina_Bot'>t.me/Sustaina_Bot</a>";
      await client.sendMessage(user.id, {
        message: formattedMessage,
        parseMode: "html",
      });
    } else {
      await client.sendMessage(user.id, { message, parseMode: "html" });
    }

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
