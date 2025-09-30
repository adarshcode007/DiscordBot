import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  // console.log(message);
  // console.log(message.content);

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

client.login(process.env.token);
