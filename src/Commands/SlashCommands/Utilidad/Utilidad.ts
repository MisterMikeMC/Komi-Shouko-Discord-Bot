import { GuildMember } from "discord.js";
import { SlashCommandStructure } from "../../../interfaces/SlashCommand";
import { Util } from "../../../Data/Emojis.json";
export default new SlashCommandStructure({
  name: "utilidad",
  description: "Sub SlashCommands de Utilidad.",
  options: [
    {
      name: "say",
      description: "Repito lo que me digas.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "mensaje",
          description: "Mensaje que repetiré.",
          type: "STRING",
          required: true,
        },
      ],
    },
  ],
  run: async ({ Komi, interaction }): Promise<void> => {
    if (interaction.options.getSubcommand() === "say") {
      let Message = interaction.options.getString("mensaje");
      let InteractionMember = interaction.member as GuildMember;
      if (interaction.user.id !== "437308398845952001") {
        if (!InteractionMember.permissions.has("MANAGE_MESSAGES")) {
          interaction.reply({
            content: `${Util.No} | Debes tener el permiso de **__ADMINISTRADOR__** para poder usar este comando.`,
            ephemeral: true,
          });
          return;
        }
      }
      interaction.reply({
        content: `${Util.Yes} | Se ha mandado el mensaje.`,
        ephemeral: true,
      });
      interaction.channel.send({
        content: `${Message}`,
      });
    }
  },
});
