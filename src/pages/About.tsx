import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About — 400 Club</title>
        <meta
          name="description"
          content="fourHundred is a generative NFT collection of 10,000 unique portraits. Each token is membership in the 400 Club — an exclusive circle that bridges old wealth and new wealth."
        />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Inside the 400 Club</h1>
          <div className="space-y-6 text-lg text-muted-foreground max-w-3xl">
            <p>
              fourHundred is a generative art project: 10,000 one-of-one canine portraits built from a curated library of Gilded Age reference — dress,
              interiors, tools, and city light. The 400 Club is the membership that sits over the collection: each NFT pairs you with a portrait that feels
              pulled from an old-world salon or workshop.
            </p>
            <p>
              Rather than sorting people into rigid social tiers, we think in scenes and roles: working dogs, performers, studio companions, and heirs to
              inherited wealth. Old wealth and new wealth share the same walls here, rendered with the same care.
            </p>
            <p>
              Generative systems compose every frame, but prompts, references, and selection are guided by hand so that no two portraits feel alike.
              Your token is both artwork and key — your permanent membership in the 400 Club.
            </p>
            <p>
              In practice, that means we define traits — breed, posture, garments, background, objects, and mood — and let generative models explore
              countless combinations. From those outputs, we curate, refine prompts, and only keep portraits where the composition, lighting, and
              storytelling feel strong enough to stand as a one-of-one work.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Membership in the 400 Club</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">One NFT, one portrait.</span> Your token is a unique, on-chain artwork — no editions, no
                duplicates.
              </li>
              <li>
                <span className="font-medium text-foreground">Old wealth, new wealth.</span> Settings span salons, workshops, theaters, and streets —
                generative scenes that echo both heritage and modern collectors.
              </li>
              <li>
                <span className="font-medium text-foreground">A club you actually enter.</span> Ownership grants identity within the collection today,
                and a foundation for future drops, curated shows, and community experiments.
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Explore the Era</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-left">
              <li className="p-4 rounded-lg border border-primary/30">Story Registry — Contribute family memories from the era</li>
              <li className="p-4 rounded-lg border border-primary/30">Historical Context — Access essays, sources, and references</li>
              <li className="p-4 rounded-lg border border-primary/30">Community Exhibitions — Curated on-chain shows and salons</li>
              <li className="p-4 rounded-lg border border-primary/30">Education &amp; Resources — Classroom-ready tools and guides</li>
              <li className="p-4 rounded-lg border border-primary/30">Open Data — Transparent traits and sourcing for researchers</li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Your Story Awaits</h2>
            <p className="text-muted-foreground max-w-3xl">
              Find the portrait that reflects your story — and claim your place in the 400 Club with a one-of-one generative work.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild className="bg-primary text-primary-foreground hover:brightness-110">
                <Link to="/gallery">Explore the Gallery</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary/50">
                <Link to="/breeds">Browse Breeds</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AboutPage;