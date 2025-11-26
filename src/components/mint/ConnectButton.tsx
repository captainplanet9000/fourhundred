"use client";

import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { Button } from "@/components/ui/button";

const walletIcons: Record<string, string> = {
  metamask: "🦊",
  coinbasewallet: "🔵",
  walletconnect: "🔗",
  injected: "💉",
};

const walletNames: Record<string, string> = {
  metamask: "MetaMask",
  coinbasewallet: "Coinbase Wallet", 
  walletconnect: "WalletConnect",
  injected: "Browser Wallet",
};

export const ConnectButton: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [showOptions, setShowOptions] = useState(false);

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

  // Filter to unique connectors by id
  const uniqueConnectors = connectors.filter(
    (c, i, arr) => arr.findIndex((x) => x.id === c.id) === i
  );

  return (
    <div className="relative">
      <Button
        onClick={() => setShowOptions(!showOptions)}
        disabled={status === "pending"}
        className="bg-primary text-primary-foreground hover:brightness-110"
      >
        {status === "pending" ? "Connecting..." : "Connect Wallet"}
      </Button>

      {showOptions && (
        <div className="absolute top-full mt-2 left-0 bg-black/95 border border-primary/40 rounded-lg p-2 min-w-[200px] z-50 shadow-xl">
          <div className="text-xs text-muted-foreground mb-2 px-2">Select Wallet</div>
          {uniqueConnectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => {
                connect({ connector });
                setShowOptions(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/20 text-left text-sm transition-colors"
            >
              <span className="text-lg">{walletIcons[connector.id.toLowerCase()] || "🔌"}</span>
              <span>{walletNames[connector.id.toLowerCase()] || connector.name}</span>
            </button>
          ))}
          {error && (
            <div className="text-xs text-red-400 mt-2 px-2">{error.message}</div>
          )}
        </div>
      )}
    </div>
  );
};