import { MessageEmbed } from "discord.js";
import { Command } from "../../../interfaces";
import { Util } from '../../../File Data/Util/Emojis.json'
export const command: Command = {
    display: "Uptime.ts",
    name: "uptime",
    aliases: ["online-time"],
    description: "Revisa cuanto tiempo lleva Komi-san en linea.",
    syntaxis: "",
    category: "Información",
    cooldown: {
        name: "UptimeCooldown_",
        time: "10s"
    },
    onlyOwner: false,
    maintenance: false,
    run: async (Komi, message, args) => {
        const Semanas = Math.round(Komi.uptime / 1000 / 60 / 60 / 24 / 7);
        const Dias = Math.round(Komi.uptime / 1000 / 60 / 60 / 24);
        const Horas = Math.round(Komi.uptime / 1000 / 60 / 60);
        const Minutos = Math.round(Komi.uptime / 1000 / 60);
        const Segundos = Math.round(Komi.uptime / 1000);
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle("¡Uptime!")
                    .setDescription(`${Util.Arrow} Llevo en linea: \`${Semanas | 0} W\` \`${Dias | 0} D\` \`${Horas | 0} H\` \`${Minutos | 0} M\` \`${Segundos} S\`.`)
                    .setColor("#00FCFF")
            ]
        })
    }
}