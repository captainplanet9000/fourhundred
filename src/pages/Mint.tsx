"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { ConnectButton } from "@/components/mint/ConnectButton";
import { MintPanel } from "@/components/mint/MintPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getContractAddress } from "@/lib/env";
import {
  CHAIN,
  COLLECTION,
  MINT,
  MINT_DATE_LABEL,
  MINT_TIME_LABEL_ET,
} from "@/lib/launch";

const MINT_DATE = new Date(MINT.dateISO);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (): TimeLeft | null => {
  const now = new Date();
  const difference = MINT_DATE.getTime() - now.getTime();

  if (difference <= 0) return null;

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const MintPage: React.FC = () => {
  const contract = getContractAddress();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());
  const [isMintLive, setIsMintLive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (!newTimeLeft) {
        setIsMintLive(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dateTimeHeadline = useMemo(
    () => `${MINT_DATE_LABEL} at ${MINT_TIME_LABEL_ET}`,
    [],
  );

  return (
    <>
      <Helmet>
        <title>Mint — {COLLECTION.name}</title>
        <meta
          name="description"
          content={`Free claim on ${CHAIN.name}. ${COLLECTION.supply.toLocaleString()} one-of-one Gilded Age portraits. Join the club.`}
        />
      </Helmet>

      {/* Full-page background */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/mint_page_bg.jpeg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="fixed inset-0 bg-black/60" />
      <div className="relative min-h-screen z-10">
        <div className="relative z-10 py-16 md:py-24">
          <Container>
            {/* Hero text */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {isMintLive
                  ? `Free claim is live on ${CHAIN.name}`
                  : `Free claim on ${CHAIN.name}`}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-0">
                {COLLECTION.supply.toLocaleString()} unique Gilded Age portraits. Free to claim. Pay only {CHAIN.name} gas.
              </p>
            </div>

            {/* Countdown */}
            {!isMintLive && timeLeft && (
              <div className="mb-10">
                <p className="text-center text-amber-400 text-lg sm:text-xl mb-4 font-semibold">
                  Free claim opens {dateTimeHeadline}
                </p>
                <div className="flex justify-center gap-3 sm:gap-6">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-black/70 border border-amber-600/50 rounded-lg p-3 sm:p-4 min-w-[70px] sm:min-w-[90px] backdrop-blur-sm"
                    >
                      <div className="text-2xl sm:text-4xl font-bold text-amber-400 tabular-nums">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mint card */}
            <div className="max-w-lg mx-auto">
              <Card className="bg-black/70 border-2 border-amber-600/50 backdrop-blur-sm shadow-2xl">
                <CardContent className="pt-6">
                  {isMintLive ? (
                    <MintPanel
                      priceEth={0}
                      totalSupply={0}
                      maxSupply={COLLECTION.supply}
                    />
                  ) : (
                    <div className="text-center py-6">
                      <h3 className="text-2xl font-semibold text-white mb-2">{COLLECTION.name}</h3>
                      <p className="text-white/70 mb-4">
                        Connect your wallet to be ready for free claim day
                      </p>
                      <div className="flex justify-center mb-4">
                        <ConnectButton />
                      </div>
                      <div className="border-t border-amber-600/30 pt-4 mt-4">
                        <p className="text-amber-400 font-medium">Mint Details</p>
                        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                          <div className="text-white/60">Price</div>
                          <div className="text-white font-semibold">
                            {MINT.priceLabel} (gas only)
                          </div>
                          <div className="text-white/60">Supply</div>
                          <div className="text-white font-semibold">
                            {COLLECTION.supply.toLocaleString()} one-of-one
                          </div>
                          <div className="text-white/60">Network</div>
                          <div className="text-white font-semibold">
                            {CHAIN.name} (chain {CHAIN.chainId})
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Bridge / add-network helpers */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                <Button
                  asChild
                  variant="outline"
                  className="border-amber-600/50 bg-black/40 text-white backdrop-blur-sm"
                >
                  <a href={CHAIN.bridge} target="_blank" rel="noreferrer noopener">
                    Bridge ETH to {CHAIN.name} ↗
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-amber-600/50 bg-black/40 text-white backdrop-blur-sm"
                >
                  <a href={CHAIN.addNetworkDocs} target="_blank" rel="noreferrer noopener">
                    Add {CHAIN.name} to wallet ↗
                  </a>
                </Button>
              </div>

              <p className="text-center text-white/60 italic text-lg mt-8">
                Free to claim. Built to last.
              </p>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default MintPage;
