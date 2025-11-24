"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useReadContract } from "wagmi";
import { contract } from "@/lib/contract";
import { formatEther } from "viem";
import { fetchTokenMetadata, type TokenMetadata } from "@/lib/metadataService";
import { TokenDetailSkeleton, LoadingSpinner, NotFound } from "@/components/LoadingStates";

type Token = TokenMetadata & {
  tokenId: number;
};

const FALLBACK = "/gallery/royal-poodle-crown-1.jpg";

export function TokenDetail() {
  const params = useParams();
  const router = useRouter();
  const tokenId = parseInt(params.id as string);
  const [token, setToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);

  const { data: tokenOwner } = useReadContract({
    ...contract,
    functionName: "ownerOf",
    args: [BigInt(tokenId)],
    query: { enabled: !!tokenId && tokenId > 0 && tokenId <= 10000 }
  });

  useEffect(() => {
    if (tokenOwner) {
      setOwner(String(tokenOwner));
    }
  }, [tokenOwner]);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!tokenId || tokenId < 1 || tokenId > 10000) {
        setError("Token not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch metadata using the metadata service
        const metadata = await fetchTokenMetadata(tokenId);
        
        const tokenData: Token = {
          tokenId,
          ...metadata
        };

        setToken(tokenData);
      } catch (error) {
        console.error("Error fetching token data:", error);
        setError("Failed to load token details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, [tokenId, router]);

  const getRarityColor = (tier: string) => {
    switch (tier) {
      case "Common": return "text-gray-400 bg-gray-900/50";
      case "Uncommon": return "text-green-400 bg-green-900/50";
      case "Rare": return "text-blue-400 bg-blue-900/50";
      case "Epic": return "text-purple-400 bg-purple-900/50";
      case "Legendary": return "text-yellow-400 bg-yellow-900/50";
      default: return "text-white bg-white/10";
    }
  };

  const getRarityScoreColor = (score: number) => {
    if (score >= 90) return "text-yellow-400";
    if (score >= 70) return "text-purple-400";
    if (score >= 50) return "text-blue-400";
    if (score >= 30) return "text-green-400";
    return "text-gray-400";
  };

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/gallery" className="text-gilded-400 hover:text-gilded-300 flex items-center gap-2">
            ← Back to Gallery
          </Link>
        </div>
        <NotFound message={error} />
        <div className="text-center mt-4">
          <Link href="/gallery" className="btn btn-primary">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/gallery" className="text-gilded-400 hover:text-gilded-300 flex items-center gap-2">
            ← Back to Gallery
          </Link>
        </div>
        <TokenDetailSkeleton />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/gallery" className="text-gilded-400 hover:text-gilded-300 flex items-center gap-2">
            ← Back to Gallery
          </Link>
        </div>
        <NotFound />
        <div className="text-center mt-4">
          <Link href="/gallery" className="btn btn-primary">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link href="/gallery" className="text-gilded-400 hover:text-gilded-300 flex items-center gap-2">
          ← Back to Gallery
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Token Image */}
        <div className="space-y-4">
          <div className="card p-4">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src={token.image}
                alt={token.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = FALLBACK;
                }}
              />
            </div>
          </div>

          {/* Token Info */}
          <div className="card p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{token.name}</h1>
                <p className="text-white/70 mt-2">{token.description}</p>
              </div>
              {token.rarity && (
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRarityColor(token.rarity.tier)}`}>
                  {token.rarity.tier}
                </div>
              )}
            </div>

            {token.rarity && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm">Rarity Rank</p>
                  <p className="text-xl font-semibold">#{token.rarity.rank}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Rarity Score</p>
                  <p className={`text-xl font-semibold ${getRarityScoreColor(token.rarity.score)}`}>
                    {token.rarity.score}/100
                  </p>
                </div>
              </div>
            )}

            {owner && (
              <div className="mt-4">
                <p className="text-white/60 text-sm">Owner</p>
                <p className="font-mono text-sm truncate">{owner}</p>
              </div>
            )}
          </div>
        </div>

        {/* Token Attributes */}
        <div className="space-y-4">
          <div className="card p-6">
            <h2 className="text-2xl font-semibold mb-4">Attributes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {token.attributes.map((attr, index) => (
                <div key={index} className="p-3 rounded-lg bg-black/40 border border-yellow-800/30">
                  <p className="text-white/60 text-sm">{attr.trait_type}</p>
                  <p className="font-medium">{attr.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="card p-6">
            <h2 className="text-2xl font-semibold mb-4">Actions</h2>
            <div className="space-y-3">
              <button className="btn btn-primary w-full">
                View on OpenSea
              </button>
              <button className="btn btn-outline w-full">
                Share on Twitter
              </button>
              <button className="btn btn-outline w-full">
                Download Image
              </button>
            </div>
          </div>

          {/* Price Chart */}
          <div className="card p-6">
            <h2 className="text-2xl font-semibold mb-4">Price History</h2>
            <div className="h-48 flex items-center justify-center text-white/50">
              Price chart would be displayed here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}