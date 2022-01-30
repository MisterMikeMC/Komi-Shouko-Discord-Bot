import { Event } from '../interfaces'
import Colors from '../Functions/Colors';
export const event: Event = {
    name: 'ready',
    run: (Komi) => {
        const Estados = [
            { name: `Mencioname por ayuda.`, type: 1 },
            { name: `Probando mis ${Komi.commands.size} Comandos`, type: 1 },
            { name: `Probando mis ${Komi.slashcommands.size} SlashCommands`, type: 1 },
            { name: `Vigilando ${Komi.guilds.cache.size} servers.`, type: 1 },
            { name: `Vigilando ${Komi.channels.cache.size} canales.`, type: 1 },
            { name: `Vigilando ${Komi.users.cache.size} usuarios.`, type: 1 },
            { name: `Usa n!help para ver mis comandos`, type: 1 },
            { name: `Aprendiendo nuevos comandos.`, type: 1 },
            { name: `Viendo como mejorar.`, type: 1 },
            { name: `Leyendo la documentacion de DJS.`, type: 1 },
            { name: `Jugando a mi economia.`, type: 1 },
            { name: `Probando mi sistema de Música.`, type: 1 },
            { name: `Probando mis SlashCommands.`, type: 1 },
            { name: `Probando mis Botones.`, type: 1 },
            { name: `Probando mis Menús.`, type: 1 },
            { name: `🌸 Komi Shouko Support 🌸`, type: 1 },
            { name: `Komi-san v0.0.1`, type: 1 },
            { name: `Komi-san is life, Komi-san is love.`, type: 1 }
        ]
        setInterval(() => {
            function presence() {
                Komi.user.setPresence({
                    status: 'online',
                    activities: [Estados[Math.floor(Math.random() * Estados.length)]]
                });
            }
            presence();
        }, 15000)
        Colors(`${Komi.user.tag} lista ✅`, 27)
        Colors("Conectada a MongoDB ✅", 27)
        Colors(`Se han cargado ${Komi.commands.size} Comando correctamente ✅`, 26)
        Colors(`Se han cargado ${Komi.slashcommands.size} SlashCommands correctamente ✅`, 26)
        Colors(`Se han cargado ${Komi.events.size} Eventos correctamente ✅`, 26)
        Colors(`Se han cargado ${Komi.distubeevent.size} Eventos de DisTube correctamente ✅`, 26)
        Colors(`${Komi.commands.map(commands => commands.display).join('\n')}`, 29)
    },
}