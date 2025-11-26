import React from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { NFTMetadata } from "@/lib/types";
import { SafeImage } from "@/components/common/SafeImage";

export const TokenCard: React.FC<{ item: NFTMetadata }> = ({ item }) => {
  const keyTraits = ["Breed", "Headwear", "Background"];
  const shown = item.attributes.filter((a) => keyTraits.includes(a.trait_type));

  return (
    <Link
      to={`/token/${item.tokenId}`}
      aria-label={item.name ? `View ${item.name}` : `View Member #${item.tokenId}`}
      className="block"
    >
      <div className="overflow-hidden rounded-lg hover:shadow-lg transition">
        <div className="relative w-full aspect-square">
          <SafeImage
            src={item.image || item.image_url}
            tokenId={item.tokenId}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {shown.length > 0 && (
          <div className="p-2 bg-black/80 flex flex-wrap gap-1">
            {shown.map((a) => (
              <Badge key={a.trait_type} variant="outline" className="border-primary/40 text-primary text-xs">
                {a.trait_type}: {String(a.value)}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};