"use client";

import { useEffect, useMemo } from "react";
import { useReadContract } from "wagmi";
import { contract } from "@/lib/contract";
import { formatEther } from "viem";

const MAX_SUPPLY = 10000n; // contract constant not exposed; mirror here

function phaseLabel(v?: number | bigint) {
  const n = typeof v === "bigint" ? Number(v) : v ?? 0;
  return n === 0 ? "Paused" : n === 1 ? "Presale" : n === 2 ? "Public" : "Unknown";
}

export function StatsBar() {
  const totalSupply = useReadContract({
    ...contract,
    functionName: "totalSupply",
  });
  const salePhase = useReadContract({
    ...contract,
    functionName: "salePhase",
  });
  const priceRead = useReadContract({
    ...contract,
    functionName: "mintPrice",
  });

  const minted = (totalSupply.data as bigint | undefined) ?? 0n;
  const remaining = MAX_SUPPLY - minted;
  const phase = phaseLabel(salePhase.data as bigint | undefined);
  const priceWei = (priceRead.data as bigint | undefined) ?? 0n;
  const priceEth = formatEther(priceWei);
  const progress = Math.min(100, Number((minted * 10000n) / MAX_SUPPLY) / 100);

  return (
    <div className="card p-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <div className="text-sm text-white/60">Minted</div>
          <div className="text-xl font-semibold">{minted.toString()}</div>
        </div>
        <div>
          <div className="text-sm text-white/60">Remaining</div>
          <div className="text-xl font-semibold">{remaining.toString()}</div>
        </div>
        <div>
          <div className="text-sm text-white/60">Max Supply</div>
          <div className="text-xl font-semibold">{MAX_SUPPLY.toString()}</div>
        </div>
        <div>
          <div className="text-sm text-white/60">Price</div>
          <div className="text-xl font-semibold">{priceEth} ETH</div>
        </div>
        <div>
          <div className="text-sm text-white/60">Phase</div>
          <div className="text-xl font-semibold">{phase}</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="h-2 w-full rounded bg-white/10 overflow-hidden">
          <div className="h-full bg-gilded-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-1 text-right text-xs text-white/60">{progress.toFixed(2)}%</div>
      </div>
    </div>
  );
}
