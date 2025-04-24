import React, { useEffect, useState } from "react";
import axios from "axios";
import Empty_Talic from "/public/assets/Empty_Talic.webp";
import {
  translations,
  itemTypeMap,
  attackMultipliers,
  defenseMultipliers,
  upgradeImageMap,
} from "./constants";
import testJson from "./test3.json";

const ItemDescription = ({ itemData, lang }) => {
  const convertHtml = (text) => {
    text = text.replace(
      /<#([a-fA-F0-9]{3,6})\s([^>]+)>/g,
      '<span style="color: #$1;">$2</span>'
    );
    text = text.replace(/<#([a-fA-F0-9]{3,6})>/g, '<span style="color: #$1;">');
    return text;
  };

  const description = convertHtml(itemData.Desc || "");

  return (
    <div className="mt-4">
      <span className="text-sm text-[#8dacda]">
        {translations[lang].description}
      </span>
      <p
        className="text-sm max-w-[400px]  text-[#d1d1d1]"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

const GameItemCard = ({ itemData, lang }) => {
  const [isHovered, setIsHovered] = useState(false);

  const upgradeEntry = testJson.find((entry) => entry.code === itemData.Code);
  const currentUpgrade = upgradeEntry?.upgrade || "70000000";

  const getItemColors = (grade) => {
    switch (grade) {
      case 0:
        return { borderColor: "border-[#6d699a]", textColor: "text-[#c8d9ff]" };
      case 1:
        return {
          borderColor: "border-[#ffff80]",
          textColor: "text-[#ffff80]",
        };
      case 2:
        return {
          borderColor: "border-[#bd91ff]",
          textColor: "text-[#bd91ff]",
        };
      case 3:
        return {
          borderColor: "border-[#fc9d07]",
          textColor: "text-[#fc9d07]",
        };
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

  const dataFields = [
    {
      id: "type",
      label: translations[lang].type,
      value: (item) => {
        const typeCode = item.Code.slice(0, 2);
        return typeCode === "iw"
          ? item.WeaponType
          : itemTypeMap[typeCode]?.[lang];
      },
    },
    { id: "Count", label: translations[lang].quantity, value: "Count" },
    { id: "level", label: translations[lang].requiredLevel, value: "LevelLim" },
    { id: "race", label: translations[lang].race, value: "Civil" },
    {
      id: "skill",
      label: translations[lang].requiredSkill,
      value: ({ ExpertID1, ExpertLim1 }) =>
        ExpertID1 && ExpertLim1 ? `${ExpertID1} ${ExpertLim1}` : null,
    },
    {
      id: "attack",
      label: translations[lang].attack,
      value: (item) => {
        const typeCode = item.Code.slice(0, 2);
        if (typeCode === "iw") {
          return getUpgradedValueAndColor(item.GAMinAF, item.GAMaxAF, "attack")
            .value;
        }
        return null;
      },
      color: (item) => {
        const typeCode = item.Code.slice(0, 2);
        if (typeCode === "iw") {
          return getUpgradedValueAndColor(item.GAMinAF, item.GAMaxAF, "attack")
            .color;
        }
        return null;
      },
    },
    {
      id: "force",
      label: translations[lang].force,
      value: (item) => {
        const typeCode = item.Code.slice(0, 2);
        if (typeCode === "iw") {
          return getUpgradedValueAndColor(item.MAMinAF, item.MAMaxAF, "force")
            .value;
        }
        return null;
      },
      color: (item) => {
        const typeCode = item.Code.slice(0, 2);
        if (typeCode === "iw") {
          return getUpgradedValueAndColor(item.MAMinAF, item.MAMaxAF, "force")
            .color;
        }
        return null;
      },
    },
    {
      id: "defense",
      label: translations[lang].defense,
      value: (item) => {
        const typeCode = item.Code.slice(0, 2);
        if (["iu", "il", "ig", "is", "ih", "id"].includes(typeCode)) {
          return getUpgradedSingleValueAndColor(item.DefFc, "defense").value;
        }
        return null;
      },
      color: (item) => {
        const typeCode = item.Code.slice(0, 2);
        if (["iu", "il", "ig", "is", "ih", "id"].includes(typeCode)) {
          return getUpgradedSingleValueAndColor(item.DefFc, "defense").color;
        }
        return null;
      },
    },
    {
      id: "elements",
      label: translations[lang].elements,
      value: (item) => {
        const elems = [];
        if (item.FireTol > 0)
          elems.push(`${translations[lang].fire} ${item.FireTol}`);
        if (item.WaterTol > 0)
          elems.push(`${translations[lang].water} ${item.WaterTol}`);
        if (item.SoilTol > 0)
          elems.push(`${translations[lang].soil} ${item.SoilTol}`);
        if (item.WindTol > 0)
          elems.push(`${translations[lang].wind} ${item.WindTol}`);
        return elems.length ? elems.join(", ") : null;
      },
    },
    { id: "cast", label: translations[lang].cast, value: "ForceName" },
  ];

  if (!itemData) {
    return <div className="text-black">No item data found</div>;
  }

  function applyMultiplier(value, multiplier) {
    const [min, max] = value.split(" - ").map(Number);
    if (isNaN(min) || isNaN(max)) return value;
    return `${Math.floor(min * (1 + multiplier))} - ${Math.floor(
      max * (1 + multiplier)
    )}`;
  }

  function getUpgradedValueAndColor(min, max, type) {
    if (min == null || max == null) {
      return { value: null, color: null };
    }
    const base = `${min} - ${max}`;
    const multiplier = getUpgradeMultiplier(currentUpgrade, type);
    const upgraded = applyMultiplier(base, multiplier);
    const changed = upgraded !== base;
    if (min === 0 && max === 0) {
      return {
        value: base,
        color: "text-[#d1d1d1]",
      };
    }
    return {
      value: upgraded,
      color: changed ? "text-[#00ff00]" : "text-[#d1d1d1]",
    };
  }

  function getUpgradedSingleValueAndColor(value, type) {
    if (value == null || value === 0) return { value: null, color: null };
    const multiplier = getUpgradeMultiplier(currentUpgrade, type);
    const upgraded = Math.floor(value * multiplier);
    const changed = upgraded !== value;
    return {
      value: upgraded,
      color: changed ? "text-[#00ff00]" : "text-[#d1d1d1]",
    };
  }

  const getUpgradeMultiplier = (code, type) => {
    const section = code.slice(0, 8);
    let zeroCount = 0;
    for (let i = 1; i < section.length; i++) {
      if (section[i] === "0") zeroCount++;
      else break;
    }
    const base = type === "defense" ? defenseMultipliers : attackMultipliers;
    return (base[zeroCount] || 0) / 100 + 1;
  };

  const spriteImage = itemData.SpriteFileName
    ? `/assets/${itemData.SpriteFileName}`
    : "/assets/default.webp";

  const filteredFields = dataFields.filter((field) => {
    try {
      const value =
        typeof field.value === "function"
          ? field.value(itemData)
          : itemData[field.value];

      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        return false;
      }

      if ((field.id === "Count" && value === 1) || value === "1") {
        return false;
      }

      return true;
    } catch (error) {
      console.error(`Error processing field ${field.id}:`, error);
      return false;
    }
  });

  const cardStyle = {
    opacity: isHovered ? 1 : 0,
    transform: `scale(${isHovered ? 1 : 0.8})`,
    transition: "all 0.3s ease-in-out",
    pointerEvents: isHovered ? "auto" : "none",
  };
  if (!itemData) {
    return (
      <div
        className="w-16 h-16 bg-gray-800 border border-[#d1d1d1] animate-pulse"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    );
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-16 h-16 bg-gray-800 border ${
          getItemColors(itemData.ItemGrade).borderColor
        }`}
      >
        {itemData.Count > 1 && (
          <div className="absolute -bottom-1 left-1 text-[#d1d1d1] text-base font-bold text-shadow">
            {itemData.Count}
          </div>
        )}
        <div
          className="w-full h-full bg-no-repeat"
          style={{
            backgroundImage: `url(${spriteImage})`,
            backgroundPosition: `${itemData.SpriteX}px ${itemData.SpriteY}px`,
          }}
        />
      </div>

      <div
        className="absolute left-full top-0 ml-2 w-max min-w-[450px] max-w-[70vw] z-50 origin-left"
        style={cardStyle}
      >
        <div
          className={`border-[1px] py-2 px-[10px] relative ${
            getItemColors(itemData.ItemGrade).borderColor
          } bg-[rgba(5,16,26,0.94)] text-[#d1d1d1] w-full font-sans`}
        >
          <h2
            className={`${
              getItemColors(itemData.ItemGrade).textColor
            } text-sm mb-2 text-center`}
          >
            [{itemData.Name}]
          </h2>

          {/* Основная информация */}
          <div className="flex flex-col gap-2">
            {filteredFields.map((field) => (
              <div key={field.id} className="flex gap-3 items-start">
                <span className="text-[#8dacda] text-sm w-[160px] text-end">{`${field.label}`}</span>
                <span
                  className={`${
                    typeof field.color === "function"
                      ? field.color(itemData)
                      : field.color
                  } text-sm`}
                >
                  {typeof field.value === "function"
                    ? field.value(itemData)
                    : itemData[field.value]}
                </span>
              </div>
            ))}
          </div>

          {/* Особые эффекты */}
          {itemData.EffectDescriptions &&
            itemData.EffectDescriptions.length > 0 && (
              <div className="flex gap-3 mt-3">
                <span className="text-sm text-[#8dacda] w-[160px] text-end">
                  {translations[lang].specialEffects}
                </span>
                <div className="flex-1 flex flex-col">
                  {itemData.EffectDescriptions.map((eff, idx) => (
                    <p
                      key={idx}
                      className="text-sm whitespace-normal break-words"
                    >
                      {eff}
                    </p>
                  ))}
                </div>
              </div>
            )}

          {/* Улучшения */}
          {itemData.UpgradeMaxCount > 0 && (
            <div className="mt-2">
              <div className="flex gap-3 mt-1">
                <span className="text-sm text-[#8dacda] w-[160px] text-end">
                  {translations[lang].upgrade}
                </span>
                <div>
                  <div className="flex mb-1">
                    {[...Array(itemData.UpgradeMaxCount)].map((_, i) => {
                      const codeChar = (
                        currentUpgrade.slice(1)[i] || "F"
                      ).toUpperCase();
                      const Img = upgradeImageMap[codeChar] || Empty_Talic;
                      return (
                        <img
                          key={i}
                          src={Img}
                          alt={`Upgrade ${i + 1}`}
                          className="w-4 h-7 object-cover"
                        />
                      );
                    })}
                  </div>
                  {itemData.UpgradeNames.map((name, idx) => (
                    <p key={idx} className="text-sm">
                      {itemData.UpgradeDescriptions[idx]}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Торговля */}
          <div className="flex gap-3 mt-2">
            <span className="text-sm text-[#8dacda] w-[160px] text-end">
              {translations[lang].trade}
            </span>
            <span
              className={`text-sm ${
                itemData.IsExchange === 1 ? "text-[#00ff00]" : "text-red-500"
              }`}
            >
              {itemData.IsExchange === 1
                ? translations[lang].possible
                : translations[lang].impossible}
            </span>
          </div>
          <ItemDescription itemData={itemData} lang={lang} />
          <div
            className={`w-16 h-16 shrink-0 right-[10px] absolute top-4 bg-gray-800 border   ${
              getItemColors(itemData.ItemGrade).borderColor
            }`}
          >
            <div
              className="w-full h-full bg-no-repeat"
              style={{
                backgroundImage: `url(${spriteImage})`,
                backgroundPosition: `${itemData.SpriteX}px ${itemData.SpriteY}px`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [itemData, setItemData] = useState([]);
  const [language, setLanguage] = useState("ru");
  const fetchItemData = async () => {
    try {
      const response = await axios.post(
        `https://db.arcanum.rf-platform.online/api/items?lang=${language}`,
        { list: testJson },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      setItemData(response?.data || []);
    } catch (err) {
      console.error("CORS Error:", err);
    }
  };

  useEffect(() => {
    fetchItemData();
  }, [language]);

  return (
    <div className="container mx-auto p-4">
      {itemData.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {itemData.map((item, key) => (
            <GameItemCard itemData={item} key={key} lang={language} />
          ))}
        </div>
      ) : (
        <div>{translations[language === "ru" ? "ru" : "en"].loading}</div>
      )}
    </div>
  );
};

export default App;
