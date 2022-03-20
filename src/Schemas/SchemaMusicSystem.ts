import { model, Schema } from "mongoose";

const Music = new Schema({
  ServerID: String,
  ServerName: String,
  MusicChannel: String,
  MusicMessage: String,
});

export default model("KomiMusic", Music);
