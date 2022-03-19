import { EventDistube } from "../interfaces";
import { Queue, Song } from "distube";
export const distubeevent: EventDistube = {
  name: "initQueue",
  run: async (Komi, queue: Queue, song: Song) => {
    queue.autoplay = false;
    queue.volume = 100;
    Komi.distube.setRepeatMode(queue.textChannel, 0);
  },
};
