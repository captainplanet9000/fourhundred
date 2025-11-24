"use client";

import { useEffect, useState } from "react";

type Img = { src: string; alt: string };

const FALLBACK = "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1080&auto=format&fit=crop";
const DEFAULT_ITEMS: Img[] = [
  { src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1080&auto=format&fit=crop", alt: "Regal dog portrait" },
  { src: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1080&auto=format&fit=crop", alt: "Golden retriever with top hat" },
  { src: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1080&auto=format&fit=crop", alt: "Elegant poodle" },
  { src: "https://images.unsplash.com/photo-1543466835-2d9afff2f475?q=80&w=1080&auto=format&fit=crop", alt: "Royal dog portrait" },
  { src: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=1080&auto=format&fit=crop", alt: "Gilded age dog" },
];

export function Gallery() {
  const [items, setItems] = useState<Img[]>([]);

  useEffect(() => {
    // Prefer server-generated list from local public/images/collection
    async function load() {
      try {
        const r = await fetch("/api/gallery", { cache: "no-store" });
        if (r.ok) {
          const arr = (await r.json()) as Img[];
          if (Array.isArray(arr) && arr.length > 0) {
            setItems(arr);
            return;
          }
        }
      } catch {}
      try {
        const r2 = await fetch("/content/gallery.json");
        if (r2.ok) {
          const arr2 = (await r2.json()) as Img[];
          setItems(Array.isArray(arr2) && arr2.length > 0 ? arr2 : DEFAULT_ITEMS);
          return;
        }
      } catch {}
      setItems(DEFAULT_ITEMS);
    }
    load();
  }, []);

  if (!items?.length) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {items.map((it, idx) => (
        <div key={idx} className="card p-1">
          <img
            src={it.src}
            alt={it.alt}
            loading={idx < 2 ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full rounded-md object-cover"
            onError={(e) => {
              const t = e.currentTarget as HTMLImageElement;
              if (t.src !== FALLBACK) t.src = FALLBACK;
            }}
          />
        </div>
      ))}
    </div>
  );
}
