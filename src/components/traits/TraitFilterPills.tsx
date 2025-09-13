import React from "react";
import { Badge } from "@/components/ui/badge";

export const TraitFilterPills: React.FC<{ filters: Record<string, string[]> }> = ({ filters }) => {
  const pills = Object.entries(filters).flatMap(([k, vals]) => vals.map((v) => `${k}: ${v}`));
  if (!pills.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {pills.map((p) => (
        <Badge key={p} variant="secondary" className="bg-yellow-800/40">
          {p}
        </Badge>
      ))}
    </div>
  );
};