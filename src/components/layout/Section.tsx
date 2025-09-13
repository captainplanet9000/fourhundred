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
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && (
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};