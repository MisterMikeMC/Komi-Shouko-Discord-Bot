import { Schema, model } from 'mongoose'

const Configs = new Schema(
    {
        ServerID: String,
        ServerName: String,
        ServerPrefix: {
            type: String,
            default: "n!"
        },
        KomiInSeverStatus: Boolean,
        ServerMessageJoin: Boolean
    }
);

module.exports = model('KomiServerData', Configs)