"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { CHAIN, COLLECTION, MINT, MINT_DATE_LABEL } from "@/lib/launch";

const siteName = `${COLLECTION.name} — Free claim on ${CHAIN.name}`;
const siteDescription = `${COLLECTION.supply.toLocaleString()} unique Gilded Age dog portraits. Free claim on ${CHAIN.name} L2 (chain ${CHAIN.chainId}). Opens ${MINT_DATE_LABEL}. Join the club.`;
const baseUrl = typeof window !== "undefined" ? window.location.origin : COLLECTION.website;
const defaultImage = "/images/og-image.jpg";

export const DefaultMeta: React.FC = () => {
  return (
    <Helmet>
      <meta name="theme-color" content="#0D0C0A" />
      <meta name="color-scheme" content="dark" />
      <meta name="application-name" content={COLLECTION.name} />
      <meta name="description" content={siteDescription} />
      <meta property="og:title" content={siteName} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteName} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:site" content={COLLECTION.twitterHandle} />
      <link rel="canonical" href={baseUrl} />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Helmet>
  );
};

export default DefaultMeta;
