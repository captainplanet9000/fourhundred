"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchTokenMetadata, fetchBatchMetadata, type TokenMetadata, preloadMetadataRange } from "@/lib/metadataService";
import { 
  LazyImage, 
  VirtualizedList, 
  useDebounce, 
  useMemoizedValue, 
  usePrefetch,
  useInfiniteScroll 
} from "@/components/PerformanceOptimizations";
import { GalleryItemSkeleton, LoadingSpinner, ConnectionError, NotFound } from "@/components/LoadingStates";
import { useResponsiveValue } from "@/components/ResponsiveLayout";

type Token = TokenMetadata & {
  tokenId: number;
};

const FALLBACK = "/gallery/royal-poodle-crown-1.jpg";
const PRELOAD_COUNT = 100; // Preload metadata for first 100 tokens
const VIRTUALIZED_ITEM_HEIGHT = 300; // Approximate height of each gallery item

export function OptimizedGallery() {
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

  // Responsive container height
  const containerHeight = useResponsiveValue({
    mobile: 2400, // 8 items * 300px
    tablet: 3600, // 12 items * 300px
    desktop: 6000  // 20 items * 300px
  });

  // Debounce search term to avoid excessive filtering
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Generate token IDs and fetch metadata
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Create array of token IDs (1-10000)
        const tokenIds = Array.from({ length: 10000 }, (_, i) => i + 1);
        
        // Preload metadata for first batch
        await preloadMetadataRange(1, PRELOAD_COUNT);
        
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
  const filteredAndSortedTokens = useMemoizedValue(() => {
    let result = [...tokens];
    
    // Apply search filter
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      result = result.filter(token => 
        token.name.toLowerCase().includes(searchLower) ||
        token.description.toLowerCase().includes(searchLower) ||
        token.attributes.some(attr => 
          attr.value.toLowerCase().includes(searchLower)
        )
      );
    }
    
    // Apply rarity filter
    if (selectedRarity !== "all") {
      result = result.filter(token => 
        token.rarity?.tier === selectedRarity
      );
    }
    
    // Apply breed filter
    if (selectedBreed !== "all") {
      result = result.filter(token => 
        token.attributes.some(attr => 
          attr.trait_type === "Breed" && attr.value === selectedBreed
        )
      );
    }
    
    // Sort by rarity rank if available
    result.sort((a, b) => {
      const rankA = a.rarity?.rank || 10000;
      const rankB = b.rarity?.rank || 10000;
      return rankA - rankB;
    });
    
    return result;
  }, [tokens, debouncedSearchTerm, selectedRarity, selectedBreed]);

  // Update filtered tokens when filters change
  useEffect(() => {
    setFilteredTokens(filteredAndSortedTokens);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filteredAndSortedTokens]);

  // Get unique breeds and rarities for filter dropdowns
  const { uniqueBreeds, uniqueRarities } = useMemoizedValue(() => {
    const breeds = new Set<string>();
    const rarities = new Set<string>();
    
    tokens.forEach(token => {
      token.attributes.forEach(attr => {
        if (attr.trait_type === "Breed") {
          breeds.add(attr.value);
        }
      });
      
      if (token.rarity?.tier) {
        rarities.add(token.rarity.tier);
      }
    });
    
    return {
      uniqueBreeds: Array.from(breeds).sort(),
      uniqueRarities: Array.from(rarities).sort()
    };
  }, [tokens]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTokens.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTokens = filteredTokens.slice(startIndex, startIndex + itemsPerPage);

  // Handle infinite scroll
  const loadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const { containerRef, isLoading: isLoadingMore } = useInfiniteScroll(
    loadMore,
    currentPage < totalPages
  );

  // Render function for virtualized list
  const renderGalleryItem = useCallback((token: Token, index: number) => (
    <Link href={`/token/${token.tokenId}`} key={token.tokenId}>
      <div className="card p-3 hover:scale-105 transition-transform cursor-pointer">
        <div className="aspect-square relative overflow-hidden rounded-md">
          <LazyImage
            src={token.image}
            alt={token.name}
            fallback={FALLBACK}
            className="object-cover w-full h-full"
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
  ), []);

  // Get rarity color
  function getRarityColor(tier: string) {
    switch (tier) {
      case "Common": return "text-gray-300";
      case "Uncommon": return "text-green-400";
      case "Rare": return "text-blue-400";
      case "Epic": return "text-purple-400";
      case "Legendary": return "text-gilded-400";
      case "Mythic": return "text-red-400";
      default: return "text-gray-300";
    }
  }

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
    <div>
      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or trait..."
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gilded-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gilded-500"
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
          >
            <option value="all">All Rarities</option>
            {uniqueRarities.map(rarity => (
              <option key={rarity} value={rarity}>{rarity}</option>
            ))}
          </select>
          <select
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gilded-500"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            <option value="all">All Breeds</option>
            {uniqueBreeds.map(breed => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-white/70">
        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTokens.length)} of {filteredTokens.length} tokens
      </div>

      {/* Gallery Grid - using virtualization for better performance */}
      <div ref={containerRef} style={{ height: containerHeight, overflow: "auto" }}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {currentTokens.map(token => (
            <Link href={`/token/${token.tokenId}`} key={token.tokenId}>
              <div className="card p-3 hover:scale-105 transition-transform cursor-pointer">
                <div className="aspect-square relative overflow-hidden rounded-md">
                  <LazyImage
                    src={token.image}
                    alt={token.name}
                    fallback={FALLBACK}
                    className="object-cover w-full h-full"
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
        </div>
        
        {/* Loading more indicator */}
        {isLoadingMore && (
          <div className="flex justify-center my-4">
            <LoadingSpinner />
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            className="btn btn-secondary px-4 py-2 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          <div className="flex gap-1">
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
                  className={`w-10 h-10 rounded-full ${currentPage === pageNum ? 'bg-gilded-500 text-black' : 'bg-white/10 text-white'}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            className="btn btn-secondary px-4 py-2 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}