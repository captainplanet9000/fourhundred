"use client";

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const links = [
  { to: "/gallery", label: "Gallery" },
  { to: "/collection", label: "Collection" },
  { to: "/traits", label: "Traits" },
  { to: "/breeds", label: "Breeds" },
  { to: "/mint", label: "Mint" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <Container className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
        <Link to="/" className="flex items-center">
          <img 
            src="/images/fourhundred_logo.png" 
            alt="fourHundred" 
            className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto"
          />
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
          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <nav className="mt-4 flex flex-col gap-4">
                  {links.map((l) => (
                    <SheetClose asChild key={l.to}>
                      <NavLink
                        to={l.to}
                        className={({ isActive }) =>
                          `text-base transition-colors ${isActive ? "text-primary" : "text-foreground/90 hover:text-foreground"}`
                        }
                      >
                        {l.label}
                      </NavLink>
                    </SheetClose>
                  ))}
                  <div className="pt-2">
                    <SheetClose asChild>
                      <Button asChild className="w-full bg-primary text-primary-foreground hover:brightness-110">
                        <Link to="/gallery">View Gallery</Link>
                      </Button>
                    </SheetClose>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:brightness-110 shadow-sm">
            <Link to="/gallery">View Gallery</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
};