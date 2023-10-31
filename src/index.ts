import { Client, IntentsBitField } from "discord.js";
import "dotenv/config";
import userMessage from "./events/userMessage";
import botCommands from "./commands/commands";
import joinVoice from "./commands/bot-interactions/joinVoice";
import playMusic from "./commands/bot-interactions/playMusic";
import { Player } from "discord-player";

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

export const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
  },
});

const { ACCESS_TOKEN, GUILD_ID } = process.env as Record<string, string>;

client.login(ACCESS_TOKEN);

client.on("ready", async () => {
  console.log("Bot is ready.");
  initializePlayer();
  botCommands();
});

client.on("messageCreate", (message) => {
  userMessage(message);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  await interaction.deferReply();

  const { commandName } = interaction;

  switch (commandName) {
    case "join":
      await joinVoice(interaction);
    case "play":
      await playMusic(interaction);
  }
});

// player.events.on("playerStart", async (queue, track) => {
//   // queue.metadata.channel.send(`Started playing **${track.title}**!`);
//   // await queue.play();
// });

player.events.on("error", (_queue, error) => {
  console.log(error);
});

async function initializePlayer() {
  await player.extractors.loadDefault((ext) => ext !== "YouTubeExtractor");
}
