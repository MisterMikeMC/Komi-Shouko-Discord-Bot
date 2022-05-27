import { hashSync } from "bcryptjs";
import { Util } from "../../Data/Emojis.json";
import LoginData from "../../Schemas/LoginData";
export let Register = async (
  interaction,
  nickname: string,
  username: string,
  password: string
): Promise<void> => {
  let userFind = await LoginData.findOne({
    username: username,
  });
  if (userFind) {
    await interaction.deferReply({ ephemeral: true });
    interaction.followUp({
      content: `${Util.No} | El usuario ya existe, intenta con otro nombre.`,
    });
    return;
  } else {
    let passwordHash = await hashSync(password, 10);
    let userData = new LoginData({
      nickname: nickname,
      username: username,
      password: passwordHash,
    });
    await userData.save();

    await interaction.deferReply({ ephemeral: false });
    interaction.followUp({
      content: `${Util.Yes} | Usuario registrado con éxito, ya puedes acceder a la economía con \`/economía login\`.`,
    });
  }
};
