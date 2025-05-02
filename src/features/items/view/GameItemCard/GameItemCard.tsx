import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@chakra-ui/react";
import { GameItemCardProps } from "../types";
import ItemDescription from "../ItemDescription";
import { itemTypeMap, upgradeImageMap } from "../../utils/constants";
import {
  getItemColors,
  getUpgradedValueAndColor,
  getUpgradedSingleValueAndColor,
} from "../../utils";
import Empty_Talic from "@/assets/Empty_Talic.webp";
import itemsStore from "../../model";
import { ItemData } from "../../types";
import {
  ItemCardWrapper,
  ItemCardContainer,
  ItemImageWrapper,
  ItemImage,
  ItemCount,
  ItemTooltip,
  ItemTitle,
  ItemDataRow,
  ItemLabel,
  ItemValue,
  SpecialEffectsContainer,
  SpecialEffectsContent,
  UpgradeContainer,
  UpgradesWrapper,
  UpgradeImage,
  UpgradeDescription,
  TradeRow,
  TradeLabel,
  TradeValue,
  TooltipItemImage,
  SkeletonWrapper,
} from "./styled";

const GameItemCard: React.FC<GameItemCardProps> = ({
  itemData,
  lang,
  itemId,
  upgrade = "7fffffff",
  count,
}) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [currentItem, setCurrentItem] = useState<ItemData | null>(null);

  useEffect(() => {
    // If itemData is provided directly, use it
    if (itemData) {
      // Create a copy to avoid mutation
      setCurrentItem({ ...itemData });
      return;
    }

    // If itemId is provided, try to fetch the item data
    if (itemId) {
      const foundItem = itemsStore.getItemById(itemId);
      if (foundItem) {
        // Create a copy of the item to apply any overrides
        const itemCopy = { ...foundItem };

        // Apply count override if provided
        if (count !== undefined) {
          itemCopy.Count = count;
        }

        setCurrentItem(itemCopy);
      }
    }
  }, [itemData, itemId, count]);

  if (!currentItem) {
    return (
      <SkeletonWrapper>
        <Skeleton width="64px" height="64px" borderRadius="4px" />
      </SkeletonWrapper>
    );
  }

  // Use the provided upgrade parameter
  const currentUpgrade = upgrade.padEnd(8, "f");

  const dataFields = [
    {
      id: "type",
      label: t("type"),
      value: (item: ItemData) => {
        const typeCode = item.Code.slice(0, 2);
        return typeCode === "iw"
          ? item.WeaponType
          : itemTypeMap[typeCode as keyof typeof itemTypeMap]?.[
              lang as "en" | "ru"
            ];
      },
    },
    {
      id: "itemClass",
      label: t("itemClass"),
      value: (item: ItemData) => {
        if (item.Code.slice(0, 2) === "iw") {
          return null;
        }
        return item.ItemClass;
      },
    },
    {
      id: "Count",
      label: t("quantity"),
      value: "Count",
    },
    {
      id: "level",
      label: t("requiredLevel"),
      value: "LevelLim",
    },
    {
      id: "race",
      label: t("race"),
      value: "Civil",
    },
    {
      id: "skill",
      label: t("requiredSkill"),
      value: ({ ExpertID1, ExpertLim1 }: ItemData) =>
        ExpertID1 && ExpertLim1 ? `${ExpertID1} ${ExpertLim1}` : null,
    },
    {
      id: "attack",
      label: t("attack"),
      value: (item: ItemData) => {
        const typeCode = item.Code.slice(0, 2);
        if (
          typeCode === "iw" &&
          typeof item.GAMinAF === "number" &&
          typeof item.GAMaxAF === "number"
        ) {
          return getUpgradedValueAndColor(
            item.GAMinAF,
            item.GAMaxAF,
            "attack",
            currentUpgrade
          ).value;
        }
        return null;
      },
      color: (item: ItemData) => {
        const typeCode = item.Code.slice(0, 2);
        if (
          typeCode === "iw" &&
          typeof item.GAMinAF === "number" &&
          typeof item.GAMaxAF === "number"
        ) {
          return getUpgradedValueAndColor(
            item.GAMinAF,
            item.GAMaxAF,
            "attack",
            currentUpgrade
          ).color;
        }
        return null;
      },
    },
    {
      id: "force",
      label: t("force"),
      value: (item: ItemData) => {
        const typeCode = item.Code.slice(0, 2);
        if (
          typeCode === "iw" &&
          typeof item.MAMinAF === "number" &&
          typeof item.MAMaxAF === "number"
        ) {
          return getUpgradedValueAndColor(
            item.MAMinAF,
            item.MAMaxAF,
            "force",
            currentUpgrade
          ).value;
        }
        return null;
      },
      color: (item: ItemData) => {
        const typeCode = item.Code.slice(0, 2);
        if (
          typeCode === "iw" &&
          typeof item.MAMinAF === "number" &&
          typeof item.MAMaxAF === "number"
        ) {
          return getUpgradedValueAndColor(
            item.MAMinAF,
            item.MAMaxAF,
            "force",
            currentUpgrade
          ).color;
        }
        return null;
      },
    },
    {
      id: "defense",
      label: t("defense"),
      value: (item: ItemData) => {
        const typeCode = item.Code.slice(0, 2);
        if (
          ["iu", "il", "ig", "is", "ih", "id"].includes(typeCode) &&
          typeof item.DefFc === "number"
        ) {
          return getUpgradedSingleValueAndColor(
            item.DefFc,
            "defense",
            currentUpgrade
          ).value;
        }
        return null;
      },
      color: (item: ItemData) => {
        const typeCode = item.Code.slice(0, 2);
        if (
          ["iu", "il", "ig", "is", "ih", "id"].includes(typeCode) &&
          typeof item.DefFc === "number"
        ) {
          return getUpgradedSingleValueAndColor(
            item.DefFc,
            "defense",
            currentUpgrade
          ).color;
        }
        return null;
      },
    },
    {
      id: "elements",
      label: t("elements"),
      value: (item: ItemData) => {
        const elems = [];
        if (
          item.FireTol &&
          typeof item.FireTol === "number" &&
          item.FireTol > 0
        )
          elems.push(`${t("fire")} ${item.FireTol}`);
        if (
          item.WaterTol &&
          typeof item.WaterTol === "number" &&
          item.WaterTol > 0
        )
          elems.push(`${t("water")} ${item.WaterTol}`);
        if (
          item.SoilTol &&
          typeof item.SoilTol === "number" &&
          item.SoilTol > 0
        )
          elems.push(`${t("soil")} ${item.SoilTol}`);
        if (
          item.WindTol &&
          typeof item.WindTol === "number" &&
          item.WindTol > 0
        )
          elems.push(`${t("wind")} ${item.WindTol}`);
        return elems.length ? elems.join(", ") : null;
      },
    },
    {
      id: "cast",
      label: t("cast"),
      value: "ForceName",
    },
  ];

  const spriteImage = currentItem.SpriteFileName
    ? `/assets/${currentItem.SpriteFileName}`
    : "/assets/default.webp";

  const filteredFields = dataFields.filter((field) => {
    try {
      const value =
        typeof field.value === "function"
          ? field.value(currentItem)
          : currentItem[field.value as keyof typeof currentItem];

      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        return false;
      }

      if (field.id === "Count") {
        const numValue =
          typeof value === "string" ? parseInt(value, 10) : (value as number);
        if (numValue === 1) return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  });

  const itemColorClass = getItemColors(currentItem.ItemGrade);

  return (
    <ItemCardWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ItemCardContainer $borderColor={itemColorClass.borderColor}>
        {typeof currentItem.Count === "number" && currentItem.Count > 1 && (
          <ItemCount>{currentItem.Count}</ItemCount>
        )}
        <ItemImageWrapper>
          <ItemImage
            $spriteImage={spriteImage}
            $spriteX={currentItem.SpriteX}
            $spriteY={currentItem.SpriteY}
          />
        </ItemImageWrapper>
      </ItemCardContainer>

      <ItemTooltip
        $borderColor={itemColorClass.borderColor}
        $isVisible={isHovered}
      >
        <ItemTitle $textColor={itemColorClass.textColor}>
          [{currentItem.Name}]
        </ItemTitle>

        <div>
          {filteredFields.map((field) => (
            <ItemDataRow key={field.id}>
              <ItemLabel>{field.label}</ItemLabel>
              <ItemValue
                $textColor={
                  typeof field.color === "function"
                    ? field.color(currentItem) || undefined
                    : field.color
                }
              >
                {typeof field.value === "function"
                  ? field.value(currentItem)
                  : currentItem[field.value as keyof typeof currentItem]}
              </ItemValue>
            </ItemDataRow>
          ))}
        </div>

        {currentItem.EffectDescriptions &&
          currentItem.EffectDescriptions.length > 0 && (
            <SpecialEffectsContainer>
              <ItemLabel>{t("specialEffects")}</ItemLabel>
              <SpecialEffectsContent>
                {currentItem.EffectDescriptions.map((eff, idx) => (
                  <ItemValue key={idx}>{eff}</ItemValue>
                ))}
              </SpecialEffectsContent>
            </SpecialEffectsContainer>
          )}

        {currentItem.UpgradeMaxCount && currentItem.UpgradeMaxCount > 0 && (
          <UpgradeContainer>
            <ItemLabel>{t("upgrade")}</ItemLabel>
            <div>
              <UpgradesWrapper>
                {Array.from({ length: currentItem.UpgradeMaxCount }).map(
                  (_, i) => {
                    const codeChar = (
                      currentUpgrade.slice(1)[i] || "F"
                    ).toUpperCase();
                    const Img =
                      upgradeImageMap[
                        codeChar as keyof typeof upgradeImageMap
                      ] || Empty_Talic;
                    return (
                      <UpgradeImage
                        key={i}
                        src={Img}
                        alt={`Upgrade ${i + 1}`}
                      />
                    );
                  }
                )}
              </UpgradesWrapper>
              {currentItem.UpgradeNames &&
                currentItem.UpgradeDescriptions &&
                currentItem.UpgradeNames.map((name, idx) => (
                  <UpgradeDescription key={idx}>
                    {currentItem.UpgradeDescriptions?.[idx]}
                  </UpgradeDescription>
                ))}
            </div>
          </UpgradeContainer>
        )}

        <TradeRow>
          <TradeLabel>{t("trade")}</TradeLabel>
          <TradeValue $tradeable={currentItem.IsExchange === 1}>
            {currentItem.IsExchange === 1 ? t("possible") : t("impossible")}
          </TradeValue>
        </TradeRow>

        <ItemDescription itemData={currentItem} lang={lang} />

        <TooltipItemImage $borderColor={itemColorClass.borderColor}>
          <ItemImage
            $spriteImage={spriteImage}
            $spriteX={currentItem.SpriteX}
            $spriteY={currentItem.SpriteY}
          />
        </TooltipItemImage>
      </ItemTooltip>
    </ItemCardWrapper>
  );
};

export default GameItemCard;
