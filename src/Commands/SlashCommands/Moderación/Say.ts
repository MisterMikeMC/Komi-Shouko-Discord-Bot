import { SlashCommandStructure } from "../../../SlashCommandsInterface/SlashCommandStructure";
import { Util } from '../../../File Data/Util/Emojis.json'
export default new SlashCommandStructure({
    name: 'say',
    description: 'Repito lo que me digas.',
    options: [
        {
            name: 'mensaje',
            description: 'Mensaje que repetire.',
            type: 'STRING',
            required: true
        }
    ],
    run: async ({ Komi, interaction }) => {
        let Message = interaction.options.getString('mensaje');
        //@ts-ignore
        var Perms = interaction.member.permissions.has('MANAGE_MESSAGES')
        if (interaction.user.id !== '437308398845952001') {
            if (!Perms) {
                interaction.reply({
                    content: `${Util.No} | Debes tener el permiso de **__ADMINISTRADOR__** para poder usar este comando.`,
                    ephemeral: true
                })
                return;
            }
        }
        interaction.reply({
            content: `${Util.Yes} | Se ha mandado el mensaje.`,
            ephemeral: true
        })
        interaction.channel.send({
            content: `${Message}`
        })
    }
})