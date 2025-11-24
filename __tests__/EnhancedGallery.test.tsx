import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnhancedGallery } from "@/components/EnhancedGallery";
import { fetchTokenMetadata, fetchBatchMetadata } from "@/lib/metadataService";

// Mock the metadata service
jest.mock("@/lib/metadataService", () => ({
  fetchTokenMetadata: jest.fn(),
  fetchBatchMetadata: jest.fn(),
}));

// Mock the ResponsiveLayout components
jest.mock("@/components/ResponsiveLayout", () => ({
  useResponsiveValue: jest.fn().mockReturnValue(20),
}));

// Mock the LoadingStates components
jest.mock("@/components/LoadingStates", () => ({
  GalleryItemSkeleton: () => <div data-testid="gallery-item-skeleton">Loading...</div>,
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
  ConnectionError: ({ onRetry }: { onRetry: () => void }) => (
    <div>
      <div>Connection Error</div>
      <button onClick={onRetry}>Retry</button>
    </div>
  ),
  ResponsiveGrid: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-grid">{children}</div>
  ),
}));

describe("EnhancedGallery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    // Mock the fetchBatchMetadata to return a promise that doesn't resolve immediately
    (fetchBatchMetadata as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    render(<EnhancedGallery />);
    
    // Should show loading skeletons
    expect(screen.getAllByTestId("gallery-item-skeleton")).toHaveLength(20);
  });

  test("renders gallery after loading", async () => {
    // Mock successful metadata fetch
    const mockMetadata = [
      {
        name: "fourHundred #1",
        description: "Test description",
        image: "/test-image.jpg",
        attributes: [],
        rarity: {
          rank: 1,
          score: 95,
          tier: "Legendary"
        }
      }
    ];
    
    (fetchBatchMetadata as jest.Mock).mockResolvedValue(mockMetadata);
    
    render(<EnhancedGallery />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryAllByTestId("gallery-item-skeleton")).toHaveLength(0);
    });
    
    // Should show gallery items
    expect(screen.getByText("fourHundred #1")).toBeInTheDocument();
  });

  test("displays connection error on fetch failure", async () => {
    // Mock fetch failure
    (fetchBatchMetadata as jest.Mock).mockRejectedValue(new Error("Network error"));
    
    render(<EnhancedGallery />);
    
    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByText("Connection Error")).toBeInTheDocument();
      expect(screen.getByText("Retry")).toBeInTheDocument();
    });
  });

  test("allows retrying after error", async () => {
    // Mock fetch failure then success
    (fetchBatchMetadata as jest.Mock)
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce([]);
    
    render(<EnhancedGallery />);
    
    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByText("Connection Error")).toBeInTheDocument();
    });
    
    // Click retry button
    userEvent.click(screen.getByText("Retry"));
    
    // Should call fetchBatchMetadata again
    expect(fetchBatchMetadata).toHaveBeenCalledTimes(2);
  });

  test("filters tokens by search term", async () => {
    // Mock metadata with different names
    const mockMetadata = [
      {
        name: "Golden Retriever #1",
        description: "Test description",
        image: "/test-image.jpg",
        attributes: [{ trait_type: "Breed", value: "Golden Retriever" }],
        rarity: {
          rank: 1,
          score: 95,
          tier: "Legendary"
        }
      },
      {
        name: "Poodle #2",
        description: "Test description",
        image: "/test-image.jpg",
        attributes: [{ trait_type: "Breed", value: "Poodle" }],
        rarity: {
          rank: 2,
          score: 85,
          tier: "Epic"
        }
      }
    ];
    
    (fetchBatchMetadata as jest.Mock).mockResolvedValue(mockMetadata);
    
    render(<EnhancedGallery />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryAllByTestId("gallery-item-skeleton")).toHaveLength(0);
    });
    
    // Both tokens should be visible initially
    expect(screen.getByText("Golden Retriever #1")).toBeInTheDocument();
    expect(screen.getByText("Poodle #2")).toBeInTheDocument();
    
    // Search for "Golden"
    userEvent.type(screen.getByPlaceholderText("Search by name or trait..."), "Golden");
    
    // Only Golden Retriever should be visible
    expect(screen.getByText("Golden Retriever #1")).toBeInTheDocument();
    expect(screen.queryByText("Poodle #2")).not.toBeInTheDocument();
  });

  test("filters tokens by rarity", async () => {
    // Mock metadata with different rarities
    const mockMetadata = [
      {
        name: "Token #1",
        description: "Test description",
        image: "/test-image.jpg",
        attributes: [],
        rarity: {
          rank: 1,
          score: 95,
          tier: "Legendary"
        }
      },
      {
        name: "Token #2",
        description: "Test description",
        image: "/test-image.jpg",
        attributes: [],
        rarity: {
          rank: 2,
          score: 45,
          tier: "Common"
        }
      }
    ];
    
    (fetchBatchMetadata as jest.Mock).mockResolvedValue(mockMetadata);
    
    render(<EnhancedGallery />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryAllByTestId("gallery-item-skeleton")).toHaveLength(0);
    });
    
    // Both tokens should be visible initially
    expect(screen.getByText("Token #1")).toBeInTheDocument();
    expect(screen.getByText("Token #2")).toBeInTheDocument();
    
    // Filter by "Legendary"
    userEvent.selectOptions(screen.getByLabelText("All Rarities"), "Legendary");
    
    // Only Legendary token should be visible
    expect(screen.getByText("Token #1")).toBeInTheDocument();
    expect(screen.queryByText("Token #2")).not.toBeInTheDocument();
  });

  test("handles pagination correctly", async () => {
    // Mock metadata for 25 tokens (more than one page)
    const mockMetadata = Array.from({ length: 25 }, (_, i) => ({
      name: `Token #${i + 1}`,
      description: "Test description",
      image: "/test-image.jpg",
      attributes: [],
      rarity: {
        rank: i + 1,
        score: 50,
        tier: "Rare"
      }
    }));
    
    (fetchBatchMetadata as jest.Mock).mockResolvedValue(mockMetadata);
    
    render(<EnhancedGallery />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryAllByTestId("gallery-item-skeleton")).toHaveLength(0);
    });
    
    // Should show first 20 tokens
    expect(screen.getByText("Token #1")).toBeInTheDocument();
    expect(screen.getByText("Token #20")).toBeInTheDocument();
    expect(screen.queryByText("Token #21")).not.toBeInTheDocument();
    
    // Go to next page
    userEvent.click(screen.getByText("Next"));
    
    // Should show remaining tokens
    expect(screen.queryByText("Token #20")).not.toBeInTheDocument();
    expect(screen.getByText("Token #21")).toBeInTheDocument();
    expect(screen.getByText("Token #25")).toBeInTheDocument();
  });
});