import {
  CommandInteractionOptionResolver,
  Interaction,
  MessageEmbed,
} from "discord.js";
import { Event } from "../interfaces";
import { Util } from "../Data/Emojis.json";
import { ExtendedInteraction } from "../interfaces/SlashCommandsInterface";
import { Modal, showModal, TextInputComponent } from "discord-modals";
export const event: Event = {
  name: "interactionCreate",
  run: async (Komi, interaction: Interaction): Promise<void> => {
    if (interaction.isCommand()) {
      const SlashCommand = Komi.slashcommands.get(interaction.commandName);
      if (!SlashCommand) {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(`${Util.No} | Estas usando un comando invalido.`)
              .setColor("#BE0000"),
          ],
          ephemeral: true,
        });
      } else {
        SlashCommand.run({
          args: interaction.options as CommandInteractionOptionResolver,
          Komi,
          interaction: interaction as ExtendedInteraction,
        });
      }
    } else if (interaction.isButton()) {
      if (interaction.customId === "modalButton") {
        showModal(
          new Modal()
            .setCustomId("modal")
            .setTitle("Test of Discord-Modals!")
            .addComponents(
              new TextInputComponent()
                .setCustomId("textinput-customid")
                .setLabel("Some text Here")
                .setStyle("SHORT")
                .setMinLength(4)
                .setMaxLength(10)
                .setPlaceholder("Write a text here")
                .setRequired(true)
            ),
          {
            client: Komi,
            interaction: interaction,
          }
        );
      }
    }
  },
};
