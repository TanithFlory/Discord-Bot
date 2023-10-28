import { Interaction } from "discord.js";
import { createAudioPlayer, createAudioResource } from "@discordjs/voice";
import joinVoice from "./joinVoice";

function playMusic(interaction: Interaction) {
  try {
    const link = (interaction as any).options.get("song-input").name;
  } catch (error) {
    console.log(error);
  }
}

export default playMusic;
