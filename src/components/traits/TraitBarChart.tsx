import React from "react";

export const TraitBarChart: React.FC<{
  title: string;
  data: Record<string, number>;
  total: number;
  onClick?: (value: string) => void;
}> = ({ title, data, total, onClick }) => {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <ul className="space-y-2">
        {entries.map(([label, count]) => {
          const pct = total ? (count / total) * 100 : 0;
          return (
            <li key={label}>
              <button
                className="w-full text-left"
                onClick={() => onClick?.(label)}
                aria-label={`Filter by ${title}: ${label}`}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize">{label}</span>
                  <span className="text-muted-foreground">{count}</span>
                </div>
                <div className="h-2 bg-muted rounded mt-1 overflow-hidden">
                  <div
                    className="h-2"
                    style={{
                      width: `${pct}%`,
                      backgroundImage: "var(--gilded-gradient)",
                    }}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};