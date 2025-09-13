export type Attribute = {
  trait_type: string;
  value: string | number;
};

export type NFTMetadata = {
  name: string;
  description?: string;
  image?: string;
  image_url?: string;
  external_url?: string;
  attributes: Attribute[];
  tokenId: number;
  rarity_score?: number;
  rarity_rank?: number;
};

export type TraitFacetCounts = Record<string, Record<string, number>>;

export type GalleryFilters = {
  search?: string;
  sort?: "id" | "alpha" | "rarity";
  page?: number;
  perPage?: number;
  traits: Record<string, string[]>;
};