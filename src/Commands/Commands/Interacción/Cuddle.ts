import { Command } from "../../../interfaces";
import { cuddle } from "random-gif-api";
import { MessageEmbed } from "discord.js";
import { Util } from "../../../File Data/Util/Emojis.json";
export const command: Command = {
  display: "Cuddle.ts",
  name: "cuddle",
  aliases: [],
  description: "Demuestra tu afecto a alguien.",
  syntaxis: "<@Usuario>",
  category: "Interacción",
  cooldown: {
    name: "CuddleCooldown_",
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
    cuddle().then((img) => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Cuddle °////°")
            .setDescription(
              `**${message.author.tag}** le demostró su afecto a **${Usuario.tag}**.`
            )
            .setImage(`${img}`)
            .setColor("RANDOM"),
        ],
      });
    });
  },
};
