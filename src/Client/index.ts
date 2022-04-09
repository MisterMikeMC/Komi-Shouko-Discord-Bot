import {
  Client,
  ApplicationCommandDataResolvable,
  Collection,
} from "discord.js";
import { readdirSync } from "fs";
import { connect } from "mongoose";
import { promisify } from "util";
import { Command, Event, EventDistube, Snipe } from "../interfaces";
import { SlashCommandsRegisterOptions } from "../interfaces/SlashCommandsRegisterOptions";
import { CommandType } from "../interfaces/SlashCommandsInterface";
import glob from "glob";
import path from "path";
const globPromise = promisify(glob);
export default class Komi extends Client {
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, Command> = new Collection();
  public slashcommands: Collection<string, CommandType> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public distube: any;
  public distubeevent: Collection<string, EventDistube> = new Collection();
  public snipe: Map<string, Snipe> = new Map();
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
        "DIRECT_MESSAGES",
      ],
      ws: {
        properties: {
          $browser: "Discord Android",
        },
      },
      allowedMentions: {
        repliedUser: false,
      },
    });
  }
  public async start(): Promise<void> {
    this.login(process.env.Token);
    this.registerModules();
    connect(process.env.MongoURL, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    })
      .then((): void => {
        console.log("Conectada a MongoDB ✅");        
      })
      .catch((ErrorForConectionToDatabase): void => {
        console.log(
          `Komi no se pudo conectar a MongoDB ❌\nError: ${ErrorForConectionToDatabase}`
        );
      });
    /* UnhandledRejection */
    process.on("unhandledRejection", (Error): void => console.log(Error));
    /* Command Handler */
    const commandPath = path.join(__dirname, "..", "Commands", "Commands");
    readdirSync(commandPath).forEach((Categories): void => {
      const commands = readdirSync(`${commandPath}/${Categories}`).filter(
        (File): boolean => File.endsWith(".ts")
      );
      for (const file of commands) {
        const { command } = require(`${commandPath}/${Categories}/${file}`);
        this.commands.set(command.name, command);
        if (command?.aliases.length !== 0) {
          command.aliases.forEach((alias): void => {
            this.aliases.set(alias, command);
          });
        }
      }
    });
    /* Event Handler */
    const EventPath = path.join(__dirname, "..", "Events");
    readdirSync(EventPath).forEach(async (File): Promise<void> => {
      const { event } = await import(`${EventPath}/${File}`);
      this.events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));
    });
    /* Distube Event Handler */
    /*
    const Options = {
      emitAddSongWhenCreatingQueue: false,
      emitAddListWhenCreatingQueue: false,
      emitNewSongOnly: true,
      leaveOnEmpty: true,
      nsfw: false,
      updateYouTubeDL: true,
      ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 33554432,
      },
      plugins: [new SpotifyPlugin()],
    };
    this.distube = new Distube(this, Options);
    const DistubeEventPath = path.join(__dirname, "..", "Distube");
    readdirSync(DistubeEventPath).forEach(async (File): Promise<void> => {
      const { distubeevent } = await import(`${DistubeEventPath}/${File}`);
      this.distubeevent.set(distubeevent.name, distubeevent);
      this.distube.on(distubeevent.name, distubeevent.run.bind(null, this));
    });
    */
  }
  /* Slash Command */
  async importFile(filePath: string): Promise<any> {
    return (await import(filePath))?.default;
  }
  async registerCommands({
    commands,
    guildId,
  }: SlashCommandsRegisterOptions): Promise<void> {
    this.application.commands.set(commands);
    console.log(`Se han registrado los SlashCommands de manera Global ✅`);
  }
  async registerModules(): Promise<void> {
    const SlashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise(
      `${__dirname}/../Commands/SlashCommands/*/*{.ts,.js}`
    );
    commandFiles.forEach(async (filePath): Promise<void> => {
      const command: CommandType = await this.importFile(filePath);
      if (!command.name) return;
      this.slashcommands.set(command.name, command);
      SlashCommands.push(command);
    });
    this.on("ready", (): void => {
      this.registerCommands({
        commands: SlashCommands,
        guildId: process.env.guildId,
      });
    });
  }
}
