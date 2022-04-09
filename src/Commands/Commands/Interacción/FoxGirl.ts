import { MessageEmbed } from "discord.js";
import NekosClient from "nekos.life";
import { Command } from "../../../interfaces";
const { sfw } = new NekosClient();
export const command: Command = {
  name: "foxgirl",
  aliases: [],
  description: "Muestra una foto furry.",
  syntaxis: "<>",
  category: "Interacción",
  cooldown: {
    name: "FoxGirlCooldown_",
    time: "1m",
  },
  onlyOwner: false,
  maintenance: false,
  run: async (Komi, message, args): Promise<void> => {
    sfw.foxGirl().then((img): void => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("FoxGirl ^~^")
            .setDescription(`**${message.author.tag}** es furro.`)
            .setImage(`${img.url}`)
            .setColor("RANDOM"),
        ],
      });
    });
  },
};
