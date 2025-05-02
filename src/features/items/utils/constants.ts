import Empty_Talic from "@/assets/Empty_Talic.webp";

export const itemTypeMap = {
  iw: {
    en: "Weapon",
    ru: "Оружие",
  },
  iu: {
    en: "Upper Armor",
    ru: "Верхний доспех",
  },
  il: {
    en: "Lower Armor",
    ru: "Нижний доспех",
  },
  ig: {
    en: "Gloves",
    ru: "Перчатки",
  },
  is: {
    en: "Shoes",
    ru: "Обувь",
  },
  ih: {
    en: "Helmet",
    ru: "Шлем",
  },
  id: {
    en: "Shield",
    ru: "Щит",
  },
};

export const attackMultipliers = {
  0: 0, // 7fffffff
  1: 7, // 70ffffff
  2: 14, // 700fffff
  3: 21, // 7000ffff
  4: 28, // 70000fff
  5: 35, // 700000ff
  6: 42, // 7000000f
  7: 49, // 70000000
};

export const defenseMultipliers = {
  0: 0, // 7fffffff
  1: 5, // 70ffffff
  2: 10, // 700fffff
  3: 15, // 7000ffff
  4: 20, // 70000fff
  5: 25, // 700000ff
  6: 30, // 7000000f
  7: 35, // 70000000
};

export const upgradeImageMap = {
  "0": Empty_Talic,
  // Add more mappings as needed
};
