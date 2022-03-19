export const MusicManger = (
  idChannel: number,
  action: string,
  musicTableId: number,
  messageOutput?: string,
  ephemeral?: boolean
) => {
  return console.log(
    `Params:\nidChannel: ${idChannel},\naction: ${action},\nmusicTableId: ${musicTableId},\nmessageOutput?: ${
      messageOutput || "Undefined"
    },\nephemeral?: ${ephemeral || false}`
  );
};
