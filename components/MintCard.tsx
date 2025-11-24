"use client";

import { useMemo, useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import { contract } from "@/lib/contract";
import { formatEther, parseEther } from "viem";
import { logMint } from "@/lib/telemetry";

export function MintCard() {
  const { address } = useAccount();
  const [qty, setQty] = useState(1);
  const [presaleProof, setPresaleProof] = useState<string>("");
  const [mode, setMode] = useState<"public" | "presale">("public");

  const { data: mintPrice } = useReadContract({ ...contract, functionName: "mintPrice" });
  const { data: perTxLimit } = useReadContract({ ...contract, functionName: "perTxLimit" });
  const { data: perWalletLimit } = useReadContract({ ...contract, functionName: "perWalletLimit" });
  const { data: salePhase } = useReadContract({ ...contract, functionName: "salePhase" });
  const { data: totalSupply } = useReadContract({ ...contract, functionName: "totalSupply" });
  const { data: maxSupply } = useReadContract({ ...contract, functionName: "MAX_SUPPLY" });

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const chainId = useChainId();

  const maxPerTx = Number((perTxLimit as bigint | undefined) ?? 10n);
  const maxPerWallet = Number((perWalletLimit as bigint | undefined) ?? 20n);
  const uiMax = 5; // UI cap per your spec
  const effectiveMax = Math.min(uiMax, maxPerTx);
  const priceWei = (mintPrice as bigint | undefined) ?? parseEther("0.05");
  const totalCostWei = priceWei * BigInt(qty);

  const saleLabel = useMemo(() => {
    const n = typeof salePhase === "bigint" ? Number(salePhase) : Number(salePhase ?? 0);
    return n === 0 ? "Paused" : n === 1 ? "Presale" : "Public";
  }, [salePhase]);

  function onMinus() {
    setQty((q) => Math.max(1, q - 1));
  }
  function onPlus() {
    setQty((q) => Math.min(effectiveMax, q + 1));
  }

  function parseProof(text: string): `0x${string}`[] {
    try {
      const v = JSON.parse(text);
      if (Array.isArray(v)) return v as `0x${string}`[];
    } catch { }
    // fallback: comma separated
    return text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean) as `0x${string}`[];
  }

  const canMint = address && (saleLabel === "Public" || (saleLabel === "Presale" && presaleProof.length > 0));

  function handleMint() {
    if (!canMint) return;
    if (saleLabel === "Public") {
      writeContract({
        ...contract,
        functionName: "mintPublic",
        args: [BigInt(qty)],
        value: totalCostWei,
      });
    } else {
      writeContract({
        ...contract,
        functionName: "mintPresale",
        args: [BigInt(qty), parseProof(presaleProof)],
        value: totalCostWei,
      });
    }
  }

  // Log mint when tx is sent and when confirmed
  useEffect(() => {
    if (hash && address) {
      logMint({ address, quantity: qty, txHash: hash, chainId, priceWei: totalCostWei.toString() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  useEffect(() => {
    if (isConfirmed && hash && address) {
      logMint({ address, quantity: qty, txHash: hash, chainId, priceWei: totalCostWei.toString() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed]);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Mint</h2>
        <div className="text-right">
          <div className="text-sm text-white/60">Phase: <span className="text-gilded-300">{saleLabel}</span></div>
          <div className="text-sm text-white/60">Minted: <span className="text-gilded-300">{totalSupply ? Number(totalSupply) : 0} / {maxSupply ? Number(maxSupply) : 10000}</span></div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <div className="text-white/70 text-sm">Price</div>
          <div className="text-xl font-semibold">{formatEther(priceWei)} ETH</div>
        </div>
        <div>
          <div className="text-white/70 text-sm">Quantity</div>
          <div className="mt-1 inline-flex items-center gap-2">
            <button className="btn btn-outline" onClick={onMinus} disabled={qty <= 1}>-</button>
            <span className="w-10 text-center text-lg">{qty}</span>
            <button className="btn btn-outline" onClick={onPlus} disabled={qty >= maxPerTx}>+</button>
            <span className="text-white/50 text-sm ml-2">Max {effectiveMax}/tx</span>
          </div>
        </div>
      </div>

      {saleLabel === "Presale" && (
        <div className="mt-4">
          <div className="text-white/70 text-sm">Presale proof</div>
          <textarea
            className="mt-1 w-full rounded-md bg-black/40 p-2 border border-yellow-800/30"
            placeholder='Enter JSON array of hex proof or comma separated (e.g., ["0xabc...","0xdef..."])'
            rows={3}
            value={presaleProof}
            onChange={(e) => setPresaleProof(e.target.value)}
          />
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        <button
          className="btn btn-primary"
          disabled={!canMint || isPending || isConfirming}
          onClick={handleMint}
        >
          {isPending || isConfirming ? "Confirming..." : saleLabel === "Presale" ? "Commission Portrait (Presale)" : "Commission Portrait"}
        </button>
        <div className="text-white/60 text-sm">Total: {formatEther(totalCostWei)} ETH</div>
      </div>
      
      <div className="mt-2 text-xs text-white/40">
        Max {maxPerTx} per transaction • Max {maxPerWallet} per wallet
      </div>

      {hash && (
        <div className="mt-3 text-sm text-gilded-300 break-all">Tx: {hash}</div>
      )}
      {isConfirmed && <div className="mt-2 text-sm text-green-400">Mint confirmed!</div>}
    </div>
  );
}
