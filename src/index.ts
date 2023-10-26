import { Client, IntentsBitField } from "discord.js";
import "dotenv/config";
import userMessage from "./events/userMessage";
import botCommands from "./commands/commands";
import { joinVoiceChannel } from "@discordjs/voice";
import joinVoice from "./commands/bot-interactions/joinVoice";

const {
  Guilds,
  GuildMembers,
  GuildMessages,
  MessageContent,
  GuildVoiceStates,
} = IntentsBitField.Flags;

const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    MessageContent,
    GuildMessages,
    GuildVoiceStates,
  ],
});

const { ACCESS_TOKEN, GUILD_ID } = process.env as Record<string, string>;

client.login(ACCESS_TOKEN);

client.on("ready", () => {
  console.log("Bot is ready.");
  botCommands();
});

client.on("messageCreate", (message) => {
  userMessage(message);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  switch (commandName) {
    case "join":
      joinVoice(interaction);
  }
});
