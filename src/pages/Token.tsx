"use client";

import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { loadToken, loadManifest } from "@/lib/metadata";
import { AttributeList } from "@/components/token/AttributeList";
import { RaritySummary } from "@/components/token/RaritySummary";
import { SocialShare } from "@/components/token/SocialShare";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/common/SafeImage";

const TokenPage: React.FC = () => {
  const { id } = useParams();
  const tokenId = Number(id);
  const [manifest, setManifest] = React.useState<number[]>([]);
  const [item, setItem] = React.useState<any>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    let mounted = true;
    loadManifest().then((ids) => mounted && setManifest(ids));
    return () => {
      mounted = false;
    };
  }, []);

  React.useEffect(() => {
    let mounted = true;
    if (Number.isFinite(tokenId)) {
      loadToken(tokenId).then((res) => mounted && setItem(res));
    }
    return () => {
      mounted = false;
    };
  }, [tokenId]);

  if (!Number.isFinite(tokenId)) return null;

  const idx = manifest.indexOf(tokenId);
  const prevId = idx > 0 ? manifest[idx - 1] : undefined;
  const nextId = idx >= 0 && idx < manifest.length - 1 ? manifest[idx + 1] : undefined;

  const name = item?.name ?? `Token #${tokenId}`;

  return (
    <>
      <Helmet>
        <title>{name} — fourHundred</title>
        <meta name="description" content={`Attributes and details for ${name}.`} />
      </Helmet>
      <Section>
        <Container>
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>← Back</Button>
            <div className="flex gap-2">
              {prevId && (
                <Button asChild variant="outline" className="border-primary/50">
                  <Link to={`/token/${prevId}`}>Previous</Link>
                </Button>
              )}
              {nextId && (
                <Button asChild className="bg-primary text-primary-foreground hover:brightness-110">
                  <Link to={`/token/${nextId}`}>Next</Link>
                </Button>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <SafeImage
              src={item?.image || item?.image_url}
              tokenId={tokenId}
              alt={name}
              className="w-full rounded-lg border border-primary/40"
              loading="eager"
            />
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-semibold">{name}</h1>
                <p className="text-muted-foreground mt-2">
                  Token #{tokenId}
                </p>
              </div>

              <AttributeList attributes={item?.attributes ?? []} />
              <RaritySummary rank={item?.rarity_rank} score={item?.rarity_score} />

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">External</div>
                <div className="flex gap-3">
                  <Button asChild variant="outline">
                    <a href="https://opensea.io" target="_blank" rel="noreferrer">View on OpenSea</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="https://etherscan.io" target="_blank" rel="noreferrer">View on Etherscan</a>
                  </Button>
                </div>
              </div>

              <SocialShare url={typeof window !== "undefined" ? window.location.href : ""} text={`fourHundred ${name}`} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TokenPage;