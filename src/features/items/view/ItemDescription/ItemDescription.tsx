import React from "react";
import { useTranslation } from "react-i18next";
import { ItemDescriptionProps } from "../types";
import { convertHtml } from "../../utils";
import {
  ItemDescriptionContainer,
  DescriptionTitle,
  DescriptionText,
} from "./styled";

const ItemDescription: React.FC<ItemDescriptionProps> = ({
  itemData,
  lang,
}) => {
  const { t } = useTranslation();
  const description = convertHtml(itemData.Desc || "");

  return (
    <ItemDescriptionContainer>
      <DescriptionTitle>[{t("description")}]</DescriptionTitle>
      <DescriptionText dangerouslySetInnerHTML={{ __html: description }} />
    </ItemDescriptionContainer>
  );
};

export default ItemDescription;
