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
              <AccordionTrigger>What is 400?</AccordionTrigger>
              <AccordionContent>
                400 is a collection of 10,000 on-chain portraits that tell the full story of Gilded Age America (1870–1900) — companions beside working families,
                rising classes, artists, immigrants, and high society. Each piece combines museum-grade craft with archival research.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="supply">
              <AccordionTrigger>How many tokens are there?</AccordionTrigger>
              <AccordionContent>Exactly 10,000 tokens, each unique.</AccordionContent>
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