"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TraitBarChart } from "@/components/traits/TraitBarChart";
import { TraitFilterPills } from "@/components/traits/TraitFilterPills";
import { buildFacetCounts, loadAll, ALL_SUPPORTED_TRAITS } from "@/lib/metadata";
import { Link, useNavigate } from "react-router-dom";
import { TraitCatalog } from "@/components/traits/TraitCatalog";
import { Button } from "@/components/ui/button";

const TraitsPage: React.FC = () => {
  const [facets, setFacets] = React.useState<Record<string, Record<string, number>>>({});
  const [total, setTotal] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    let mounted = true;
    loadAll().then((all) => {
      if (!mounted) return;
      setFacets(buildFacetCounts(all));
      setTotal(all.length);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleClick = (trait: string, value: string) => {
    const q = encodeURIComponent(JSON.stringify({ [trait]: [value] }));
    navigate(`/gallery?traits=${q}`);
  };

  const keys = ALL_SUPPORTED_TRAITS.filter((t) => facets[t]);

  return (
    <>
      <Helmet>
        <title>Traits Explorer — fourHundred</title>
        <meta name="description" content="Explore trait distributions across the fourHundred collection." />
      </Helmet>
      <Section>
        <Container>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-5xl font-semibold">Traits Explorer</h1>
            <Button asChild variant="outline" className="border-primary/50">
              <Link to="/report">Observed Traits Report</Link>
            </Button>
          </div>

          <TraitFilterPills filters={{}} />
          <div className="grid md:grid-cols-2 gap-8">
            {keys.map((k) => (
              <TraitBarChart
                key={k}
                title={k}
                data={facets[k]}
                total={total}
                onClick={(v) => handleClick(k, v)}
              />
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Trait Catalog (Reference)</h2>
            <p className="text-muted-foreground mb-6">
              The canonical list of trait categories and values used across the collection. Actual observed values appear in the charts above.
            </p>
            <TraitCatalog />
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TraitsPage;