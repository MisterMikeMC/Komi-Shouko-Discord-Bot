import { Command } from "../../../interfaces";
import { Util } from "../../../File Data/Util/Emojis.json";
import { OwnerID } from "../../../File Data/Data/Relevante.json";
export const command: Command = {
  display: "Clear Console.ts",
  name: "cls",
  aliases: [],
  description: "Has un console.clear().",
  syntaxis: "",
  category: "Owner",
  cooldown: {
    name: "ClsCooldown_",
    time: "5s",
  },
  onlyOwner: true,
  maintenance: false,
  run: async (Komi, message, args) => {
    if (message.author.id !== OwnerID) return;
    console.clear();
    message.react(`${Util.Yes}`);
  },
};
