import React from "react";
import { Container } from "./Container";
import { Twitter, Github, ExternalLink } from "lucide-react";
import {
  CHAIN,
  COLLECTION,
  MINT,
  explorerAddressUrl,
  openseaCollectionUrl,
} from "@/lib/launch";
import { getContractAddress } from "@/lib/env";

export const Footer: React.FC = () => {
  const contractAddress = getContractAddress();
  const explorerUrl = explorerAddressUrl(contractAddress);
  const openseaUrl = openseaCollectionUrl(contractAddress);

  return (
    <footer className="border-t mt-16">
      <Container className="py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-semibold text-lg">
            {COLLECTION.name} — Free claim on {CHAIN.name}
          </div>
          <p className="text-muted-foreground mt-2">
            A generative collection of {COLLECTION.supply.toLocaleString()} unique on-chain
            portraits. Each NFT is a one-of-one membership in the {COLLECTION.name}.
          </p>
          <p className="text-xs text-muted-foreground/80 mt-3">
            Free to claim. Funded by {MINT.royaltyPct}% royalties on secondary.
          </p>
        </div>
        <div className="space-y-2">
          <div className="font-medium">Explore</div>
          <ul className="space-y-1 text-muted-foreground">
            {openseaUrl ? (
              <li>
                <a
                  href={openseaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary inline-flex items-center gap-1"
                >
                  OpenSea <ExternalLink size={14} />
                </a>
              </li>
            ) : (
              <li>
                <span className="text-muted-foreground/60">OpenSea — listing after mint</span>
              </li>
            )}
            <li>
              <a
                href={explorerUrl ?? CHAIN.explorer}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary inline-flex items-center gap-1"
              >
                {CHAIN.name} Explorer <ExternalLink size={14} />
              </a>
            </li>
            <li>
              <a
                href={CHAIN.bridge}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary inline-flex items-center gap-1"
              >
                Bridge to {CHAIN.name} <ExternalLink size={14} />
              </a>
            </li>
            <li>
              <a
                href={COLLECTION.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary inline-flex items-center gap-1"
              >
                X / Twitter <ExternalLink size={14} />
              </a>
            </li>
            <li>
              <span className="text-muted-foreground/60">Discord — coming soon</span>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <div className="font-medium">Legal</div>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <a href="/legal/terms" className="hover:text-primary">
                Terms
              </a>
            </li>
            <li>
              <a href="/legal/privacy" className="hover:text-primary">
                Privacy
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-3 mt-3 text-muted-foreground">
            <a
              href={COLLECTION.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
