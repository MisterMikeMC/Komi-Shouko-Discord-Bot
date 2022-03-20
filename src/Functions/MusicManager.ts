import { Client } from "discord.js";
export const MusicManger = (
  client: Client,
  idChannel: number | string,
  action: string,
  musicTableId: number | string,
  messageOutput?: string,
  ephemeral?: boolean
) => {
  return console.log(
    `Params:clinet: ${client.user.tag},\nidChannel: ${idChannel},\naction: ${action},\nmusicTableId: ${musicTableId},\nmessageOutput?: ${
      messageOutput || "Undefined"
    },\nephemeral?: ${ephemeral || false}`
  );
};
