/**
 * Single source of truth for the 400 Club launch.
 *
 * If the date moves, update `MINT.dateISO` and every countdown / hero /
 * meta tag follows. Anything that could go stale lives here.
 */

export const COLLECTION = {
  name: "400 Club",
  longName: "fourHundred — The 400 Club",
  symbol: "400",
  supply: 9400,
  description:
    "9,400 one-of-one Gilded Age dog portraits. Free to claim on MegaETH. A real club, free to join.",
  shortPitch: "9,400 portraits. Free claim on MegaETH.",
  website: "https://fourhundred.club",
  twitter: "https://x.com/4hundred_club",
  twitterHandle: "@4hundred_club",
} as const;

export const MINT = {
  /** Wall-clock launch time. UTC = 16:00 ≈ 12:00 PM EDT / 5:00 PM BST. */
  dateISO: "2026-05-13T16:00:00.000Z",
  priceLabel: "FREE",
  priceWei: 0n,
  perTxLimit: 2,
  perWalletLimit: 2,
  royaltyPct: 8,
} as const;

export const CHAIN = {
  name: "MegaETH",
  chainId: 4326,
  rpcDefault: "https://mainnet.megaeth.com/rpc",
  explorer: "https://mega.etherscan.io",
  explorerAlt: "https://megaeth.blockscout.com",
  bridge: "https://rabbithole.megaeth.com/bridge",
  addNetworkDocs: "https://docs.megaeth.com/user-guide/connect",
} as const;

export function openseaCollectionUrl(contractAddress?: string) {
  if (!contractAddress) return undefined;
  return `https://opensea.io/assets/megaeth/${contractAddress.toLowerCase()}`;
}

export function explorerAddressUrl(contractAddress?: string) {
  if (!contractAddress) return undefined;
  return `${CHAIN.explorer}/address/${contractAddress}`;
}

export function explorerTokenUrl(contractAddress: string | undefined, tokenId: number) {
  if (!contractAddress) return undefined;
  return `${CHAIN.explorer}/token/${contractAddress}?a=${tokenId}`;
}

export function openseaTokenUrl(contractAddress: string | undefined, tokenId: number) {
  if (!contractAddress) return undefined;
  return `https://opensea.io/assets/megaeth/${contractAddress.toLowerCase()}/${tokenId}`;
}

/** Pretty mint-day label, e.g. "May 13, 2026". */
export const MINT_DATE_LABEL = new Date(MINT.dateISO).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/**
 * Mint-day time label in EST/EDT for the marketing copy.
 * Build a deterministic string from MINT.dateISO so the deployed page
 * doesn't depend on the visitor's locale for the headline.
 */
export const MINT_TIME_LABEL_ET = new Date(MINT.dateISO).toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/New_York",
  timeZoneName: "short",
});
