import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  //   console.log(message);
  //   console.log(message.content);

  if (message.author.bot) return;
  message.reply({
    content: "Hi from Bot",
  });
});

client.login(process.env.token);
