import { Client, GuildMember, Interaction, MessageEmbed } from "discord.js";
import { Util } from "../../Emojis.json";
import { ExtendedInteraction } from "../../interfaces/SlashCommandsInterface";
import Komi from "../../Client/index";
import musicData from "../../Schemas/SchemaMusicSystem";
export const MusicManger = async (
  client: Client,
  interaction: Interaction,
  action?: string,
  musicTableId?: number | string,
  ephemeral?: boolean
): Promise<void> => {

  let Queue = Komi.distube.getQueue(interaction);

  let interactionExtended = interaction as ExtendedInteraction;
  let interactionMember = interaction.member as GuildMember;

  let musicSytem = await musicData.findOne({
    ServerID: interaction.guild.id,
  });
  if (musicSytem) {
    let musicChannel = musicSytem.MusicChannel;
    let musicMessage = musicSytem.MusicMessage;
    if (musicChannel && musicMessage) {
    }
  }

  if (action === "Loop") {
  } else if (action === "Pause") {
  } else if (action === "Join") {



    if (!interaction.guild.me.voice.channel) {
      let voiceChannel = interactionMember?.voice.channel;
      if (!voiceChannel) {
        interactionExtended.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `${Util.No} | Necesitas estar en un canal de voz.`
              )
              .setColor("#990000"),
          ],
        });
        return;
      } else if (
        interaction.guild.me.voice.channel &&
        voiceChannel.id !== interaction.guild.me.voice.channel.id
      ) {
        interactionExtended.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `${Util.No} | Debes estar en el mismo canal de voz que yo.`
              )
              .setColor("#990000"),
          ],
        });
        return;
      }
      Komi.distube.voices.join(voiceChannel).then((conection) => {
        interactionExtended.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `${Util.Yes} | Me he conectado a ${voiceChannel}.`
              )
              .setColor("#009900"),
          ],
          ephemeral: true,
        });
      });
    } else {
      if (Queue) {
        if (Queue.song[0]) {
          if (Queue.song[0].user.id !== interaction.user.id) {
            interactionExtended.reply({
              embeds: [
                new MessageEmbed()
                  .setDescription(
                    `${Util.No} | Si tu no solicistaste la canción en reproducción no me puedes hechar del canal.`
                  )
                  .setColor("#990000"),
              ],
              ephemeral: true,
            });
            return;
          }
        }
      }
      let voiceChannel = interactionMember?.voice.channel;
      if (!voiceChannel) {
        interactionExtended.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `${Util.No} | Necesitas estar en un canal de voz.`
              )
              .setColor("#990000"),
          ],
        });
        return;
      } else if (
        interaction.guild.me.voice.channel &&
        voiceChannel.id !== interaction.guild.me.voice.channel.id
      ) {
        interactionExtended.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `${Util.No} | Debes estar en el mismo canal de voz que yo.`
              )
              .setColor("#990000"),
          ],
        });
        return;
      }
      Komi.distube.voices.leave(voiceChannel);
      interactionExtended.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `${Util.Yes} | Me he desconectado de ${voiceChannel}.`
            )
            .setColor("#009900"),
        ],
        ephemeral: true,
      });
    }





  } else if (action === "Resume") {
  } else if (action === "Stop") {
  } else if (action === "Previous") {
  } else if (action === "VolumeDown") {
  } else if (action === "PlayingSong") {
  } else if (action === "VolumeUp") {
  } else if (action === "Skip") {
  } else {
    return interactionExtended.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(`${Util.No} | Hubo un fallo de configuración.`)
          .setColor("#990000"),
      ],
    });
  }
};
