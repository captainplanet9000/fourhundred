"use client";

import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { Button } from "@/components/ui/button";

export const ConnectButton: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { connectors, connect, status } = useConnect();

  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          Connected: <span className="font-medium">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        </div>
        <Button variant="outline" onClick={() => disconnect()}>Disconnect</Button>
      </div>
    );
  }

  // Prefer a ready connector (e.g., Injected/MetaMask). Fallback to WalletConnect if present.
  const preferred =
    connectors.find((c) => (c as any).ready) ||
    connectors.find((c) => c.id?.toLowerCase?.() === "walletconnect") ||
    connectors[0];

  return (
    <Button
      onClick={() => preferred && connect({ connector: preferred })}
      disabled={status === "pending" || !preferred}
      className="bg-primary text-primary-foreground hover:brightness-110"
    >
      {preferred ? (status === "pending" ? "Connecting..." : "Connect Wallet") : "No Wallet Found"}
    </Button>
  );
};