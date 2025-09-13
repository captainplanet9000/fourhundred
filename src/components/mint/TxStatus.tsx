import React from "react";

export const TxStatus = ({ status }: { status: string }) => {
  if (!status) return null;
  return <div className="text-sm text-muted-foreground">{status}</div>;
};