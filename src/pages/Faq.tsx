import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>FAQ — 400</title>
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Frequently Asked Questions</h1>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what">
              <AccordionTrigger>What is the 400 Club?</AccordionTrigger>
              <AccordionContent>
                400 is a generative art collection of 9,400 unique NFT portraits. Each token is a one-of-one Gilded Age–inspired canine portrait and your
                membership pass into the 400 Club — an exclusive community that bridges old wealth and new wealth.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="generative">
              <AccordionTrigger>What does "generative art" mean here?</AccordionTrigger>
              <AccordionContent>
                Generative art means the portraits are built from rules and traits instead of painted one-by-one from scratch. We define ingredients like
                breed, clothing, setting, props, and lighting, then use generative models to propose many possible scenes. From there we curate and refine,
                keeping only the strongest compositions, so every NFT you can mint is a one-of-one work created by a mix of system and artist.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="supply">
              <AccordionTrigger>How many tokens are there?</AccordionTrigger>
              <AccordionContent>
                Exactly 9,400 NFTs, each unique and non-fungible. No two portraits share the same combination of traits and composition.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="rights">
              <AccordionTrigger>What are the licensing terms?</AccordionTrigger>
              <AccordionContent>
                Non-exclusive personal use; see full terms for details.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Container>
      </Section>
    </>
  );
};

export default FaqPage;