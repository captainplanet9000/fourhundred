import { NFTMetadata } from "./types";

export const CURATED_FILES: string[] = [
  "Member #73.png",
  "Member #166.png",
  "Member #175.png",
  "Member #337.png",
  "Member #362.png",
  "Member #499.png",
  "Member #600.png",
  "Member #779.png",
  "Member #866.png",
  "Member #935.png",
  "Member #1063.png",
  "Member #1153.png",
  "Member #1168.png",
  "Member #1500.png",
  "Member #1508.png",
  "Member #1607.png",
  "Member #1637.png",
  "Member #1710.png",
  "Member #1904.png",
  "Member #2064.png",
  "Member #2174.png",
  "Member #2262.png",
  "Member #2393.png",
  "Member #2451.png",
  "Member #2549.png",
  "Member #2806.png",
  "Member #2824.png",
  "Member #3703.png",
  "Member #4112.png",
  "Member #4118.png",
  "Member #4393.png",
  "Member #4502.png",
  "Member #4639.png",
  "Member #4664.png",
  "Member #5194.png",
  "Member #5659.png",
  "Member #5938.png",
  "Member #5972.png",
  "Member #6336.png",
  "Member #6744.png",
  "Member #6912.png",
  "Member #7504.png",
  "Member #7614.png",
  "Member #7642.png",
  "Member #7782.png",
  "Member #7812.png",
  "Member #8967.png",
  "Member #9007.png",
  "Member #9412.png",
  "Member #9769.png",
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
