import { MessageEmbed } from "discord.js";
import { EventDistube } from "../interfaces";
export const distubeevent: EventDistube = {
  name: "error",
  run: async (Komi, channel, error) => {
    console.log("Hubo un error");
    console.log(channel);
    console.log(error);
  },
};
