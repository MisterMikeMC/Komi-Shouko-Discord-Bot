import { Event } from "../interfaces";
import { RandomPositionOfArray } from "../Functions";
import { magentaBright } from "chalk";
import { rainbow } from "chalk-animation";
export const event: Event = {
  name: "ready",
  run: (Komi): void => {
    setInterval((): void => {
      let Status = [
        { name: `Mencioname por ayuda.`, type: 1 },
        { name: `Probando mis ${Komi.commands.size} Comandos`, type: 1 },
        {
          name: `Probando mis ${Komi.slashcommands.size} SlashCommands`,
          type: 1,
        },
        { name: `Vigilando ${Komi.guilds.cache.size} servers.`, type: 1 },
        { name: `Vigilando ${Komi.channels.cache.size} canales.`, type: 1 },
        { name: `Vigilando ${Komi.users.cache.size} usuarios.`, type: 1 },
        { name: `Usa k!help para ver mis comandos`, type: 1 },
        { name: `🌸 Komi Shouko Support 🌸`, type: 1 },
        { name: `Komi-san v0.0.1`, type: 1 },
        { name: `Komi-san is life, Komi-san is love.`, type: 1 },
        { name: `En desarrollo.`, type: 1 },
        { name: `Viendo a MrMikeMC.`, type: 1 },
        { name: `Jugando con TypeScript.`, type: 1 },
        { name: `Hitohito Tadano gOd`, type: 1 },
      ];
      let RefreshStatus = (status: object[]): void => {
        Komi.user.setPresence({
          status: "online",
          activities: [RandomPositionOfArray(status)],
        });
      };
      RefreshStatus(Status);
    }, 15000);
    setTimeout(() => {
      rainbow("Komi Shouko lista ✅").start();
    }, 500);
  },
};
