"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GradientDivider } from "@/components/layout/GradientDivider";
import { OrnateDivider } from "@/components/layout/OrnateDivider";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/common/SafeImage";
import { Link } from "react-router-dom";
// fourHundred components
import { Reveal } from "@/components/common/Reveal";
import { useParallax } from "@/hooks/use-parallax";

const Index: React.FC = () => {
  const parallax = useParallax(0.15);

  return (
    <>
      <Helmet>
        <title>fourHundred — The 400 Club of Generative Portraits</title>
        <meta
          name="description"
          content="A generative collection of 10,000 unique NFT portraits. Each token is your membership in an exclusive 400 Club, bridging old wealth and new wealth."
        />
        <meta property="og:title" content="fourHundred — The 400 Club of Generative Portraits" />
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
                  Every Member, A Unique Portrait
                </h1>
              </Reveal>
              <Reveal delayMs={60}>
                <p className="mt-6 text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl md:max-w-6xl mx-auto">
                  fourHundred is a generative art collection of 10,000 unique NFT portraits. Each token is your membership in the
                  400 Club — an exclusive circle where every member receives a one-of-one Gilded Age canine portrait linking old
                  wealth and new wealth.
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

          <Section
            title="Art Meets Generative Heritage"
            subtitle="A generative portrait series grounded in companionship, craft, and lived scenes of the era."
          >
            <Container>
              <Reveal>
                <div className="grid md:grid-cols-2 gap-8 text-left text-muted-foreground">
                  <p>
                    The Gilded Age is our lens; companionship is our subject. Generative systems compose each scene, centering the dog as a living proxy
                    for the world around it — a terrier at the workbench, a shepherd by the hearth, a poodle mid-performance, a studio companion beside
                    an easel, a well-kept lapdog in a salon.
                  </p>
                  <p>
                    We guide the models with period techniques and references — dress, interiors, tools, and city light — so every portrait feels true to its
                    moment. These are portraits of relationship and place, rendered with care for both subject and scene.
                  </p>
                </div>
              </Reveal>
            </Container>
          </Section>

          <GradientDivider />

          <Section
            title="Collection Highlights"
            subtitle="A generative NFT collection where every membership comes with a one-of-one portrait."
          >
            <Container>
              <Reveal>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                  {[
                    "10,000 one-of-one generative portraits",
                    "226 catalogued breeds and variations",
                    "Each NFT doubles as 400 Club membership",
                    "Old wealth and new wealth, reimagined on-chain",
                    "Artist-directed prompts, museum-quality curation",
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
                  {[
                    "ComfyUI_00038__1.png",
                    "ComfyUI_00058_.png",
                    "ComfyUI_00060_.png",
                    "ComfyUI_00075__1.png",
                  ].map((file) => (
                    <div key={file} className="relative overflow-hidden rounded-md border border-primary/40 bg-black/40">
                      <div className="relative w-full aspect-square">
                        <SafeImage
                          src={`/images/collection/${file}`}
                          alt="Featured fourHundred portrait"
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
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

          <Section
            title="An Exclusive Club, Across Every Walk of Life"
            subtitle="Old wealth, new wealth, and every story in between — all within a single collection."
          >
            <Container>
              <Reveal>
                <div className="space-y-4 text-left text-muted-foreground max-w-4xl">
                  <p>
                    Historically, the "400" was a rumored list of names that defined elite society. The 400 Club reimagines that idea on-chain: membership
                    is open, but the portraits still feel like they belong on the walls of private salons, workshops, and brownstones.
                  </p>
                  <p>
                    Each NFT balances old wealth and new wealth — tailored dress, interiors, and period details paired with on-chain traits and provenance.
                    Whether your story is working-class hustle or inherited luxury, your companion holds it in frame.
                  </p>
                </div>
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