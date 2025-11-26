"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getAllBreeds } from "@/lib/breedsTraitsFromMd";

const allBreeds = getAllBreeds();

type TierKey = "common" | "uncommon" | "rare" | "epic" | "legendary";

const tierLabels: Record<TierKey, string> = {
  common: "Common Breeds",
  uncommon: "Uncommon Breeds",
  rare: "Rare Breeds",
  epic: "Epic Breeds",
  legendary: "Legendary Breeds",
};

function getTierForCount(count: number): TierKey {
  if (count <= 10) return "legendary";
  if (count <= 30) return "epic";
  if (count <= 60) return "rare";
  if (count <= 90) return "uncommon";
  return "common";
}

const tieredBreeds: Record<TierKey, string[]> = {
  common: [],
  uncommon: [],
  rare: [],
  epic: [],
  legendary: [],
};

for (const b of allBreeds) {
  const tier = getTierForCount(b.count);
  tieredBreeds[tier].push(b.name);
}

for (const key of Object.keys(tieredBreeds) as TierKey[]) {
  tieredBreeds[key].sort((a, b) => a.localeCompare(b));
}

const BreedsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Breeds — 400</title>
        <meta name="description" content="Browse all 226 catalogued breeds in the 400 collection, grouped by rarity tier." />
      </Helmet>

      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Complete Breed Lists by Rarity Tier</h1>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            The collection includes 226 distinct breeds. Rarity tiers reflect how often each one appears across the 9,400 generative portraits
            that make up the 400 Club.
          </p>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="common">
              <AccordionTrigger>{tierLabels.common}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">Most recognizable and frequently appearing breeds in the collection:</p>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {tieredBreeds.common.map((b) => (
                    <li key={b} className="text-foreground/90">{b}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="uncommon">
              <AccordionTrigger>{tierLabels.uncommon}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">Breeds that appear less frequently but remain well represented:</p>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {tieredBreeds.uncommon.map((b) => (
                    <li key={b} className="text-foreground/90">{b}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rare">
              <AccordionTrigger>{tierLabels.rare}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">Breeds with relatively few portraits in the collection:</p>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {tieredBreeds.rare.map((b) => (
                    <li key={b} className="text-foreground/90">{b}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="epic">
              <AccordionTrigger>{tierLabels.epic}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">Extremely uncommon or regionally specific breeds with very limited appearances:</p>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {tieredBreeds.epic.map((b) => (
                    <li key={b} className="text-foreground/90">{b}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="legendary">
              <AccordionTrigger>{tierLabels.legendary}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">Extinct, near-lost, or ultra-rare breeds that appear only a handful of times:</p>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {tieredBreeds.legendary.map((b) => (
                    <li key={b} className="text-foreground/90">{b}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </Container>
      </Section>
    </>
  );
};

export default BreedsPage;