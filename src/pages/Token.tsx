"use client";

import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { loadToken, loadManifest } from "@/lib/metadata";
import { CURATED_ITEMS, getCuratedItemByTokenId } from "@/lib/curated-gallery";
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
  const curatedIds = React.useMemo(
    () => CURATED_ITEMS.map((i) => i.tokenId).sort((a, b) => a - b),
    [],
  );

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
      const curated = getCuratedItemByTokenId(tokenId);
      if (curated) {
        if (mounted) setItem(curated);
      } else {
        loadToken(tokenId).then((res) => mounted && setItem(res));
      }
    }
    return () => {
      mounted = false;
    };
  }, [tokenId]);

  if (!Number.isFinite(tokenId)) return null;

  const isCurated = Number.isFinite(tokenId) && curatedIds.includes(tokenId);
  let prevId: number | undefined;
  let nextId: number | undefined;

  if (isCurated) {
    const idx = curatedIds.indexOf(tokenId);
    if (idx > 0) prevId = curatedIds[idx - 1];
    if (idx >= 0 && idx < curatedIds.length - 1) nextId = curatedIds[idx + 1];
  } else {
    const idx = manifest.indexOf(tokenId);
    if (idx > 0) prevId = manifest[idx - 1];
    if (idx >= 0 && idx < manifest.length - 1) nextId = manifest[idx + 1];
  }

  const name = item?.name ?? `Token #${tokenId}`;
  const absoluteUrl =
    typeof window !== "undefined" ? `${window.location.origin}/token/${tokenId}` : "";
  const ogImage =
    typeof window !== "undefined"
      ? (item?.image || item?.image_url || "/placeholder.svg").startsWith("http")
        ? (item?.image || item?.image_url || "/placeholder.svg")
        : `${window.location.origin}${item?.image || item?.image_url || "/placeholder.svg"}`
      : (item?.image || item?.image_url || "/placeholder.svg");

  return (
    <>
      <Helmet>
        <title>{name} — 400</title>
        <meta name="description" content={`Attributes and details for ${name}.`} />
        <meta property="og:title" content={`${name} — 400`} />
        <meta property="og:description" content={`Attributes and details for ${name}.`} />
        <meta property="og:url" content={absoluteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${name} — 400`} />
        <meta name="twitter:description" content={`Attributes and details for ${name}.`} />
        <meta name="twitter:image" content={ogImage} />
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
                <h1 className="text-3xl md:text-5xl font-semibold">400 Club Member</h1>
                <p className="text-muted-foreground mt-2">Your unique portrait will be revealed after mint</p>
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

              <SocialShare url={absoluteUrl} text={`400 ${name}`} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TokenPage;