"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { ConnectButton } from "@/components/mint/ConnectButton";
import { MintPanel } from "@/components/mint/MintPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContractAddress } from "@/lib/env";

const MintPage: React.FC = () => {
  const contract = getContractAddress();
  return (
    <>
      <Helmet>
        <title>Mint — 400 Club</title>
        <meta name="description" content="Mint your 400 Club membership portrait." />
      </Helmet>
      
      {/* Full-page background container - fixed, covers entire viewport responsively */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{ 
          backgroundImage: "url('/images/mint_page_bg.jpeg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark overlay - also fixed to cover entire viewport */}
      <div className="fixed inset-0 bg-black/60" />
      <div className="relative min-h-screen z-10">
        
        {/* Content */}
        <div className="relative z-10 py-16 md:py-24">
          <Container>
            {/* Hero text */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                Mint Your Portrait
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-0">
                9,400 unique portraits. One legacy. Claim yours.
              </p>
            </div>

            {/* Wallet connection */}
            <div className="flex justify-center mb-8">
              <ConnectButton />
            </div>

            {/* Mint card - centered with Victorian styling */}
            <div className="max-w-lg mx-auto">
              <Card className="bg-black/70 border-2 border-amber-600/50 backdrop-blur-sm shadow-2xl">
                <CardContent className="pt-6">
                  <MintPanel priceEth={0.1} totalSupply={0} maxSupply={9400} />
                  {!contract && (
                    <p className="text-sm text-amber-200/70 mt-3 text-center">
                      Mint coming soon...
                    </p>
                  )}
                </CardContent>
              </Card>
              
              {/* Tagline below card */}
              <p className="text-center text-white/60 mt-6 italic text-lg">
                0.1 ETH per portrait
              </p>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default MintPage;