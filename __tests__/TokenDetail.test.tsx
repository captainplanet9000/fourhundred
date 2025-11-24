import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TokenDetail } from "@/components/TokenDetail";
import { fetchTokenMetadata } from "@/lib/metadataService";
import { useReadContract } from "wagmi";

// Mock the metadata service
jest.mock("@/lib/metadataService", () => ({
  fetchTokenMetadata: jest.fn(),
}));

// Mock wagmi
jest.mock("wagmi", () => ({
  useReadContract: jest.fn(),
}));

// Mock the LoadingStates components
jest.mock("@/components/LoadingStates", () => ({
  TokenDetailSkeleton: () => <div data-testid="token-detail-skeleton">Loading...</div>,
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
  NotFound: ({ message }: { message?: string }) => (
    <div>
      <div>Not Found</div>
      <div>{message || "Item not found"}</div>
    </div>
  ),
}));

describe("TokenDetail", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockParams = {
    id: "1",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock useParams and useRouter
    jest.mock("next/navigation", () => ({
      useParams: () => mockParams,
      useRouter: () => mockRouter,
    }));
  });

  test("renders loading state initially", async () => {
    // Mock the fetchTokenMetadata to return a promise that doesn't resolve immediately
    (fetchTokenMetadata as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    render(<TokenDetail />);
    
    // Should show loading skeleton
    expect(screen.getByTestId("token-detail-skeleton")).toBeInTheDocument();
  });

  test("renders token detail after loading", async () => {
    // Mock successful metadata fetch
    const mockMetadata = {
      name: "fourHundred #1",
      description: "A majestic Golden Retriever portrait",
      image: "/test-image.jpg",
      attributes: [
        { trait_type: "Breed", value: "Golden Retriever" },
        { trait_type: "Background", value: "Gilded" },
        { trait_type: "Frame", value: "Gold" },
      ],
      rarity: {
        rank: 1,
        score: 95,
        tier: "Legendary"
      }
    };
    
    (fetchTokenMetadata as jest.Mock).mockResolvedValue(mockMetadata);
    
    // Mock owner data
    (useReadContract as jest.Mock).mockReturnValue({
      data: "0x1234567890123456789012345678901234567890",
      isLoading: false,
    });
    
    render(<TokenDetail />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId("token-detail-skeleton")).not.toBeInTheDocument();
    });
    
    // Should show token details
    expect(screen.getByText("fourHundred #1")).toBeInTheDocument();
    expect(screen.getByText("A majestic Golden Retriever portrait")).toBeInTheDocument();
    expect(screen.getByText("Golden Retriever")).toBeInTheDocument();
    expect(screen.getByText("Gilded")).toBeInTheDocument();
    expect(screen.getByText("Gold")).toBeInTheDocument();
    expect(screen.getByText("Legendary")).toBeInTheDocument();
    expect(screen.getByText("Rank: #1")).toBeInTheDocument();
  });

  test("displays not found for invalid token ID", async () => {
    // Mock params with invalid token ID
    jest.mock("next/navigation", () => ({
      useParams: () => ({ id: "0" }),
      useRouter: () => mockRouter,
    }));
    
    render(<TokenDetail />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId("token-detail-skeleton")).not.toBeInTheDocument();
    });
    
    // Should show not found message
    expect(screen.getByText("Not Found")).toBeInTheDocument();
    expect(screen.getByText("Token not found")).toBeInTheDocument();
  });

  test("displays error message on fetch failure", async () => {
    // Mock fetch failure
    (fetchTokenMetadata as jest.Mock).mockRejectedValue(new Error("Network error"));
    
    render(<TokenDetail />);
    
    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.queryByTestId("token-detail-skeleton")).not.toBeInTheDocument();
    });
    
    // Should show error message
    expect(screen.getByText("Not Found")).toBeInTheDocument();
    expect(screen.getByText("Failed to load token details. Please try again.")).toBeInTheDocument();
  });

  test("displays owner information", async () => {
    // Mock successful metadata fetch
    const mockMetadata = {
      name: "fourHundred #1",
      description: "A majestic Golden Retriever portrait",
      image: "/test-image.jpg",
      attributes: [],
      rarity: {
        rank: 1,
        score: 95,
        tier: "Legendary"
      }
    };
    
    (fetchTokenMetadata as jest.Mock).mockResolvedValue(mockMetadata);
    
    // Mock owner data
    const mockOwner = "0x1234567890123456789012345678901234567890";
    (useReadContract as jest.Mock).mockReturnValue({
      data: mockOwner,
      isLoading: false,
    });
    
    render(<TokenDetail />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId("token-detail-skeleton")).not.toBeInTheDocument();
    });
    
    // Should show owner information
    expect(screen.getByText(mockOwner)).toBeInTheDocument();
  });

  test("navigates back to gallery when back link is clicked", async () => {
    // Mock successful metadata fetch
    const mockMetadata = {
      name: "fourHundred #1",
      description: "A majestic Golden Retriever portrait",
      image: "/test-image.jpg",
      attributes: [],
      rarity: {
        rank: 1,
        score: 95,
        tier: "Legendary"
      }
    };
    
    (fetchTokenMetadata as jest.Mock).mockResolvedValue(mockMetadata);
    
    // Mock owner data
    (useReadContract as jest.Mock).mockReturnValue({
      data: "0x1234567890123456789012345678901234567890",
      isLoading: false,
    });
    
    render(<TokenDetail />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId("token-detail-skeleton")).not.toBeInTheDocument();
    });
    
    // Click back link
    userEvent.click(screen.getByText("← Back to Gallery"));
    
    // Should navigate to gallery
    expect(mockRouter.push).toHaveBeenCalledWith("/gallery");
  });
});