import { MessageEmbed } from "discord.js";
import NekosClient from "nekos.life";
import { Command } from "../../../interfaces";
const { sfw } = new NekosClient();
export const command: Command = {
  name: "neko",
  aliases: [],
  description: "Muestra una foto de Nekos.",
  syntaxis: "<>",
  category: "Interacción",
  cooldown: {
    name: "NekoCooldown_",
    time: "1m",
  },
  onlyOwner: false,
  maintenance: false,
  run: async (Komi, message, args): Promise<void> => {
    sfw.neko().then((img): void => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Neko ^~^")
            .setDescription(`**${message.author.tag}** es un Nekomata.`)
            .setImage(`${img.url}`)
            .setColor("RANDOM"),
        ],
      });
    });
  },
};
