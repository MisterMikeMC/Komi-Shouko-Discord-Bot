import { Command } from "../../../interfaces";
import { MessageEmbed } from "discord.js";
import { Util } from "../../../Emojis.json";
import NekosClient from 'nekos.life';
const { sfw } = new NekosClient();
export const command: Command = {
  name: "slap",
  aliases: [],
  description: "Dale una bofetada a alguien.",
  syntaxis: "<@Usuario>",
  category: "Interacción",
  cooldown: {
    name: "SlapCooldown_",
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
    sfw.slap().then((img): void => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Slap @o@")
            .setDescription(
              `**${message.author.tag}** le dio una bofetada a **${Usuario.tag}**.`
            )
            .setImage(`${img.url}`)
            .setColor("RANDOM"),
        ],
      });
    });
  },
};
