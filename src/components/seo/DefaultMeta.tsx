"use client";

import React from "react";
import { Helmet } from "react-helmet-async";

const siteName = "fourHundred — Gilded Age Canine Portraits";
const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://example.com";
const defaultImage = "/placeholder.svg";

export const DefaultMeta: React.FC = () => {
  return (
    <Helmet>
      <meta name="theme-color" content="#0D0C0A" />
      <meta name="color-scheme" content="dark" />
      <meta name="application-name" content="fourHundred" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={defaultImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={defaultImage} />
      <link rel="canonical" href={baseUrl} />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Helmet>
  );
};

export default DefaultMeta;