import { DisTubeEvents } from "distube";
import Client from "../Client";

interface Run {
  (Komi: Client, ...args: any[]);
}

export interface EventDistube {
  name: keyof DisTubeEvents;
  run: Run;
}
