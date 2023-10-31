import { Interaction } from "discord.js";
import { GuildQueue, QueryType, useMainPlayer } from "discord-player";
import { YouTubeExtractor } from "@discord-player/extractor";

async function playMusic(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  const link = (interaction as any).options.getString("song-input", true);
  const player = useMainPlayer();
  player.extractors.register(YouTubeExtractor, {});
  try {
    const channel = (interaction as any).member.voice.channel;

    if (!channel) {
      return interaction.editReply(
        "You need to be in a voice channel to play music."
      );
    }

    const searchResults = await player.search(link, {
      requestedBy: interaction.user,
      searchEngine: QueryType.YOUTUBE,
      fallbackSearchEngine: QueryType.YOUTUBE,
    });

    if (!searchResults.tracks.length) {
      return interaction.editReply("Not found.");
    }
    
    const track = searchResults.tracks[0];
    const queue = new GuildQueue(player, {} as any);

    queue.addTrack(track);

    if (!queue.connection) await queue.connect(channel);

    await queue.play(track.title);

    return interaction.editReply(`**${track.title}** enqueued!`);
  } catch (error) {
    console.log(error);
    return interaction.editReply(`Something went wrong`);
  }
}

export default playMusic;
