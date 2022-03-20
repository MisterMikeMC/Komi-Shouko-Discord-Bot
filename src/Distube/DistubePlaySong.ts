import {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  BaseGuildTextChannel,
} from "discord.js";
import { Queue, Song } from "distube";
import { EventDistube } from "../interfaces";
import { Music } from "../Emojis.json";
const MusicData = require("../Schemas/SchemaMusicSystem");
export const distubeevent: EventDistube = {
  name: "playSong",
  run: async (Komi, queue: Queue, song: Song) => {
    let MusicSytem = await MusicData.findOne({
      ServerID: queue.id,
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
        let LoopValue;
        let RequestStatus;
        let VolumeNow;
        let LoopNow;
        let RequestNow;
        if (Queue) {
          PlayNow = Queue.songs[0];
          VolumeNow = Queue.volume;
          LoopNow = Komi.distube.setRepeatMode(queue.textChannel);
          RequestNow = PlayNow.user;
        } else {
          PlayNow = false;
          VolumeNow = false;
          LoopNow = false;
          RequestNow = false;
        }
        if (!PlayNow) {
          SongNowStatus = "*Nada...*";
        } else {
          SongNowStatus = `*[${PlayNow.name}](${PlayNow.url})*`;
        }
        if (!Queue) {
          QueueStatus = "*Nada...*";
        } else {
          QueueStatus = `${Queue.songs
            .map(
              (QueueSong, i) =>
                `\`${i + 1}\`.- __${QueueSong.name}__ - \`${
                  QueueSong.formattedDuration
                }\``
            )
            .join("\n")}`;
        }
        if (!VolumeNow) {
          VolumeStatus = `*100%*`;
        } else {
          VolumeStatus = `*${VolumeNow}%*`;
        }
        if (!LoopNow) {
          if (LoopNow === 0) {
            LoopValue = "Apagado.";
          } else if (LoopNow === 1) {
            LoopValue = "Song";
          } else if (LoopNow === 2) {
            LoopValue = "Queue";
          }
          LoopStatus = `*${LoopValue}*`;
        } else {
          LoopStatus = `*${LoopNow}*`;
        }
        if (!RequestNow) {
          RequestStatus = `*Nadie...*`;
        } else {
          RequestStatus = `*${RequestNow}*`;
        }
        let MusicChannelFinal = Komi.channels.resolve(
          MusicChannel
        ) as BaseGuildTextChannel;
        MusicChannelFinal.messages.fetch(MusicMessage).then((msg) => {
          msg.edit({
            content: `**Komi Queue:**\n\n${QueueStatus}`,
            embeds: [
              new MessageEmbed()
                .setTitle("¡Komi Music!")
                .addFields(
                  {
                    name: `Canción en reproducción:`,
                    value: `${SongNowStatus}`,
                    inline: false,
                  },
                  { name: `Volumen:`, value: `${VolumeStatus}`, inline: true },
                  { name: `Loop:`, value: `${LoopStatus}`, inline: true },
                  {
                    name: `Pedida por:`,
                    value: `${RequestStatus}`,
                    inline: true,
                  }
                )
                .setImage(`${PlayNow.thumbnail}`)
                .setColor("#4F00FF")
                .setFooter({
                  text: "Escribe tu canción en el chat.",
                  iconURL: `${Komi.user.displayAvatarURL()}`,
                }),
            ],
            components: [
              new MessageActionRow().addComponents(
                new MessageButton()
                  .setCustomId("musicButtonLoop")
                  .setStyle("SECONDARY")
                  .setEmoji(`${Music.ID.LoopPlaylist}`),
                new MessageButton()
                  .setCustomId("musicButtonPause")
                  .setStyle("SECONDARY")
                  .setEmoji(`${Music.ID.Pause}`),
                new MessageButton()
                  .setCustomId("musicButtonJoin")
                  .setStyle("SECONDARY")
                  .setEmoji(`${Music.ID.Stage}`),
                new MessageButton()
                  .setCustomId("musicButtonResume")
                  .setStyle("SECONDARY")
                  .setEmoji(`${Music.ID.Play}`),
                new MessageButton()
                  .setCustomId("musicButtonStop")
                  .setStyle("SECONDARY")
                  .setEmoji(`${Music.ID.Stop}`)
              ),
              new MessageActionRow().addComponents(
                new MessageButton()
                  .setCustomId("musicButtonPrevious")
                  .setStyle("SECONDARY")
                  .setEmoji(`${Music.ID.Previous}`),
                new MessageButton()
                  .setCustomId("musicButtonVolumeDown")
                  .setStyle("SECONDARY")
                  .setEmoji(`${Music.ID.VolumeDown}`),
                new MessageButton()
                  .setCustomId("musicButtonPlayNow")
                  .setStyle("SECONDARY")
                  .setEmoji(`${Music.ID.Youtube}`),
                new MessageButton()
                  .setCustomId("musicButtonVolumeUp")
                  .setStyle("SECONDARY")
                  .setEmoji(`${Music.ID.VolumeUp}`),
                new MessageButton()
                  .setCustomId("musicButtonSkip")
                  .setStyle("SECONDARY")
                  .setEmoji(`${Music.ID.Skip}`)
              ),
            ],
          });
        });
      } else {
        queue.textChannel.send({
          embeds: [
            new MessageEmbed()
              .setTitle("¡¡¡Reproduciendo!!!")
              .setDescription(
                `${Music.Playing} | Reproduciendo ahora: **${song.name}** - \`${song.formattedDuration}\``
              )
              .setColor("#5500ff"),
          ],
        });
      }
    }
  },
};
