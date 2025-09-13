"use client";

import React from "react";
import { HelmetProvider } from "react-helmet-async";

export const SeoProvider = ({ children }: { children: React.ReactNode }) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};