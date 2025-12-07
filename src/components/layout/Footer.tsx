import React from "react";
import { Container } from "./Container";
import { Twitter, Github, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t mt-16">
      <Container className="py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-semibold text-lg">
            400 Club — Generative Portrait Membership
          </div>
          <p className="text-muted-foreground mt-2">
            A generative collection of 9,400 unique on-chain portraits. Each NFT is a one-of-one membership in the 400 Club.
          </p>
        </div>
        <div className="space-y-2">
          <div className="font-medium">Explore</div>
          <ul className="space-y-1 text-muted-foreground">
            <li><a href="https://opensea.io/collection/fourhundred" target="_blank" rel="noreferrer" className="hover:text-primary inline-flex items-center gap-1">OpenSea <ExternalLink size={14} /></a></li>
            <li><a href="https://etherscan.io/address/0xa2e2ea98302e4db471d16862468a0afb0256a589" target="_blank" rel="noreferrer" className="hover:text-primary inline-flex items-center gap-1">Etherscan <ExternalLink size={14} /></a></li>
            <li><a href="https://x.com/4hundred_club" target="_blank" rel="noreferrer" className="hover:text-primary inline-flex items-center gap-1">X / Twitter <ExternalLink size={14} /></a></li>
            <li><span className="text-muted-foreground/60">Discord — coming soon</span></li>
          </ul>
        </div>
        <div className="space-y-2">
          <div className="font-medium">Legal</div>
          <ul className="space-y-1 text-muted-foreground">
            <li><a href="/legal/terms" className="hover:text-primary">Terms</a></li>
            <li><a href="/legal/privacy" className="hover:text-primary">Privacy</a></li>
          </ul>
          <div className="flex items-center gap-3 mt-3 text-muted-foreground">
            <a href="https://x.com/4hundred_club" target="_blank" rel="noreferrer" className="hover:text-primary"><Twitter size={18} /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary"><Github size={18} /></a>
          </div>
        </div>
      </Container>
    </footer>
  );
};