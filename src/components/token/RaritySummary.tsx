import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const RaritySummary: React.FC<{ rank?: number; score?: number }> = ({ rank, score }) => {
  if (rank === undefined && score === undefined) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rarity</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        {rank !== undefined && <div>Rank: <span className="text-foreground font-medium">{rank}</span></div>}
        {score !== undefined && <div>Score: <span className="text-foreground font-medium">{score}</span></div>}
      </CardContent>
    </Card>
  );
};