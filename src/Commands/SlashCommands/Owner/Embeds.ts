import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { SlashCommandStructure } from "../../../SlashCommandsInterface/SlashCommandStructure";
import { Util } from '../../../File Data/Util/Emojis.json'
export default new SlashCommandStructure({
    name: 'owner-embeds',
    description: 'Sistema de embeds exclusivo del owener de Komi.',
    options: [
        {
            name: 'embedtype',
            description: 'Embed a enviar.',
            type: 'STRING',
            choices: [
                {
                    name: 'verificación',
                    value: 'verificacion'
                },
                {
                    name: 'bienvenida',
                    value: 'bienvenida'
                },
                {
                    name: 'despedida',
                    value: 'despedida'
                },
            ],
            required: true
        }
    ],
    run: async ({ Komi, interaction }) => {
        let Type = interaction.options.getString('embedtype')
        if (Type === 'verificacion') {
            interaction.channel.send({
                embeds: [
                    new MessageEmbed().setTitle("Verificación").setDescription(`Para poder Verificarte solo debes de precionar el boton con el emoji ${Util.Yes}`).setColor("#F6A4FF").setImage("https://cdn.discordapp.com/attachments/880562658401722379/934945895420690512/7346b5cdfe464210f2b40c432de63cf1.gif")
                ],
                components: [
                    new MessageActionRow().addComponents(new MessageButton().setCustomId("verificationButton").setStyle("SUCCESS").setEmoji("880884055489515630"))
                ]
            })
            interaction.deleteReply()
        } else if (Type === 'bienvenida') {
            interaction.channel.send({
                embeds: [
                    new MessageEmbed().setTitle("¡Bienvenido(a) al soporte de Komi Shouko!").setDescription(`¡Hola **${interaction.user.tag}**, bienvenido(a) al soporte de **🌸 Komi Shouko 🌸** esperamos que sea de tu agrado este servidor.`).setImage("https://cdn.discordapp.com/attachments/880562658401722379/934945897295527956/komi-san-komi-shouko_1.gif").setColor("#FFCC8E").setThumbnail(interaction.user.displayAvatarURL({ dynamic: true })).setFooter({ text: `¡Wow contigo ya somos ${interaction.guild.memberCount} Miembros!` }).setTimestamp()
                ]
            })
            interaction.deleteReply()
        } else if (Type === 'despedida') {
            interaction.channel.send({
                embeds: [
                    new MessageEmbed().setTitle("Bye bye~").setDescription(`Lamentablemente **${interaction.user.tag}** decidio irse del servidor, hasta luego.`).setImage("https://cdn.discordapp.com/attachments/880562658401722379/934945897954017310/komi-san-komi-shouko_2.gif").setColor("#FFCC8E").setThumbnail(interaction.user.displayAvatarURL({ dynamic: true })).setFooter({ text: `Ahora solo somos ${interaction.guild.memberCount} Miembros.` }).setTimestamp()
                ]
            })
            interaction.deleteReply()
        }
    }
})