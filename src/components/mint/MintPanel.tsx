"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  useConfig,
  useReadContract,
} from "wagmi";
import { getContractAddress } from "@/lib/env";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { parseEther } from "viem";

import FourHundredABI from "@/lib/abi/FourHundred.json";

// Replaced DEFAULT_ABI with import
const contractAbi = FourHundredABI.abi;

/**
 * Allowlist proof lookup. The build pipeline drops `merkle/proofs.json` into
 * `public/proofs.json` (see scripts/generateMerkleRoot.ts). The file is small
 * — even 5,000 entries with proofs is well under 1 MB — and serving it as a
 * static asset means we can update the allowlist without redeploying the dapp.
 *
 * Schema:
 *   { root: "0x..", count: N, sources: {...},
 *     addresses: { "0xCheckSum": ["0x...", "0x..."] } }
 *
 * Returns null if the file is missing (no presale yet) or if the connected
 * wallet isn't on the list.
 */
type ProofsFile = { root: string; addresses: Record<string, string[]> };

function useAllowlistProof(address: string | undefined): {
  proof: `0x${string}`[] | null;
  loading: boolean;
} {
  const [proofs, setProofs] = useState<ProofsFile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/proofs.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled) setProofs(data as ProofsFile | null);
      })
      .catch(() => {
        if (!cancelled) setProofs(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const proof = useMemo<`0x${string}`[] | null>(() => {
    if (!proofs || !address) return null;
    // Allowlist file uses checksummed addresses; do a lowercase fallback too.
    const lookup = proofs.addresses[address] ?? proofs.addresses[address.toLowerCase()];
    return (lookup as `0x${string}`[] | undefined) ?? null;
  }, [proofs, address]);

  return { proof, loading };
}

export const MintPanel: React.FC<{
  priceEth?: number;
  totalSupply?: number;
  maxSupply?: number;
  abi?: any;
}> = ({ priceEth = 0, totalSupply = 0, maxSupply = 9400, abi }) => {
  const { isConnected, address } = useAccount();
  const contractAddress = getContractAddress();
  // Free mint launch: per-wallet limit is 1, so the qty selector is hidden
  // and we always send qty=1. If the project later raises perWalletLimit,
  // re-expose the input.
  const isFreeMint = priceEth === 0;
  const [qty, setQty] = useState<number>(1);

  const config = useConfig();
  const chainId = useChainId();
  const activeChain = useMemo(
    () => config.chains.find((c) => c.id === chainId) ?? config.chains[0],
    [config, chainId],
  );

  const contractAbi = useMemo(() => abi ?? FourHundredABI.abi, [abi]);

  const { data: hash, isPending, writeContract, error } = useWriteContract();
  // Aggressive polling — MegaETH mini-blocks land at ~10ms cadence, so the
  // default ~4s wagmi interval makes the UI feel like a slow chain. 250ms
  // gives users a "claimed!" within roughly one breath without hammering
  // the RPC. Tune up via VITE_RECEIPT_POLL_MS if needed.
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
    pollingInterval: 250,
  });

  // Allowlist lookup — if the connected wallet has a presale proof, we route
  // the mint through `presaleMint(qty, proof)` instead of `mintPublic(qty)`.
  // The dapp doesn't know which sale phase is live; the contract enforces it.
  // If the user is allowlisted but the phase is Public, presaleMint will
  // revert with `PresaleNotActive` — they can still mint via the Public phase,
  // we just need to fall back. We try presaleMint first when a proof exists
  // because allowlist holders generally claim during presale before public.
  const { proof: allowlistProof, loading: proofLoading } = useAllowlistProof(address);
  const isAllowlisted = !!allowlistProof;

  const canMint = Boolean(contractAddress) && isConnected;

  // Read the live sale phase so the dapp picks the right function. Enum:
  // 0 = Paused, 1 = Presale, 2 = Public.
  const { data: salePhaseRaw } = useReadContract({
    address: contractAddress as `0x${string}` | undefined,
    abi: contractAbi,
    functionName: "salePhase",
    args: [],
    query: { enabled: Boolean(contractAddress) },
  });
  const salePhase = typeof salePhaseRaw === "number" ? salePhaseRaw : Number(salePhaseRaw ?? 0);

  // Read on-chain totalSupply when possible
  const { data: chainTotalSupply } = useReadContract({
    address: contractAddress as `0x${string}` | undefined,
    abi: contractAbi,
    functionName: "totalSupply",
    args: [],
    query: { enabled: Boolean(contractAddress) },
  });

  const handleMint = () => {
    if (!contractAddress || !address || !activeChain) return;
    // Multiplying parseEther(0) by anything is still 0, but bypass the
    // ether helper for the common free-mint case to avoid surprises.
    const totalValue = isFreeMint
      ? 0n
      : parseEther(priceEth.toString()) * BigInt(qty);

    // Choose the right contract function based on the live sale phase and
    // the connected wallet's allowlist status.
    const usePresale = salePhase === 1 && isAllowlisted && allowlistProof;
    if (usePresale) {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: contractAbi,
        functionName: "presaleMint",
        args: [BigInt(qty), allowlistProof] as const,
        value: totalValue,
        account: address as `0x${string}`,
        chain: activeChain,
      });
    } else {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: contractAbi,
        functionName: "mintPublic",
        args: [BigInt(qty)] as const,
        value: totalValue,
        account: address as `0x${string}`,
        chain: activeChain,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3">
        {!isFreeMint && (
          <div className="flex-1">
            <label className="block text-sm mb-1">Quantity</label>
            <Input
              type="number"
              min={1}
              max={10}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Math.min(10, Number(e.target.value))))}
            />
          </div>
        )}
        <Button
          onClick={handleMint}
          disabled={!canMint || isPending || isConfirming}
          className="bg-primary text-primary-foreground hover:brightness-110 flex-1"
        >
          {isPending
            ? "Confirm in wallet..."
            : isConfirming
              ? "Claiming..."
              : isFreeMint
                ? "Claim FREE"
                : "Mint"}
        </Button>
      </div>

      <div className="text-sm text-muted-foreground flex flex-wrap gap-3">
        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
          {isFreeMint ? "FREE — gas only" : `Price: ${priceEth} ETH each`}
        </Badge>
        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
          Supply: {typeof chainTotalSupply === "bigint" ? Number(chainTotalSupply) : totalSupply ?? "—"} / {maxSupply}
        </Badge>
        {isFreeMint && (
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            1 per wallet
          </Badge>
        )}
        {!proofLoading && isAllowlisted && (
          <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/40">
            Allowlist ✓
          </Badge>
        )}
        {!proofLoading && !isAllowlisted && salePhase === 1 && (
          <Badge variant="outline" className="text-white/60">
            Public phase opens after allowlist
          </Badge>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Transaction error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      {hash && (
        <Alert>
          <AlertTitle>Transaction sent</AlertTitle>
          <AlertDescription>Hash: {hash}</AlertDescription>
        </Alert>
      )}

      {isConfirmed && (
        <Alert>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your mint is confirmed.</AlertDescription>
        </Alert>
      )}
    </div>
  );
};