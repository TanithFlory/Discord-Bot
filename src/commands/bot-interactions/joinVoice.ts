import { joinVoiceChannel } from "@discordjs/voice";
import { Interaction } from "discord.js";

export default async function joinVoice(interaction: Interaction) {
  const channelId = (interaction.member as any).voice.channel?.id;

  if (!interaction.isChatInputCommand()) return;

  if (!channelId)
    return await interaction.editReply(
      "Please be connected to a voice channel."
    );

  joinVoiceChannel({
    channelId: channelId,
    guildId: interaction.guild!.id,
    adapterCreator: interaction.guild!.voiceAdapterCreator,
    selfDeaf: false,
  });

  await interaction.editReply("Joined the voice channel");

  return true;
}
