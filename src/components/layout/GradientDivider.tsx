import React from "react";

export const GradientDivider = () => {
  return (
    <div
      className="h-[2px] w-full my-8 md:my-12 opacity-80"
      style={{ backgroundImage: "var(--gilded-gradient)" }}
    />
  );
};