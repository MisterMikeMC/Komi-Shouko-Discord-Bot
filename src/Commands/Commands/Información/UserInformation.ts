import { User, GuildMember, MessageAttachment, MessageEmbed } from "discord.js";
import { profileImage } from "discord-arts";
import { Command } from "../../../interfaces";
import { Util } from "../../../Data/Emojis.json";
export const command: Command = {
  name: "userinfo",
  aliases: ["user-info"],
  description: "Mira la información de un usuario.",
  syntaxis: "<... | @Usuario>",
  category: "Información",
  cooldown: {
    name: "UserInfo",
    time: "5s",
  },
  onlyOwner: false,
  maintenance: false,
  run: async (Komi, message, args): Promise<void> => {
    let User = (message.mentions.members.first() ||
      Komi.users.resolve(args[0]) ||
      Komi.users.cache.get(args[0]) ||
      message.author) as User | any;
    if (!User) {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `${Util.No} | Necesitas mencionar a un usuario o colocar su id.`
            )
            .setColor("#990000"),
        ],
      });
    }
    const rawUserImage = await profileImage(User);
    const Image = new MessageAttachment(rawUserImage, "profile.png");
    message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle("¡User Info!")
          .setFields(
            {
              name: "Usuario:",
              value: `${User.username}`,
              inline: false,
            },
            {
              name: "ID:",
              value: `${User.id}`,
              inline: false,
            },
            {
              name: "Tag:",
              value: `#${User.discriminator}`,
            },
            {
              name: "Creación de cuenta:",
              value: `<t:${Math.round(User.createdTimestamp / 1000)}>`,
            },
            {
              name: "Union al servidor:",
              value: `<t:${Math.round(User.joinedTimestamp / 1000)}>`,
            }
          )
          .setThumbnail(User.displayAvatarURL({ dynamic: true }))
          .setColor("#AF00FF")
          .setFooter({
            text: `Pedido por: ${message.author.username}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          }),
      ],
    });
  },
};
