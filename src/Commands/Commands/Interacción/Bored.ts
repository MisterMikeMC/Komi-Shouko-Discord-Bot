import { Command } from "../../../interfaces";
import { bored } from "random-gif-api";
import { MessageEmbed } from "discord.js";
export const command: Command = {
  name: "bored",
  aliases: [],
  description: "Demuestra tu aburrimiento.",
  syntaxis: "",
  category: "Interacción",
  cooldown: {
    name: "BoredCooldown_",
    time: "1m",
  },
  onlyOwner: false,
  maintenance: false,
  run: async (Komi, message, args): Promise<void> => {
    bored().then((img): void => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Bored :b")
            .setDescription(`**${message.author.tag}** esta eburrido.`)
            .setImage(`${img}`)
            .setColor("RANDOM"),
        ],
      });
    });
  },
};
