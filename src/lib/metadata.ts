import { NFTMetadata, TraitFacetCounts } from "./types";

const CORE_TRAITS = [
  "Breed",
  "Headwear",
  "Background",
  "Accessory",
  "Fabric",
  "Collar",
  "Effects",
  "Palette",
  "Pose",
];

const DERIVED_TRAITS = [
  "Composition",
  "Tone",
  "Lighting",
  "Horizon",
  "Central Focus",
  "Sky",
  "Vegetation",
  "Water",
  "Frame",
  "Subject",
];

export const ALL_SUPPORTED_TRAITS = [...CORE_TRAITS, ...DERIVED_TRAITS];

async function fetchJson<T = unknown>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function loadManifest(): Promise<number[]> {
  // Try user-provided manifest in public/metadata/index.json
  const manifest = await fetchJson<number[]>("/metadata/index.json");
  if (Array.isArray(manifest) && manifest.length > 0) return manifest;

  // Fallback to included sample manifest
  const sample = await fetchJson<number[]>("/metadata/sample/index.json");
  if (Array.isArray(sample) && sample.length > 0) return sample;

  return [];
}

export function normalizeMetadata(raw: any, id: number): NFTMetadata {
  const attributes = Array.isArray(raw?.attributes) ? raw.attributes : [];
  return {
    name: raw?.name ?? `Token #${id}`,
    description: raw?.description ?? "",
    image: raw?.image ?? raw?.image_url,
    image_url: raw?.image_url ?? raw?.image,
    external_url: raw?.external_url ?? "",
    attributes,
    tokenId: id,
    rarity_score: raw?.rarity_score,
    rarity_rank: raw?.rarity_rank,
  };
}

export async function loadToken(id: number): Promise<NFTMetadata | null> {
  // Prefer /metadata/{id}.json, else sample
  const main = await fetchJson<any>(`/metadata/${id}.json`);
  if (main) return normalizeMetadata(main, id);

  const fallback = await fetchJson<any>(`/metadata/sample/${id}.json`);
  if (fallback) return normalizeMetadata(fallback, id);

  return null;
}

export async function loadAll(): Promise<NFTMetadata[]> {
  const ids = await loadManifest();
  const items = await Promise.all(ids.map((id) => loadToken(id)));
  return items.filter(Boolean) as NFTMetadata[];
}

export function buildFacetCounts(items: NFTMetadata[]): TraitFacetCounts {
  const counts: TraitFacetCounts = {};
  for (const item of items) {
    for (const attr of item.attributes ?? []) {
      if (!attr?.trait_type || attr.value === undefined) continue;
      const tt = String(attr.trait_type);
      const vv = String(attr.value);
      counts[tt] ??= {};
      counts[tt][vv] = (counts[tt][vv] ?? 0) + 1;
    }
  }
  return counts;
}

export function filterAndSort(
  items: NFTMetadata[],
  params: {
    search?: string;
    traits?: Record<string, string[]>;
    sort?: "id" | "alpha" | "rarity";
  },
): NFTMetadata[] {
  const { search, traits = {}, sort = "id" } = params;

  let filtered = items;

  if (search && search.trim().length > 0) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter((i) => {
      const breed =
        i.attributes.find((a) => a.trait_type === "Breed")?.value ??
        i.name ??
        "";
      return String(breed).toLowerCase().includes(q);
    });
  }

  for (const [trait, values] of Object.entries(traits)) {
    if (!values || values.length === 0) continue;
    filtered = filtered.filter((i) => {
      const v = i.attributes.find((a) => a.trait_type === trait)?.value;
      return v !== undefined && values.includes(String(v));
    });
  }

  if (sort === "alpha") {
    filtered = [...filtered].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true }),
    );
  } else if (sort === "rarity") {
    filtered = [...filtered].sort((a, b) => {
      const ra = a.rarity_rank ?? Number.MAX_SAFE_INTEGER;
      const rb = b.rarity_rank ?? Number.MAX_SAFE_INTEGER;
      return ra - rb;
    });
  } else {
    filtered = [...filtered].sort((a, b) => a.tokenId - b.tokenId);
  }

  return filtered;
}