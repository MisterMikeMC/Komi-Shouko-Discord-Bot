import { Util } from "../../Data/Emojis.json";
import UserGlobalProfileData from "../../Schemas/UserData";
export let Logout = async (interaction): Promise<void> => {
  let userData = await UserGlobalProfileData.findOne({
    userId: interaction.user.id,
  });
  if (userData && !userData.loggedIn.isLogged) {
    interaction.reply({
      content: `${Util.No} | No estas logeado.`,
      ephemeral: true,
    });
    return;
  }
  if (userData) {
    await UserGlobalProfileData.findOneAndUpdate({
      loggedIn: {
        isLogged: false,
        loggedAs: "",
      },
    });
    interaction.reply({
      content: `${Util.Yes} | Te has deslogeado correctamente.`,
    });
    return;
  } else {
    interaction.reply({
      content: `${Util.No} | No estas logeado.`,
    });
    return;
  }
};
