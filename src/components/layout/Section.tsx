import React from "react";

type Props = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export const Section: React.FC<Props> = ({ id, title, subtitle, children, className = "" }) => {
  return (
    <section id={id} className={`py-10 sm:py-14 md:py-20 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent px-4 sm:px-0">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-0">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};