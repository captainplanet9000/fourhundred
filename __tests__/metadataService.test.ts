import { 
  fetchTokenMetadata, 
  fetchBatchMetadata, 
  clearMetadataCache,
  preloadMetadataRange
} from "@/lib/metadataService";

// Mock the environment variables
const originalEnv = process.env;

describe("metadataService", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    clearMetadataCache();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("fetchTokenMetadata", () => {
    test("returns mock metadata for a valid token ID", async () => {
      const tokenId = 123;
      const metadata = await fetchTokenMetadata(tokenId);

      expect(metadata).toEqual(
        expect.objectContaining({
          name: `fourHundred #${tokenId}`,
          image: expect.any(String),
          attributes: expect.arrayContaining([
            expect.objectContaining({
              trait_type: "Breed",
              value: expect.any(String)
            })
          ]),
          rarity: expect.objectContaining({
            rank: expect.any(Number),
            score: expect.any(Number),
            tier: expect.any(String)
          })
        })
      );
    });

    test("caches metadata after first fetch", async () => {
      const tokenId = 456;
      
      // First fetch
      const metadata1 = await fetchTokenMetadata(tokenId);
      
      // Second fetch should return cached data
      const metadata2 = await fetchTokenMetadata(tokenId);
      
      expect(metadata1).toBe(metadata2);
    });

    test("returns fallback metadata on error", async () => {
      const tokenId = 789;
      
      // Mock an error in the fetch
      jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const metadata = await fetchTokenMetadata(tokenId);
      
      expect(metadata).toEqual(
        expect.objectContaining({
          name: `fourHundred #${tokenId}`,
          image: "/gallery/royal-poodle-crown-1.jpg",
          attributes: expect.arrayContaining([
            expect.objectContaining({
              trait_type: "Breed",
              value: "Unknown"
            })
          ]),
          rarity: expect.objectContaining({
            rank: 10000,
            score: 0,
            tier: "Common"
          })
        })
      );
    });
  });

  describe("fetchBatchMetadata", () => {
    test("fetches metadata for multiple tokens", async () => {
      const tokenIds = [1, 2, 3, 4, 5];
      const metadata = await fetchBatchMetadata(tokenIds);

      expect(metadata).toHaveLength(tokenIds.length);
      
      metadata.forEach((token, index) => {
        expect(token).toEqual(
          expect.objectContaining({
            name: `fourHundred #${tokenIds[index]}`,
            image: expect.any(String),
            attributes: expect.arrayContaining([
              expect.objectContaining({
                trait_type: "Breed",
                value: expect.any(String)
              })
            ])
          })
        );
      });
    });

    test("uses cached metadata when available", async () => {
      const tokenIds = [10, 20, 30];
      
      // Pre-fetch one token
      await fetchTokenMetadata(tokenIds[0]);
      
      // Fetch all tokens
      const metadata = await fetchBatchMetadata(tokenIds);
      
      // All tokens should be returned
      expect(metadata).toHaveLength(tokenIds.length);
      
      // First token should be the same as the pre-fetched one
      const firstToken = await fetchTokenMetadata(tokenIds[0]);
      expect(metadata[0]).toBe(firstToken);
    });
  });

  describe("clearMetadataCache", () => {
    test("clears all cached metadata", async () => {
      const tokenId = 999;
      
      // Fetch and cache metadata
      const metadata1 = await fetchTokenMetadata(tokenId);
      
      // Clear cache
      clearMetadataCache();
      
      // Fetch again - should be different object
      const metadata2 = await fetchTokenMetadata(tokenId);
      
      expect(metadata1).not.toBe(metadata2);
    });
  });

  describe("preloadMetadataRange", () => {
    test("preloads metadata for a range of tokens", async () => {
      const startTokenId = 100;
      const endTokenId = 105;
      
      await preloadMetadataRange(startTokenId, endTokenId);
      
      // All tokens should now be cached
      for (let i = startTokenId; i <= endTokenId; i++) {
        const metadata = await fetchTokenMetadata(i);
        expect(metadata).toEqual(
          expect.objectContaining({
            name: `fourHundred #${i}`,
            image: expect.any(String),
            attributes: expect.arrayContaining([
              expect.objectContaining({
                trait_type: "Breed",
                value: expect.any(String)
              })
            ])
          })
        );
      }
    });
  });
});