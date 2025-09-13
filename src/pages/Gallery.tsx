"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GradientDivider } from "@/components/layout/GradientDivider";
import { FilterBar } from "@/components/gallery/FilterBar";
import { TokenCard } from "@/components/gallery/TokenCard";
import { EmptyState } from "@/components/gallery/EmptyState";
import { loadAll, buildFacetCounts, filterAndSort } from "@/lib/metadata";
import { useGalleryStore } from "@/store/gallery-store";
import { useSearchParams, useNavigate } from "react-router-dom";

const GalleryPage: React.FC = () => {
  const [items, setItems] = React.useState<any[]>([]);
  const [facets, setFacets] = React.useState<Record<string, Record<string, number>>>({});
  const [loading, setLoading] = React.useState(true);

  const { search, sort, traits, page, perPage, setPage, reset } = useGalleryStore();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  // Initialize from URL
  React.useEffect(() => {
    const q = params.get("q") ?? "";
    const s = (params.get("sort") as "id" | "alpha" | "rarity") ?? "id";
    const t = params.get("traits");
    const parsed: Record<string, string[]> = t ? JSON.parse(decodeURIComponent(t)) : {};
    const p = Number(params.get("page") ?? 1);
    const per = Number(params.get("perPage") ?? 24);

    // Apply to store if different
    if (q || s || t || p || per) {
      // Use store setters directly
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
    loadAll().then((all) => {
      if (!mounted) return;
      setItems(all);
      setFacets(buildFacetCounts(all));
      setLoading(false);
    });
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

  return (
    <>
      <Helmet>
        <title>Gallery — fourHundred</title>
        <meta name="description" content="Explore the full fourHundred collection of Gilded Age canine portraits." />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Gallery</h1>
          <FilterBar facetCounts={facets} />
          <GradientDivider />
          {loading ? (
            <div className="py-20 text-center text-muted-foreground">Loading portraits…</div>
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
                    className="px-6 py-3 rounded-md bg-yellow-600 hover:bg-yellow-700 text-black font-medium"
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