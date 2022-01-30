import { MessageEmbed } from 'discord.js'
import { Command } from "../../../interfaces";
import { Util } from '../../../File Data/Util/Emojis.json'
import { OwnerID } from '../../../File Data/Data/Relevante.json'
export const command: Command = {
    display: "HexColor.ts",
    name: "hex",
    aliases: [],
    description: "Has una preview de como se ve un color en Hexadecimal.",
    syntaxis: "<Codigo de color>",
    category: "Owner",
    cooldown: {
        name: "HexColorCooldown_",
        time: "10s"
    },
    onlyOwner: true,
    maintenance: false,
    run: async (Komi, message, args) => {
        if (message.author.id !== OwnerID) return
        let ColorHex = args[0]
        if (!ColorHex) {
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${Util.No} | Debes decir un color en Hexadecimal.`)
                        .setColor("#990000")
                ]
            })
            return;
        } else {
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${Util.Yes} | Este es el color **#${ColorHex}**.`)
                        .setColor(`#${ColorHex}`)
                ]
            })
        }
    }
}