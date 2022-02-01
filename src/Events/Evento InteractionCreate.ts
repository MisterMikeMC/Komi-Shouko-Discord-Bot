import { CommandInteractionOptionResolver, Interaction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { Event } from '../interfaces'
import { Util, Music } from '../File Data/Util/Emojis.json'
import { ExtendedInteraction } from '../SlashCommandsInterface/SlashCommands';
import ms from 'ms'
import prms from 'pretty-ms'
import qdb from 'quick.db'
const MusicData = require('../Schemas/SchemaMusicSystem')
export const event: Event = {
    name: 'interactionCreate',
    run: async (Komi, interaction: Interaction) => {
        if (interaction.isCommand()) {
            await interaction.deferReply();
            const SlashCommand = Komi.slashcommands.get(interaction.commandName);
            if (!SlashCommand) {
                interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${Util.No} | Estas usando un comando invalido.`)
                            .setColor("#BE0000")
                    ]
                })
            } else {
                SlashCommand.run({
                    args: interaction.options as CommandInteractionOptionResolver,
                    Komi,
                    interaction: interaction as ExtendedInteraction
                })
            }
        } else if (interaction.isButton()) {
            let Queue = Komi.distube.getQueue(interaction);
            let ID = interaction.customId;
            if (ID === 'verificationButton') {
                if (interaction.guild.id !== '887356477222834196') {
                    interaction.reply({
                        content: "<a:Nekoraisu_No:880883974279426089> | El boton de verificació NO tienen función si no están en mi servidor __🌸 Simps de Nekoraisu 🌸__",
                        ephemeral: true
                    })
                    return;
                }
                //@ts-ignore
                if (!interaction.member.roles.cache.has('888224970403106856')) {
                    //@ts-ignore
                    interaction.member.roles.add('888224970403106856')
                    interaction.reply({
                        content: `<:Nekoraisu_Rem_Hate:885986751062085652> | Has obtenido el rol de <@&888224970403106856>`,
                        ephemeral: true
                    })
                } else {
                    //@ts-ignore
                    interaction.member.roles.remove('888224970403106856')
                    interaction.reply({
                        content: `<:Nekoraisu_Ram_Hate:885986787154100234> | Se te ha removido el rol de <@&888224970403106856>`,
                        ephemeral: true
                    })
                }
            }
            if (ID === 'musicButtonLoop' || ID === 'musicButtonPause' || ID === 'musicButtonJoin' || ID === 'musicButtonResume' || ID === 'musicButtonStop' || ID === 'musicButtonPrevious' || ID === 'musicButtonVolumeDown' || ID === 'musicButtonPlayNow' || ID === 'musicButtonVolumeUp' || ID === 'musicButtonSkip') {
                let CMDCooldownName = "InteractionMusicButtonsCooldown_"
                let CMDCooldownTime = ms("6s")
                let Cooldown = qdb.fetch(`${CMDCooldownName}${interaction.user.id}`)
                if (Date.now() < Cooldown) {
                    let CooldownRestante = Cooldown - Date.now()
                    let Timer = prms(CooldownRestante, { verbose: true })
                        .replace("hours", "Horas")
                        .replace("minutes", "Minutos y")
                        .replace("milliseconds", "Milisegundos")
                        .replace("seconds", "Segundos")
                        .replace("hour ", "Hora ")
                        .replace("minute ", "Minuto ")
                    interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setDescription(`${Util.No} | Estás en cooldown, te quedan **${Timer}**.`)
                                .setColor("#990000")
                        ],
                        ephemeral: true
                    })
                    return;
                }
                qdb.delete(`${CMDCooldownName}${interaction.user.id}`)
                qdb.add(`${CMDCooldownName}${interaction.user.id}`, Date.now() + CMDCooldownTime)
                if (ID === 'musicButtonLoop') {
                    if (!Queue) {
                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setDescription(`${Util.No} | No hay música en reporducción.`)
                                    .setColor("#990000")
                            ],
                            ephemeral: true
                        })
                        return;
                    }
                    let Loop = Komi.distube.setRepeatMode(interaction)
                    if (Loop === 1) {
                        Komi.distube.setRepeatMode(interaction, 0)
                        let RepeatMode: string;
                        if (Komi.distube.setRepeatMode(interaction) === 1) {
                            RepeatMode = "Song"
                        }
                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setDescription(`${Util.Yes} | Mi estado de loop ahora es **${RepeatMode}**.`)
                                    .setColor("#79FF00")
                            ],
                            ephemeral: true
                        })
                    }
                    if (Loop === 2) {
                        Komi.distube.setRepeatMode(interaction, 1)
                        let RepeatMode: string;
                        if (Komi.distube.setRepeatMode(interaction) === 2) {
                            RepeatMode = "Queue"
                        }
                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setDescription(`${Util.Yes} | Mi estado de loop ahora es **${RepeatMode}**.`)
                                    .setColor("#AF00FF")
                            ],
                            ephemeral: true
                        })
                    }
                    if (Loop === 0) {
                        Komi.distube.setRepeatMode(interaction, 2)
                        let RepeatMode: string;
                        if (Komi.distube.setRepeatMode(interaction) === 0) {
                            RepeatMode = "OFF"
                        }
                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setDescription(`${Util.Yes} | Mi estado de loop ahora es **${RepeatMode}**.`)
                                    .setColor("#BB0000")
                            ],
                            ephemeral: true
                        })
                    }
                    let PlayNow; let QueueStatus; let SongNowStatus; let VolumeStatus; let LoopStatus; let LoopValue; let RequestStatus; let VolumeNow; let LoopNow; let RequestNow;
                    if (Queue) {
                        PlayNow = Queue.songs[0]; VolumeNow = Queue.volume; LoopNow = Loop; RequestNow = PlayNow.user;
                    } else {
                        PlayNow = false; VolumeNow = false; LoopNow = false; RequestNow = false;
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
                        if (LoopNow === 0) {
                            LoopValue = "Apagado."
                        } else if (LoopNow === 1) {
                            LoopValue = "Song"
                        } else if (LoopNow === 2) {
                            LoopValue = "Queue"
                        }
                        LoopStatus = `*${LoopValue}*`
                    }
                    if (!RequestNow) {
                        RequestStatus = `*Nadie...*`
                    } else {
                        RequestStatus = `*${RequestNow}*`
                    }
                    let MusicSytem = await MusicData.findOne({
                        ServerID: interaction.guild.id
                    });
                    if (MusicSytem) {
                        let MusicChannel = MusicSytem.MusicChannel;
                        let MusicMessage = MusicSytem.MusicMessage;
                        if (MusicChannel && MusicMessage) {
                            // @ts-ignore
                            Komi.channels.resolve(MusicChannel).messages.fetch(MusicMessage).then(msg => {
                                msg.edit({
                                    content: `**Komi Queue:**\n\n${QueueStatus}`,
                                    embeds: [
                                        new MessageEmbed().setTitle("¡Komi Music!").addFields({ name: `Canción en reproducción:`, value: `${SongNowStatus}`, inline: false }, { name: `Volumen:`, value: `${VolumeStatus}`, inline: true }, { name: `Loop:`, value: `${LoopStatus}`, inline: true }, { name: `Pedida por:`, value: `${RequestStatus}`, inline: true }).setImage(`${PlayNow.thumbnail}`).setColor("#4F00FF").setFooter({ text: "Escribe tu canción en el chat.", iconURL: `${Komi.user.displayAvatarURL()}` })
                                    ],
                                    components: [
                                        new MessageActionRow().addComponents(new MessageButton().setCustomId("musicButtonLoop").setStyle("SECONDARY").setEmoji(`${Music.ID.LoopPlaylist}`), new MessageButton().setCustomId("musicButtonPause").setStyle("SECONDARY").setEmoji(`${Music.ID.Pause}`), new MessageButton().setCustomId("musicButtonJoin").setStyle("SECONDARY").setEmoji(`${Music.ID.Stage}`), new MessageButton().setCustomId("musicButtonResume").setStyle("SECONDARY").setEmoji(`${Music.ID.Play}`), new MessageButton().setCustomId("musicButtonStop").setStyle("SECONDARY").setEmoji(`${Music.ID.Stop}`)),
                                        new MessageActionRow().addComponents(new MessageButton().setCustomId("musicButtonPrevious").setStyle("SECONDARY").setEmoji(`${Music.ID.Previous}`), new MessageButton().setCustomId("musicButtonVolumeDown").setStyle("SECONDARY").setEmoji(`${Music.ID.VolumeDown}`), new MessageButton().setCustomId("musicButtonPlayNow").setStyle("SECONDARY").setEmoji(`${Music.ID.Youtube}`), new MessageButton().setCustomId("musicButtonVolumeUp").setStyle("SECONDARY").setEmoji(`${Music.ID.VolumeUp}`), new MessageButton().setCustomId("musicButtonSkip").setStyle("SECONDARY").setEmoji(`${Music.ID.Skip}`))
                                    ]
                                })
                            })
                        }
                    }
                } else if (ID === 'musicButtonPause') {
                    await interaction.deferUpdate()
                } else if (ID === 'musicButtonJoin') {
                    if (!interaction.guild.me.voice.channel) {
                        // @ts-ignore
                        let voiceChannel = interaction.member?.voice.channel;
                        if (!voiceChannel) {
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setDescription(`${Util.No} | Necesitas estar en un canal de voz.`)
                                        .setColor("#990000")
                                ]
                            })
                            return;
                        } else if (interaction.guild.me.voice.channel && voiceChannel.id !== interaction.guild.me.voice.channel.id) {
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setDescription(`${Util.No} | Debes estar en el mismo canal de voz que yo.`)
                                        .setColor("#990000")
                                ]
                            })
                            return;
                        }
                        Komi.distube.voices.join(voiceChannel).then(conection => {
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setDescription(`${Util.Yes} | Me he conectado a ${voiceChannel}.`)
                                        .setColor("#009900")
                                ],
                                ephemeral: true
                            })
                        })
                    } else {
                        if (Queue) {
                            if (Queue.song[0]) {
                                if (Queue.song[0].user.id !== interaction.user.id) {
                                    interaction.reply({
                                        embeds: [
                                            new MessageEmbed()
                                                .setDescription(`${Util.No} | Si tu no solicistaste la canción en reproducción no me puedes hechar del canal.`)
                                                .setColor("#990000")
                                        ],
                                        ephemeral: true
                                    })
                                    return;
                                }
                            }
                        }
                        // @ts-ignore
                        let voiceChannel = interaction.member?.voice.channel;
                        if (!voiceChannel) {
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setDescription(`${Util.No} | Necesitas estar en un canal de voz.`)
                                        .setColor("#990000")
                                ]
                            })
                            return;
                        } else if (interaction.guild.me.voice.channel && voiceChannel.id !== interaction.guild.me.voice.channel.id) {
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setDescription(`${Util.No} | Debes estar en el mismo canal de voz que yo.`)
                                        .setColor("#990000")
                                ]
                            })
                            return;
                        }
                        Komi.distube.voices.leave(voiceChannel)
                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setDescription(`${Util.Yes} | Me he desconectado de ${voiceChannel}.`)
                                    .setColor("#009900")
                            ],
                            ephemeral: true
                        })
                    }
                } else if (ID === 'musicButtonResume') {
                    await interaction.deferUpdate()
                } else if (ID === 'musicButtonStop') {
                    await interaction.deferUpdate()
                } else if (ID === 'musicButtonPrevious') {
                    await interaction.deferUpdate()
                } else if (ID === 'musicButtonVolumeDown') {
                    await interaction.deferUpdate()
                } else if (ID === 'musicButtonPlayNow') {
                    await interaction.deferUpdate()
                } else if (ID === 'musicButtonVolumeUp') {
                    await interaction.deferUpdate()
                } else if (ID === 'musicButtonSkip') {
                    await interaction.deferUpdate()
                }
            }
        }
    },
}