"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Trait data matching OpenSea metadata structure
const traitData = {
  Breed: {
    description: "226 unique breeds from common favorites to extinct rarities",
    total: 9400,
    highlights: [
      { name: "German Shepherd", count: 103 },
      { name: "Golden Retriever", count: 103 },
      { name: "Labrador Retriever", count: 103 },
      { name: "Beagle", count: 103 },
      { name: "Boxer", count: 103 },
      { name: "French Bulldog", count: 103 },
      { name: "Poodle (Standard)", count: 103 },
      { name: "Rottweiler", count: 103 },
      { name: "Yorkshire Terrier", count: 103 },
      { name: "Siberian Husky", count: 103 },
    ],
    uniqueCount: 226,
  },
  Background: {
    description: "75 Victorian and Gilded Age settings from grand estates to working-class workshops",
    total: 9400,
    highlights: [
      { name: "Dark Velvet Drape", count: 727 },
      { name: "Rich Burgundy Wallpaper", count: 522 },
      { name: "Forest Green Damask", count: 496 },
      { name: "Deep Blue Brocade", count: 474 },
      { name: "Gold Leaf Pattern", count: 467 },
      { name: "Gilded Molding Interior", count: 370 },
      { name: "Garden Conservatory", count: 355 },
      { name: "Library Bookshelf", count: 342 },
      { name: "Marble Fireplace", count: 280 },
      { name: "Opera House Box", count: 236 },
    ],
    uniqueCount: 75,
  },
  Fabric: {
    description: "29 period-accurate textiles from common cotton to mythical celestial silk",
    total: 9400,
    highlights: [
      { name: "Silk", count: 2082 },
      { name: "Velvet", count: 1500 },
      { name: "Satin", count: 1106 },
      { name: "Brocade", count: 904 },
      { name: "Lace", count: 731 },
      { name: "Damask", count: 537 },
      { name: "Taffeta", count: 395 },
      { name: "Linen", count: 362 },
      { name: "Cotton", count: 301 },
      { name: "Fine Wool", count: 298 },
    ],
    uniqueCount: 29,
  },
  Color: {
    description: "79 clothing colors from classic neutrals to rare gemstone hues",
    total: 9400,
    highlights: [
      { name: "Slate", count: 493 },
      { name: "Wine", count: 280 },
      { name: "Beige", count: 277 },
      { name: "Ivory", count: 272 },
      { name: "Mahogany", count: 268 },
      { name: "Cream", count: 266 },
      { name: "Sapphire", count: 260 },
      { name: "Chocolate", count: 256 },
      { name: "Teal", count: 255 },
      { name: "Emerald", count: 251 },
    ],
    uniqueCount: 79,
  },
  Accessory: {
    description: "83 accessories from simple ribbons to ultra-rare Fabergé items",
    total: 9400,
    highlights: [
      { name: "Simple Silk Ribbon", count: 1090 },
      { name: "Silk Top Hat", count: 939 },
      { name: "High Lace Collar", count: 837 },
      { name: "Basic Velvet Collar", count: 784 },
      { name: "Plain Ascot", count: 647 },
      { name: "Bowler Hat", count: 570 },
      { name: "Silk Gloves", count: 635 },
      { name: "Pocket Watch Chain", count: 509 },
      { name: "Simple Monocle", count: 470 },
      { name: "Reading Glasses", count: 392 },
    ],
    uniqueCount: 83,
  },
  Clothing: {
    description: "Thousands of unique garment combinations from work aprons to evening gowns",
    total: 9400,
    highlights: [
      { name: "Apron", count: 203 },
      { name: "Riding Habit", count: 141 },
      { name: "Velvet Vest", count: 140 },
      { name: "Work Apron", count: 137 },
      { name: "Pleated Shirt", count: 136 },
      { name: "Inverness Cape", count: 134 },
      { name: "Morning Coat", count: 131 },
      { name: "Princess Line Dress", count: 131 },
      { name: "Cutaway Coat", count: 130 },
      { name: "Norfolk Jacket", count: 129 },
    ],
    uniqueCount: 7988,
  },
};

const TraitsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Traits Explorer — 400 Club</title>
        <meta
          name="description"
          content="Explore the trait distributions across 9,400 unique portraits. See how breeds, backgrounds, fabrics, accessories, and clothing colors combine to create each one-of-one piece."
        />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">Traits Explorer</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Every portrait in the 400 Club is composed of unique trait combinations. 
            Explore how 9,400 one-of-one NFTs are built from breeds, backgrounds, fabrics, colors, accessories, and clothing.
          </p>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {Object.entries(traitData).map(([key, data]) => (
              <div key={key} className="rounded-lg border border-primary/30 bg-black/20 p-4 text-center">
                <div className="text-2xl font-bold text-primary">{data.uniqueCount.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">{key === "Color" ? "Colors" : key === "Accessory" ? "Accessories" : `${key}s`}</div>
              </div>
            ))}
          </div>

          {/* Trait Categories */}
          <Accordion type="multiple" defaultValue={["Breed", "Background"]} className="w-full space-y-4">
            {Object.entries(traitData).map(([category, data]) => (
              <AccordionItem key={category} value={category} className="border border-primary/30 rounded-lg px-4">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span>{category}</span>
                    <span className="text-sm font-normal text-muted-foreground">({data.uniqueCount} unique)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-4">{data.description}</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {data.highlights.map((item) => (
                      <div key={item.name} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-primary/10 gap-2">
                        <span className="text-foreground/90 text-sm sm:text-base">{item.name}</span>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <div className="flex-1 sm:w-40 md:w-48 lg:w-56 h-4 bg-muted/50 rounded-full overflow-hidden border border-primary/20">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full" 
                              style={{ width: `${Math.min((item.count / data.total) * 100 * 15, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm text-foreground w-16 text-right font-semibold">{item.count.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {category !== "Clothing" && (
                    <p className="text-xs text-muted-foreground mt-3">
                      Showing top 10 of {data.uniqueCount} unique {category.toLowerCase()}s
                    </p>
                  )}
                  {category === "Clothing" && (
                    <p className="text-xs text-muted-foreground mt-3">
                      Showing top 10 of {data.uniqueCount.toLocaleString()} unique clothing combinations. Each garment includes color and fabric for maximum variety.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Collection Stats */}
          <div className="mt-10 rounded-lg border border-primary/30 bg-black/20 p-6">
            <h2 className="text-xl font-semibold mb-3">Collection Overview</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-muted-foreground">Total NFTs</div>
                <div className="text-2xl font-bold text-primary">9,400</div>
              </div>
              <div>
                <div className="text-muted-foreground">Trait Categories</div>
                <div className="text-2xl font-bold text-primary">6</div>
              </div>
              <div>
                <div className="text-muted-foreground">Unique Combinations</div>
                <div className="text-2xl font-bold text-primary">9,400</div>
                <div className="text-xs text-muted-foreground">Every portrait is 1/1</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TraitsPage;