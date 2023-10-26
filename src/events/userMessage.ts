import { Message } from "discord.js";
import botCommands from "../commands/commands";

export default function userMessage(message: Message) {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

}
