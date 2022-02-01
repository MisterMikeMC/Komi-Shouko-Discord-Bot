import { MessageEmbed } from "discord.js";
import { Event } from "../interfaces";
export const event: Event = {
    name: 'guildMemberAdd',
    run: async (Komi, member) => {
        if (member.guild.id === '887356477222834196') {
            if (!member.bot) {
                //@ts-ignore
                Komi.channels.resolve('887396817422131270').send({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("Bye bye~")
                            .setDescription(`Lamentablemente **${member.user.tag}** decidio irse del servidor, hasta luego.`)
                            .setImage("https://cdn.discordapp.com/attachments/880562658401722379/934945897954017310/komi-san-komi-shouko_2.gif")
                            .setColor("#FFCC8E")
                            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                            .setFooter({
                                text: `Ahora solo somos ${member.guild.memberCount} Miembros.`
                            })
                            .setTimestamp()
                    ]
                })
            }
        }
    }
}