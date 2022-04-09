import { BaseGuildTextChannel, GuildMember, MessageEmbed } from "discord.js";
import { Event } from "../interfaces";
export const event: Event = {
  name: "guildMemberAdd",
  run: async (Komi, member: GuildMember): Promise<void> => {
    if (member.guild.id === "887356477222834196") {
      if (!member.user.bot) {
        let Channel = Komi.channels.resolve(
          "887396817422131270"
        ) as BaseGuildTextChannel;
        Channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle("Bye bye~")
              .setDescription(
                `Lamentablemente **${member.user.tag}** decidio irse del servidor, hasta luego.`
              )
              .setImage(
                "https://cdn.discordapp.com/attachments/880562658401722379/934945897954017310/komi-san-komi-shouko_2.gif"
              )
              .setColor("#FFCC8E")
              .setThumbnail(
                `${member.user.displayAvatarURL({ dynamic: true })}`
              )
              .setFooter({
                text: `Ahora solo somos ${member.guild.memberCount} miembros.`,
              })
              .setTimestamp(),
          ],
        });
      }
    }
  },
};
