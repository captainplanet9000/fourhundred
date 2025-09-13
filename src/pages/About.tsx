import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About — fourHundred</title>
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Our Story</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            fourHundred is a museum-grade ode to the Gilded Age—warm golds, deep jewel tones, and stately composition—reimagined with canine grandeur.
            Each portrait is an on-chain artifact crafted to feel timeless.
          </p>
        </Container>
      </Section>
    </>
  );
};

export default AboutPage;