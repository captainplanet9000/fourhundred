"use client";

import React from "react";
import { Helmet } from "react-helmet-async";

const siteName = "fourHundred — Gilded Age Canine Portraits";
const siteDescription = "A curated collection of 10,000 unique Gilded Age dog portraits on the blockchain";
const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://fourhundred.club";
const defaultImage = "/images/og-image.jpg";

export const DefaultMeta: React.FC = () => {
  return (
    <Helmet>
      <meta name="theme-color" content="#0D0C0A" />
      <meta name="color-scheme" content="dark" />
      <meta name="application-name" content="fourHundred" />
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
      <link rel="canonical" href={baseUrl} />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Helmet>
  );
};

export default DefaultMeta;