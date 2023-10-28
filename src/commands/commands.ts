import { ApplicationCommandOptionType, Guild, Message } from "discord.js";
import { REST, Routes } from "discord.js";
import "dotenv/config";

const { CLIENT_ID, ACCESS_TOKEN, GUILD_ID } = process.env as Record<
  string,
  string
>;

const rest = new REST({ version: "10" }).setToken(ACCESS_TOKEN);

export default async function botCommands() {
  try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
  } catch (error) {
    console.log(error);
  }
}

const commands = [
  {
    name: "join",
    description: "Make the bot join the voice channel you are in.",
  },
  {
    name: "play",
    description: "Plays the music you tell the bot to.",
    options: [
      {
        name: "song-input",
        description:
          "Add a link or a song name to queue the song.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];
