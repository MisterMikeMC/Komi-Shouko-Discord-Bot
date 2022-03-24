import { Command } from "../../../interfaces";
import { happy } from "random-gif-api";
import { MessageEmbed } from "discord.js";
export const command: Command = {
  name: "happy",
  aliases: [],
  description: "Demuestra los pasos prohibidos.",
  syntaxis: "",
  category: "Interacción",
  cooldown: {
    name: "HappyCooldown_",
    time: "1m",
  },
  onlyOwner: false,
  maintenance: false,
  run: async (Komi, message, args): Promise<void> => {
    happy().then((img): void => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Happy :D")
            .setDescription(`**${message.author.tag}** esta feliz.`)
            .setImage(`${img}`)
            .setColor("RANDOM"),
        ],
      });
    });
  },
};
