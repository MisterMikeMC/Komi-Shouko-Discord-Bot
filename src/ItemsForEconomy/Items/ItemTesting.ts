import { EconomyItem } from "../../interfaces";
import { Badge } from '../../Data/Emojis.json'
export let ItemTesting: EconomyItem = {
    name: "Testing",
    icon: `${Badge.Owner}`,
    description: "Item de prueba para la nueva economia.",
    rareLevel: 100,
    minLevelRequired: 50,
    amount: 0,
    maxStack: 5,
    prizeForBuy: 9999999,
    prizeForSell: 1,
    shopHidden: true,
    earnedBy: ""
}