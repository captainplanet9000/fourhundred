import React from "react";
import { Button } from "@/components/ui/button";

export const EmptyState = ({ onReset }: { onReset: () => void }) => {
  return (
    <div className="text-center py-20">
      <div className="text-2xl font-semibold">No portraits match your filters</div>
      <p className="text-muted-foreground mt-2">
        Try adjusting filters or clearing the search query.
      </p>
      <Button onClick={onReset} className="mt-6 bg-primary text-primary-foreground hover:brightness-110">
        Reset Filters
      </Button>
    </div>
  );
};