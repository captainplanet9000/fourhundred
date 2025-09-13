import { render, screen } from "@testing-library/react";
import React from "react";
import Traits from "@/pages/Traits";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, it, expect } from "vitest";

// Mock metadata loader to avoid fetch in tests
vi.mock("@/lib/metadata", async () => {
  const actual = await vi.importActual<any>("@/lib/metadata");
  return {
    ...actual,
    loadAll: async () => [
      {
        name: "fourHundred #1",
        image: "/images/collection/1.png",
        attributes: [{ trait_type: "Breed", value: "Poodle" }],
        tokenId: 1,
      },
      {
        name: "fourHundred #2",
        image: "/images/collection/2.png",
        attributes: [{ trait_type: "Breed", value: "Schnauzer" }],
        tokenId: 2,
      },
    ],
  };
});

describe("Traits page", () => {
  it("renders the Traits Explorer heading", async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Traits />
        </BrowserRouter>
      </HelmetProvider>
    );
    expect(await screen.findByText(/Traits Explorer/i)).toBeInTheDocument();
  });
});