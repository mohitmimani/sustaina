import { create } from "zustand";
import { Item } from "@/prisma/generated/zod";

interface ItemState {
  items: Item[];
  setItems: (items: Item[]) => void;
  updateItem: (updatedItem: Item) => void;
}

export const useItemStore = create<ItemState>((set) => ({
  items: [],
  setItems: (items: Item[]) => set({ items }),
  updateItem: (updatedItem: Item) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    })),
}));
