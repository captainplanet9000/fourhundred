import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy — fourHundred</title>
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Privacy Policy</h1>
          <div className="prose prose-invert max-w-3xl">
            <p>We do not collect personal information unless you provide it.</p>
            <p>Wallet connections are facilitated via WalletConnect; we do not store your keys.</p>
            <p>This site may use basic analytics to improve the experience.</p>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default PrivacyPage;