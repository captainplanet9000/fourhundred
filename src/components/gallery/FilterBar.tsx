"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ALL_SUPPORTED_TRAITS } from "@/lib/metadata";
import { useGalleryStore } from "@/store/gallery-store";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Props = {
  facetCounts: Record<string, Record<string, number>>;
};

export const FilterBar: React.FC<Props> = ({ facetCounts }) => {
  const { search, setSearch, sort, setSort, traits, toggleTrait, clearTrait, reset } =
    useGalleryStore();

  const traitKeys = ALL_SUPPORTED_TRAITS.filter((t) => facetCounts[t]);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by breed..."
        className="max-w-xs"
        aria-label="Search by breed"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-yellow-800/40">
            Traits <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-[60vh] overflow-auto">
          <DropdownMenuLabel>Filter by traits</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {traitKeys.map((trait) => (
            <div key={trait} className="px-2 py-1">
              <div className="font-medium text-sm">{trait}</div>
              {Object.entries(facetCounts[trait])
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([value, count]) => {
                  const active = traits[trait]?.includes(value) ?? false;
                  return (
                    <DropdownMenuCheckboxItem
                      key={value}
                      checked={active}
                      onCheckedChange={() => toggleTrait(trait, value)}
                      className="capitalize"
                    >
                      {value} <span className="ml-auto text-muted-foreground">{count}</span>
                    </DropdownMenuCheckboxItem>
                  );
                })}
              {traits[trait]?.length ? (
                <div className="px-2 pb-2">
                  <Button variant="ghost" size="sm" onClick={() => clearTrait(trait)}>
                    Clear {trait}
                  </Button>
                </div>
              ) : null}
              <DropdownMenuSeparator />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort</span>
        <Button
          variant={sort === "id" ? "default" : "outline"}
          size="sm"
          onClick={() => setSort("id")}
          className={sort === "id" ? "bg-yellow-600 text-black hover:bg-yellow-700" : ""}
        >
          ID
        </Button>
        <Button
          variant={sort === "alpha" ? "default" : "outline"}
          size="sm"
          onClick={() => setSort("alpha")}
          className={sort === "alpha" ? "bg-yellow-600 text-black hover:bg-yellow-700" : ""}
        >
          A–Z
        </Button>
        <Button
          variant={sort === "rarity" ? "default" : "outline"}
          size="sm"
          onClick={() => setSort("rarity")}
          className={sort === "rarity" ? "bg-yellow-600 text-black hover:bg-yellow-700" : ""}
        >
          Rarity
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(traits).flatMap(([trait, values]) =>
          values.map((v) => (
            <Badge key={`${trait}-${v}`} variant="secondary" className="bg-yellow-800/40">
              {trait}: {v}
            </Badge>
          )),
        )}
      </div>

      <div className="md:ml-auto">
        <Button variant="ghost" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
};