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
        <title>About — 400</title>
        <meta name="description" content="400 tells every story of the Gilded Age — companions beside working families, rising classes, artists, immigrants, and high society." />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Where Art Meets Heritage</h1>
          <div className="space-y-6 text-lg text-muted-foreground max-w-3xl">
            <p>
              The Gilded Age (1870–1900) is our canvas; companionship is our subject. Each portrait centers the dog as a living proxy for the world around it —
              a terrier at the workbench, a shepherd by the hearth, a poodle mid‑performance, a studio companion beside an easel, and a well‑kept lapdog in a salon.
              The setting reveals the owner’s life; the companion carries the story.
            </p>
            <p>
              Our portraits combine period technique with archival reference to ground each scene in lived detail — authentic interiors, attire, tools, and city light.
              These are stories of partnership, work, family, and belonging.
            </p>
            <p>
              Each work is rendered with museum‑grade care to honor the bond between companions and the people and places they stood beside.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Across Every Walk of Life</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li><span className="font-medium text-foreground">Working Families (45%)</span> — Factory workers, farmers, shopkeepers, and craftspeople — companions who shared everyday struggles and joys.</li>
              <li><span className="font-medium text-foreground">Rising Middle Class (30%)</span> — Teachers, clerks, tradespeople, and small business owners building stability and aspiration.</li>
              <li><span className="font-medium text-foreground">Skilled &amp; Specialized (18%)</span> — Professionals, performers, and trained working dogs whose roles demanded expertise.</li>
              <li><span className="font-medium text-foreground">Cultural Elite (6%)</span> — Patrons, artists, and civic leaders — well-appointed companions of high society.</li>
              <li><span className="font-medium text-foreground">Mythic &amp; Historic (1%)</span> — Enduring symbols, near-lost breeds, and remarkable stories preserved in the archive.</li>
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
              Find the portrait that reflects your story — and help preserve the everyday histories that shaped the era.
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