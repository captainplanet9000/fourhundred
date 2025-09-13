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
import { Check, Crown, Layers, Library, Users } from "lucide-react";
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
                fourHundred presents masterfully crafted portraits celebrating the noble breeds that once graced the finest estates and grandest halls—each rendered with museum-quality artistry for the digital age.
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
                  fourHundred honors the distinguished bloodlines that defined an era of unparalleled sophistication. From the stately halls of industry
                  titans to the intimate parlors of cultural luminaries, these noble companions witnessed history unfold. Each portrait tells a story
                  of lineage, character, and a bond that transcends time.
                </p>
                <p>
                  Each work employs classical techniques—rich tonal palettes, thoughtful composition, and studied light—to capture not merely
                  appearance, but presence. These are pieces meant to endure: artifacts of heritage for a discerning age.
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
                  "Individual Portraits",
                  "Distinguished Bloodlines",
                  "Heritage Classifications",
                  "Masterfully Curated Traits",
                  "Archive-Quality Artistry",
                  "Refined Compositions & Tones",
                ].map((item, i) => (
                  <li key={item} className="flex items-start gap-3 p-4 rounded-lg border border-primary/30">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
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

        <Section title="The Hierarchy of Heritage" subtitle="True distinction is cultivated across generations.">
          <Container>
            <Reveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                {[
                  { title: "Foundational", desc: "Steadfast companions woven into daily life and legacy.", icon: Users },
                  { title: "Distinguished", desc: "Favored by patrons and leaders for rare and admirable qualities.", icon: Crown },
                  { title: "Exceptional", desc: "Exotic bloodlines acquired through taste and global connection.", icon: Layers },
                  { title: "Legendary", desc: "Ancient breeds whose stories reach to civilization’s dawn.", icon: Library },
                  { title: "Eternal", desc: "Bloodlines lost to time, preserved in art and memory.", icon: Crown },
                ].map((h) => {
                  const Icon = h.icon;
                  return (
                    <div key={h.title} className="p-4 rounded-lg border border-primary/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-4 w-4 text-primary" />
                        <div className="font-medium">{h.title}</div>
                      </div>
                      <p className="text-sm text-muted-foreground">{h.desc}</p>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </Container>
        </Section>

        <GradientDivider />

        <Section title="Beyond Portraiture: A Living Heritage" subtitle="An entry into a world where history, breeding, and community converge.">
          <Container>
            <Reveal>
              <ul className="grid md:grid-cols-2 gap-3 text-left">
                {[
                  "Heritage Registry — Document your companion’s lineage",
                  "Estate Building — Curate collections in historical environments",
                  "Bloodline Continuation — Participate in managed breeding programs",
                  "Seasonal Gatherings — Join period‑appropriate celebrations",
                  "Cultural Archive — Access exclusive historical content",
                ].map((line) => (
                  <li key={line} className="p-4 rounded-lg border border-primary/30">{line}</li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>

        <GradientDivider />

        <Section title="Your Heritage Awaits" subtitle="Discover the portrait that speaks to your soul and steward a legacy that endures.">
          <Container className="text-center">
            <Reveal>
              <div className="flex items-center justify-center gap-3">
                <Button asChild className="bg-primary text-primary-foreground hover:brightness-110">
                  <Link to="/gallery">Explore the Gallery</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary/50">
                  <Link to="/traits">Explore Traits</Link>
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