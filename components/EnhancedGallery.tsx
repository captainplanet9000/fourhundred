"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchTokenMetadata, fetchBatchMetadata, type TokenMetadata } from "@/lib/metadataService";
import { GalleryItemSkeleton, LoadingSpinner, ConnectionError, ResponsiveGrid } from "@/components/LoadingStates";
import { useResponsiveValue } from "@/components/ResponsiveLayout";

type Token = TokenMetadata & {
  tokenId: number;
};

const FALLBACK = "/gallery/royal-poodle-crown-1.jpg";
const PRELOAD_COUNT = 100; // Preload metadata for first 100 tokens

export function EnhancedGallery() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [selectedBreed, setSelectedBreed] = useState<string>("all");

  // Responsive items per page
  const itemsPerPage = useResponsiveValue({
    mobile: 8,
    tablet: 12,
    desktop: 20
  });

  // Generate token IDs and fetch metadata
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Create array of token IDs (1-10000)
        const tokenIds = Array.from({ length: 10000 }, (_, i) => i + 1);
        
        // Preload metadata for first batch
        await fetchBatchMetadata(tokenIds.slice(0, PRELOAD_COUNT));
        
        // Initially create tokens with minimal data
        const initialTokens: Token[] = tokenIds.map(tokenId => ({
          tokenId,
          name: `fourHundred #${tokenId}`,
          description: "",
          image: `/gallery/royal-poodle-crown-${(tokenId % 2) + 1}.jpg`,
          attributes: []
        }));
        
        setTokens(initialTokens);
        setFilteredTokens(initialTokens);
        setLoading(false);
        
        // Fetch full metadata in batches
        const batchSize = 100;
        for (let i = 0; i < tokenIds.length; i += batchSize) {
          const batch = tokenIds.slice(i, i + batchSize);
          const metadata = await fetchBatchMetadata(batch);
          
          setTokens(prev => {
            const newTokens = [...prev];
            metadata.forEach((meta, idx) => {
              const tokenIndex = newTokens.findIndex(t => t.tokenId === batch[idx]);
              if (tokenIndex !== -1) {
                newTokens[tokenIndex] = { ...newTokens[tokenIndex], ...meta };
              }
            });
            return newTokens;
          });
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
        setError("Failed to load gallery. Please try again.");
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  // Filter tokens based on search and filters
  useEffect(() => {
    let result = tokens;
    
    if (searchTerm) {
      result = result.filter(token => 
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.attributes.some(attr => 
          attr.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    if (selectedRarity !== "all") {
      result = result.filter(token => token.rarity?.tier === selectedRarity);
    }
    
    if (selectedBreed !== "all") {
      result = result.filter(token => 
        token.attributes.some(attr => 
          attr.trait_type === "Breed" && attr.value === selectedBreed
        )
      );
    }
    
    setFilteredTokens(result);
    setCurrentPage(1);
  }, [tokens, searchTerm, selectedRarity, selectedBreed]);

  const totalPages = Math.ceil(filteredTokens.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTokens = filteredTokens.slice(startIndex, startIndex + itemsPerPage);

  const getRarityColor = (tier: string) => {
    switch (tier) {
      case "Common": return "text-gray-400";
      case "Uncommon": return "text-green-400";
      case "Rare": return "text-blue-400";
      case "Epic": return "text-purple-400";
      case "Legendary": return "text-yellow-400";
      default: return "text-white";
    }
  };

  const getUniqueBreeds = () => {
    const breeds = new Set<string>();
    tokens.forEach(token => {
      const breedAttr = token.attributes.find(attr => attr.trait_type === "Breed");
      if (breedAttr) breeds.add(breedAttr.value);
    });
    return Array.from(breeds);
  };

  if (error) {
    return <ConnectionError onRetry={() => window.location.reload()} />;
  }

  if (loading) {
    return (
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <GalleryItemSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search by name or trait..."
            className="w-full px-4 py-2 rounded-md bg-black/40 border border-yellow-800/30 text-white placeholder-white/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="w-full px-4 py-2 rounded-md bg-black/40 border border-yellow-800/30 text-white"
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
          >
            <option value="all">All Rarities</option>
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
            <option value="Epic">Epic</option>
            <option value="Legendary">Legendary</option>
          </select>
        </div>
        <div>
          <select
            className="w-full px-4 py-2 rounded-md bg-black/40 border border-yellow-800/30 text-white"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            <option value="all">All Breeds</option>
            {getUniqueBreeds().map(breed => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-white/70">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTokens.length)} of {filteredTokens.length} tokens
        </p>
        <p className="text-white/70">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Gallery Grid */}
      <ResponsiveGrid>
        {currentTokens.map((token) => (
          <Link href={`/token/${token.tokenId}`} key={token.tokenId}>
            <div className="card p-3 hover:scale-105 transition-transform cursor-pointer">
              <div className="aspect-square relative overflow-hidden rounded-md">
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
                {token.rarity && (
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-semibold ${getRarityColor(token.rarity.tier)} bg-black/70`}>
                    {token.rarity.tier}
                  </div>
                )}
              </div>
              <div className="mt-2">
                <h3 className="font-semibold truncate">{token.name}</h3>
                {token.rarity && (
                  <p className="text-sm text-white/70">Rank: #{token.rarity.rank}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </ResponsiveGrid>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          <button
            className="btn btn-outline disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className={`btn btn-outline w-10 ${currentPage === pageNum ? 'bg-gilded-500/20 border-gilded-500' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            className="btn btn-outline disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}