"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GradientDivider } from "@/components/layout/GradientDivider";
import { Button } from "@/components/ui/button";
import { TokenCard } from "@/components/gallery/TokenCard";
import { loadAll } from "@/lib/metadata";
import { Link } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index: React.FC = () => {
  const [featured, setFeatured] = React.useState<any[]>([]);

  React.useEffect(() => {
    let mounted = true;
    loadAll().then((all) => {
      if (!mounted) return;
      setFeatured(all.slice(0, 4));
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>fourHundred — Gilded Age Canine Portraits</title>
        <meta name="description" content="A collection of 400 on-chain Gilded Age canine portraits. Explore, filter traits, and mint yours." />
        <meta property="og:title" content="fourHundred — Gilded Age Canine Portraits" />
      </Helmet>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black pointer-events-none" />
        <Section className="relative">
          <Container className="text-center">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-200 bg-clip-text text-transparent">
              Gilded Age Canine Portraits
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Opulent frames, sumptuous fabrics, and steadfast companions. 400 on-chain portraits—classic, enduring, and distinctly fourHundred.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button asChild className="bg-yellow-600 hover:bg-yellow-700 text-black">
                <Link to="/gallery">View Gallery</Link>
              </Button>
              <Button asChild variant="outline" className="border-yellow-700/50">
                <Link to="/mint">Mint</Link>
              </Button>
            </div>
          </Container>
        </Section>

        <GradientDivider />

        <Section title="Featured Portraits" subtitle="A glimpse into the collection’s breadth.">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.map((it) => (
                <TokenCard key={it.tokenId} item={it} />
              ))}
            </div>
          </Container>
        </Section>

        <GradientDivider />

        <Section title="The Collection" subtitle="A museum-grade series rendered in deep jewel tones and warm gold accents.">
          <Container>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-4xl font-semibold">400</div>
                <div className="text-muted-foreground">Total supply</div>
              </div>
              <div>
                <div className="text-4xl font-semibold">On-chain</div>
                <div className="text-muted-foreground">Immutable metadata</div>
              </div>
              <div>
                <div className="text-4xl font-semibold">Curated</div>
                <div className="text-muted-foreground">Traits and palettes</div>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild variant="outline" className="border-yellow-700/50">
                <Link to="/traits">Explore Traits</Link>
              </Button>
            </div>
          </Container>
        </Section>

        <GradientDivider />

        <Section title="Roadmap" subtitle="A measured cadence—quality, not haste.">
          <Container>
            <ul className="grid md:grid-cols-3 gap-6 text-left">
              <li className="p-4 rounded-lg border border-yellow-800/30">Launch collection and gallery.</li>
              <li className="p-4 rounded-lg border border-yellow-800/30">Community exhibitions and features.</li>
              <li className="p-4 rounded-lg border border-yellow-800/30">Collector perks and archival prints.</li>
            </ul>
          </Container>
        </Section>

        <MadeWithDyad />
      </div>
    </>
  );
};

export default Index;