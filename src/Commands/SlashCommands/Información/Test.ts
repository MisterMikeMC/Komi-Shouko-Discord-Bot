import { SlashCommandStructure } from "../../../SlashCommandsInterface/SlashCommandStructure";
export default new SlashCommandStructure({
    name: 'test',
    description: 'Prueba',
    options: [{
        name: 'one',
        description: 'a new test',
        type: "SUB_COMMAND",
        options: [{
            name: 'choise',
            description: 'a new choise',
            type: "STRING",
            choices: [{
                name: "choise1",
                value: 'a'
            }, {
                name: "choise2",
                value: 'b'
            }],
            required: true
        }]
    }],
    run: async ({ Komi, interaction }) => {
        interaction.followUp({
            content: "a",
            ephemeral: true
        })
    }
})