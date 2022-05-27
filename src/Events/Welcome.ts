import { BaseGuildTextChannel, GuildMember, MessageEmbed } from "discord.js";
import { Event } from "../interfaces";
export const event: Event = {
  name: "guildMemberAdd",
  run: async (Komi, member: GuildMember): Promise<void> => {
    if (member.guild.id === "887356477222834196") {
      if (member.user.bot) {
        member.roles.add("888287304697913424");
        member.setNickname(`➠║ ${member.user.username}`);
      } else {
        (
          Komi.channels.resolve("887362027956371507") as BaseGuildTextChannel
        ).send({
          embeds: [
            new MessageEmbed()
              .setTitle("¡Bienvenido(a) al soporte de Komi Shouko!")
              .setDescription(
                `¡Hola **${member.user.tag}**, bienvenido(a) al soporte de **🌸 Komi Shouko 🌸** esperamos que sea de tu agrado este servidor.`
              )
              .setImage(
                "https://cdn.discordapp.com/attachments/880562658401722379/934945897295527956/komi-san-komi-shouko_1.gif"
              )
              .setColor("#FFCC8E")
              .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
              .setFooter({
                text: `¡Wow contigo ya somos ${member.guild.memberCount} miembros!`,
              })
              .setTimestamp(),
          ],
        });
      }
    }
  },
};
