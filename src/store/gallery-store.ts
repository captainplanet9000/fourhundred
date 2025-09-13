import { create } from "zustand";

type GalleryState = {
  search: string;
  sort: "id" | "alpha" | "rarity";
  traits: Record<string, string[]>;
  page: number;
  perPage: number;
  setSearch: (v: string) => void;
  setSort: (v: GalleryState["sort"]) => void;
  toggleTrait: (trait: string, value: string) => void;
  clearTrait: (trait: string) => void;
  setPage: (p: number) => void;
  reset: () => void;
};

export const useGalleryStore = create<GalleryState>((set, get) => ({
  search: "",
  sort: "id",
  traits: {},
  page: 1,
  perPage: 24,
  setSearch: (v) => set({ search: v, page: 1 }),
  setSort: (v) => set({ sort: v }),
  toggleTrait: (trait, value) => {
    const current = get().traits[trait] ?? [];
    const exists = current.includes(value);
    const next = exists ? current.filter((x) => x !== value) : [...current, value];
    set({ traits: { ...get().traits, [trait]: next }, page: 1 });
  },
  clearTrait: (trait) => {
    const t = { ...get().traits };
    delete t[trait];
    set({ traits: t, page: 1 });
  },
  setPage: (p) => set({ page: p }),
  reset: () => set({ search: "", sort: "id", traits: {}, page: 1 }),
}));