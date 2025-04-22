import React, { useEffect, useState } from "react";
import axios from "axios";
import Keen_Talic from "./assets/Keen_Talic.png";
import Destruction_Talic from "./assets/Destruction_Talic.png";
import Darkness_Talic from "./assets/Darkness_Talic.png";
import Chaos_Talic from "./assets/Chaos_Talic.png";
import Hatred_Talic from "./assets/Hatred_Talic.png";
import Favor_Talic from "./assets/Favor_Talic.png";
import Wisdom_Talic from "./assets/Wisdom_Talic.png";
import SacredFire_Talic from "./assets/SacredFire_Talic.png";
import Belief_Talic from "./assets/Belief_Talic.png";
import Guard_Talic from "./assets/Guard_Talic.png";
import Glory_Talic from "./assets/Glory_Talic.png";
import Grace_Talic from "./assets/Grace_Talic.png";
import Mercy_Talic from "./assets/Mercy_Talic.png";
import Empty_Talic from "./assets/Empty_Talic.png";
import testJson from "./test.json";

// Настройка axios для CORS
axios.defaults.withCredentials = true;

const ItemDescription = ({ itemData }) => {
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
      <span className="text-sm text-sky-200">[Description]</span>
      <p
        className="text-sm max-w-[270px] text-[#C0C2C4]"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

const apiUrl = "/api/items";

const attackMultipliers = {
  1: 25,
  2: 50,
  3: 75,
  4: 100,
  5: 150,
  6: 200,
  7: 250,
};

const defenseMultipliers = {
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 60,
  6: 90,
  7: 120,
};

const GameItemCard = ({ itemData }) => {
  const [colors, setColors] = useState({
    borderColor: "border-white",
    textColor: "text-white",
  });
  const [isHovered, setIsHovered] = useState(false);

  const upgradeImageMap = {
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

  const [currentUpgrade, setCurrentUpgrade] = useState("700000ff");
  const getItemColors = (grade) => {
    switch (grade) {
      case 0:
        return { borderColor: "border-white", textColor: "text-white" };
      case 1:
        return {
          borderColor: "border-yellow-400",
          textColor: "text-yellow-400",
        };
      case 2:
        return {
          borderColor: "border-purple-500",
          textColor: "text-purple-500",
        };
      case 3:
        return {
          borderColor: "border-orange-500",
          textColor: "text-orange-500",
        };
      case 4:
        return { borderColor: "border-blue-500", textColor: "text-blue-500" };
      case 5:
        return { borderColor: "border-pink-400", textColor: "text-pink-400" };
      case 6:
        return { borderColor: "border-blue-400", textColor: "text-blue-400" };
      case 7:
      case 8:
      case 9:
      case 10:
        return { borderColor: "border-red-500", textColor: "text-red-500" };

      default:
        return { borderColor: "border-white", textColor: "text-white" };
    }
  };

  const dataFields = [
    { id: "type", label: "Type", value: "WeaponType", color: "[#F7F7F7]" },
    {
      id: "level",
      label: "Required Level",
      value: "LevelLim",
      color: "",
    },
    { id: "race", label: "Race", value: "Civil", color: "[#F7F7F7]" },
    {
      id: "skill",
      label: "Required Skill",
      value: ({ ExpertID1, ExpertLim1 }) => {
        if (ExpertID1 && ExpertLim1) {
          return `${ExpertID1} ${ExpertLim1}`;
        }
        return null;
      },
      color: "",
    },
    {
      id: "attack",
      label: "Attack",
      value: (item) =>
        getUpgradedValueAndColor(item.GAMinAF, item.GAMaxAF, "attack").value,
      color: (item) =>
        getUpgradedValueAndColor(item.GAMinAF, item.GAMaxAF, "attack").color,
    },
    {
      id: "force",
      label: "Force",
      value: (item) =>
        getUpgradedValueAndColor(item.MAMinAF, item.MAMaxAF, "force").value,
      color: (item) =>
        getUpgradedValueAndColor(item.MAMinAF, item.MAMaxAF, "force").color,
    },

    {
      id: "defense",
      label: "Defense",
      value: (item) =>
        getUpgradedSingleValueAndColor(item.DefFc, "defense").value,
      color: (item) =>
        getUpgradedSingleValueAndColor(item.DefFc, "defense").color,
    },

    {
      id: "elements",
      label: "Elements",
      value: (item) => {
        const elements = [];
        if (item.FireTol > 0) elements.push(`Fire ${item.FireTol}`);
        if (item.WaterTol > 0) elements.push(`Water ${item.WaterTol}`);
        if (item.SoilTol > 0) elements.push(`Soil ${item.SoilTol}`);
        if (item.WindTol > 0) elements.push(`Wind ${item.WindTol}`);

        return elements.length > 0 ? elements.join(", ") : null;
      },
      color: "",
    },
    {
      id: "ForceName",
      label: "Cast",
      value: "ForceName",
      color: "green-500",
    },
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

  function getUpgradedSingleValueAndColor(value, type) {
    if (value == null || value === 0) return { value: null, color: null };

    const multiplier = getUpgradeMultiplier(currentUpgrade, type);
    const upgraded = Math.floor(value * multiplier);
    const changed = upgraded !== value;
    console.log("multiplier", multiplier);
    return {
      value: upgraded,
      color: changed ? "text-green-500" : "text-white",
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
        color: "text-white",
      };
    }

    return {
      value: upgraded,
      color: changed ? "text-green-500" : "text-white",
    };
  }

  const spriteImage = itemData.SpriteFileName
    ? `src/assets/${itemData.SpriteFileName}`
    : "src/assets/default.webp";

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

      if (itemData?.ItemClass === "Torso") {
        if (field.id === "defense") {
          return true;
        }
        if (["attack", "force_attack"].includes(field.id)) {
          return false;
        }
      } else if (field.id === "defense") {
        return false;
      }

      if (field.id === "ForceName") {
        return !!itemData?.ForceName && itemData.ForceName.trim() !== "";
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
        className="w-16 h-16 bg-gray-800 border border-white animate-pulse"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    );
  }
  console.log("spriteImage", spriteImage);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-16 h-16 bg-gray-800 border ${colors.borderColor}`}>
        <div
          className="w-full h-full bg-no-repeat"
          style={{
            backgroundImage: `url(${spriteImage})`,
            backgroundPosition: `${itemData.SpriteX}px ${itemData.SpriteY}px`,
          }}
        />
      </div>

      <div
        className="absolute left-full top-0 ml-2 min-w-[400px] z-50 origin-left"
        style={cardStyle}
      >
        <div
          className={`border-[1px] p-3 relative ${colors.borderColor} bg-[rgba(5,16,26,0.94)] text-white w-full font-sans`}
        >
          <h2 className={`${colors.textColor} text-sm mb-2 text-center`}>
            [{itemData.Name}]
          </h2>
          <div className="flex gap-4 relative  justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  {filteredFields.map((field) => (
                    <p key={field.id} className="flex gap-3">
                      <span className="text-sky-200 w-[100px] text-end text-sm">
                        {field.label}
                      </span>
                      {(() => {
                        const value =
                          typeof field.value === "function"
                            ? field.value(itemData)
                            : itemData[field.value];

                        const color =
                          typeof field.color === "function"
                            ? field.color(itemData)
                            : field.color;

                        return (
                          <span className={`${color} text-sm`}>{value}</span>
                        );
                      })()}
                    </p>
                  ))}
                </div>
              </div>

              {itemData.EffectDescriptions &&
                itemData.EffectDescriptions.length > 0 && (
                  <div className="flex gap-3 mt-1 items-">
                    <p className="text-sm w-[100px] text-end text-sky-200">
                      Special Effects
                    </p>
                    <div className="flex flex-col">
                      {itemData.EffectDescriptions.map((effect, index) => (
                        <p key={index} className="text-sm max-w-[210px]">
                          {effect}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

              {itemData.UpgradeMaxCount > 0 && (
                <div className="flex gap-3 mt-1 items-">
                  <p className="text-sm w-[100px] text-end text-sky-200">
                    Upgrade
                  </p>
                  <div>
                    <div className="flex mb-1">
                      {[...Array(itemData.UpgradeMaxCount)].map((_, i) => {
                        const upgradeChar = (
                          currentUpgrade.slice(1, currentUpgrade.length)[i] ||
                          "F"
                        ).toUpperCase();
                        const TalicImage =
                          upgradeImageMap[upgradeChar] || Empty_Talic;

                        return (
                          <img
                            key={i}
                            src={TalicImage}
                            className="w-4 h-7 object-cover"
                            alt={`Upgrade ${i + 1}`}
                          />
                        );
                      })}
                    </div>
                    {itemData.UpgradeNames.map((name, index) => (
                      <p key={index} className="text-sm">
                        {itemData.UpgradeDescriptions[index]}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <span className="text-sm w-[100px] text-end text-sky-200">
                  Trade
                </span>
                <span
                  className={`text-sm ${
                    itemData.IsExchange === 1
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {itemData.IsExchange === 1 ? "Possibility" : "Impossible"}
                </span>
              </div>
              <ItemDescription itemData={itemData} />
            </div>
            <div
              className={`w-16 h-16 absolute  right-0  bg-gray-800 border ${colors.borderColor}`}
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
        </div>{" "}
      </div>
    </div>
  );
};

const App = () => {
  const [itemData, setItemData] = useState(null); // huy

  const fetchItemData = async () => {
    try {
      console.log("Making request to:", apiUrl);
      const response = await axios.post(
        apiUrl,
        { list: testJson },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response status:", response);
      console.log("Response headers:", response.headers);
      console.log("response", response);
      setItemData(response.data);
    } catch (error) {
      console.error("Error fetching item data:", error);
      console.error("Error details:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    }
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  console.log("huy", itemData);

  return (
    <div className="container mx-auto p-4">
      {itemData && itemData.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {itemData.map((item, key) => (
            <GameItemCard itemData={item} key={key} />
          ))}
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};

export default App;
