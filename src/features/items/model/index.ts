import { types, flow } from "mobx-state-tree";
import { fetchItems } from "../api";
import type { ItemData } from "../types";

export const ItemsStore = types
  .model("ItemsStore", {
    items: types.array(types.frozen<ItemData>()),
    loading: types.optional(types.boolean, false),
    language: types.optional(types.string, "ru"),
    error: types.optional(types.string, ""),
  })
  .views((self) => ({
    getItemById(itemId: string): ItemData | undefined {
      return self.items.find(
        (item) => item.Code.toLowerCase() === itemId.toLowerCase()
      );
    },
  }))
  .actions((self) => ({
    setItems(items: ItemData[]) {
      self.items.replace(items);
    },
    setLanguage(lang: string) {
      self.language = lang;
    },
    setLoading(loading: boolean) {
      self.loading = loading;
    },
    setError(error: string) {
      self.error = error;
    },
    fetchItems: flow(function* () {
      self.loading = true;
      self.error = "";
      try {
        const items = yield fetchItems(self.language);
        self.items.replace(items);
      } catch (error) {
        self.error =
          error instanceof Error ? error.message : "Failed to fetch items";
      } finally {
        self.loading = false;
      }
    }),
  }));

export const itemsStore = ItemsStore.create({
  items: [],
  loading: false,
  language: "ru",
  error: "",
});

export default itemsStore;
