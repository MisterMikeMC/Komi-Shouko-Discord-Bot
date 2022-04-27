import { Event } from "../interfaces";
import LoginData from "../Schemas/LoginData";
import UserData from "../Schemas/UserData";
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
          "El usuario ya existe, intenta con otro nombre."
        );
      } else {
        let userData = new LoginData({
          nickname: modalValueNickname,
          username: modalValueUsername,
          password: passwordHash,
        });
        await userData.save();
        interactionModal.reply(
          `Usuario registrado con éxito, ya puedes acceder a la economía con \`/login\`.`
        );
      }
    } else if (interactionModal.customId === "loginEconomy") {
      let modalValueUsername =
        interactionModal.getTextInputValue("usernameLogin");
      let modalValuePassword =
        interactionModal.getTextInputValue("passwordLogin");

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
          let userData = await UserData.findOne({
            userId: interactionModal.userId,
          });

          if (userData) {
            await UserData.findOneAndUpdate({
              loggedIn: {
                isLogged: true,
                loggedAs: `${userFind.nickname}`,
              },
            });
            interactionModal.reply(`Bienvenido **${userFind.nickname}**.`);
          } else {
            let newUserData = new UserData({
              userId: interactionModal.userId,
              badges: [],
              isBlocked: false,
              loggedIn: {
                isLogged: true,
                loggedAs: `${userFind.nickname}`,
              },
            });
            await newUserData.save();
            interactionModal.reply(`Bienvenido **${userFind.nickname}**.`);
          }
        } else {
          interactionModal.reply(`Usuario o contraseña incorrectos.`);
        }
      } else {
        interactionModal.reply(`Usuario o contraseña incorrecto.`);
      }
    }
  },
};
