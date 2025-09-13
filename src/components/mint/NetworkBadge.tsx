"use client";

import React from "react";
import { useChainId, useConfig } from "wagmi";
import { getEnv } from "@/lib/env";
import { Badge } from "@/components/ui/badge";

export const NetworkBadge: React.FC = () => {
  const config = useConfig();
  const chainId = useChainId();
  const active = config.chains.find((c) => c.id === chainId);
  const targetStr = getEnv("VITE_CHAIN_ID") ?? getEnv("NEXT_PUBLIC_CHAIN_ID");
  const target = targetStr ? Number(targetStr) : undefined;
  const mismatch = target !== undefined && target !== chainId;

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="border-primary/40">
        {active ? `${active.name} (id: ${active.id})` : "Unknown network"}
      </Badge>
      {mismatch && (
        <Badge variant="destructive" className="whitespace-nowrap">
          Expected id: {target}
        </Badge>
      )}
    </div>
  );
};