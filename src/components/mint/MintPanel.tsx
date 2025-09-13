"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  useConfig,
} from "wagmi";
import { getContractAddress } from "@/lib/env";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const DEFAULT_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "quantity", type: "uint256" }],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export const MintPanel: React.FC<{
  priceEth?: number;
  totalSupply?: number;
  maxSupply?: number;
  abi?: any;
}> = ({ priceEth = 0, totalSupply = 0, maxSupply = 400, abi }) => {
  const { isConnected, address } = useAccount();
  const contractAddress = getContractAddress();
  const [qty, setQty] = useState<number>(1);

  const config = useConfig();
  const chainId = useChainId();
  const activeChain = useMemo(
    () => config.chains.find((c) => c.id === chainId) ?? config.chains[0],
    [config, chainId],
  );

  const contractAbi = useMemo(() => abi ?? DEFAULT_ABI, [abi]);

  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const canMint = Boolean(contractAddress) && isConnected;

  const handleMint = () => {
    if (!contractAddress || !address || !activeChain) return;
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractAbi,
      functionName: "mint",
      args: [BigInt(qty)] as const,
      value: BigInt(Math.floor(priceEth * 1e18) * qty),
      account: address as `0x${string}`,
      chain: activeChain,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3">
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
        <Button
          onClick={handleMint}
          disabled={!canMint || isPending || isConfirming}
          className="bg-primary text-primary-foreground hover:brightness-110"
        >
          {isPending ? "Confirm in wallet..." : isConfirming ? "Minting..." : "Mint"}
        </Button>
      </div>

      <div className="text-sm text-muted-foreground flex flex-wrap gap-3">
        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
          Price: {priceEth} ETH
        </Badge>
        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
          Supply: {totalSupply} / {maxSupply}
        </Badge>
        {!contractAddress && (
          <Badge variant="destructive">Set contract address in .env to enable mint</Badge>
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