import { render, screen } from "@testing-library/react";
import React from "react";
import Index from "@/pages/Index";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeAll } from "vitest";

// Minimal IntersectionObserver mock for components that rely on scroll-based reveals
beforeAll(() => {
  if (typeof (globalThis as any).IntersectionObserver === "undefined") {
    (globalThis as any).IntersectionObserver = class IntersectionObserver {
      constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
});

describe("Home page", () => {
  it("renders the hero headline", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      </HelmetProvider>
    );
    expect(screen.getByText(/Every Member, A Unique Portrait/i)).toBeInTheDocument();
  });
});