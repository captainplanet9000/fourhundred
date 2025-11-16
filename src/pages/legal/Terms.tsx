import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const TermsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms — 400</title>
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Terms of Use</h1>
          <div className="prose prose-invert max-w-3xl">
            <p>By accessing or using 400, you agree to these Terms of Use.</p>
            <h3>License</h3>
            <p>
              You receive a personal, non-exclusive license to display and resell the token you own. No commercial use unless otherwise granted.
            </p>
            <h3>Warranty</h3>
            <p>Provided “as is” without warranties. On-chain interactions are at your own risk.</p>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TermsPage;