"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ConnectButton } from "@/components/mint/ConnectButton";
import { MintPanel } from "@/components/mint/MintPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContractAddress } from "@/lib/env";
// NetworkBadge removed per design cleanup

const MintPage: React.FC = () => {
  const contract = getContractAddress();
  return (
    <>
      <Helmet>
        <title>Mint — 400 Club</title>
        <meta name="description" content="Mint your 400 Club membership portrait." />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Mint Your Membership</h1>

          <div className="mb-6 flex items-center gap-4 flex-wrap">
            <ConnectButton />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mint Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <MintPanel priceEth={0.1} totalSupply={0} maxSupply={10000} />
              {!contract && (
                <p className="text-sm text-muted-foreground mt-3">Mint temporarily unavailable.</p>
              )}
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  );
};

export default MintPage;