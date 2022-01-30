import { Command } from "../../../interfaces";
import { Util } from '../../../File Data/Util/Emojis.json'
import { OwnerID } from '../../../File Data/Data/Relevante.json'
const DB = require('../../../Schemas/SchemaMusicSystem')
export const command: Command = {
    display: "CheckDB.ts",
    name: "checkdb",
    aliases: [],
    description: "Mira el estado de la db.",
    syntaxis: "",
    category: "Owner",
    cooldown: {
        name: "CheckDBCooldown_",
        time: "5s"
    },
    onlyOwner: true,
	maintenance: false,
    run: async (Komi, message, args) => {
        if(message.author.id !== OwnerID) return
        const Data = DB.findOne({
            ServerID: message.guild.id
        })
        console.log(`${Data.MusicChannel}`)
        console.log(`${Data.MusicMessage}`)
        message.react(`${Util.Yes}`)
    }
}