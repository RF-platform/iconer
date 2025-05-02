import React from "react";
import { useTranslation } from "react-i18next";
import { ItemsViewProps, SimpleItemData } from "../types";
import GameItemCard from "../GameItemCard";
import { ItemsContainer } from "./styled";
import { Skeleton, Grid } from "@chakra-ui/react";

const ItemsView: React.FC<ItemsViewProps> = ({
  items,
  itemIds,
  loading,
  language,
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <Grid templateColumns="repeat(auto-fill, minmax(64px, 1fr))" gap="16px">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              width="64px"
              height="64px"
              borderRadius="4px"
            />
          ))}
      </Grid>
    );
  }

  // If we have an array of simple item IDs (with optional upgrades and counts)
  if (itemIds && itemIds.length > 0) {
    return (
      <ItemsContainer>
        {itemIds.map((item: SimpleItemData, index: number) => (
          <GameItemCard
            key={`${item.id}-${index}`}
            itemId={item.id}
            upgrade={item.upgrade}
            count={item.count}
            lang={language}
          />
        ))}
      </ItemsContainer>
    );
  }

  // Regular full item data objects
  if (items && items.length > 0) {
    return (
      <ItemsContainer>
        {items.map((item, index) => (
          <GameItemCard
            key={`${item.Code}-${index}`}
            itemData={item}
            lang={language}
          />
        ))}
      </ItemsContainer>
    );
  }

  // Fallback for empty data
  return (
    <ItemsContainer>
      <Skeleton width="64px" height="64px" borderRadius="4px" />
    </ItemsContainer>
  );
};

export default ItemsView;
