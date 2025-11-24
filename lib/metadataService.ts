// Service for fetching and caching NFT metadata from IPFS

export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  rarity?: {
    rank: number;
    score: number;
    tier: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
  };
}

// Cache for metadata to reduce IPFS calls
const metadataCache = new Map<number, TokenMetadata>();

// IPFS gateway configuration
const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/ipfs/";
const METADATA_URI = process.env.NEXT_PUBLIC_METADATA_URI || "https://ipfs.io/ipfs/QmYourMetadataCid/";

/**
 * Fetch metadata for a specific token
 * @param tokenId The token ID to fetch metadata for
 * @returns Promise<TokenMetadata>
 */
export async function fetchTokenMetadata(tokenId: number): Promise<TokenMetadata> {
  // Check cache first
  if (metadataCache.has(tokenId)) {
    return metadataCache.get(tokenId)!;
  }

  try {
    // In a real implementation, this would fetch from IPFS
    // For demo purposes, we'll generate mock data
    const mockMetadata = generateMockMetadata(tokenId);
    
    // Cache the result
    metadataCache.set(tokenId, mockMetadata);
    
    return mockMetadata;
  } catch (error) {
    console.error(`Error fetching metadata for token ${tokenId}:`, error);
    
    // Return fallback metadata
    const fallbackMetadata = generateFallbackMetadata(tokenId);
    metadataCache.set(tokenId, fallbackMetadata);
    
    return fallbackMetadata;
  }
}

/**
 * Fetch metadata for multiple tokens (batch)
 * @param tokenIds Array of token IDs to fetch metadata for
 * @returns Promise<TokenMetadata[]>
 */
export async function fetchBatchMetadata(tokenIds: number[]): Promise<TokenMetadata[]> {
  // Filter out cached tokens
  const uncachedTokenIds = tokenIds.filter(id => !metadataCache.has(id));
  
  // Fetch uncached metadata in parallel
  const uncachedPromises = uncachedTokenIds.map(id => fetchTokenMetadata(id));
  const uncachedResults = await Promise.all(uncachedPromises);
  
  // Return all metadata (cached + newly fetched)
  return tokenIds.map(id => metadataCache.get(id)!);
}

/**
 * Generate mock metadata for demonstration
 * @param tokenId The token ID
 * @returns TokenMetadata
 */
function generateMockMetadata(tokenId: number): TokenMetadata {
  const breeds = [
    "Golden Retriever", "Labrador Retriever", "German Shepherd", "Poodle", "Bulldog",
    "Beagle", "Rottweiler", "Yorkshire Terrier", "Dachshund", "Siberian Husky",
    "Boxer", "Great Dane", "Pembroke Welsh Corgi", "Doberman Pinscher", "Australian Shepherd",
    "Miniature Schnauzer", "Cavalier King Charles Spaniel", "Shih Tzu", "Boston Terrier", "Pomeranian"
  ];
  
  const rarities: Array<"Common" | "Uncommon" | "Rare" | "Epic" | "Legendary"> = 
    ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
  
  const traits = [
    "Background", "Frame", "Clothing", "Accessory", "Expression", "Pose", "Special Effect"
  ];
  
  const traitValues = {
    "Background": ["Gilded", "Velvet", "Library", "Garden", "Throne Room"],
    "Frame": ["Gold", "Silver", "Bronze", "Ornate", "Simple"],
    "Clothing": ["Royal Robe", "Military Uniform", "Formal Suit", "Cape", "Collar"],
    "Accessory": ["Crown", "Top Hat", "Monocle", "Pocket Watch", "Cane"],
    "Expression": ["Noble", "Proud", "Gentle", "Majestic", "Wise"],
    "Pose": ["Sitting", "Standing", "Lying Down", "Profile", "Action"],
    "Special Effect": ["Glow", "Sparkles", "Smoke", "Light Rays", "None"]
  };

  const breed = breeds[Math.floor(Math.random() * breeds.length)];
  const rarity = rarities[Math.floor(Math.random() * rarities.length)];
  
  // Add breed as an attribute
  const attributes = traits.map(trait => ({
    trait_type: trait,
    value: traitValues[trait as keyof typeof traitValues][
      Math.floor(Math.random() * traitValues[trait as keyof typeof traitValues].length)
    ]
  }));
  
  // Insert breed attribute
  attributes.unshift({
    trait_type: "Breed",
    value: breed
  });

  return {
    name: `fourHundred #${tokenId}`,
    description: `A majestic ${breed} portrait from the fourHundred collection, featuring aristocratic styling in the Gilded Age tradition.`,
    image: `/gallery/royal-poodle-crown-${(tokenId % 2) + 1}.jpg`,
    attributes,
    rarity: {
      rank: Math.floor(Math.random() * 10000) + 1,
      score: Math.floor(Math.random() * 100),
      tier: rarity
    }
  };
}

/**
 * Generate fallback metadata when fetch fails
 * @param tokenId The token ID
 * @returns TokenMetadata
 */
function generateFallbackMetadata(tokenId: number): TokenMetadata {
  return {
    name: `fourHundred #${tokenId}`,
    description: "A majestic canine portrait from the fourHundred collection.",
    image: "/gallery/royal-poodle-crown-1.jpg",
    attributes: [
      { trait_type: "Breed", value: "Unknown" },
      { trait_type: "Background", value: "Gilded" },
      { trait_type: "Frame", value: "Gold" },
      { trait_type: "Clothing", value: "Royal Robe" },
      { trait_type: "Accessory", value: "Crown" },
      { trait_type: "Expression", value: "Noble" },
      { trait_type: "Pose", value: "Sitting" }
    ],
    rarity: {
      rank: 10000,
      score: 0,
      tier: "Common"
    }
  };
}

/**
 * Clear the metadata cache
 */
export function clearMetadataCache(): void {
  metadataCache.clear();
}

/**
 * Preload metadata for a range of tokens
 * @param startTokenId Starting token ID
 * @param endTokenId Ending token ID
 */
export async function preloadMetadataRange(startTokenId: number, endTokenId: number): Promise<void> {
  const tokenIds = Array.from(
    { length: endTokenId - startTokenId + 1 },
    (_, i) => startTokenId + i
  );
  
  await fetchBatchMetadata(tokenIds);
}