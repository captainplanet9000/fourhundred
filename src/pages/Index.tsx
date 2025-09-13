"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GradientDivider } from "@/components/layout/GradientDivider";
import { OrnateDivider } from "@/components/layout/OrnateDivider";
import { Button } from "@/components/ui/button";
import { TokenCard } from "@/components/gallery/TokenCard";
import { loadAll } from "@/lib/metadata";
import { Link } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Reveal } from "@/components/common/Reveal";

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
        <title>fourHundred — Where Legacy Lives Forever</title>
        <meta
          name="description"
          content="A museum-grade collection of noble companions from the Gilded Age—where legacy, artistry, and heritage endure."
        />
        <meta property="og:title" content="fourHundred — Where Legacy Lives Forever" />
      </Helmet>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black pointer-events-none" />
        <Section className="relative">
          <Container className="text-center">
            <Reveal>
              <h1
                className="text-5xl md:text-7xl font-semibold tracking-tight bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gilded-gradient)" }}
              >
                Where Legacy Lives Forever
              </h1>
            </Reveal>
            <Reveal delayMs={60}>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto">
                In an age of unprecedented prosperity and refinement, the most discerning companions deserved portraits worthy of their devotion.
                400 presents 10,000 masterfully crafted portraits celebrating the noble breeds that once graced the finest estates and grandest halls.
                Each NFT captures the timeless bond between elegance and loyalty, rendered with museum-quality artistry for the digital age.
              </p>
            </Reveal>
            <Reveal delayMs={120}>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Button asChild className="bg-primary text-primary-foreground hover:brightness-110">
                  <Link to="/gallery">View Gallery</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary/50 text-foreground hover:bg-muted/50">
                  <Link to="/mint">Mint</Link>
                </Button>
              </div>
            </Reveal>
          </Container>
        </Section>

        <OrnateDivider />

        <Section title="Where Art Meets Heritage" subtitle="Portraits that honor lineage, character, and the enduring power of refined companionship.">
          <Container>
            <Reveal>
              <div className="grid md:grid-cols-2 gap-8 text-left text-muted-foreground">
                <p>
                  400 honors the distinguished bloodlines that defined an era of unparalleled sophistication. From the stately halls of industry titans
                  to the intimate parlors of cultural luminaries, these noble companions witnessed history unfold. Each portrait tells a story of lineage,
                  character, and the enduring power of refined companionship.
                </p>
                <p>
                  Each portrait employs the techniques of the era&apos;s master artists—those who understood that true portraiture captures not just appearance, but character.
                  Rich oil painting traditions, masterful use of light and shadow, and compositions that speak to the viewer across centuries combine to create works that transcend mere representation.
                </p>
              </div>
            </Reveal>
          </Container>
        </Section>

        <GradientDivider />

        <Section title="Collection Highlights" subtitle="A thoughtfully curated system of traits, lineages, and heritage classes.">
          <Container>
            <Reveal>
              <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                {[
                  "10,000 Individual Portraits",
                  "400+ Distinguished Bloodlines",
                  "5 Heritage Classifications",
                  "Masterfully Curated Traits",
                  "Archive-Quality Artistry",
                ].map((item) => (
                  <li key={item} className="p-4 rounded-lg border border-primary/30">{item}</li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>

        <GradientDivider />

        <Section title="Featured Portraits" subtitle="A glimpse into the collection’s breadth.">
          <Container>
            <Reveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featured.map((it) => (
                  <TokenCard key={it.tokenId} item={it} />
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>

        <GradientDivider />

        <Section title="The Art of Noble Companionship" subtitle="Portraits that preserve an age of beauty, loyalty, and lasting legacy.">
          <Container>
            <Reveal>
              <div className="space-y-4 text-left text-muted-foreground max-w-4xl">
                <p>
                  Between 1870 and 1900, America witnessed an unprecedented flowering of culture, industry, and artistic patronage.
                  In the marble halls and mahogany libraries of the era&apos;s most influential families, loyal companions held court alongside their distinguished owners.
                  400 preserves these intimate moments of history, where every brushstroke reveals the soul of an age that valued beauty, loyalty, and lasting legacy above all else.
                </p>
                <p>
                  Each portrait employs the techniques of the era&apos;s master artists—rich oil traditions, masterful light and shadow, and compositions that speak across centuries—to create works that endure.
                </p>
              </div>
            </Reveal>
          </Container>
        </Section>

        <GradientDivider />

        <Section title="The Hierarchy of Heritage" subtitle="True distinction cannot be manufactured—it must be earned across generations.">
          <Container>
            <Reveal>
              <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                <li className="p-4 rounded-lg border border-primary/30">
                  <div className="font-medium">Foundational (45%)</div>
                  <p className="text-sm text-muted-foreground">The steadfast companions who filled the daily lives of America&apos;s most prominent families.</p>
                </li>
                <li className="p-4 rounded-lg border border-primary/30">
                  <div className="font-medium">Distinguished (30%)</div>
                  <p className="text-sm text-muted-foreground">Breeds favored by cultural patrons and industrial leaders for their rare qualities.</p>
                </li>
                <li className="p-4 rounded-lg border border-primary/30">
                  <div className="font-medium">Exceptional (18%)</div>
                  <p className="text-sm text-muted-foreground">Exotic bloodlines acquired through global connections and discerning taste.</p>
                </li>
                <li className="p-4 rounded-lg border border-primary/30">
                  <div className="font-medium">Legendary (6%)</div>
                  <p className="text-sm text-muted-foreground">Ancient breeds whose heritage traces to the dawn of civilization itself.</p>
                </li>
                <li className="p-4 rounded-lg border border-primary/30">
                  <div className="font-medium">Eternal (1%)</div>
                  <p className="text-sm text-muted-foreground">Bloodlines lost to time but preserved forever in art and memory.</p>
                </li>
              </ul>
            </Reveal>
          </Container>
        </Section>

        <GradientDivider />

        <Section title="Beyond Portraiture: A Living Heritage" subtitle="An entry into a world where history, breeding, and community converge.">
          <Container>
            <Reveal>
              <ul className="grid md:grid-cols-2 gap-3 text-left">
                {[
                  "Heritage Registry — Document your companion's noble lineage",
                  "Estate Building — Curate collections in historical environments",
                  "Bloodline Continuation — Participate in managed breeding programs",
                  "Seasonal Gatherings — Join period-appropriate celebrations",
                  "Cultural Archive — Access exclusive historical content",
                ].map((line) => (
                  <li key={line} className="p-4 rounded-lg border border-primary/30">{line}</li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>

        <GradientDivider />

        <Section title="Your Heritage Awaits" subtitle="Enter a world where every portrait preserves a moment in history.">
          <Container className="text-center">
            <Reveal>
              <div className="flex items-center justify-center gap-3">
                <Button asChild className="bg-primary text-primary-foreground hover:brightness-110">
                  <Link to="/gallery">Explore the Gallery</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary/50">
                  <Link to="/traits">Explore Traits</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary/50">
                  <Link to="/breeds">Browse Breeds</Link>
                </Button>
              </div>
            </Reveal>
          </Container>
        </Section>

        <MadeWithDyad />
      </div>
    </>
  );
};

export default Index;