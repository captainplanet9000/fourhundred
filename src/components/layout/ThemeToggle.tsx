"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme !== "light";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-yellow-500 hover:text-yellow-400"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};