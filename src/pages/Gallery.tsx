"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GradientDivider } from "@/components/layout/GradientDivider";
import { FilterBar } from "@/components/gallery/FilterBar";
import { TokenCard } from "@/components/gallery/TokenCard";
import { EmptyState } from "@/components/gallery/EmptyState";
import { filterAndSort } from "@/lib/metadata";
import type { NFTMetadata } from "@/lib/types";
import { useGalleryStore } from "@/store/gallery-store";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const CURATED_FILES: string[] = [
  "ComfyUI_00038__1.png",
  "ComfyUI_00058_.png",
  "ComfyUI_00060_.png",
  "ComfyUI_00075__1.png",
  "ComfyUI_00115_.png",
  "ComfyUI_00141_.png",
  "ComfyUI_00337__2.png",
  "ComfyUI_00340__1.png",
  "ComfyUI_00347__1.png",
  "ComfyUI_00386__1.png",
  "ComfyUI_00424__1.png",
  "ComfyUI_00435__1.png",
  "ComfyUI_00477__1.png",
  "ComfyUI_00491_.png",
  "ComfyUI_00502__1.png",
  "ComfyUI_00537__1.png",
  "ComfyUI_00546_.png",
  "ComfyUI_00553_.png",
  "ComfyUI_00573_.png",
  "ComfyUI_00699__1.png",
  "ComfyUI_00705__1.png",
  "ComfyUI_00779_.png",
  "ComfyUI_00863_.png",
  "ComfyUI_00912_.png",
  "ComfyUI_00976_.png",
  "ComfyUI_01139__1.png",
  "ComfyUI_01149_.png",
  "ComfyUI_01158_.png",
  "ComfyUI_01250_.png",
  "ComfyUI_01360_.png",
  "ComfyUI_01364_.png",
  "ComfyUI_01498_.png",
  "ComfyUI_01811_.png",
  "ComfyUI_02357_.png",
  "ComfyUI_02615_.png",
  "ComfyUI_02907_.png",
];

const GalleryPage: React.FC = () => {
  const [items, setItems] = React.useState<NFTMetadata[]>([]);
  const [facets, setFacets] = React.useState<Record<string, Record<string, number>>>({});
  const [loading, setLoading] = React.useState(true);

  const { search, sort, traits, page, perPage, setPage, reset } = useGalleryStore();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // Initialize from URL
  React.useEffect(() => {
    const q = params.get("q") ?? "";
    const s = (params.get("sort") as "id" | "alpha" | "rarity") ?? "id";
    const t = params.get("traits");
    const parsed: Record<string, string[]> = t ? JSON.parse(decodeURIComponent(t)) : {};
    const p = Number(params.get("page") ?? 1);
    const per = Number(params.get("perPage") ?? 24);

    if (q || s || t || p || per) {
      useGalleryStore.setState({
        search: q,
        sort: s,
        traits: parsed,
        page: p,
        perPage: per,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync to URL
  React.useEffect(() => {
    const t = encodeURIComponent(JSON.stringify(traits));
    const next = new URLSearchParams({
      q: search,
      sort,
      traits: t,
      page: String(page),
      perPage: String(perPage),
    });
    if (next.toString() !== params.toString()) {
      navigate({ search: next.toString() }, { replace: true });
    }
  }, [search, sort, traits, page, perPage, navigate, params]);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    const curated: NFTMetadata[] = CURATED_FILES.map((file, index) => ({
      name: `Portrait ${index + 1}`,
      description: "Curated fourHundred gallery portrait",
      image: `/images/collection/${file}`,
      image_url: `/images/collection/${file}`,
      external_url: "",
      attributes: [],
      tokenId: index + 1,
      rarity_score: undefined,
      rarity_rank: undefined,
    }));

    if (mounted) {
      setItems(curated);
      setFacets({});
      setLoading(false);
    }
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = React.useMemo(
    () => filterAndSort(items, { search, traits, sort }),
    [items, search, traits, sort],
  );

  const start = 0;
  const end = page * perPage;
  const visible = filtered.slice(start, end);
  const canLoadMore = end < filtered.length;

  const SkeletonGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-md border border-primary/20 overflow-hidden">
          <Skeleton className="w-full aspect-square" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Gallery — 400</title>
        <meta name="description" content="Explore the 400 collection — portraits across every walk of Gilded Age America." />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Gallery</h1>
          <FilterBar facetCounts={facets} />
          <GradientDivider />
          {loading ? (
            <SkeletonGrid />
          ) : visible.length === 0 ? (
            <EmptyState onReset={reset} />
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {visible.map((it) => (
                  <TokenCard key={it.tokenId} item={it} />
                ))}
              </div>
              <div className="flex justify-center mt-10">
                {canLoadMore && (
                  <button
                    onClick={() => setPage(page + 1)}
                    className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:brightness-110 font-medium"
                  >
                    Load more
                  </button>
                )}
              </div>
            </>
          )}
        </Container>
      </Section>
    </>
  );
};

export default GalleryPage;