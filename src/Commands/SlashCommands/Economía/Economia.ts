import { SlashCommandStructure } from "../../../interfaces/SlashCommand";
import { Modal, TextInputComponent, showModal } from "discord-modals";
export default new SlashCommandStructure({
  name: "economía",
  description: "Sub SlashCommands de Economía.",
  options: [
    {
      name: "register",
      description: "Registra un perfil para la economía.",
      type: "SUB_COMMAND",
    },
    {
      name: "login",
      description: "Logeate para acceder a la economía.",
      type: "SUB_COMMAND",
    },
    {
      name: "logout",
      description: "Cierra la sesión de tu perfil de la economía.",
      type: "SUB_COMMAND",
    },
    {
      name: "balance",
      description: "Muestra tu saldo de la economía.",
      type: "SUB_COMMAND",
    },
    {
      name: "work",
      description: "Trabaja en para obtener dinero.",
      type: "SUB_COMMAND",
    },
    {
      name: "deposit",
      description: "Deposita dinero en el banco.",
      type: "SUB_COMMAND",
    },
    {
      name: "withdraw",
      description: "Saca dinero del banco.",
      type: "SUB_COMMAND",
    },
    {
      name: "leaderboard",
      description: "Muestra el ranking de la economía.",
      type: "SUB_COMMAND",
    },
    {
      name: "shop",
      description: "Muestra la tienda de la economía.",
      type: "SUB_COMMAND",
    },
    {
      name: "buy",
      description: "Compra un item de la tienda.",
      type: "SUB_COMMAND",
    },
    {
      name: "sell",
      description: "Vende un item para obtener dinero.",
      type: "SUB_COMMAND",
    },
    {
      name: "inventory",
      description: "Muestra tu inventario.",
      type: "SUB_COMMAND",
    },
    {
      name: "use",
      description: "Usa un item de tu inventario.",
      type: "SUB_COMMAND",
    },
    {
      name: "gift",
      description: "Envia un item a un usuario.",
      type: "SUB_COMMAND",
    },
    {
      name: "mine",
      description: "Trabaja en las minas para obterner materiales.",
      type: "SUB_COMMAND",
    },
    {
      name: "mine-info",
      description: "Muestra información de las minas disponibles para minar.",
      type: "SUB_COMMAND",
    },
    {
      name: "mine-select",
      description: "Selecciona una mina para trabajar.",
      type: "SUB_COMMAND",
    },
    {
      name: "fish",
      description: "Pesca en el lago para obtener peces.",
      type: "SUB_COMMAND",
    },
    {
      name: "fish-info",
      description: "Muestra información de los lagos disponibles para pescar.",
      type: "SUB_COMMAND",
    },
    {
      name: "fish-select",
      description: "Selecciona un lago para pescar.",
      type: "SUB_COMMAND",
    }
  ],
  run: async ({ Komi, interaction }): Promise<void> => {
    if (interaction.options.getSubcommand() === "register") {
      let ModalRegister = new Modal()
        .setCustomId("registerEconomy")
        .setTitle("Registro para la economía.")
        .addComponents(
          new TextInputComponent()
            .setCustomId("nicknameEconomy")
            .setLabel("Nickname de usuario:")
            .setRequired(true)
            .setPlaceholder("Nickname de usuario.")
            .setMinLength(1)
            .setMaxLength(15)
            .setStyle("SHORT"),
          new TextInputComponent()
            .setCustomId("usernameEconomy")
            .setLabel("Nombre de usuario:")
            .setRequired(true)
            .setPlaceholder("Username")
            .setMinLength(1)
            .setMaxLength(15)
            .setStyle("SHORT"),
          new TextInputComponent()
            .setCustomId("passwordEconomy")
            .setLabel("Contraseña:")
            .setRequired(true)
            .setPlaceholder("Password")
            .setMinLength(8)
            .setMaxLength(50)
            .setStyle("SHORT")
        );
      showModal(ModalRegister, {
        client: Komi,
        interaction: interaction,
      });
    } else if (interaction.options.getSubcommand() === "login") {
      let ModalRegister = new Modal()
        .setCustomId("loginEconomy")
        .setTitle("Logeate para acceder a la economía.")
        .addComponents(
          new TextInputComponent()
            .setCustomId("usernameLogin")
            .setLabel("Nombre de usuario:")
            .setRequired(true)
            .setPlaceholder("Username")
            .setMinLength(1)
            .setMaxLength(15)
            .setStyle("SHORT"),
          new TextInputComponent()
            .setCustomId("passwordLogin")
            .setLabel("Contraseña:")
            .setRequired(true)
            .setPlaceholder("Password")
            .setMinLength(8)
            .setMaxLength(50)
            .setStyle("SHORT")
        );
      showModal(ModalRegister, {
        client: Komi,
        interaction: interaction,
      });
    } else if (interaction.options.getSubcommand() === "logout") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "balance") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "work") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "deposit") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "withdraw") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "leaderboard") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "shop") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "buy") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "sell") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "inventory") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "use") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "gift") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "mine") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "mine-info") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "mine-select") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "fish") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "fish-info") {
      console.log("SlashCommand.");
    } else if (interaction.options.getSubcommand() === "fish-select") {
      console.log("SlashCommand.");
    }
  },
});
