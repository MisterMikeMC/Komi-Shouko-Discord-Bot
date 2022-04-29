import { AddItemForEconomy } from "../Functions";
import { ItemTesting } from "./Items";

export let Summit = (): void => {
  /* Add testing item */

  AddItemForEconomy(true, 1, ItemTesting);
};
