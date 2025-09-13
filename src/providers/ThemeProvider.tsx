"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </NextThemesProvider>
  );
};