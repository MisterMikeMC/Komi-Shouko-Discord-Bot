import { Command } from "../../../interfaces";
import { bread } from "random-gif-api";
import { MessageEmbed } from "discord.js";
import { Util } from "../../../Emojis.json";
export const command: Command = {
  name: "bread",
  aliases: [],
  description: "Dale pan a alguien.",
  syntaxis: "<@Usuario>",
  category: "Interacción",
  cooldown: {
    name: "BreadCooldown_",
    time: "1m",
  },
  onlyOwner: false,
  maintenance: false,
  run: async (Komi, message, args): Promise<void> => {
    let Usuario = message.mentions.users.first();
    if (!Usuario) {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`${Util.No} | Debes mencionara alguien.`)
            .setColor("#990000"),
        ],
      });
      return;
    } else if (Usuario.id === message.author.id) {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`${Util.No} | No puedes mencionarte a ti mismo.`)
            .setColor("#990000"),
        ],
      });
      return;
    } else if (Usuario.bot) {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`${Util.No} | No puedes mencionar a un bot.`)
            .setColor("#990000"),
        ],
      });
      return;
    }
    bread().then((img): void => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Bread :>")
            .setDescription(
              `**${message.author.tag}** le dio pan a **${Usuario.tag}**.`
            )
            .setImage(`${img}`)
            .setColor("RANDOM"),
        ],
      });
    });
  },
};
