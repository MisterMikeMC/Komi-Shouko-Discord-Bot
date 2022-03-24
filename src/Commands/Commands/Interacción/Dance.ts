import { Command } from "../../../interfaces";
import { dance } from "random-gif-api";
import { MessageEmbed } from "discord.js";
export const command: Command = {
  name: "dance",
  aliases: [],
  description: "Demuestra los pasos prohibidos.",
  syntaxis: "",
  category: "Interacción",
  cooldown: {
    name: "DanceCooldown_",
    time: "1m",
  },
  onlyOwner: false,
  maintenance: false,
  run: async (Komi, message, args): Promise<void> => {
    dance().then((img): void => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Dance c:")
            .setDescription(`**${message.author.tag}** esta bailando.`)
            .setImage(`${img}`)
            .setColor("RANDOM"),
        ],
      });
    });
  },
};
