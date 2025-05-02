import { attackMultipliers, defenseMultipliers } from "./constants";

/**
 * Converts HTML-like markup to actual HTML
 */
export const convertHtml = (text: string): string => {
  if (!text) return "";

  // Оборачиваем весь текст в span с цветом по умолчанию, чтобы избежать черного текста
  let converted = `<span style="color: #d1d1d1;">${text}</span>`;

  // Затем применяем специальные цвета
  converted = converted.replace(
    /<#([a-fA-F0-9]{3,6})\s([^>]+)>/g,
    '<span style="color: #$1;">$2</span>'
  );
  converted = converted.replace(
    /<#([a-fA-F0-9]{3,6})>/g,
    '<span style="color: #$1;">'
  );

  converted = converted.replace(/(<\/span>)?<\/><\/font>/g, "</span>");
  converted = converted.replace(/(<\/span>)?<\/>/g, "</span>");

  return converted;
};

/**
 * Get item grade colors for border and text
 */
export const getItemColors = (grade: number) => {
  switch (grade) {
    case 0:
      return { borderColor: "border-[#6d699a]", textColor: "text-[#c8d9ff]" };
    case 1:
      return { borderColor: "border-[#ffff80]", textColor: "text-[#ffff80]" };
    case 2:
      return { borderColor: "border-[#bd91ff]", textColor: "text-[#bd91ff]" };
    case 3:
      return { borderColor: "border-[#fc9d07]", textColor: "text-[#fc9d07]" };
    case 4:
      return { borderColor: "border-[#0099ff]", textColor: "text-[#0099ff]" };
    case 5:
      return { borderColor: "border-[#ffccff]", textColor: "text-[#ffccff]" };
    case 6:
      return { borderColor: "border-[#9af0fc]", textColor: "text-[#9af0fc]" };
    case 7:
      return { borderColor: "border-[#66ff66]", textColor: "text-[#66ff66]" };
    case 8:
      return { borderColor: "border-[#66ff66]", textColor: "text-[#66ff66]" };
    case 9:
      return { borderColor: "border-[#ecd0a6]", textColor: "text-[#ecd0a6]" };
    case 10:
      return { borderColor: "border-[#ff3b0d]", textColor: "text-[#ff3b0d]" };
    default:
      return { borderColor: "border-[#6d699a]", textColor: "text-[#c8d9ff]" };
  }
};

/**
 * Get upgrade multiplier based on code and type
 */
export const getUpgradeMultiplier = (
  code: string,
  type: "attack" | "defense" | "force"
): number => {
  const fullCode = code.padEnd(8, "f").toLowerCase();
  let zeroCount = 0;

  for (let i = 1; i < fullCode.length; i++) {
    if (fullCode[i] !== "0") break;
    zeroCount++;
  }

  const base = type === "defense" ? defenseMultipliers : attackMultipliers;
  const multiplier = (base[zeroCount as keyof typeof base] || 0) / 100;

  return multiplier;
};

/**
 * Apply multiplier to min-max range
 */
export const applyMultiplier = (value: string, multiplier: number): string => {
  const [min, max] = value.split(" - ").map(Number);
  if (isNaN(min) || isNaN(max)) return value;

  const newMin = Math.floor(min + min * multiplier);
  const newMax = Math.floor(max + max * multiplier);

  return `${newMin} - ${newMax}`;
};

/**
 * Get upgraded value with appropriate color
 */
export const getUpgradedValueAndColor = (
  min: number | undefined,
  max: number | undefined,
  type: "attack" | "defense" | "force",
  currentUpgrade: string
) => {
  if (min == null || max == null) {
    return { value: null, color: null };
  }

  if (min === 0 && max === 0) {
    return {
      value: "0 - 0",
      color: "text-[#d1d1d1]",
    };
  }

  const base = `${min} - ${max}`;
  const multiplier = getUpgradeMultiplier(currentUpgrade, type);
  const upgraded = applyMultiplier(base, multiplier);
  const changed = upgraded !== base;

  return {
    value: upgraded,
    color: changed ? "text-[var(--chakra-colors-green-500)]" : "text-[#d1d1d1]",
  };
};

/**
 * Get upgraded single value with appropriate color
 */
export const getUpgradedSingleValueAndColor = (
  value: number | undefined,
  type: "attack" | "defense" | "force",
  currentUpgrade: string
) => {
  if (value == null) return { value: null, color: null };

  if (value === 0) {
    return {
      value: "0",
      color: "text-[#d1d1d1]",
    };
  }

  const multiplier = getUpgradeMultiplier(currentUpgrade, type);
  const upgraded = Math.floor(value * (1 + multiplier));
  const changed = upgraded !== value;

  return {
    value: upgraded,
    color: changed ? "text-[var(--chakra-colors-green-500)]" : "text-[#d1d1d1]",
  };
};
