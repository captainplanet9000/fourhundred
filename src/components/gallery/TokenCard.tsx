import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { NFTMetadata } from "@/lib/types";
import { SafeImage } from "@/components/common/SafeImage";

export const TokenCard: React.FC<{ item: NFTMetadata }> = ({ item }) => {
  const keyTraits = ["Breed", "Headwear", "Background"];
  const shown = item.attributes.filter((a) => keyTraits.includes(a.trait_type));

  return (
    <Link to={`/token/${item.tokenId}`} aria-label={`View token #${item.tokenId}`}>
      <Card className="overflow-hidden hover:shadow-lg transition border border-primary/30 hover:border-primary/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center justify-between">
            <span>#{item.tokenId}</span>
            {item.rarity_rank !== undefined && (
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                Rank {item.rarity_rank}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <SafeImage
            src={item.image || item.image_url}
            tokenId={item.tokenId}
            alt={item.name}
            className="w-full aspect-square object-cover"
            loading="lazy"
          />
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