import { Event } from '../interfaces'
import { Colors, RandomPositionOfArray } from '../Functions';
export const event: Event = {
    name: 'ready',
    run: (Komi) => {
        setInterval(() => {
            const Estados = [
                { name: `Mencioname por ayuda.`, type: 1 },
                { name: `Probando mis ${Komi.commands.size} Comandos`, type: 1 },
                { name: `Probando mis ${Komi.slashcommands.size} SlashCommands`, type: 1 },
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
            ]
            function presence() {
                Komi.user.setPresence({
                    status: 'online',
                    activities: RandomPositionOfArray(Estados)
                });
            }
            presence();
        }, 15000)
        Colors(`${Komi.user.tag} lista ✅`, 27)
        Colors("Conectada a MongoDB ✅", 27)
        Colors(`Se han cargado ${Komi.commands.size} Comando correctamente ✅`, 27)
        Colors(`Se han cargado ${Komi.slashcommands.size} SlashCommands correctamente ✅`, 27)
        Colors(`Se han cargado ${Komi.events.size} Eventos correctamente ✅`, 27)
        Colors(`Se han cargado ${Komi.distubeevent.size} Eventos de DisTube correctamente ✅`, 27)
    },
}