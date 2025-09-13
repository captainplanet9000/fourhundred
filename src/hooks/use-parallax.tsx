"use client";

import * as React from "react";

export function useParallax(speed = 0.15) {
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(window.scrollY * speed);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return offset;
}