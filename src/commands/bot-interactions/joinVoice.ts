import { joinVoiceChannel } from "@discordjs/voice";
import { Interaction } from "discord.js";

export default function joinVoice(interaction: Interaction) {
  const channelId = (interaction.member as any).voice.channel?.id;

  if (!interaction.isChatInputCommand()) return;

  if (!channelId)
    return interaction.reply("Please be connected to a voice channel.");

  const connection = joinVoiceChannel({
    channelId: channelId,
    guildId: interaction.guild!.id,
    adapterCreator: interaction.guild!.voiceAdapterCreator,
  });

  interaction.reply("Joined the voice channel");

  return connection;
}
