"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const config = getDefaultConfig({
  appName: "fourHundred",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "fourhundred-temp",
  chains: [mainnet, sepolia],
  ssr: true,
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_RPC_MAINNET || "https://mainnet.infura.io/v3/demo"),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_SEPOLIA || "https://sepolia.infura.io/v3/demo"),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({ accentColor: "#c7871e" })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
