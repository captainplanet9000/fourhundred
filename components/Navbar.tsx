"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-yellow-800/30 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold">
          <span className="text-gilded-400">four</span>Hundred
        </Link>
        <div className="flex items-center gap-3">
          <ConnectButton showBalance={false} accountStatus={{ smallScreen: "avatar", largeScreen: "full" }} />
        </div>
      </div>
    </header>
  );
}
