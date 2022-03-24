import { Command } from "../../../interfaces";
import { Util } from "../../../Emojis.json";
export const command: Command = {
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
  run: async (Komi, message, args): Promise<void> => {
    console.clear();
    message.react(`${Util.Yes}`);
  },
};
