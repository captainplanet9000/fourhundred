import { NFTMetadata } from "./types";

export const CURATED_FILES: string[] = [
  "ComfyUI_00038__1.png",
  "ComfyUI_00058_.png",
  "ComfyUI_00060_.png",
  "ComfyUI_00075__1.png",
  "ComfyUI_00115_.png",
  "ComfyUI_00141_.png",
  "ComfyUI_00337__2.png",
  "ComfyUI_00340__1.png",
  "ComfyUI_00347__1.png",
  "ComfyUI_00386__1.png",
  "ComfyUI_00424__1.png",
  "ComfyUI_00435__1.png",
  "ComfyUI_00477__1.png",
  "ComfyUI_00491_.png",
  "ComfyUI_00502__1.png",
  "ComfyUI_00537__1.png",
  "ComfyUI_00546_.png",
  "ComfyUI_00553_.png",
  "ComfyUI_00573_.png",
  "ComfyUI_00699__1.png",
  "ComfyUI_00705__1.png",
  "ComfyUI_00779_.png",
  "ComfyUI_00863_.png",
  "ComfyUI_00912_.png",
  "ComfyUI_00976_.png",
  "ComfyUI_01139__1.png",
  "ComfyUI_01149_.png",
  "ComfyUI_01158_.png",
  "ComfyUI_01250_.png",
  "ComfyUI_01360_.png",
  "ComfyUI_01364_.png",
  "ComfyUI_01498_.png",
  "ComfyUI_01811_.png",
  "ComfyUI_02357_.png",
  "ComfyUI_02615_.png",
  "ComfyUI_02907_.png",
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
