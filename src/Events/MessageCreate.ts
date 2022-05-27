import { Event, Command } from "../interfaces";
import { Message, MessageEmbed } from "discord.js";
import { Util, Music } from "../Data/Emojis.json";
import ms from "ms";
import prms from "pretty-ms";
import { fetch, add, delete as remove } from "quick.db";
import MusicData from "../Schemas/SchemaMusicSystem";
export const event: Event = {
  name: "messageCreate",
  run: async (Komi, message: Message): Promise<Message<boolean>> => {
    /* Declaraciones */
    let Prefix = "k!";
    let MusicaDatos = await MusicData.findOne({
      ServerID: message.guild.id,
    });
    /* Command Handler */
    if (
      !message.author.bot &&
      message.guild &&
      message.content.startsWith(Prefix)
    ) {
      const args: string[] = message.content
        .slice(Prefix.length)
        .trim()
        .split(/ +/g);
      const Command: string = args.shift().toLowerCase();
      let ExecuteCommand: Command =
        Komi.commands.get(Command) || Komi.aliases.get(Command);
      if (ExecuteCommand) {
        if (message.author.id !== "437308398845952001") {
          let CommandCooldownName = `${ExecuteCommand.cooldown.name}`;
          let CommandCooldownTime = ms(`${ExecuteCommand.cooldown.time}`);
          let UserCooldown = fetch(
            `${CommandCooldownName}${message.author.id}`
          );
          if (Date.now() < UserCooldown) {
            let CooldownRestante = UserCooldown - Date.now();
            let Timer = prms(CooldownRestante, { verbose: true })
              .replace("hours", "horas")
              .replace("minutes", "minutos y")
              .replace("milliseconds", "milisegundos")
              .replace("seconds", "segundos")
              .replace("hour", "hora")
              .replace("minute", "minuto");

            message.reply({
              embeds: [
                new MessageEmbed()
                  .setDescription(
                    `${Util.No} | Estás en cooldown, te quedan **${Timer}**.`
                  )
                  .setColor("#990000"),
              ],
            });

            return;
          }
          remove(`${CommandCooldownName}${message.author.id}`);
          add(
            `${CommandCooldownName}${message.author.id}`,
            Date.now() + CommandCooldownTime
          );
        }
        (ExecuteCommand as Command).run(Komi, message, args);
      } else {
        message.reply({
          embeds: [
            new MessageEmbed()
              .setTitle(`${Util.No} Comando no encontrado. ${Util.No}`)
              .setDescription(`Oops, no tengo el comando \`${Command}\`.`)
              .setColor("#5500FF")
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/880562658401722379/934945808028155934/komi-san-komi-cant-communicate.gif"
              )
              .setFooter({
                text: `Usa ${Prefix}help para ver mis comandos.`,
                iconURL: `${message.author.displayAvatarURL({
                  dynamic: true,
                })}`,
              })
              .setTimestamp(),
          ],
        });
      }
    }
  },
};
