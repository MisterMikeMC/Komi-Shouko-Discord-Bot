import { model, Schema } from "mongoose";

const Music = new Schema({
  ServerID: String,
  ServerName: String,
  MusicChannel: String,
  MusicMessage: String,
});

module.exports = model("KomiMusic", Music);
