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
        <meta name="description" content="Where art meets heritage: fourHundred unites museum-grade artistry with the noble bloodlines of the Gilded Age." />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Where Art Meets Heritage</h1>
          <div className="space-y-6 text-lg text-muted-foreground max-w-3xl">
            <p>
              400 honors the distinguished bloodlines that defined an era of unparalleled sophistication. From the stately halls of industry titans
              to the intimate parlors of cultural luminaries, these noble companions witnessed history unfold. Each portrait tells a story of lineage, character,
              and the enduring power of refined companionship.
            </p>
            <p>
              Between 1870 and 1900, America witnessed an unprecedented flowering of culture, industry, and artistic patronage. In the marble halls and mahogany
              libraries of the era&apos;s most influential families, loyal companions held court alongside their distinguished owners. 400 preserves these intimate moments of history,
              where every brushstroke reveals the soul of an age that valued beauty, loyalty, and lasting legacy above all else.
            </p>
            <p>
              Each portrait employs the techniques of the era&apos;s master artists—rich oil traditions, masterful light and shadow, and compositions that speak across centuries—to create works that transcend mere representation.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">The Hierarchy of Heritage</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li><span className="font-medium text-foreground">Foundational (45%)</span> — The steadfast companions who filled the daily lives of America&apos;s most prominent families.</li>
              <li><span className="font-medium text-foreground">Distinguished (30%)</span> — Breeds favored by cultural patrons and industrial leaders for their rare qualities.</li>
              <li><span className="font-medium text-foreground">Exceptional (18%)</span> — Exotic bloodlines acquired through global connections and discerning taste.</li>
              <li><span className="font-medium text-foreground">Legendary (6%)</span> — Ancient breeds whose heritage traces to the dawn of civilization itself.</li>
              <li><span className="font-medium text-foreground">Eternal (1%)</span> — Bloodlines lost to time but preserved forever in art and memory.</li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Exclusive Experiences</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-left">
              <li className="p-4 rounded-lg border border-primary/30">Heritage Registry — Document your companion&apos;s noble lineage</li>
              <li className="p-4 rounded-lg border border-primary/30">Estate Building — Curate collections in historical environments</li>
              <li className="p-4 rounded-lg border border-primary/30">Bloodline Continuation — Participate in managed breeding programs</li>
              <li className="p-4 rounded-lg border border-primary/30">Seasonal Gatherings — Join period-appropriate celebrations</li>
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