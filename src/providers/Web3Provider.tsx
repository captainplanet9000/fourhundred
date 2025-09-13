"use client";

import React from "react";
import { WagmiConfig, createConfig, http } from "wagmi";
import { mainnet, base, sepolia, baseSepolia } from "viem/chains";
import { walletConnect } from "wagmi/connectors";
import { getEnv } from "@/lib/env";

const chainMap: Record<string, typeof mainnet> = {
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

const chain = getChain();

const config = createConfig({
  chains: [chain],
  transports: {
    [chain.id]: http(
      getEnv("VITE_RPC_URL") ?? getEnv("NEXT_PUBLIC_RPC_URL") ?? "",
    ),
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