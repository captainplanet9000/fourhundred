import raw from "../data/breeds_and_traits.md?raw";

export type BreedRecord = {
  name: string;
  count: number;
};

export type TraitCountsByCategory = Record<string, Record<string, number>>;

const lines = raw.split(/\r?\n/);

const breeds: BreedRecord[] = [];
const traitsByCategory: TraitCountsByCategory = {};

let inBreeds = false;
let inTraits = false;
let currentCategory: string | null = null;

for (const line of lines) {
  if (line.startsWith("## Breeds")) {
    inBreeds = true;
    inTraits = false;
    continue;
  }
  if (line.startsWith("## Traits")) {
    inTraits = true;
    inBreeds = false;
    currentCategory = null;
    continue;
  }

  if (inBreeds) {
    const m = line.match(/^- (.+) \((\d+)\)\s*$/);
    if (m) {
      breeds.push({ name: m[1], count: Number(m[2]) });
    }
    continue;
  }

  if (inTraits) {
    const heading = line.match(/^### (.+?)(?: \((\d+)\))?\s*$/);
    if (heading) {
      currentCategory = heading[1];
      if (!traitsByCategory[currentCategory]) traitsByCategory[currentCategory] = {};
      continue;
    }

    if (currentCategory) {
      const m = line.match(/^- (.+) \((\d+)\)\s*$/);
      if (m) {
        const label = m[1];
        const count = Number(m[2]);
        traitsByCategory[currentCategory][label] = count;
      }
    }
  }
}

export function getAllBreeds(): BreedRecord[] {
  return breeds;
}

export function getTraitCounts(): TraitCountsByCategory {
  return traitsByCategory;
}
