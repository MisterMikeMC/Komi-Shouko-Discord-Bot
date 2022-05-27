import { EconomyItem } from "../../interfaces";
import { Economia } from "../../Data/Emojis.json";
export let SwordOfTesting: EconomyItem = {
  name: "Sword of Testing",
  icon: `${Economia.Sword}`,
  description: "Espada de testeo para la nueva economia.",
  rareLevel: 100,
  minLevelRequired: 50,
  amount: 0,
  maxStack: 1,
  prizeForBuy: 15000,
  prizeForSell: 10000,
  shopHidden: false,
  earnedBy: "",
  fight: {
    damage: 10,
    cooldown: {
      name: "CooldownOfSword",
      time: "5s",
    },
  },
};
