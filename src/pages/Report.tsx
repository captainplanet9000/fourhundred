"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { loadAll, buildFacetCounts } from "@/lib/metadata";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ReportPage: React.FC = () => {
  const [counts, setCounts] = React.useState<Record<string, Record<string, number>>>({});
  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    let mounted = true;
    loadAll().then((all) => {
      if (!mounted) return;
      setTotal(all.length);
      setCounts(buildFacetCounts(all));
    });
    return () => {
      mounted = false;
    };
  }, []);

  const traits = Object.keys(counts).sort((a, b) => a.localeCompare(b));

  return (
    <>
      <Helmet>
        <title>Observed Traits Report — 400</title>
        <meta name="description" content="Live trait counts from the current metadata set." />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">Observed Traits Report</h1>
          <p className="text-muted-foreground mb-8">
            Total tokens loaded: <span className="text-foreground font-medium">{total}</span>
          </p>

          {traits.length === 0 ? (
            <div className="text-muted-foreground">No traits observed yet.</div>
          ) : (
            traits.map((trait) => {
              const entries = Object.entries(counts[trait]).sort((a, b) => b[1] - a[1]);
              return (
                <div key={trait} className="mb-10">
                  <h2 className="text-xl font-semibold mb-3">{trait}</h2>
                  <div className="rounded-md border border-primary/30 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/2">Value</TableHead>
                          <TableHead className="w-1/4">Count</TableHead>
                          <TableHead className="w-1/4">% of Collection</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {entries.map(([value, count]) => {
                          const pct = total ? ((count / total) * 100).toFixed(1) : "0.0";
                          return (
                            <TableRow key={value}>
                              <TableCell className="capitalize">{value}</TableCell>
                              <TableCell>{count}</TableCell>
                              <TableCell>{pct}%</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              );
            })
          )}
        </Container>
      </Section>
    </>
  );
};

export default ReportPage;