import { Command } from "../../../interfaces";
import { kill } from "random-gif-api";
import { MessageEmbed } from "discord.js";
import { Util } from "../../../Data/Emojis.json";
export const command: Command = {
  name: "kill",
  aliases: [],
  description: "Mata a la persona que más odias.",
  syntaxis: "<@Usuario>",
  category: "Interacción",
  cooldown: {
    name: "KillCooldown_",
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
    kill().then((img): void => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Kill X~X")
            .setDescription(
              `**${message.author.tag}** mato a **${Usuario.tag}**.`
            )
            .setImage(`${img}`)
            .setColor("RANDOM"),
        ],
      });
    });
  },
};
