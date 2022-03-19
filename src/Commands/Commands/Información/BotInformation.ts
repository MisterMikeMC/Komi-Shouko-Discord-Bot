import { Command } from "../../../interfaces";
import { MessageEmbed } from "discord.js";
import { Util, Badge, DxD } from "../../../File Data/Util/Emojis.json";
export const command: Command = {
  display: "Komi Info.ts",
  name: "botinfo",
  aliases: [],
  description: "Comando que muestra toda la información relevante de Komi-san.",
  syntaxis: "",
  category: "Information",
  cooldown: {
    name: "KomiInfoCooldown_",
    time: "5s",
  },
  onlyOwner: false,
  maintenance: false,
  run: async (Komi, message, args) => {
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;
    message.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({
            name: "Komi Info",
            iconURL: Komi.user.avatarURL(),
          })
          .setThumbnail(`${Komi.user.avatarURL()}`)
          .addFields(
            {
              name: `${Util.WindL} Desarrolladores de Komi-san: ${Util.WindR}`,
              value: `> ${Util.Arrow} Owner [MrMikeMC#9081](https://discord.com/users/437308398845952001) ${Badge.Owner} ${Badge.Developer}`,
              inline: false,
            },
            {
              name: `${Util.WindL} Estadísticas de Komi-san: ${Util.WindR}`,
              value: `> ${Util.Arrow} ${Util.Tags} ${Komi.guilds.cache.size} servers.\n> ${Util.Arrow} ${Util.Channels} ${Komi.channels.cache.size} canales.\n> ${Util.Arrow} ${Util.Users} ${Komi.users.cache.size} usuarios.`,
              inline: false,
            },
            {
              name: `${Util.WindL} Hosteada en: ${Util.WindR}`,
              value: `> ${Util.Arrow} ${Util.Replit} [Repl.it](https://replit.com).\n> ${Util.Arrow} ${Util.Uptimerobot} [Uptimerobot](https://uptimerobot.com).`,
              inline: false,
            },
            {
              name: `${Util.WindL} Caracteristicas de desarrollo: ${Util.WindR}`,
              value: `> ${Util.Arrow} ${DxD.Koneko} **Fecha de Creación:** <t:1628722800>.\n> ${Util.Arrow} ${Util.TypeScript} **Lenguaje usado:** TypeScript\n> ${Util.Arrow} ${Util.Discordjs} **Libreria usada:** Discord.js v13.6.0\n> ${Util.Arrow} ${Util.MongoDB} **Database:** MongoDB v4.4.11\n> ${Util.Arrow} ${Util.NodeJS} **Entorno de ejecución:** NodeJS v16.10.0`,
              inline: false,
            },
            {
              name: `${Util.WindL} Cuento con: ${Util.WindR}`,
              value: `> ${Util.Arrow} ${Util.Chat} **${Komi.commands.size}** Comandos.\n> ${Util.Arrow} ${Util.SlashCommands} **${Komi.slashcommands.size}** Slash Commands.`,
              inline: false,
            },
            {
              name: `${Util.WindL} Versión del Bot: ${Util.WindR}`,
              value: `> ${Util.Arrow} ${Util.Bot} Komi Shouko **v0.0.1**.`,
              inline: false,
            }
          )
          .setImage(
            "https://cdn.discordapp.com/attachments/930674284425265182/934612890219085884/standard.gif"
          )
          .setColor(`${roleColor}`)
          .setFooter({
            text: `Comando hecho por ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({
              dynamic: true,
            }),
          })
          .setTimestamp(),
      ],
    });
  },
};
