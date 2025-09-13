"use client";

import React from "react";
import { coreTraits, derivedTraits } from "../../data/traits-catalog.ts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const TraitCatalog: React.FC = () => {
  const coreEntries = Object.entries(coreTraits) as [string, string[]][];
  const derivedEntries = Object.entries(derivedTraits) as [string, string[]][];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-3">Core Generator Traits</h3>
        <Accordion type="multiple" className="w-full">
          {coreEntries.map(([name, values]) => (
            <AccordionItem key={name} value={name}>
              <AccordionTrigger className="capitalize">{name}</AccordionTrigger>
              <AccordionContent>
                {name === "Breed" ? (
                  <p className="text-sm text-muted-foreground">
                    Breed values are defined by rarity tiers (Common/Uncommon/Rare/Epic/Legendary). See the Breeds page for the complete lists.
                  </p>
                ) : (
                  <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {values.map((v) => (
                      <li key={v} className="text-foreground/90">{v}</li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Derived Stylistic Traits</h3>
        <Accordion type="multiple" className="w-full">
          {derivedEntries.map(([name, values]) => (
            <AccordionItem key={name} value={name}>
              <AccordionTrigger className="capitalize">{name}</AccordionTrigger>
              <AccordionContent>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {values.map((v) => (
                    <li key={v} className="text-foreground/90">{v}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default TraitCatalog;