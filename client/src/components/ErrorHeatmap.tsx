import { useState } from "react";
import { motion } from "framer-motion";

interface HeatmapCell {
  market: string;
  category: string;
  count: number;
}

export function ErrorHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);

  // Data from analysis: 11 markets x 6 top error categories
  const heatmapData: HeatmapCell[] = [
    { market: "ARABIC", category: "DOI_REFERENCES_TERRORISM", count: 4 },
    { market: "ARABIC", category: "DOI_SUPPORT_TERRORISM", count: 3 },
    { market: "ARABIC", category: "NON_VIOLATING", count: 36 },
    { market: "ARABIC", category: "PROFANITY", count: 1 },
    { market: "ARABIC", category: "PROSTITUTION", count: 0 },
    { market: "ARABIC", category: "SEXUAL_SOLICITATION", count: 5 },
    { market: "CHINESE_MANDARIN", category: "DOI_REFERENCES_TERRORISM", count: 3 },
    { market: "CHINESE_MANDARIN", category: "DOI_SUPPORT_TERRORISM", count: 2 },
    { market: "CHINESE_MANDARIN", category: "NON_VIOLATING", count: 14 },
    { market: "CHINESE_MANDARIN", category: "PROFANITY", count: 1 },
    { market: "CHINESE_MANDARIN", category: "PROSTITUTION", count: 1 },
    { market: "CHINESE_MANDARIN", category: "SEXUAL_SOLICITATION", count: 2 },
    { market: "GERMAN", category: "DOI_REFERENCES_TERRORISM", count: 2 },
    { market: "GERMAN", category: "DOI_SUPPORT_TERRORISM", count: 1 },
    { market: "GERMAN", category: "NON_VIOLATING", count: 18 },
    { market: "GERMAN", category: "PROFANITY", count: 2 },
    { market: "GERMAN", category: "PROSTITUTION", count: 1 },
    { market: "GERMAN", category: "SEXUAL_SOLICITATION", count: 3 },
    { market: "HUNGARIAN", category: "DOI_REFERENCES_TERRORISM", count: 1 },
    { market: "HUNGARIAN", category: "DOI_SUPPORT_TERRORISM", count: 1 },
    { market: "HUNGARIAN", category: "NON_VIOLATING", count: 8 },
    { market: "HUNGARIAN", category: "PROFANITY", count: 1 },
    { market: "HUNGARIAN", category: "PROSTITUTION", count: 1 },
    { market: "HUNGARIAN", category: "SEXUAL_SOLICITATION", count: 2 },
    { market: "INDONESIAN", category: "DOI_REFERENCES_TERRORISM", count: 3 },
    { market: "INDONESIAN", category: "DOI_SUPPORT_TERRORISM", count: 4 },
    { market: "INDONESIAN", category: "NON_VIOLATING", count: 22 },
    { market: "INDONESIAN", category: "PROFANITY", count: 2 },
    { market: "INDONESIAN", category: "PROSTITUTION", count: 3 },
    { market: "INDONESIAN", category: "SEXUAL_SOLICITATION", count: 5 },
    { market: "MAGHREB", category: "DOI_REFERENCES_TERRORISM", count: 2 },
    { market: "MAGHREB", category: "DOI_SUPPORT_TERRORISM", count: 2 },
    { market: "MAGHREB", category: "NON_VIOLATING", count: 11 },
    { market: "MAGHREB", category: "PROFANITY", count: 1 },
    { market: "MAGHREB", category: "PROSTITUTION", count: 1 },
    { market: "MAGHREB", category: "SEXUAL_SOLICITATION", count: 3 },
    { market: "MALAY", category: "DOI_REFERENCES_TERRORISM", count: 1 },
    { market: "MALAY", category: "DOI_SUPPORT_TERRORISM", count: 1 },
    { market: "MALAY", category: "NON_VIOLATING", count: 9 },
    { market: "MALAY", category: "PROFANITY", count: 1 },
    { market: "MALAY", category: "PROSTITUTION", count: 1 },
    { market: "MALAY", category: "SEXUAL_SOLICITATION", count: 2 },
    { market: "PAKISTAN_OTHERS", category: "DOI_REFERENCES_TERRORISM", count: 2 },
    { market: "PAKISTAN_OTHERS", category: "DOI_SUPPORT_TERRORISM", count: 3 },
    { market: "PAKISTAN_OTHERS", category: "NON_VIOLATING", count: 16 },
    { market: "PAKISTAN_OTHERS", category: "PROFANITY", count: 2 },
    { market: "PAKISTAN_OTHERS", category: "PROSTITUTION", count: 2 },
    { market: "PAKISTAN_OTHERS", category: "SEXUAL_SOLICITATION", count: 4 },
    { market: "RUSSIAN", category: "DOI_REFERENCES_TERRORISM", count: 2 },
    { market: "RUSSIAN", category: "DOI_SUPPORT_TERRORISM", count: 2 },
    { market: "RUSSIAN", category: "NON_VIOLATING", count: 10 },
    { market: "RUSSIAN", category: "PROFANITY", count: 2 },
    { market: "RUSSIAN", category: "PROSTITUTION", count: 2 },
    { market: "RUSSIAN", category: "SEXUAL_SOLICITATION", count: 3 },
    { market: "TURKISH", category: "DOI_REFERENCES_TERRORISM", count: 3 },
    { market: "TURKISH", category: "DOI_SUPPORT_TERRORISM", count: 3 },
    { market: "TURKISH", category: "NON_VIOLATING", count: 24 },
    { market: "TURKISH", category: "PROFANITY", count: 2 },
    { market: "TURKISH", category: "PROSTITUTION", count: 3 },
    { market: "TURKISH", category: "SEXUAL_SOLICITATION", count: 5 },
    { market: "UKRAINIAN", category: "DOI_REFERENCES_TERRORISM", count: 1 },
    { market: "UKRAINIAN", category: "DOI_SUPPORT_TERRORISM", count: 1 },
    { market: "UKRAINIAN", category: "NON_VIOLATING", count: 34 },
    { market: "UKRAINIAN", category: "PROFANITY", count: 3 },
    { market: "UKRAINIAN", category: "PROSTITUTION", count: 4 },
    { market: "UKRAINIAN", category: "SEXUAL_SOLICITATION", count: 7 },
  ];

  const markets = ["ARABIC", "CHINESE_MANDARIN", "GERMAN", "HUNGARIAN", "INDONESIAN", "MAGHREB", "MALAY", "PAKISTAN_OTHERS", "RUSSIAN", "TURKISH", "UKRAINIAN"];
  const categories = ["NON_VIOLATING", "SEXUAL_SOLICITATION", "DOI_REFERENCES_TERRORISM", "DOI_SUPPORT_TERRORISM", "PROSTITUTION", "PROFANITY"];
  const maxValue = 36;

  const getColorIntensity = (count: number) => {
    if (count === 0) return "bg-muted/30";
    const intensity = Math.min(count / maxValue, 1);
    if (intensity < 0.2) return "bg-red-100 dark:bg-red-950/30";
    if (intensity < 0.4) return "bg-red-200 dark:bg-red-900/40";
    if (intensity < 0.6) return "bg-red-300 dark:bg-red-800/50";
    if (intensity < 0.8) return "bg-red-400 dark:bg-red-700/60";
    return "bg-red-500 dark:bg-red-600/70";
  };

  const getCellData = (market: string, category: string) => {
    return heatmapData.find(d => d.market === market && d.category === category) || { market, category, count: 0 };
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Error Type Distribution Across Markets</h3>
        <p className="text-sm text-muted-foreground">
          Heatmap showing error concentration by market and category. Darker red indicates higher error counts.
        </p>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Header Row */}
          <div className="flex mb-8">
            <div className="w-40 flex-shrink-0" /> {/* Market name column spacer */}
            {categories.map((category) => (
              <div key={category} className="flex-1 min-w-[100px] px-2">
                <div className="h-20 flex items-end">
                  <div className="text-xs font-semibold text-foreground transform -rotate-45 origin-bottom-left whitespace-nowrap">
                    {category.replace(/_/g, ' ')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {markets.map((market, marketIdx) => (
            <motion.div
              key={market}
              className="flex items-center mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: marketIdx * 0.05 }}
            >
              {/* Market Name */}
              <div className="w-40 flex-shrink-0 pr-4">
                <div className="text-sm font-medium truncate">{market}</div>
              </div>

              {/* Cells */}
              {categories.map((category) => {
                const cellData = getCellData(market, category);
                const isHovered = hoveredCell?.market === market && hoveredCell?.category === category;

                return (
                  <div key={`${market}-${category}`} className="flex-1 min-w-[100px] px-2">
                    <motion.div
                      className={`h-12 rounded flex items-center justify-center cursor-pointer transition-all ${getColorIntensity(cellData.count)} ${
                        isHovered ? 'ring-2 ring-primary scale-105' : ''
                      }`}
                      onMouseEnter={() => setHoveredCell(cellData)}
                      onMouseLeave={() => setHoveredCell(null)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-sm font-bold">{cellData.count > 0 ? cellData.count : ''}</span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-popover border rounded-lg"
        >
          <div className="text-sm">
            <span className="font-semibold">{hoveredCell.market}</span>
            {" • "}
            <span className="text-muted-foreground">{hoveredCell.category.replace(/_/g, ' ')}</span>
          </div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400 mt-1">
            {hoveredCell.count} errors
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
        <span>Error Intensity:</span>
        <div className="flex items-center gap-1">
          <div className="w-8 h-4 bg-muted/30 rounded" />
          <span>0</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-8 h-4 bg-red-200 dark:bg-red-900/40 rounded" />
          <span>Low</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-8 h-4 bg-red-400 dark:bg-red-700/60 rounded" />
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-8 h-4 bg-red-500 dark:bg-red-600/70 rounded" />
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
