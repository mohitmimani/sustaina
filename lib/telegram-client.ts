import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import readline from "readline";

const apiId = parseInt(process.env.TELEGRAM_API_ID as string);
const apiHash = process.env.TELEGRAM_API_HASH;
const sessionString = process.env.TELEGRAM_SESSION || ""; // Persistent session storage

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new TelegramClient(
  new StringSession(sessionString),
  apiId,
  apiHash as string,
  {
    connectionRetries: 5,
  }
);

export const getTelegramClient = async () => {
  if (!client.connected) {
    await client.connect();
  }

  // 🔴 If there is no session, force login
  if (!sessionString) {
    console.log("🔹 First-time login: Enter your phone number");

    await client.start({
      phoneNumber: async () =>
        new Promise((resolve) =>
          rl.question("Please enter your number: ", resolve)
        ),
      password: async () =>
        new Promise((resolve) =>
          rl.question("Please enter your password: ", resolve)
        ),
      phoneCode: async () =>
        new Promise((resolve) =>
          rl.question("Please enter the code you received: ", resolve)
        ),
      onError: (err) => console.log(err),
    });

    // Save session after login
    console.log("✅ Login successful! Saving session...");
    const newSession = client.session.save();
    console.log("🔹 Save this session:", newSession);
  }

  console.log("✅ Telegram Client Ready!");
  return client;
};
