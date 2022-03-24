import { Command } from "../../../interfaces";
import { Util } from "../../../Emojis.json";
import { MessageEmbed } from "discord.js";
export const command: Command = {
  name: "play",
  aliases: ["p"],
  description: "Reproduce música en un canal de voz.",
  syntaxis: "<Canción || URL de YouTube o Spotify>",
  category: "Música",
  cooldown: {
    name: "PlayCooldown_",
    time: "10s",
  },
  onlyOwner: false,
  maintenance: false,
  run: async (Komi, message, args) => {
    let Song = args.join(" ");
    if (!Song) {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `${Util.No} | Debes escribir una cancion para reproducir.`
            )
            .setColor("#990000"),
        ],
      });
      return;
    }
    if (!message.member.voice.channel) {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`${Util.No} | Debes estar en un canal de voz.`)
            .setColor("#990000"),
        ],
      });
      return;
    }
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    ) {
      message.reply({
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
    await Komi.distube.play(message.member.voice.channel, Song, {
      member: message.member,
      textChannel: message.channel,
    });
    message.delete();
  },
};
