import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { Command } from "../../../interfaces";
import { Util } from '../../../File Data/Util/Emojis.json'
const Music = require('../../../Schemas/SchemaMusicSystem')
export const command: Command = {
    display: "Setup.ts",
    name: "setup",
    aliases: [],
    description: "Crea un canal para la musica de Komi.",
    syntaxis: "",
    category: "Música",
    cooldown: {
        name: "PlayCooldown_",
        time: "10s"
    },
    onlyOwner: false,
    maintenance: false,
    run: async (Komi, message, args) => {
        let MusicaDatos = await Music.findOne({ ServerID: message.guild.id })
        if (!MusicaDatos) {
            let DataMusic = new Music({
                ServerID: message.guild.id,
                ServerName: message.guild.name,
                MusicChannel: "Undefined",
                MusicMessage: "Undefined"
            })
            await DataMusic.save()
            message.reply({
                content: `<a:Komi_Yes:880884055489515630> | Se registro el servidor, usa nuevamente el comando.`,
                allowedMentions: { repliedUser: false }
            })
            return;
        }
        let MusicChannel = MusicaDatos.MusicChannel;
        let MusicMessage = MusicaDatos.MusicMessage;
        try {
            if(MusicChannel !== 'Undefined' && message.guild.channels.cache.find(channel => channel.id === `${MusicChannel}`)){
                message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${Util.No} | Ya existe un canal de musica.`)
                            .setColor("#009900")
                        ]
                    })
                    return
                }
            } catch (error) {
                console.log(error)
            }
            
            let Queue = Komi.distube.getQueue(message)
            let PlayNow;
            let QueueStatus;
            let SongNowStatus;
            let VolumeStatus;
            let LoopStatus;
            let RequestStatus;
            let VolumeNow;
            let LoopNow;
            let RequestNow;

            if (Queue) {
                PlayNow = Queue.songs[0]
            VolumeNow = Queue.volume
            LoopNow = Queue.repeatMode
            RequestNow = PlayNow.user
        } else {
            PlayNow = false
            VolumeNow = false
            LoopNow = false
            RequestNow = false
        }
        
        if (!PlayNow) {
            SongNowStatus = "*Nada...*"
        } else {
            SongNowStatus = `*[${PlayNow.name}](${PlayNow.url})*`
        }
        if (!Queue) {
            QueueStatus = "*Nada...*"
        } else {
            QueueStatus = `${Queue.songs.map((QueueSong, i) => `\`${i + 1}\`.- __${QueueSong.name}__ - \`${QueueSong.formattedDuration}\``).join("\n")}`
        }
        if (!VolumeNow) {
            VolumeStatus = `*100%*`
        } else {
            VolumeStatus = `*${VolumeNow}%*`
        }
        if (!LoopNow) {
            LoopStatus = "*Apagado.*"
        } else {
            LoopStatus = `*${LoopNow}*`
        }
        if (!RequestNow) {
            RequestStatus = `*Nadie...*`
        } else {
            RequestStatus = `*${RequestNow}*`
        }
        const ButtonLine1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("musicButtonLoop")
                    .setStyle("SECONDARY")
                    .setEmoji("880916354591518750"),
                new MessageButton()
                    .setCustomId("musicButtonPause")
                    .setStyle("SECONDARY")
                    .setEmoji("880916295749603409"),
                new MessageButton()
                    .setCustomId("musicButtonJoin")
                    .setStyle("SECONDARY")
                    .setEmoji("912474426992394310"),
                new MessageButton()
                    .setCustomId("musicButtonResume")
                    .setStyle("SECONDARY")
                    .setEmoji("880916317006336040"),
                new MessageButton()
                    .setCustomId("musicButtonStop")
                    .setStyle("SECONDARY")
                    .setEmoji("880916336417591337"),
            )
        const ButtonLine2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("musicButtonPrevious")
                    .setStyle("SECONDARY")
                    .setEmoji("909273239769993256"),
                new MessageButton()
                    .setCustomId("musicButtonVolumeDown")
                    .setStyle("SECONDARY")
                    .setEmoji("915037333726830612"),
                new MessageButton()
                .setCustomId("musicButtonPlayNow")
                    .setStyle("SECONDARY")
                    .setEmoji("885986305828352045"),
                    new MessageButton()
                    .setCustomId("musicButtonVolumeUp")
                    .setStyle("SECONDARY")
                    .setEmoji("915037333798158347"),
                    new MessageButton()
                    .setCustomId("musicButtonSkip")
                    .setStyle("SECONDARY")
                    .setEmoji("880916399634149427"),
                    )
                    const MusicTableEmbed = new MessageEmbed()
                    .setTitle("¡Komi Music!")
                    .addFields(
                        {
                            name: `Canción en reproducción:`,
                            value: `${SongNowStatus}`,
                            inline: false
                        },
                        {
                            name: `Volumen:`,
                            value: `${VolumeStatus}`,
                            inline: true
                        },
                        {
                            name: `Loop:`,
                            value: `${LoopStatus}`,
                            inline: true
                        },
                        {
                            name: `Pedida por:`,
                            value: `${RequestStatus}`,
                            inline: true
                        },
                        
                        )
                        .setImage(`https://cdn.discordapp.com/attachments/930674284425265182/934614467705192478/standard_1.gif`)
                        .setColor("#4F00FF")
                        .setFooter({
                text: "Escribe tu canción en el chat.",
                iconURL: `${Komi.user.displayAvatarURL()}`
            })
            message.guild.channels.create("Komi-music", {
                type: "GUILD_TEXT",
                permissionOverwrites: [
                    {
                        id: Komi.user.id,
                        allow: [
                            "VIEW_CHANNEL",
                            "SEND_MESSAGES",
                            "EMBED_LINKS"
                        ]
                    }
                ]
            })
            .then(async musicChannel => {
                await Music.findOneAndUpdate(
                    {
                        MusicChannel: musicChannel.id
                    }
                    )
                    musicChannel.send({
                        content: `**Komi Queue:**\n\n${QueueStatus}`,
                        embeds: [
                            MusicTableEmbed
                        ],
                        components: [
                            ButtonLine1,
                            ButtonLine2
                        ]
                    }).then(async musicMessage => {
                        await Music.findOneAndUpdate(
                            {
                                MusicMessage: musicMessage.id
                            }
                            )
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setDescription(`${Util.Yes} | Canal de música creado: <#${musicChannel.id}>`)
                                    .setColor("#009900")
                                ],
                                allowedMentions: {
                                    repliedUser: false
                                }
                            })
                        })
            })
    }
}
