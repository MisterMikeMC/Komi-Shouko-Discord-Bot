import { Command } from "../../../interfaces";
import { kiss } from 'random-gif-api'
import { MessageEmbed } from "discord.js";
import { Util } from "../../../File Data/Util/Emojis.json";
export const command: Command = {
    display: "Kiss.ts",
    name: "kiss",
    aliases: [],
    description: "Toma hasta que la vida no valga nada.",
    syntaxis: "",
    category: "Interacción",
    cooldown: {
        name: "KissCooldown_",
        time: "1m"
    },
    onlyOwner: false,
    maintenance: false,
    run: async (Komi, message, args) => {
        let Usuario = message.mentions.users.first()
        if (!Usuario) {
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${Util.No} | Debes mencionara alguien.`)
                        .setColor("#990000")
                ]
            })
            return;
        } else if(Usuario.id === message.author.id) {
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${Util.No} | No puedes mencionarte a ti mismo.`)
                        .setColor("#990000")
                ]
            })
            return;
        } else if(Usuario.bot) {
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${Util.No} | No puedes mencionar a un bot.`)
                        .setColor("#990000")
                ]
            })
            return;
        }
        kiss().then((img) => {
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Kiss ♡w♡")
                        .setDescription(`**${message.author.tag}** besó a **${Usuario.tag}**.`)
                        .setImage(`${img}`)
                        .setColor("RANDOM")
                ]
            })
        })
    }
}