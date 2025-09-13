"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ConnectButton } from "@/components/mint/ConnectButton";
import { MintPanel } from "@/components/mint/MintPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContractAddress } from "@/lib/env";
import { NetworkBadge } from "@/components/mint/NetworkBadge";

const MintPage: React.FC = () => {
  const contract = getContractAddress();
  return (
    <>
      <Helmet>
        <title>Mint — fourHundred</title>
        <meta name="description" content="Mint your fourHundred portrait." />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Mint</h1>

          <div className="mb-6 flex items-center gap-4 flex-wrap">
            <ConnectButton />
            <NetworkBadge />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mint Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <MintPanel priceEth={0} totalSupply={0} maxSupply={400} />
              {!contract && (
                <p className="text-sm text-muted-foreground mt-4">
                  Set contract variables in your .env to enable minting:
                  VITE_CONTRACT_ADDRESS (or NEXT_PUBLIC_CONTRACT_ADDRESS), VITE_CHAIN_ID, VITE_RPC_URL, and VITE_WALLETCONNECT_PROJECT_ID.
                </p>
              )}
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  );
};

export default MintPage;