import React from "react";
import { Badge } from "@/components/ui/badge";
import { Attribute } from "@/lib/types";

export const AttributeList: React.FC<{ attributes: Attribute[] }> = ({ attributes }) => {
  if (!attributes?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {attributes.map((a, idx) => (
        <Badge key={`${a.trait_type}-${idx}`} variant="outline" className="border-primary/40 text-primary">
          {a.trait_type}: {String(a.value)}
        </Badge>
      ))}
    </div>
  );
};