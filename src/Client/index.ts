import { ApplicationCommandDataResolvable, Client, Collection } from 'discord.js';
import { readdirSync } from "fs";
import { SpotifyPlugin } from "@distube/spotify";
import { connect } from 'mongoose';
import { promisify } from 'util';
import { Command, Event, EventDistube, Snipe } from "../interfaces";
import { SlashCommandsRegisterOptions } from '../SlashCommandsInterface/SlashCommandOptions';
import { CommandType } from '../SlashCommandsInterface/SlashCommands';
import Distube from 'distube';
import glob from 'glob';
import path from "path";
import Colors from '../Functions/Colors';
const globPromise = promisify(glob)
export default class Komi extends Client {
    public commands: Collection<string, Command> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public slashcommands: Collection<string, CommandType> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public distubeevent: Collection<string, EventDistube> = new Collection();
    public snipe: Map<string, Snipe> = new Map();
    public distube: any;
    constructor() {
        super({
            intents: [
                "GUILDS",
                "GUILD_MEMBERS",
                "GUILD_BANS",
                "GUILD_EMOJIS_AND_STICKERS",
                "GUILD_WEBHOOKS",
                "GUILD_INVITES",
                "GUILD_VOICE_STATES",
                "GUILD_PRESENCES",
                "GUILD_MESSAGES",
                "GUILD_MESSAGE_REACTIONS",
                "GUILD_MESSAGE_TYPING",
                "DIRECT_MESSAGES"
            ],
            ws: {
                properties: {
                    $browser: "Discord Android"
                }
            },
            allowedMentions: {
                repliedUser: false
            }
        });
    };
    public async start() {
        this.registerModules()
        this.login(process.env.TokenMain);
        connect(process.env.MongoURL, {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useNewUrlParser: true
        });
        /* UnhandledRejection */
        process.on('unhandledRejection', async (Error) => {
            console.log(Error)
            setTimeout(() => {
                console.clear()
            }, 10000);
        })
        /* Command Handler */
        const commandPath = path.join(__dirname, "..", "Commands", "Commands");
        readdirSync(commandPath).forEach((Categories) => {
            const commands = readdirSync(`${commandPath}/${Categories}`)
                .filter((File) => File.endsWith('.ts'));
            for (const file of commands) {
                const { command } = require(`${commandPath}/${Categories}/${file}`);
                this.commands.set(
                    command.name,
                    command
                );
                if (command?.aliases.length !== 0) {
                    command.aliases.forEach((alias) => {
                        this.aliases.set(
                            alias,
                            command
                        )
                    });
                }
            }
        });
        /* Event Handler */
        const EventPath = path.join(__dirname, "..", "Events");
        readdirSync(EventPath).forEach(async (File) => {
            const { event } = await import(`${EventPath}/${File}`)
            this.events.set(
                event.name,
                event
            )
            this.on(
                event.name,
                event.run.bind(null, this)
            )
        });
        /* Distube Event Handler */
        const Options = {
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            emitNewSongOnly: true,
            leaveOnEmpty: true,
            nsfw: false,
            updateYouTubeDL: true,
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 33554432
            },
            plugins: [
                new SpotifyPlugin()
            ]
        };
        this.distube = new Distube(
            this,
            Options
        );
        const DistubeEventPath = path.join(__dirname, "..", "Distube Events");
        readdirSync(DistubeEventPath).forEach(async (File) => {
            const { distubeevent } = await import(`${DistubeEventPath}/${File}`);
            this.distubeevent.set(
                distubeevent.name,
                distubeevent
            );
            this.distube.on(
                distubeevent.name,
                distubeevent.run.bind(
                    null,
                    this
                )
            );
        });
    }
    /* Slash Command */
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }
    async registerCommands({ commands, guildId }: SlashCommandsRegisterOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            Colors(`Se han registrado los SlashCommands en el servidor ${guildId} ✅`, 27);
        } else {
            this.application.commands.set(commands);
            Colors(`Se han registrado los SlashCommands de manera Global ✅`, 27);
        }
    }
    async registerModules() {
        const SlashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(`${__dirname}/../Commands/SlashCommands/*/*{.ts,.js}`);
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            this.slashcommands.set(
                command.name,
                command
            );
            SlashCommands.push(command);
        });
        this.on("ready", () => {
            this.registerCommands({
                commands: SlashCommands,
                guildId: process.env.guildId
            });
        });
    }
}