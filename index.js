import { Client, GatewayIntentBits } from "discord.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Bot ready event
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const req = message.content.split(" ")[0];

  try {
    if (
      message.content.startsWith("reply") ||
      message.content.startsWith("Reply")
    ) {
      const prompt = message.content.split(req)[1];
      // console.log(prompt);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Reply briefly and clearly: ${prompt}`,
      });
      const text = response.text;

      return message.reply({
        content: text || "Couldn't generate a response",
      });
    }

    message.reply({
      content: "Hi from Bot",
    });
  } catch (error) {
    console.log(error.message);
    return message.reply({ content: "Something went wrong!" });
  }
});

client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  interaction.reply("Pong!!");
});

client
  .login(process.env.DISCORD_TOKEN)
  .then(() => console.log("✅ Login successful"))
  .catch((err) => console.error("❌ Login failed:", err));

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot is running.");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
