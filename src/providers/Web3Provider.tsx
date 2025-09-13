"use client";

import React from "react";
import { WagmiConfig, createConfig, http } from "wagmi";
import type { Chain } from "viem";
import { mainnet, base, sepolia, baseSepolia } from "viem/chains";
import { walletConnect } from "wagmi/connectors";
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

function rpcUrlFor(_chain: Chain): string {
  return getEnv("VITE_RPC_URL") ?? getEnv("NEXT_PUBLIC_RPC_URL") ?? "";
}

const config = createConfig({
  chains: CHAINS,
  transports: {
    [mainnet.id]: http(rpcUrlFor(mainnet)),
    [base.id]: http(rpcUrlFor(base)),
    [sepolia.id]: http(rpcUrlFor(sepolia)),
    [baseSepolia.id]: http(rpcUrlFor(baseSepolia)),
  },
  connectors: [
    walletConnect({
      projectId:
        getEnv("VITE_WALLETCONNECT_PROJECT_ID") ??
        getEnv("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID") ??
        "",
      showQrModal: true,
    }),
  ],
});

type Props = { children: React.ReactNode };

export const Web3Provider: React.FC<Props> = ({ children }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};