"use client";

import React from "react";

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  delayMs?: number;
};

export const Reveal: React.FC<Props> = ({ as = "div", className = "", children, delayMs = 0 }) => {
  const ref = React.useRef<HTMLElement | null>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShow(true), delayMs);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delayMs]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={`reveal ${show ? "show" : ""} ${className}`}>
      {children}
    </Tag>
  );
};