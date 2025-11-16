"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TraitBarChart } from "@/components/traits/TraitBarChart";
import { TraitFilterPills } from "@/components/traits/TraitFilterPills";
import { Link } from "react-router-dom";
import { TraitCatalog } from "@/components/traits/TraitCatalog";
import { Button } from "@/components/ui/button";
import { getTraitCounts } from "@/lib/breedsTraitsFromMd";

const TraitsPage: React.FC = () => {
  const [facets, setFacets] = React.useState<Record<string, Record<string, number>>>({});

  React.useEffect(() => {
    const counts = getTraitCounts();
    setFacets(counts);
  }, []);

  const keys = Object.keys(facets);

  return (
    <>
      <Helmet>
        <title>Traits Explorer — 400</title>
        <meta name="description" content="Explore trait distributions across the 400 collection." />
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
            {keys.map((k) => {
              const data = facets[k];
              const totalForCategory = Object.values(data).reduce((sum, n) => sum + n, 0);
              return (
                <TraitBarChart
                  key={k}
                  title={k}
                  data={data}
                  total={totalForCategory}
                />
              );
            })}
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