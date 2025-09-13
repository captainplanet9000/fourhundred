import React from "react";

export const FrameCorners: React.FC<{ className?: string }> = ({ className = "" }) => {
  const Corner = ({ rotate = 0, style = {} }: { rotate?: number; style?: React.CSSProperties }) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className="opacity-70"
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="fc-gilded" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9A6A28" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#E6C87E" />
          <stop offset="100%" stopColor="#8C6E2E" />
        </linearGradient>
      </defs>
      <path d="M1 1 L12 1 C15 1 17 3 17 6 L17 17" stroke="url(#fc-gilded)" strokeWidth="1.2" fill="none" />
      <circle cx="4" cy="4" r="1.2" fill="url(#fc-gilded)" />
    </svg>
  );

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <Corner rotate={0} style={{ position: "absolute", top: 4, left: 4 }} />
      <Corner rotate={90} style={{ position: "absolute", top: 4, right: 4 }} />
      <Corner rotate={180} style={{ position: "absolute", bottom: 4, right: 4 }} />
      <Corner rotate={270} style={{ position: "absolute", bottom: 4, left: 4 }} />
    </div>
  );
};