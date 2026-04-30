import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CHAIN, COLLECTION, MINT, MINT_DATE_LABEL } from "@/lib/launch";

const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About — {COLLECTION.name}</title>
        <meta
          name="description"
          content={`The ${COLLECTION.name} is ${COLLECTION.supply.toLocaleString()} one-of-one Gilded Age portraits — a free claim on ${CHAIN.name}. Funded by ${MINT.royaltyPct}% royalty on secondary.`}
        />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Inside the {COLLECTION.name}</h1>
          <div className="space-y-6 text-lg text-muted-foreground max-w-3xl">
            <p>
              The {COLLECTION.name} is a generative art project: {COLLECTION.supply.toLocaleString()}
              {" "}one-of-one canine portraits built from a curated library of Gilded Age reference —
              dress, interiors, tools, and city light. The 400 Club is the membership that sits over
              the collection: each NFT pairs you with a portrait that feels pulled from an old-world
              salon or workshop.
            </p>
            <p>
              We&apos;re launching as a <strong>free claim on {CHAIN.name}</strong> on{" "}
              <strong>{MINT_DATE_LABEL}</strong>. One per wallet, no whales, no presale tax. The
              project is funded by an {MINT.royaltyPct}% royalty on secondary sales — when the
              collection trades, we keep building.
            </p>
            <p>
              Rather than sorting people into rigid social tiers, we think in scenes and roles:
              working dogs, performers, studio companions, and heirs to inherited wealth. Old wealth
              and new wealth share the same walls here, rendered with the same care.
            </p>
            <p>
              Generative systems compose every frame, but prompts, references, and selection are
              guided by hand so that no two portraits feel alike. Your token is both artwork and
              key — your permanent membership in the {COLLECTION.name}.
            </p>
            <p>
              In practice, that means we define traits — breed, posture, garments, background,
              objects, and mood — and let generative models explore countless combinations. From
              those outputs, we curate, refine prompts, and only keep portraits where the
              composition, lighting, and storytelling feel strong enough to stand as a one-of-one
              work.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Why free, why royalty-funded</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Maximum distribution.</span> A free
                claim with one per wallet means {COLLECTION.supply.toLocaleString()} unique holders
                — not 1,200 wallets each holding eight. Holder count is the gravity that makes a
                collection &quot;the&quot; PFP for a chain.
              </li>
              <li>
                <span className="font-medium text-foreground">Aligned incentives.</span> We earn
                when you trade, not when you mint. {MINT.royaltyPct}% royalty on every secondary
                sale, forever. We&apos;re building for the long run.
              </li>
              <li>
                <span className="font-medium text-foreground">{CHAIN.name}-native.</span> The
                realtime Ethereum L2. Mints feel instant. Gas is fractions of a cent. Built for the
                next million wallets, not the last million.
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Membership in the 400 Club</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">One NFT, one portrait.</span> Your
                token is a unique, on-chain artwork — no editions, no duplicates.
              </li>
              <li>
                <span className="font-medium text-foreground">Old wealth, new wealth.</span>{" "}
                Settings span salons, workshops, theaters, and streets — generative scenes that echo
                both heritage and modern collectors.
              </li>
              <li>
                <span className="font-medium text-foreground">A club you actually enter.</span>{" "}
                Ownership grants identity within the collection today, and a foundation for future
                drops, curated shows, and community experiments.
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Your seat is waiting</h2>
            <p className="text-muted-foreground max-w-3xl">
              Find the portrait that reflects your story — and claim your place in the{" "}
              {COLLECTION.name} on {MINT_DATE_LABEL}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-primary text-primary-foreground hover:brightness-110">
                <Link to="/mint">Get ready for mint</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary/50">
                <Link to="/gallery">Explore the gallery</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary/50">
                <Link to="/breeds">Browse breeds</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AboutPage;
