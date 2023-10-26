import { Client, IntentsBitField } from "discord.js";
import "dotenv/config";

const token = process.env.ACCESS_TOKEN;

const { Guilds, GuildMembers, GuildMessages, MessageContent } =
  IntentsBitField.Flags;

const client = new Client({
  intents: [Guilds, GuildMembers, MessageContent, GuildMessages],
});

client.login(token);

client.on("ready", () => {
  console.log("Bot is ready.");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  if (content === "hi") {
    message.reply("Hello");
  }
});
