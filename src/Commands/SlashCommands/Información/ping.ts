import { MessageEmbed } from 'discord.js';
import { SlashCommandStructure } from '../../../SlashCommandsInterface/SlashCommandStructure'
import { Ping } from '../../../File Data/Util/Emojis.json'
export default new SlashCommandStructure({
    name: 'ping',
    description: 'Muestra el ping de Komi-san.',
    run: async ({ Komi, interaction }) => {
        let EmojiPing1 = Ping.Ping1; let EmojiPing2 = Ping.Ping2; let EmojiPing3 = Ping.Ping3; let EmojiPing4 = Ping.Ping4; let EmojiPing5 = Ping.Ping5; let PingEmojiFinal1; let PingEmojiFinal2;
        let PingRespuesta = Date.now() - interaction.createdTimestamp;
        let PingApi = Komi.ws.ping;
        let Color;
        if (PingRespuesta <= 60) {
            PingEmojiFinal1 = EmojiPing5
        } else if (PingRespuesta >= 61 && PingRespuesta <= 100) {
            PingEmojiFinal1 = EmojiPing4;
        } else if (PingRespuesta >= 101 && PingRespuesta <= 150) {
            PingEmojiFinal1 = EmojiPing3;
        } else if (PingRespuesta >= 151 && PingRespuesta <= 200) {
            PingEmojiFinal1 = EmojiPing2;
        } else if (PingRespuesta >= 201) {
            PingEmojiFinal1 = EmojiPing1
        }
        if (PingApi <= 60) {
            PingEmojiFinal2 = EmojiPing5
            Color = "0x2BFF00"
        } else if (PingApi >= 61 && PingApi <= 100) {
            PingEmojiFinal2 = EmojiPing4
            Color = "0xFFF300"
        } else if (PingApi >= 101 && PingApi <= 150) {
            PingEmojiFinal2 = EmojiPing3
            Color = "0xFF9B00"
        } else if (PingApi >= 151 && PingApi <= 200) {
            PingEmojiFinal2 = EmojiPing2
            Color = "0xFF0000"
        } else if (PingApi >= 201) {
            PingEmojiFinal2 = EmojiPing1
            Color = "0x930000"
        }
        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle("¡Ping de Komi-san!")
                    .addFields(
                        { name: `\`Ping de Respuesta:\``, value: `> ¡**__${PingRespuesta}__** ms! ${PingEmojiFinal1}`, inline: false },
                        { name: `\`Ping de la API:\``, value: `> ¡**__${PingApi}__** ms! ${PingEmojiFinal2}`, inline: false },
                        { name: `\`Ram usada:\``, value: `> **__${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}__** MB`, inline: false }
                    )
                    .setFooter({
                        text: `Comando hecho por ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true
                        })
                    })
                    .setColor(Color)
                    .setTimestamp()
            ]
        })
    }
})