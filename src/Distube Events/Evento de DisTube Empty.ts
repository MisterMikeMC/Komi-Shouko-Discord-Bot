import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js'
import { Queue } from "distube";
import { EventDistube } from "../interfaces";
import { Music } from '../File Data/Util/Emojis.json'
const MusicData = require('../Schemas/SchemaMusicSystem')
export const distubeevent:EventDistube = {
    name: 'empty',
    run: async(Komi, queue: Queue) => {
        let MusicSytem = await MusicData.findOne({
            ServerID: queue.id
        });
        if (MusicSytem) {
            let MusicChannel = MusicSytem.MusicChannel;
            let MusicMessage = MusicSytem.MusicMessage;
            if (queue.textChannel.id === MusicChannel) {
                let Queue = Komi.distube.getQueue(queue.textChannel);
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
                Komi.channels.resolve(MusicChannel).messages.fetch(MusicMessage).then(msg => {
                    msg.edit({
                        content: `**Komi Queue:**\n\n${QueueStatus}`,
                        embeds: [
                            new MessageEmbed().setTitle("¡Komi Music!").addFields({ name: `Canción en reproducción:`, value: `${SongNowStatus}`, inline: false }, { name: `Volumen:`, value: `${VolumeStatus}`, inline: true }, { name: `Loop:`, value: `${LoopStatus}`, inline: true }, { name: `Pedida por:`, value: `${RequestStatus}`, inline: true }).setImage("https://cdn.discordapp.com/attachments/930674284425265182/934614467705192478/standard_1.gif").setColor("#4F00FF").setFooter({ text: "Escribe tu canción en el chat.", iconURL: `${Komi.user.displayAvatarURL()}` })
                        ],
                        components: [
                            new MessageActionRow().addComponents(new MessageButton().setCustomId("musicButtonLoop").setStyle("SECONDARY").setEmoji(`${Music.ID.LoopPlaylist}`), new MessageButton().setCustomId("musicButtonPause").setStyle("SECONDARY").setEmoji(`${Music.ID.Pause}`), new MessageButton().setCustomId("musicButtonJoin").setStyle("SECONDARY").setEmoji(`${Music.ID.Stage}`), new MessageButton().setCustomId("musicButtonResume").setStyle("SECONDARY").setEmoji(`${Music.ID.Play}`), new MessageButton().setCustomId("musicButtonStop").setStyle("SECONDARY").setEmoji(`${Music.ID.Stop}`)),
                            new MessageActionRow().addComponents(new MessageButton().setCustomId("musicButtonPrevious").setStyle("SECONDARY").setEmoji(`${Music.ID.Previous}`), new MessageButton().setCustomId("musicButtonVolumeDown").setStyle("SECONDARY").setEmoji(`${Music.ID.VolumeDown}`), new MessageButton().setCustomId("musicButtonPlayNow").setStyle("SECONDARY").setEmoji(`${Music.ID.Youtube}`), new MessageButton().setCustomId("musicButtonVolumeUp").setStyle("SECONDARY").setEmoji(`${Music.ID.VolumeUp}`), new MessageButton().setCustomId("musicButtonSkip").setStyle("SECONDARY").setEmoji(`${Music.ID.Skip}`))
                        ]
                    })
                })
            }
        } else {
            return;
        }
    }
}