import { Event } from "../interfaces";
import { Login, Register } from "../Functions";
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
      Register(
        interactionModal,
        modalValueNickname,
        modalValueUsername,
        modalValuePassword
      );
    } else if (interactionModal.customId === "loginEconomy") {
      let modalValueUsername =
        interactionModal.getTextInputValue("usernameLogin");
      let modalValuePassword =
        interactionModal.getTextInputValue("passwordLogin");
      Login(interactionModal, modalValueUsername, modalValuePassword);
    }
  },
};
