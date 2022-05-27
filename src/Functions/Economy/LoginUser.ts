import { compareSync } from "bcryptjs";
import { Util } from "../../Data/Emojis.json";
import LoginData from "../../Schemas/LoginData";
import UserGlobalProfileData from "../../Schemas/UserData";
export let Login = async (
  interaction,
  username: string,
  password: string
): Promise<void> => {
  let userData = await UserGlobalProfileData.findOne({
    userId: interaction.user.id,
  });
  if (userData && userData.loggedIn.isLogged) {
    await interaction.deferReply({ ephemeral: false });
    interaction.followUp({
      content: `${Util.No} | Ya estas logeado como **${userData.loggedIn.loggedAs}**, para deslogearte usa \`/economía logout\`.`,
    });
    return;
  }
  let userFind = await LoginData.findOne({
    username: username,
  });
  if (userFind) {
    let passwordCompare = await compareSync(password, userFind.password);
    if (username === userFind.username && passwordCompare) {
      if (userData) {
        await UserGlobalProfileData.findOneAndUpdate({
          loggedIn: {
            isLogged: true,
            loggedAs: `${userFind.nickname}`,
          },
        });
      } else {
        let newUserData = new UserGlobalProfileData({
          userId: interaction.user.id,
          badges: [],
          isBlacklisted: false,
          loggedIn: {
            isLogged: true,
            loggedAs: `${userFind.nickname}`,
          },
        });

        await newUserData.save();
      }
      await interaction.deferReply({ ephemeral: false });
      interaction.followUp({
        content: `${Util.Yes} | Bienvenido **${userFind.nickname}**.`,
      });
    }
  } else {
    await interaction.deferReply({ ephemeral: true });
    interaction.followUp({
      content: `${Util.No} | Usuario o contraseña incorrecta.`,
    });
  }
};
