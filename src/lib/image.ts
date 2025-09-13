import { getPublicImageBase } from "./env";

export function imageUrlFor(id: number): string {
  const base = getPublicImageBase();
  if (base.startsWith("ipfs://")) {
    const path = base.replace("ipfs://", "https://ipfs.io/ipfs/");
    return `${path}/${id}.png`;
  }
  return `${base}/${id}.png`;
}