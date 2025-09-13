import { render, screen } from "@testing-library/react";
import React from "react";
import Index from "@/pages/Index";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

describe("Home page", () => {
  it("renders the hero headline", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      </HelmetProvider>
    );
    expect(screen.getByText(/Where Legacy Lives Forever/i)).toBeInTheDocument();
  });
});