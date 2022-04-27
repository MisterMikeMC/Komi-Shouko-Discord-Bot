export interface EconomyItem {
  name: string;
  icon: string;
  description: string;
  rareLevel: number;
  minLevelRequired: number;
  amount: number;
  maxStack: number;
  prizeForBuy: number;
  prizeForSell: number;
  shopHidden: boolean;
  earnedBy: string;
  fight?: {
    damage: number;
    cooldown: {
      name: string;
      time: string;
    };
  };
  farmingFishing?: {
    cooldown: {
      name: string;
      time: string;
    };
  };
  farmingMining?: {
    cooldown: {
      name: string;
      time: string;
    };
  };
  farmingFelling?: {
    cooldown: {
      name: string;
      time: string;
    };
  };
  farmingPlow?: {
    cooldown: {
      name: string;
      time: string;
    };
  };
}
