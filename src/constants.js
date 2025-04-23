import Keen_Talic from "../public/assets/Keen_Talic.webp";
import Destruction_Talic from "../public/assets/Destruction_Talic.webp";
import Darkness_Talic from "../public/assets/Darkness_Talic.webp";
import Chaos_Talic from "../public/assets/Chaos_Talic.webp";
import Hatred_Talic from "../public/assets/Hatred_Talic.webp";
import Favor_Talic from "../public/assets/Favor_Talic.webp";
import Wisdom_Talic from "../public/assets/Wisdom_Talic.webp";
import SacredFire_Talic from "../public/assets/SacredFire_Talic.webp";
import Belief_Talic from "../public/assets/Belief_Talic.webp";
import Guard_Talic from "../public/assets/Guard_Talic.webp";
import Glory_Talic from "../public/assets/Glory_Talic.webp";
import Grace_Talic from "../public/assets/Grace_Talic.webp";
import Mercy_Talic from "../public/assets/Mercy_Talic.webp";
import Empty_Talic from "../public/assets/Empty_Talic.webp";

export const translations = {
  en: {
    loading: "Loading...",
    description: "[Description]",
    type: "Type",
    requiredLevel: "Required Level",
    race: "Race",
    requiredSkill: "Required Skill",
    attack: "Attack",
    force: "Force",
    defense: "Defense",
    elements: "Elements",
    cast: "Cast",
    specialEffects: "Special Effects",
    upgrade: "Upgrade",
    trade: "Trade",
    possible: "Possible",
    impossible: "Impossible",
    noData: "No item data found",
    quantity: "Quantity",
    typeWeapon: "Weapon",
    fire: "Fire",
    water: "Water",
    soil: "Soil",
    wind: "Wind",
  },
  ru: {
    loading: "Загрузка...",
    description: "[Описание]",
    type: "Класс",
    requiredLevel: "Необходимый уровень",
    race: "Раса",
    requiredSkill: "Необходимое Умение",
    attack: "Атака",
    force: "Силовая аттака",
    defense: "Показатель защиты",
    elements: "Стихия",
    cast: "Магия",
    specialEffects: "Особые эффекты",
    upgrade: "Улучшения",
    trade: "Обмен",
    possible: "Возможен",
    impossible: "Невозможен",
    noData: "Данные не найдены",
    quantity: "Количество",
    typeWeapon: "Оружие",
    fire: "Огонь",
    water: "Вода",
    soil: "Земля",
    wind: "Ветер",
  },
};

export const attackMultipliers = {
  1: 25,
  2: 50,
  3: 75,
  4: 100,
  5: 150,
  6: 200,
  7: 250,
};

export const defenseMultipliers = {
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 60,
  6: 90,
  7: 120,
};

export const upgradeImageMap = {
  0: Keen_Talic,
  1: Destruction_Talic,
  2: Darkness_Talic,
  3: Chaos_Talic,
  4: Hatred_Talic,
  5: Favor_Talic,
  6: Wisdom_Talic,
  7: SacredFire_Talic,
  8: Belief_Talic,
  9: Guard_Talic,
  A: Glory_Talic,
  B: Grace_Talic,
  C: Mercy_Talic,
  F: Empty_Talic,
};

export const itemTypeMap = {
  iu: { en: "Upper", ru: "Торс" },
  il: { en: "Lower", ru: "Ноги" },
  ig: { en: "Arms", ru: "Руки" },
  is: { en: "Shoe", ru: "Ступни" },
  ih: { en: "Helmet", ru: "Голова" },
  id: { en: "Shield", ru: "Щит" },
  iw: { en: "Weapon", ru: "Оружие" },
  ik: { en: "Cloak", ru: "Накидка" },
  ir: { en: "Resources", ru: "Ресурсы" },
};
