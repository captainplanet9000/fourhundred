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

  const wc = connectors[0];

  return (
    <Button
      onClick={() => connect({ connector: wc })}
      disabled={status === "pending"}
      className="bg-yellow-600 hover:bg-yellow-700 text-black"
    >
      {status === "pending" ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};