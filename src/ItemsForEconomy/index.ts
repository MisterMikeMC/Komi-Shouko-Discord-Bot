import { AddItemForEconomy } from "../Functions";
import { ItemTesting, SwordOfTesting } from "./Items";
export let Summit = (): void => {
  AddItemForEconomy(true, 1, ItemTesting);
  AddItemForEconomy(true, 2, SwordOfTesting);
};
