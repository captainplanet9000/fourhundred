import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>FAQ — 400 Club</title>
        <meta name="description" content="Frequently asked questions about the 400 Club — the first generative art PFP collection of its kind." />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Everything you need to know about the 400 Club — the first generative art profile picture collection of its kind.
          </p>
          <Accordion type="single" collapsible className="w-full max-w-3xl">
            
            <AccordionItem value="what">
              <AccordionTrigger>What is the 400 Club?</AccordionTrigger>
              <AccordionContent>
                The 400 Club is the first generative art profile picture (PFP) collection of its kind — 9,400 completely unique, 
                AI-generated Gilded Age canine portraits. Each NFT serves as both a one-of-one piece of digital art and your 
                membership pass into an exclusive community. Your portrait isn't just art; it's your identity and your key to the club.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="first">
              <AccordionTrigger>What makes this the "first of its kind"?</AccordionTrigger>
              <AccordionContent>
                Unlike traditional PFP collections that layer pre-drawn traits, fourHundred portraits are fully generated compositions. 
                Each piece is created through advanced generative AI, combining breed, clothing, setting, and lighting into cohesive 
                oil-painting-style portraits. No trait layering, no templates — every portrait is a unique artistic creation that 
                stands on its own as fine art.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="generative">
              <AccordionTrigger>What does "generative art" mean?</AccordionTrigger>
              <AccordionContent>
                Generative art uses algorithms and AI to create artwork. For fourHundred, we defined hundreds of traits — breeds, 
                Gilded Age clothing, Victorian settings, accessories, and lighting conditions — then used generative models to compose 
                each portrait. The result is curated and refined by artists, ensuring every piece meets our quality standards while 
                remaining completely unique. No two portraits share the same composition.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="membership">
              <AccordionTrigger>What does membership include?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">Holding a 400 Club NFT grants you:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Exclusive Discord Access</strong> — Token-gated channels for members only</li>
                  <li><strong>Your Unique PFP</strong> — A one-of-one portrait to use as your identity across Web3</li>
                  <li><strong>Full IP Rights</strong> — You own full intellectual property rights to your portrait</li>
                  <li><strong>Future Project Access</strong> — Priority access and allowlist spots for upcoming mints and projects</li>
                  <li><strong>Community Voting</strong> — Influence the direction of the club and future drops</li>
                  <li><strong>Early Access</strong> — First look at upcoming features, collaborations, and rewards</li>
                  <li><strong>Future Airdrops</strong> — Members will receive exclusive rewards and benefits as the club grows</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="supply">
              <AccordionTrigger>How many NFTs are in the collection?</AccordionTrigger>
              <AccordionContent>
                Exactly 9,400 unique portraits. Each one is a true 1/1 — no duplicates, no editions. The collection will never expand 
                beyond this fixed supply, making each membership increasingly valuable as the community grows.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>What is the mint price?</AccordionTrigger>
              <AccordionContent>
                The public mint price is 0.1 ETH per portrait. This is a one-time cost that grants you permanent membership in the 
                400 Club, plus ownership of a unique piece of generative art.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rights">
              <AccordionTrigger>What rights do I have to my portrait?</AccordionTrigger>
              <AccordionContent>
                You own full intellectual property (IP) rights to your 400 Club NFT. This means you can use your portrait however 
                you want — as your profile picture, on merchandise, in commercial projects, or however else you see fit. Your portrait 
                is yours completely. Print it, sell products with it, license it — the IP belongs to you as the holder.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="wallet">
              <AccordionTrigger>Which wallets are supported?</AccordionTrigger>
              <AccordionContent>
                We support all major Ethereum wallets including MetaMask, Coinbase Wallet, WalletConnect-compatible wallets, 
                Rainbow, and more. Simply connect your wallet on the Mint page to get started.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </Container>
      </Section>
    </>
  );
};

export default FaqPage;