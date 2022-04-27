import { redBright, greenBright } from "chalk";
import { EconomyItem } from "../interfaces";
import itemData from "../Schemas/ItemData";
export let AddItemForEconomy = async (
  idOfObject: number,
  itemObject: EconomyItem
): Promise<void> => {
  let findItem = await itemData.findOne({
    id: idOfObject,
  });
  if (!findItem) {
    let newItem = new itemData({
      id: idOfObject,
      Item: itemObject,
    });
    await newItem.save();
    return console.log(
      `${greenBright("[SUCCESS]")} Se agregó un nuevo item!!!`
    );
  } else {
    return console.log(
      `${redBright("[ERROR]")} Ya existe un item con la id "${idOfObject}"!!!`
    );
  }
};
