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
// fourHundred components
import { Reveal } from "@/components/common/Reveal";
import { useParallax } from "@/hooks/use-parallax";

const Index: React.FC = () => {
  const [featured, setFeatured] = React.useState<any[]>([]);
  const parallax = useParallax(0.15);

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
        <meta
          name="description"
          content="A curated collection of 10,000 unique Gilded Age dog portraits on the blockchain"
        />
        <meta property="og:title" content="fourHundred — Gilded Age Canine Portraits" />
      </Helmet>

      <div className="relative overflow-hidden min-h-screen bg-black">
        {/* Background image layer */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/images/collection/generated-image-1757823533363.png"
            alt=""
            aria-hidden
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Gradient overlay above image for readability */}
        <div
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/90 via-black/80 to-black/95"
          style={{ transform: `translateY(${parallax}px)` }}
        />

        {/* Content wrapper only for the first (hero) section */}
        <section className="relative z-20 min-h-screen flex items-center py-0">
            <Container className="text-center">
              <Reveal>
                <h1
                  className="text-6xl md:text-8xl lg:text-9xl leading-none md:leading-[1.05] font-semibold tracking-tight bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--gilded-gradient)" }}
                >
                  Where Legacy Lives Forever
                </h1>
              </Reveal>
              <Reveal delayMs={60}>
                <p className="mt-6 text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl md:max-w-6xl mx-auto">
                  Step into a transformative era. 400 presents 10,000 portraits that place companions at the heart of daily life —
                  from workbenches and hearths to studios, stages, and salons. Each piece is a story of loyalty, character,
                  and the shared moments that define a life together.
                </p>
              </Reveal>
              <Reveal delayMs={120}>
                <div className="mt-10 flex items-center justify-center gap-3">
                  <Button asChild className="bg-primary text-primary-foreground hover:brightness-110">
                    <Link to="/gallery">Discover Your Story</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-primary/50 text-foreground hover:bg-muted/50">
                    <Link to="/about">Explore the Era</Link>
                  </Button>
                </div>
              </Reveal>
            </Container>
          </section>
      </div>

      <OrnateDivider />

          <Section title="Art meets Heritage" subtitle="Portraits of companionship, craft, and lived scenes of the era.">
            <Container>
              <Reveal>
                <div className="grid md:grid-cols-2 gap-8 text-left text-muted-foreground">
                  <p>
                    The Gilded Age is our lens; companionship is our subject. Each portrait centers the dog as a living proxy for the world around it —
                    a terrier at the workbench, a shepherd by the hearth, a poodle mid‑performance, a studio companion beside an easel, a well‑kept lapdog in a salon.
                    The setting reveals the owner’s life; the companion carries the story.
                  </p>
                  <p>
                    We study period techniques and references — dress, interiors, tools, and city light — so each painting feels true to its moment.
                    These are portraits of relationship and place, rendered with care for both subject and scene.
                  </p>
                </div>
              </Reveal>
            </Container>
          </Section>

          <GradientDivider />

          <Section title="Collection Highlights" subtitle="Stories across a changing era — researched, rendered, and remembered.">
            <Container>
              <Reveal>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                  {[
                    "10,000 Individual Stories",
                    "400+ Breeds Representing Every Social Class",
                    "5 Social Tiers: Working Families to Elite Society",
                    "Authentic Period Details",
                    "Museum-Quality Artistry",
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

          <Section title="Companions in a Changing Era" subtitle="Portraits that honor work, family, craft, and community.">
            <Container>
              <Reveal>
                <div className="space-y-4 text-left text-muted-foreground max-w-4xl">
                  <p>
                    Between 1870 and 1900, industrialization, migration, and civic life reshaped everyday routines. Across mills and boarding houses,
                    farms and brownstones, companions shared the daily rhythm of work and rest with the people they loved.
                  </p>
                  <p>
                    These portraits combine period technique with archival research to present dogs not as ornaments, but as partners in family, labor, and neighborhood.
                  </p>
                </div>
              </Reveal>
            </Container>
          </Section>

          <GradientDivider />

          <Section title="Across Every Walk of Life" subtitle="Five social tiers that reflect how people lived — not what they were worth.">
            <Container>
              <Reveal>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                  <li className="p-4 rounded-lg border border-primary/30">
                    <div className="font-medium">Working Families (45%)</div>
                    <p className="text-sm text-muted-foreground">Factory workers, farmers, shopkeepers, and craftspeople — loyal companions who shared everyday struggles and joys.</p>
                  </li>
                  <li className="p-4 rounded-lg border border-primary/30">
                    <div className="font-medium">Rising Middle Class (30%)</div>
                    <p className="text-sm text-muted-foreground">Teachers, clerks, tradespeople, and small business owners building stability and aspiration.</p>
                  </li>
                  <li className="p-4 rounded-lg border border-primary/30">
                    <div className="font-medium">Skilled & Specialized (18%)</div>
                    <p className="text-sm text-muted-foreground">Professionals, performers, and trained working dogs whose roles demanded expertise.</p>
                  </li>
                  <li className="p-4 rounded-lg border border-primary/30">
                    <div className="font-medium">Cultural Elite (6%)</div>
                    <p className="text-sm text-muted-foreground">Patrons, artists, and civic leaders — well-appointed companions of high society.</p>
                  </li>
                  <li className="p-4 rounded-lg border border-primary/30">
                    <div className="font-medium">Mythic & Historic (1%)</div>
                    <p className="text-sm text-muted-foreground">Enduring symbols, near-lost breeds, and remarkable stories preserved in the archive.</p>
                  </li>
                </ul>
              </Reveal>
            </Container>
          </Section>

          <GradientDivider />

          <Section title="Beyond Portraiture: Explore the Era" subtitle="Research, stories, and community projects that keep history alive.">
            <Container>
              <Reveal>
                <ul className="grid md:grid-cols-2 gap-3 text-left">
                  {[
                    "Story Registry — Contribute family memories from the era",
                    "Historical Context — Access essays, sources, and references",
                    "Community Exhibitions — Curated on-chain shows and salons",
                    "Education & Resources — Classroom-ready tools and guides",
                    "Open Data — Transparent traits and sourcing for researchers",
                  ].map((line) => (
                    <li key={line} className="p-4 rounded-lg border border-primary/30">{line}</li>
                  ))}
                </ul>
              </Reveal>
            </Container>
          </Section>

          <GradientDivider />

          <Section title="Your Story Awaits" subtitle="Find the portrait that reflects your story.">
            <Container className="text-center">
              <Reveal>
                <div className="flex items-center justify-center gap-3">
                  <Button asChild className="bg-primary text-primary-foreground hover:brightness-110">
                    <Link to="/gallery">Discover the Gallery</Link>
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

          {/* Site footer content goes here */}
    </>
  );
};

export default Index;