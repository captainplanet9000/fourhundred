"use client";

import React from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import type { Chain } from "viem";
import { mainnet, base, sepolia, baseSepolia } from "viem/chains";
import { walletConnect, injected } from "wagmi/connectors";

import { getEnv } from "@/lib/env";

const chainMap: Record<string, Chain> = {
  "1": mainnet,
  "11155111": sepolia,
  "8453": base,
  "84532": baseSepolia,
};

function getChain() {
  const chainIdStr =
    getEnv("VITE_CHAIN_ID") ??
    getEnv("NEXT_PUBLIC_CHAIN_ID") ??
    "8453"; // default Base mainnet
  const chain = chainMap[chainIdStr] ?? base;
  return chain;
}

const CHAINS = [mainnet, base, sepolia, baseSepolia] as const;

function rpcUrlFor(chain: Chain): string {
  const envUrl = getEnv("VITE_RPC_URL") ?? getEnv("NEXT_PUBLIC_RPC_URL");
  if (envUrl) return envUrl;
  // Safe public defaults when env is not set
  if (chain.id === mainnet.id) return "https://cloudflare-eth.com";
  if (chain.id === base.id) return "https://mainnet.base.org";
  if (chain.id === sepolia.id) return "https://rpc.sepolia.org";
  if (chain.id === baseSepolia.id) return "https://sepolia.base.org";
  return "https://cloudflare-eth.com";
}

const wcProjectId =
  getEnv("VITE_WALLETCONNECT_PROJECT_ID") ??
  getEnv("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID") ??
  "";

const connectorsArr = [
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