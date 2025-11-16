"use client";

import React from "react";

type Props = {
  src: string | undefined;
  alt: string;
  tokenId?: number;
  className?: string;
  loading?: "eager" | "lazy";
};

export const SafeImage: React.FC<Props> = ({
  src,
  alt,
  tokenId,
  className,
  loading = "lazy",
}) => {
  const fallbacks = React.useMemo(() => {
    const list: string[] = [];
    if (src) list.push(src);
    if (tokenId !== undefined) list.push(`/images/collection/${tokenId}.png`);
    list.push("/placeholder.svg");
    return list.filter(Boolean);
  }, [src, tokenId]);

  const [idx, setIdx] = React.useState(0);

  const handleError = () => {
    if (idx < fallbacks.length - 1) setIdx(idx + 1);
  };

  return (
    <img
      src={fallbacks[idx]}
      alt={alt}
      className={`block ${className ?? ""}`}
      loading={loading}
      onError={handleError}
    />
  );
};