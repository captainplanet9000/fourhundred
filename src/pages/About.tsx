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
        <title>About — fourHundred</title>
        <meta name="description" content="fourHundred unites museum-grade artistry with heritage to honor noble companions of the Gilded Age." />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Where Art Meets Heritage</h1>
          <div className="space-y-6 text-lg text-muted-foreground max-w-3xl">
            <p>
              fourHundred honors the distinguished bloodlines that defined an era of unparalleled sophistication. From the stately halls of industry titans
              to the intimate parlors of cultural luminaries, these noble companions witnessed history unfold. Each portrait tells a story of lineage, character,
              and the enduring power of refined companionship.
            </p>
            <p>
              Between 1870 and 1900, America witnessed an unprecedented flowering of culture, industry, and artistic patronage. In the marble halls and mahogany
              libraries of the era’s most influential families, loyal companions held court alongside their distinguished owners. fourHundred preserves these
              intimate moments—where every brushstroke reveals the soul of an age that valued beauty, loyalty, and lasting legacy.
            </p>
            <p>
              The collection embraces classical technique: rich oil traditions, masterful light and shadow, and compositions that speak across centuries—crafted
              not just to depict, but to endure.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">The Hierarchy of Heritage</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li><span className="font-medium text-foreground">Foundational</span> — Steadfast companions woven into daily life.</li>
              <li><span className="font-medium text-foreground">Distinguished</span> — Favored by patrons and leaders for rare qualities.</li>
              <li><span className="font-medium text-foreground">Exceptional</span> — Exotic bloodlines gathered through global connection.</li>
              <li><span className="font-medium text-foreground">Legendary</span> — Ancient breeds whose stories reach to civilization’s dawn.</li>
              <li><span className="font-medium text-foreground">Eternal</span> — Bloodlines lost to time, preserved in art and memory.</li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Beyond Portraiture: A Living Heritage</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-left">
              <li className="p-4 rounded-lg border border-primary/30">Heritage Registry — Document your companion’s lineage</li>
              <li className="p-4 rounded-lg border border-primary/30">Estate Building — Curate collections in historical environments</li>
              <li className="p-4 rounded-lg border border-primary/30">Bloodline Continuation — Participate in managed breeding programs</li>
              <li className="p-4 rounded-lg border border-primary/30">Seasonal Gatherings — Join period‑appropriate celebrations</li>
              <li className="p-4 rounded-lg border border-primary/30">Cultural Archive — Access exclusive historical content</li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Your Heritage Awaits</h2>
            <p className="text-muted-foreground max-w-3xl">
              Enter a world where every portrait preserves a moment in history, every bloodline carries forward a noble tradition, and every collector becomes
              a guardian of cultural memory.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild className="bg-primary text-primary-foreground hover:brightness-110">
                <Link to="/gallery">Explore the Gallery</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary/50">
                <Link to="/traits">Explore Traits</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AboutPage;