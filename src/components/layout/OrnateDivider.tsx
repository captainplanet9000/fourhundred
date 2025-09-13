import React from "react";

export const OrnateDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`my-8 md:my-12 ${className}`}>
      <svg viewBox="0 0 400 8" xmlns="http://www.w3.org/2000/svg" className="w-full h-2 opacity-80">
        <defs>
          <linearGradient id="gilded" x1="0" x2="1">
            <stop offset="0%" stopColor="#9A6A28" />
            <stop offset="22%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#E6C87E" />
            <stop offset="78%" stopColor="#B8860B" />
            <stop offset="100%" stopColor="#8C6E2E" />
          </linearGradient>
          <pattern id="egg" x="0" y="0" width="20" height="8" patternUnits="userSpaceOnUse">
            <ellipse cx="4" cy="4" rx="3.5" ry="2.2" fill="url(#gilded)" opacity="0.85" />
            <rect x="10" y="2" width="8" height="4" rx="1" fill="url(#gilded)" opacity="0.6" />
          </pattern>
        </defs>
        <rect x="0" y="3.25" width="400" height="1.5" fill="url(#gilded)" opacity="0.5" />
        <rect x="0" y="0" width="400" height="8" fill="url(#egg)" opacity="0.35" />
      </svg>
    </div>
  );
};