import { CommandType } from "./SlashCommands";

export class SlashCommandStructure {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}