import { Command } from "../../../interfaces";
import { chocolate } from "random-gif-api";
import { MessageEmbed } from "discord.js";
import { Util } from "../../../Emojis.json";
export const command: Command = {
  display: "Chocolate.ts",
  name: "chocolate",
  aliases: [],
  description: "Dale chocolate a alguien.",
  syntaxis: "<@Usuario>",
  category: "Interacción",
  cooldown: {
    name: "ChocolateCooldown_",
    time: "1m",
  },
  onlyOwner: false,
  maintenance: false,
  run: async (Komi, message, args) => {
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
    chocolate().then((img) => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Chocolate :>")
            .setDescription(
              `**${message.author.tag}** le dio chocolate a **${Usuario.tag}**.`
            )
            .setImage(`${img}`)
            .setColor("RANDOM"),
        ],
      });
    });
  },
};
