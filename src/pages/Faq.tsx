import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>FAQ — fourHundred</title>
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Frequently Asked Questions</h1>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what">
              <AccordionTrigger>What is fourHundred?</AccordionTrigger>
              <AccordionContent>
                A curated collection of 400 on-chain portraits celebrating Gilded Age aesthetics through canine muses.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="supply">
              <AccordionTrigger>How many tokens are there?</AccordionTrigger>
              <AccordionContent>Exactly 400 tokens, each unique.</AccordionContent>
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