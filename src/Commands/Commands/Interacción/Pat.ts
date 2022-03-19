import { Command } from "../../../interfaces";
import { MessageEmbed } from "discord.js";
import { Util } from "../../../File Data/Util/Emojis.json";
import neko from "nekos.life";
const { sfw } = new neko();
export const command: Command = {
  display: "Pat.ts",
  name: "pat",
  aliases: [],
  description: "Dale una palmada en la cabeza a alguien.",
  syntaxis: "<@Usuario>",
  category: "Interacción",
  cooldown: {
    name: "PatCooldown_",
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
    sfw.pat().then((img) => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Pat ^~^")
            .setDescription(
              `**${message.author.tag}** le dio una palmada en la cabeza a **${Usuario.tag}**.`
            )
            .setImage(`${img.url}`)
            .setColor("RANDOM"),
        ],
      });
    });
  },
};
