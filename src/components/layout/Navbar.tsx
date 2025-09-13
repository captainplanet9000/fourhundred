"use client";

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/gallery", label: "Gallery" },
  { to: "/traits", label: "Traits" },
  { to: "/mint", label: "Mint" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <Container className="flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-semibold tracking-wide">
            <span className="text-primary">four</span>Hundred
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:brightness-110 shadow-sm">
            <Link to="/gallery">View Gallery</Link>
          </Button>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};