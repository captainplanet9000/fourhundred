import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { NFTMetadata } from "@/lib/types";
import { SafeImage } from "@/components/common/SafeImage";
import { FrameCorners } from "@/components/layout/FrameCorners";

export const TokenCard: React.FC<{ item: NFTMetadata }> = ({ item }) => {
  const keyTraits = ["Breed", "Headwear", "Background"];
  const shown = item.attributes.filter((a) => keyTraits.includes(a.trait_type));

  return (
    <Link
      to={`/token/${item.tokenId}`}
      aria-label={item.name ? `View ${item.name}` : `View Member #${item.tokenId}`}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition border border-primary/30 hover:border-primary/60">
        <CardContent className="p-0">
          <div className="relative w-full aspect-square">
            <SafeImage
              src={item.image || item.image_url}
              tokenId={item.tokenId}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <FrameCorners />
          </div>
          <div className="p-3 flex flex-wrap gap-2">
            {shown.map((a) => (
              <Badge key={a.trait_type} variant="outline" className="border-primary/40 text-primary">
                {a.trait_type}: {String(a.value)}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};