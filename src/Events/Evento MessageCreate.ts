// @ts-nocheck
import { Event, Command } from '../interfaces'
import { Message, MessageEmbed, MessageActionRow, MessageButton } from 'discord.js'
import { Util, Music } from '../File Data/Util/Emojis.json'
import { OwnerID } from '../File Data/Data/Relevante.json'
import ms from 'ms'
import prms from 'pretty-ms'
import qdb from 'quick.db'
const MusicData = require('../Schemas/SchemaMusicSystem')
export const event: Event = {
    name: 'messageCreate',
    run: async (Komi, message: Message) => {
        /* Declaraciones */
        let Prefix = "k!"
        let MusicaDatos = await MusicData.findOne({
            ServerID: message.guild.id
        });
        if (message.channel.type !== 'DM') {
            /* Sistema de Música */
            if (!message.author.bot && MusicaDatos) {
                let MusicChannel = MusicaDatos.MusicChannel;
                if (MusicChannel) {
                    if (message.channel.id === MusicChannel) {
                        let Song = message.content
                        message.delete()
                        if (!message.member.voice.channel) {
                            message.channel.send({
                                content: `${Util.No} | Debes de estar en un canal de voz.`,
                            }).then((msg) => {
                                setTimeout(() => {
                                    msg.delete()
                                }, 5000)
                            })
                            return;
                        }
                        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
                            message.channel.send({
                                content: `${Util.No} | Debes de estár en el mismo canal de voz que yo.`,
                            }).then((msg) => {
                                setTimeout(() => {
                                    msg.delete()
                                }, 5000)
                            })
                            return;
                        }
                        if (Song) {
                            await Komi.distube.play(message.member.voice.channel, Song, {
                                member: message.member,
                                textChannel: message.channel
                            })
                        }
                    }
                }
            }
            /* Canal de musica vacio (desconección forzada o bot apagado) */
            if (message.author.bot || !message.author.bot) {
                const Queue = Komi.distube.getQueue(message)
                if (!Queue) {
                    if (MusicaDatos) {
                        let MusicChannel = MusicaDatos.MusicChannel;
                        let MusicMessage = MusicaDatos.MusicMessage;
                        if (MusicChannel && MusicMessage) {
                            let PlayNow;
                            let QueueStatus;
                            let SongNowStatus;
                            let VolumeStatus;
                            let LoopStatus;
                            let LoopValue;
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
                                if (LoopNow === 0) {
                                    LoopValue = "Apagado."
                                } else if (LoopNow === 1) {
                                    LoopValue = "Song"
                                } else if (LoopNow === 2) {
                                    LoopValue = "Queue"
                                }
                                LoopStatus = `*${LoopValue}*`
                            } else {
                                LoopStatus = `*${LoopNow}*`
                            }
                            if (!RequestNow) {
                                RequestStatus = `*Nadie...*`
                            } else {
                                RequestStatus = `*${RequestNow}*`
                            }

                            Komi.channels.resolve(MusicChannel).messages.fetch(MusicMessage).then(msg => {
                                msg.edit({
                                    content: `**Komi Queue:**\n\n${QueueStatus}`,
                                    embeds: [
                                        new MessageEmbed().setTitle("¡Komi Music!").addFields({ name: `Canción en reproducción:`, value: `${SongNowStatus}`, inline: false }, { name: `Volumen:`, value: `${VolumeStatus}`, inline: true }, { name: `Loop:`, value: `${LoopStatus}`, inline: true }, { name: `Pedida por:`, value: `${RequestStatus}`, inline: true }).setImage('https://cdn.discordapp.com/attachments/930674284425265182/934614467705192478/standard_1.gif').setColor("#4F00FF").setFooter({ text: "Escribe tu canción en el chat.", iconURL: `${Komi.user.displayAvatarURL()}` })
                                    ],
                                    components: [
                                        new MessageActionRow().addComponents(new MessageButton().setCustomId("musicButtonLoop").setStyle("SECONDARY").setEmoji(`${Music.ID.LoopPlaylist}`), new MessageButton().setCustomId("musicButtonPause").setStyle("SECONDARY").setEmoji(`${Music.ID.Pause}`), new MessageButton().setCustomId("musicButtonJoin").setStyle("SECONDARY").setEmoji(`${Music.ID.Stage}`), new MessageButton().setCustomId("musicButtonResume").setStyle("SECONDARY").setEmoji(`${Music.ID.Play}`), new MessageButton().setCustomId("musicButtonStop").setStyle("SECONDARY").setEmoji(`${Music.ID.Stop}`)),
                                        new MessageActionRow().addComponents(new MessageButton().setCustomId("musicButtonPrevious").setStyle("SECONDARY").setEmoji(`${Music.ID.Previous}`), new MessageButton().setCustomId("musicButtonVolumeDown").setStyle("SECONDARY").setEmoji(`${Music.ID.VolumeDown}`), new MessageButton().setCustomId("musicButtonPlayNow").setStyle("SECONDARY").setEmoji(`${Music.ID.Youtube}`), new MessageButton().setCustomId("musicButtonVolumeUp").setStyle("SECONDARY").setEmoji(`${Music.ID.VolumeUp}`), new MessageButton().setCustomId("musicButtonSkip").setStyle("SECONDARY").setEmoji(`${Music.ID.Skip}`))
                                    ]
                                })
                            })
                        }
                    }
                }
            }
            /* Command Handler */
            if (!message.author.bot && message.guild && message.content.startsWith(Prefix)) {
                const args = message.content
                    .slice(Prefix.length)
                    .trim()
                    .split(/ +/g);
                const command = args
                    .shift()
                    .toLowerCase();
                let cmd = Komi.commands.get(command) || Komi.aliases.get(command)
                if (cmd) {
                    if (message.author.id !== `${OwnerID}`) {
                        let CMDCooldownName = `${cmd.cooldown.name}`
                        let CMDCooldownTime = ms(`${cmd.cooldown.time}`)
                        let Cooldown = qdb.fetch(`${CMDCooldownName}${message.author.id}`)
                        if (Date.now() < Cooldown) {
                            let CooldownRestante = Cooldown - Date.now()
                            let Timer = prms(CooldownRestante, { verbose: true })
                                .replace("hours", "Horas")
                                .replace("minutes", "Minutos y")
                                .replace("milliseconds", "Milisegundos")
                                .replace("seconds", "Segundos")
                                .replace("hour ", "Hora ")
                                .replace("minute ", "Minuto ")
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setDescription(`${Util.No} | Estás en cooldown, te quedan **${Timer}**.`)
                                        .setColor("#990000")
                                ]
                            })
                            return;
                        }
                        qdb.delete(`${CMDCooldownName}${message.author.id}`)
                        qdb.add(`${CMDCooldownName}${message.author.id}`, Date.now() + CMDCooldownTime)
                    }
                    (cmd as Command).run(Komi, message, args)
                } else {
                    message.reply({
                        embeds: [
                            new MessageEmbed()
                                .setTitle(`${Util.No} Comando no encontrado. ${Util.No}`)
                                .setDescription(`Oops, no tengo el comando \`${command}\`.`)
                                .setColor("#5500FF")
                                .setThumbnail("https://cdn.discordapp.com/attachments/880562658401722379/934945808028155934/komi-san-komi-cant-communicate.gif")
                                .setFooter({
                                    text: `Usa ${Prefix}help para ver mis comandos.`,
                                    iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`
                                })
                                .setTimestamp()
                        ]
                    })
                }
            }
        }
    },
}