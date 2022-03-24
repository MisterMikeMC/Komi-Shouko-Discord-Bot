import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { SlashCommandStructure } from "../../../interfaces/SlashCommand";
import {
  Ping,
  Util,
  KomiShouko,
  Badge,
} from "../../../Emojis.json";
export default new SlashCommandStructure({
  name: "información",
  description: "Sub SlashCommands de Información.",
  options: [
    {
      name: "ping",
      description: "Muestra el ping de Komi-san.",
      type: "SUB_COMMAND",
    },
    {
      name: "invite-me",
      description: "Obten mi invitación para invitarme a tu servidor.",
      type: "SUB_COMMAND",
    },
    {
      name: "bot-info",
      description:
        "Comando que muestra toda la información relevante de Komi-san.",
      type: "SUB_COMMAND",
    },
  ],
  run: async ({ Komi, interaction }): Promise<void> => {
    if (interaction.options.getSubcommand() === "ping") {
      let EmojiPing1 = Ping.Ping1;
      let EmojiPing2 = Ping.Ping2;
      let EmojiPing3 = Ping.Ping3;
      let EmojiPing4 = Ping.Ping4;
      let EmojiPing5 = Ping.Ping5;
      let PingEmojiFinal1;
      let PingEmojiFinal2;
      let PingRespuesta = Date.now() - interaction.createdTimestamp;
      let PingApi = Komi.ws.ping;
      let Color;
      if (PingRespuesta <= 60) {
        PingEmojiFinal1 = EmojiPing5;
      } else if (PingRespuesta >= 61 && PingRespuesta <= 100) {
        PingEmojiFinal1 = EmojiPing4;
      } else if (PingRespuesta >= 101 && PingRespuesta <= 150) {
        PingEmojiFinal1 = EmojiPing3;
      } else if (PingRespuesta >= 151 && PingRespuesta <= 200) {
        PingEmojiFinal1 = EmojiPing2;
      } else if (PingRespuesta >= 201) {
        PingEmojiFinal1 = EmojiPing1;
      } else if (PingRespuesta < 0) {
        PingEmojiFinal1 = EmojiPing1;
      }
      if (PingApi <= 60) {
        PingEmojiFinal2 = EmojiPing5;
        Color = "#2BFF00";
      } else if (PingApi >= 61 && PingApi <= 100) {
        PingEmojiFinal2 = EmojiPing4;
        Color = "#FFF300";
      } else if (PingApi >= 101 && PingApi <= 150) {
        PingEmojiFinal2 = EmojiPing3;
        Color = "#FF9B00";
      } else if (PingApi >= 151 && PingApi <= 200) {
        PingEmojiFinal2 = EmojiPing2;
        Color = "0xFF0000";
      } else if (PingApi >= 201) {
        PingEmojiFinal2 = EmojiPing1;
        Color = "#930000";
      } else if (PingRespuesta < 0) {
        PingEmojiFinal2 = EmojiPing1;
        Color = "#930000";
      }
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("¡Ping de Komi-san!")
            .addFields(
              {
                name: `${Util.WindL} Ping de Respuesta: ${Util.WindL}`,
                value: `> ¡**__${PingRespuesta}__** ms! ${PingEmojiFinal1}`,
                inline: false,
              },
              {
                name: `${Util.WindL} Ping de la API: ${Util.WindL}`,
                value: `> ¡**__${PingApi}__** ms! ${PingEmojiFinal2}`,
                inline: false,
              },
              {
                name: `${Util.WindL} Ram usada: ${Util.WindL}`,
                value: `> **__${(
                  process.memoryUsage().heapUsed /
                  1024 /
                  1024
                ).toFixed(2)}__** MB`,
                inline: false,
              }
            )
            .setFooter({
              text: `Comando hecho por ${interaction.user.tag}`,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setColor(Color)
            .setTimestamp(),
        ],
      });
    } else if (interaction.options.getSubcommand() === "invite-me") {
      const displayRoleColor =
        interaction.guild.me.displayHexColor === "#000000"
          ? "#ffffff"
          : interaction.guild.me.displayHexColor;
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({
              name: `Invitación`,
              iconURL: `${Komi.user.displayAvatarURL()}`,
            })
            .setDescription(
              `${KomiShouko.KomiOK} Aquí tienes la invitación para que me invites a tu servidor. ${KomiShouko.KomiOK}`
            )
            .setImage(
              "https://media.discordapp.net/attachments/880562658401722379/934945810301468782/komi-cant-communicate-komi.gif"
            )
            .setColor(`${displayRoleColor}`)
            .setFooter({
              text: "Gracias por considerar invitarme.",
              iconURL: `${Komi.user.displayAvatarURL()}`,
            })
            .setTimestamp(),
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setStyle("LINK")
              .setURL(
                "https://discord.com/api/oauth2/authorize?client_id=875166925884370994&permissions=8&scope=applications.commands%20bot"
              )
              .setLabel("Invitame"),
            new MessageButton()
              .setStyle("LINK")
              .setURL("https://discord.gg/9rvvC9XFvX")
              .setLabel("Soporte")
          ),
        ],
      });
    } else if (interaction.options.getSubcommand() === "bot-info") {
      /**
       * 1 = Replit + UptimeRobot
       * 2 = Visual Studio Code (Local)
       */
      let TypeOfHosting: Number = 2;
      let TypeOfHostingMessage: String;
      if (TypeOfHosting === 1) {
        TypeOfHostingMessage = `> ${Util.Arrow} ${Util.Replit} [Repl.it](https://replit.com).\n> ${Util.Arrow} ${Util.Uptimerobot} [Uptimerobot](https://uptimerobot.com).`;
      } else if (TypeOfHosting === 2) {
        TypeOfHostingMessage = `> ${Util.Arrow} ${Util.VisualStudioCodeInsider} [Visual Studio Code](https://code.visualstudio.com/insiders/).\n> ${Util.Arrow} ${Util.Terminal} [Terminal](https://www.microsoft.com/es-mx/p/windows-terminal/9n0dx20hk701).`;
      }
      const roleColor =
        interaction.guild.me.displayHexColor === "#000000"
          ? "#ffffff"
          : interaction.guild.me.displayHexColor;
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({
              name: "Komi Info",
              iconURL: Komi.user.avatarURL(),
            })
            .setThumbnail(Komi.user.avatarURL())
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
                value: `${TypeOfHostingMessage}`,
                inline: false,
              },
              {
                name: `${Util.WindL} Caracteristicas de desarrollo: ${Util.WindR}`,
                value: `> ${Util.Arrow} ${KomiShouko.KomiMaidExcited} **Fecha de Creación:** <t:1628722800>.\n> ${Util.Arrow} ${Util.TypeScript} **Lenguaje usado:** TypeScript\n> ${Util.Arrow} ${Util.Discordjs} **Libreria usada:** Discord.js v13.6.0\n> ${Util.Arrow} ${Util.MongoDB} **Database:** MongoDB v4.4.11\n> ${Util.Arrow} ${Util.NodeJS} **Entorno de ejecución:** NodeJS v16.14.0`,
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
              text: `Comando hecho por ${interaction.user.tag}`,
              iconURL: interaction.user.displayAvatarURL({
                dynamic: true,
              }),
            })
            .setTimestamp(),
        ],
      });
    }
  },
});
