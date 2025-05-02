import { ItemData } from "../types";

export interface ItemDescriptionProps {
  itemData: ItemData;
  lang: string;
}

export interface GameItemCardProps {
  itemData?: ItemData;
  lang: string;
  itemId?: string;
  upgrade?: string;
  count?: number;
}

export interface SimpleItemData {
  id: string;
  upgrade?: string;
  count?: number;
}

export interface ItemsViewProps {
  items?: ItemData[];
  itemIds?: SimpleItemData[];
  loading: boolean;
  language: string;
  onChangeLanguage: (lang: string) => void;
}
