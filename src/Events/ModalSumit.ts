import { Event } from "../interfaces";
import { Util } from "../Data/Emojis.json";
import LoginData from "../Schemas/LoginData";
import UserGlobalProfileData from "../Schemas/UserData";
import bcrypt from "bcryptjs";
export const event: Event = {
  name: "modalSubmit",
  run: async (Komi, interactionModal): Promise<void> => {
    if (interactionModal.customId === "registerEconomy") {
      let modalValueNickname =
        interactionModal.getTextInputValue("nicknameEconomy");
      let modalValueUsername =
        interactionModal.getTextInputValue("usernameEconomy");
      let modalValuePassword =
        interactionModal.getTextInputValue("passwordEconomy");
      let passwordHash = await bcrypt.hashSync(modalValuePassword, 10);
      let userFind = await LoginData.findOne({
        username: modalValueUsername,
      });
      if (userFind) {
        return interactionModal.reply(
          `${Util.No} | El usuario ya existe, intenta con otro nombre.`
        );
      } else {
        let userData = new LoginData({
          nickname: modalValueNickname,
          username: modalValueUsername,
          password: passwordHash,
        });
        await userData.save();
        interactionModal.reply(
          `${Util.Yes} | Usuario registrado con éxito, ya puedes acceder a la economía con \`/economía login\`.`
        );
      }
    } else if (interactionModal.customId === "loginEconomy") {
      let modalValueUsername =
        interactionModal.getTextInputValue("usernameLogin");
      let modalValuePassword =
        interactionModal.getTextInputValue("passwordLogin");
      let userData = await UserGlobalProfileData.findOne({
        userId: interactionModal.user.id,
      });
      if (userData) {
        if (userData.loggedIn.isLogged)
          return interactionModal.reply(
            `${Util.No} | Ya estas logeado como **${userData.loggedIn.loggedAs}**, para deslogearte usa \`/economía logout\`.`
          );
      }
      let userFind = await LoginData.findOne({
        username: modalValueUsername,
      });
      if (userFind) {
        let passwordHash = userFind.password;
        let passwordCompare = await bcrypt.compareSync(
          modalValuePassword,
          passwordHash
        );
        if (
          modalValueUsername === userFind.username &&
          passwordCompare === true
        ) {
          let userData = await UserGlobalProfileData.findOne({
            userId: interactionModal.user.id,
          });
          if (userData) {
            await UserGlobalProfileData.findOneAndUpdate({
              loggedIn: {
                isLogged: true,
                loggedAs: `${userFind.nickname}`,
              },
            });
          } else {
            let newUserData = new UserGlobalProfileData({
              userId: interactionModal.user.id,
              badges: [],
              isBlacklisted: false,
              loggedIn: {
                isLogged: true,
                loggedAs: `${userFind.nickname}`,
              },
            });
            await newUserData.save();
          }
          interactionModal.reply(`Bienvenido **${userFind.nickname}**.`);
        }
      } else {
        interactionModal.reply(`${Util.No} | Usuario o contraseña incorrecta.`);
      }
    }
  },
};
