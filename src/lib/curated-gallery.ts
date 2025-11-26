import { NFTMetadata } from "./types";

export const CURATED_FILES: string[] = [
  "member-73.png",
  "member-166.png",
  "member-175.png",
  "member-337.png",
  "member-362.png",
  "member-499.png",
  "member-600.png",
  "member-779.png",
  "member-866.png",
  "member-935.png",
  "member-1063.png",
  "member-1153.png",
  "member-1168.png",
  "member-1500.png",
  "member-1508.png",
  "member-1607.png",
  "member-1637.png",
  "member-1710.png",
  "member-1904.png",
  "member-2064.png",
  "member-2174.png",
  "member-2262.png",
  "member-2393.png",
  "member-2451.png",
  "member-2549.png",
  "member-2806.png",
  "member-2824.png",
  "member-3703.png",
  "member-4112.png",
  "member-4118.png",
  "member-4393.png",
  "member-4502.png",
  "member-4639.png",
  "member-4664.png",
  "member-5194.png",
  "member-5659.png",
  "member-5938.png",
  "member-5972.png",
  "member-6336.png",
  "member-6744.png",
  "member-6912.png",
  "member-7504.png",
  "member-7614.png",
  "member-7642.png",
  "member-7782.png",
  "member-7812.png",
  "member-8967.png",
  "member-9007.png",
  "member-9412.png",
  "member-9769.png",
];

export const CURATED_ITEMS: NFTMetadata[] = CURATED_FILES.map((file, index) => {
  const match = file.match(/(\d+)/);
  const memberId = match ? Number(match[1]) : index + 1;

  return {
    name: `Member #${memberId}`,
    description: "Curated fourHundred gallery portrait",
    image: `/images/collection/${file}`,
    image_url: `/images/collection/${file}`,
    external_url: "",
    attributes: [],
    tokenId: memberId,
    rarity_score: undefined,
    rarity_rank: undefined,
  };
});

export function getCuratedItemByTokenId(id: number): NFTMetadata | null {
  return CURATED_ITEMS.find((i) => i.tokenId === id) ?? null;
}
