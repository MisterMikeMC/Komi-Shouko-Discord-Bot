import Client from "../Client";
import { ClientEvents } from "discord.js";
import { } from 'discord-modals'; 
interface Run {
  (Komi: Client, ...args: any[]);
}

export interface Event {
  name: keyof ClientEvents | "modalSubmit";
  run: Run;
}
