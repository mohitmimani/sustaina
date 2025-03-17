import { create } from "zustand";
import { ItemWithoutId } from "@/lib/schema/extended";

interface ItemState {
  items: ItemWithoutId[];
  setItems: (items: ItemWithoutId[]) => void;
  updateItem: (updatedItem: ItemWithoutId) => void;
}

export const useItemStore = create<ItemState>((set) => ({
  items: [],
  setItems: (items: ItemWithoutId[]) => set({ items }),
  updateItem: (updatedItem: ItemWithoutId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    })),
}));
