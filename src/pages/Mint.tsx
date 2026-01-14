"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { ConnectButton } from "@/components/mint/ConnectButton";
import { Card, CardContent } from "@/components/ui/card";

const MintPage: React.FC = () => {
  const mintDate = useMemo(() => new Date("2026-02-15T00:00:00.000Z"), []);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const countdown = useMemo(() => {
    const diffMs = Math.max(0, mintDate.getTime() - now);
    const totalSeconds = Math.floor(diffMs / 1000);

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return { totalSeconds, days, hours, minutes, seconds };
  }, [mintDate, now]);

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
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                Launching February 15, 2026
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-0">
                9,400 unique portraits. One legacy. Claim yours.
              </p>
            </div>

            {/* Coming Soon Message */}
            <div className="mb-10">
              {countdown.totalSeconds > 0 ? (
                <div className="text-center">
                  <p className="text-amber-400 text-2xl sm:text-3xl md:text-4xl font-bold">
                    Launching February 15, 2026
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-3 sm:gap-4 text-white">
                    {[
                      { label: "Days", value: countdown.days },
                      { label: "Hours", value: countdown.hours },
                      { label: "Minutes", value: countdown.minutes },
                      { label: "Seconds", value: countdown.seconds },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="min-w-[72px] sm:min-w-[92px] rounded-xl border border-amber-600/40 bg-black/50 px-3 py-2 backdrop-blur-sm"
                      >
                        <div className="text-2xl sm:text-3xl font-bold tabular-nums">
                          {String(item.value).padStart(2, "0")}
                        </div>
                        <div className="text-xs sm:text-sm text-white/70">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-amber-400 text-2xl sm:text-3xl md:text-4xl font-bold">
                  Mint is live
                </p>
              )}
            </div>

            {/* Mint card - centered with Victorian styling */}
            <div className="max-w-lg mx-auto">
              <Card className="bg-black/70 border-2 border-amber-600/50 backdrop-blur-sm shadow-2xl">
                <CardContent className="pt-6">
                  <div className="text-center py-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      The 400 Club
                    </h3>
                    <p className="text-white/70 mb-4">
                      Connect your wallet to be ready for mint day
                    </p>
                    <div className="flex justify-center mb-4">
                      <ConnectButton />
                    </div>
                    <div className="border-t border-amber-600/30 pt-4 mt-4">
                      <p className="text-amber-400 font-medium">Mint Details</p>
                      <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                        <div className="text-white/60">Price</div>
                        <div className="text-white font-semibold">0.05 ETH</div>
                        <div className="text-white/60">Supply</div>
                        <div className="text-white font-semibold">9,400</div>
                        <div className="text-white/60">Per Transaction</div>
                        <div className="text-white font-semibold">20 max</div>
                        <div className="text-white/60">Per Wallet</div>
                        <div className="text-white font-semibold">50 max</div>
                        <div className="text-white/60">Network</div>
                        <div className="text-white font-semibold">Ethereum</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Price tagline */}
              <p className="text-center text-white/60 italic text-lg mt-8">
                0.05 ETH per portrait
              </p>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default MintPage;