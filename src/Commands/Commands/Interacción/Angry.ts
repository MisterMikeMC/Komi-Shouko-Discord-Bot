import { Command } from "../../../interfaces";
import { angry } from "random-gif-api";
import { MessageEmbed } from "discord.js";
export const command: Command = {
  display: "Angry.ts",
  name: "angry",
  aliases: ["rage"],
  description: "Ponte furioso.",
  syntaxis: "",
  category: "Interacción",
  cooldown: {
    name: "AngryCooldown_",
    time: "1m",
  },
  onlyOwner: false,
  maintenance: false,
  run: async (Komi, message, args): Promise<void> => {
    angry().then((img): void => {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Angry >:|")
            .setDescription(`**${message.author.tag}** se ha enojado.`)
            .setImage(`${img}`)
            .setColor("RANDOM"),
        ],
      });
    });
  },
};
