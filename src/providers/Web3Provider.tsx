"use client";

import React from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import type { Chain } from "viem";
import { defineChain } from "viem";
import { mainnet, base, sepolia, baseSepolia } from "viem/chains";
import { walletConnect, injected, coinbaseWallet, metaMask } from "wagmi/connectors";

import { getEnv } from "@/lib/env";

// MegaETH L2 — testnet (Blockscout explorer, Carrot RPC). Override via
// VITE_MEGAETH_TESTNET_* if MegaETH ships new endpoints.
const megaethTestnet = defineChain({
  id: Number(getEnv("VITE_MEGAETH_TESTNET_CHAIN_ID") ?? 6342),
  name: "MegaETH Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [getEnv("VITE_MEGAETH_TESTNET_RPC") ?? "https://carrot.megaeth.com/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "Megaexplorer (Blockscout)",
      url:
        getEnv("VITE_MEGAETH_TESTNET_EXPLORER") ??
        "https://megaeth-testnet-v2.blockscout.com",
    },
  },
  testnet: true,
});

// MegaETH L2 — mainnet (Frontier). Override via VITE_MEGAETH_* once your
// team confirms the production RPC + explorer.
const megaethMainnet = defineChain({
  id: Number(getEnv("VITE_MEGAETH_CHAIN_ID") ?? 4326),
  name: "MegaETH",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [getEnv("VITE_MEGAETH_RPC") ?? "https://mainnet.megaeth.com/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "MegaETH Explorer",
      url: getEnv("VITE_MEGAETH_EXPLORER") ?? "https://mega.etherscan.io",
    },
  },
});

const chainMap: Record<string, Chain> = {
  "1": mainnet,
  "11155111": sepolia,
  "8453": base,
  "84532": baseSepolia,
  [String(megaethTestnet.id)]: megaethTestnet,
  [String(megaethMainnet.id)]: megaethMainnet,
};

function getChain() {
  const chainIdStr =
    getEnv("VITE_CHAIN_ID") ??
    getEnv("NEXT_PUBLIC_CHAIN_ID") ??
    String(megaethMainnet.id); // default to MegaETH mainnet now that we ship there
  const chain = chainMap[chainIdStr] ?? megaethMainnet;
  return chain;
}

const CHAINS = [
  megaethMainnet,
  megaethTestnet,
  mainnet,
  base,
  sepolia,
  baseSepolia,
] as const;

function rpcUrlFor(chain: Chain): string {
  const envUrl = getEnv("VITE_RPC_URL") ?? getEnv("NEXT_PUBLIC_RPC_URL");
  if (envUrl) return envUrl;
  // Per-chain fallbacks
  if (chain.id === megaethMainnet.id) return megaethMainnet.rpcUrls.default.http[0];
  if (chain.id === megaethTestnet.id) return megaethTestnet.rpcUrls.default.http[0];
  if (chain.id === mainnet.id) return "https://cloudflare-eth.com";
  if (chain.id === base.id) return "https://mainnet.base.org";
  if (chain.id === sepolia.id) return "https://rpc.sepolia.org";
  if (chain.id === baseSepolia.id) return "https://sepolia.base.org";
  return megaethMainnet.rpcUrls.default.http[0];
}

const wcProjectId =
  getEnv("VITE_WALLETCONNECT_PROJECT_ID") ??
  getEnv("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID") ??
  "";

const connectorsArr = [
  metaMask(),
  coinbaseWallet({ appName: "fourHundred" }),
  injected(),
  ...(wcProjectId
    ? [
        walletConnect({
          projectId: wcProjectId,
          showQrModal: true,
        }),
      ]
    : []),
];

const config = createConfig({
  chains: CHAINS,
  transports: {
    [megaethMainnet.id]: http(rpcUrlFor(megaethMainnet)),
    [megaethTestnet.id]: http(rpcUrlFor(megaethTestnet)),
    [mainnet.id]: http(rpcUrlFor(mainnet)),
    [base.id]: http(rpcUrlFor(base)),
    [sepolia.id]: http(rpcUrlFor(sepolia)),
    [baseSepolia.id]: http(rpcUrlFor(baseSepolia)),
  },
  connectors: connectorsArr,
});

type Props = { children: React.ReactNode };

export const Web3Provider: React.FC<Props> = ({ children }) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

// Re-export so other parts of the app can introspect the active chain config
// without importing wagmi/viem directly.
export { megaethMainnet, megaethTestnet, getChain };
