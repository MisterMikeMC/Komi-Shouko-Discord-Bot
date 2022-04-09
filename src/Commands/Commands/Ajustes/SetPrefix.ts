import { MessageEmbed } from "discord.js";
import { Command } from "../../../interfaces";
import { Util } from "../../../Data/Emojis.json";
import ServersData from "../../../Schemas/SchemaServerData";
export const command: Command = {
  name: "setprefix",
  aliases: ["set-prefix"],
  description: "Cambia el prefix de Komi en tu servidor.",
  syntaxis: "<Prefix>",
  category: "Ajustes",
  cooldown: {
    name: "SetPrefixCooldown_",
    time: "5m",
  },
  onlyOwner: false,
  maintenance: false,
  run: async (Komi, message, args): Promise<void> => {



    let ServerData = await ServersData.findOne({
      ServerID: message.guild.id
    });


    if (!ServerData) {
      message.react(`${Util.No}`);
      return;
    }



    let UserPerms =
      message.member.permissions.has("ADMINISTRATOR") ||
      message.member.permissions.has("MANAGE_GUILD");

    console.log(UserPerms);
    return;


    if (message.author.id !== "437308398845952001") {




      if (!UserPerms) {



        message.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(`${Util.No} | No tienes suficientes permisos.`)
              .setColor("#990000"),
          ],
        });

        return;




      }




    }



    let Prefix = args[0];
    if (!Prefix) {




      message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `${Util.No} | Debes escribir un nuevo **__Prefijo__** de máximo 4 caracteres.`
            )
            .setColor("#990000"),
        ],
      });
      return;




    } else if (Prefix.length > 4) {




      message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `${Util.No} | No puedes usar más de 4 caracteres para el nuevo **__Prefijo__**.`
            )
            .setColor("#990000"),
        ],
      });
      return;
    }




    const Regex = /\p{Emoji}/gu.test(message.content);
    if (Regex) {
      message.reply({
        content: `${Util.No} | No se pueden poner emojis en el prefix.`,
        allowedMentions: {
          repliedUser: false,
        },
      });
      return;
    }



    await ServersData.findOneAndUpdate(
      {
        ServerID: message.guild.id,
      },
      {
        ServerPrefix: Prefix,
      }
    );





    message.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            `${Util.Yes} | El Prefijo fue cambiado a **__${Prefix}__**`
          )
          .setColor("#009900"),
      ],
    });





  },
};
