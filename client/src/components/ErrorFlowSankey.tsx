/**
 * Error Flow Sankey Diagram
 * Shows flow of errors from categories to markets
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";

interface SankeyNode {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export function ErrorFlowSankey() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Error categories (left side)
  const errorCategories: SankeyNode[] = [
    { id: "NON_VIOLATING", label: "NON_VIOLATING", value: 202, color: "oklch(0.7 0.19 27)" },
    { id: "ADULT_SEXUAL", label: "ADULT_SEXUAL_SOLICITATION", value: 80, color: "oklch(0.65 0.24 350)" },
    { id: "DANGEROUS_ORGS", label: "DANGEROUS_INDIVIDUALS_AND_ORGS", value: 59, color: "oklch(0.6 0.2 30)" },
    { id: "FRAUD", label: "FRAUD_AND_DECEPTION", value: 52, color: "oklch(0.55 0.22 40)" },
    { id: "OTHERS", label: "OTHER CATEGORIES", value: 302, color: "oklch(0.5 0.15 260)" },
  ];

  // Top affected markets (right side) - using markets with most errors
  const affectedMarkets: SankeyNode[] = [
    { id: "ARABIC", label: "ARABIC", value: 123, color: "oklch(0.7 0.19 27)" },
    { id: "TURKISH", label: "TURKISH", value: 78, color: "oklch(0.65 0.24 350)" },
    { id: "GERMAN", label: "GERMAN", value: 68, color: "oklch(0.6 0.2 30)" },
    { id: "INDONESIAN", label: "INDONESIAN", value: 91, color: "oklch(0.55 0.22 40)" },
    { id: "PAKISTAN", label: "PAKISTAN_OTHERS", value: 67, color: "oklch(0.5 0.15 260)" },
    { id: "CHINESE", label: "CHINESE_MANDARIN", value: 66, color: "oklch(0.45 0.18 200)" },
    { id: "OTHER_MARKETS", label: "OTHER MARKETS", value: 202, color: "oklch(0.4 0.12 280)" },
  ];

  // Simulated error flows (in production, this would come from actual data)
  const errorFlows: SankeyLink[] = [
    // NON_VIOLATING flows
    { source: "NON_VIOLATING", target: "ARABIC", value: 45 },
    { source: "NON_VIOLATING", target: "TURKISH", value: 30 },
    { source: "NON_VIOLATING", target: "INDONESIAN", value: 35 },
    { source: "NON_VIOLATING", target: "GERMAN", value: 25 },
    { source: "NON_VIOLATING", target: "OTHER_MARKETS", value: 67 },
    
    // ADULT_SEXUAL flows
    { source: "ADULT_SEXUAL", target: "ARABIC", value: 20 },
    { source: "ADULT_SEXUAL", target: "TURKISH", value: 15 },
    { source: "ADULT_SEXUAL", target: "PAKISTAN", value: 18 },
    { source: "ADULT_SEXUAL", target: "OTHER_MARKETS", value: 27 },
    
    // DANGEROUS_ORGS flows
    { source: "DANGEROUS_ORGS", target: "ARABIC", value: 18 },
    { source: "DANGEROUS_ORGS", target: "GERMAN", value: 12 },
    { source: "DANGEROUS_ORGS", target: "TURKISH", value: 10 },
    { source: "DANGEROUS_ORGS", target: "OTHER_MARKETS", value: 19 },
    
    // FRAUD flows
    { source: "FRAUD", target: "CHINESE", value: 15 },
    { source: "FRAUD", target: "INDONESIAN", value: 20 },
    { source: "FRAUD", target: "OTHER_MARKETS", value: 17 },
    
    // OTHERS flows
    { source: "OTHERS", target: "ARABIC", value: 40 },
    { source: "OTHERS", target: "INDONESIAN", value: 36 },
    { source: "OTHERS", target: "CHINESE", value: 51 },
    { source: "OTHERS", target: "PAKISTAN", value: 49 },
    { source: "OTHERS", target: "GERMAN", value: 31 },
    { source: "OTHERS", target: "TURKISH", value: 23 },
    { source: "OTHERS", target: "OTHER_MARKETS", value: 72 },
  ];

  const totalErrors = 695;
  const leftColumnX = 50;
  const rightColumnX = 650;
  const nodeWidth = 120;
  const nodeHeight = 40;
  const verticalSpacing = 60;

  // Calculate node positions
  const leftNodes = errorCategories.map((node, idx) => ({
    ...node,
    x: leftColumnX,
    y: 50 + idx * verticalSpacing,
  }));

  const rightNodes = affectedMarkets.map((node, idx) => ({
    ...node,
    x: rightColumnX,
    y: 30 + idx * verticalSpacing,
  }));

  // Generate SVG paths for flows
  const generatePath = (
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    sourceHeight: number,
    targetHeight: number
  ) => {
    const sourceMidY = sourceY + sourceHeight / 2;
    const targetMidY = targetY + targetHeight / 2;
    const midX = (sourceX + targetX) / 2;

    return `M ${sourceX + nodeWidth} ${sourceMidY} 
            C ${midX} ${sourceMidY}, ${midX} ${targetMidY}, ${targetX} ${targetMidY}`;
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-lg">Error Flow: Categories → Markets</CardTitle>
        <CardDescription>
          Interactive visualization showing how error categories distribute across markets (4-week data)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full" style={{ height: "500px" }}>
          <svg width="100%" height="500" viewBox="0 0 800 500">
            {/* Draw flow paths */}
            {errorFlows.map((flow, idx) => {
              const sourceNode = leftNodes.find((n) => n.id === flow.source);
              const targetNode = rightNodes.find((n) => n.id === flow.target);
              
              if (!sourceNode || !targetNode) return null;

              const linkId = `${flow.source}-${flow.target}`;
              const isHovered = hoveredLink === linkId;
              const opacity = hoveredLink ? (isHovered ? 0.7 : 0.1) : 0.3;
              const strokeWidth = (flow.value / totalErrors) * 100;

              return (
                <motion.path
                  key={linkId}
                  d={generatePath(
                    sourceNode.x,
                    sourceNode.y,
                    targetNode.x,
                    targetNode.y,
                    nodeHeight,
                    nodeHeight
                  )}
                  fill="none"
                  stroke={sourceNode.color}
                  strokeWidth={Math.max(strokeWidth, 2)}
                  opacity={opacity}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: idx * 0.05 }}
                  onMouseEnter={() => setHoveredLink(linkId)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="cursor-pointer transition-all duration-300"
                  style={{ pointerEvents: "stroke" }}
                >
                  <title>
                    {sourceNode.label} → {targetNode.label}: {flow.value} errors
                  </title>
                </motion.path>
              );
            })}

            {/* Draw left nodes (error categories) */}
            {leftNodes.map((node, idx) => (
              <g key={node.id}>
                <motion.rect
                  x={node.x}
                  y={node.y}
                  width={nodeWidth}
                  height={nodeHeight}
                  fill={node.color}
                  rx={8}
                  initial={{ opacity: 0, x: node.x - 50 }}
                  animate={{ opacity: 1, x: node.x }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                <text
                  x={node.x + nodeWidth / 2}
                  y={node.y + nodeHeight / 2 - 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                  className="pointer-events-none"
                >
                  {node.label.length > 18 ? node.label.substring(0, 16) + "..." : node.label}
                </text>
                <text
                  x={node.x + nodeWidth / 2}
                  y={node.y + nodeHeight / 2 + 10}
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {node.value} errors
                </text>
              </g>
            ))}

            {/* Draw right nodes (markets) */}
            {rightNodes.map((node, idx) => (
              <g key={node.id}>
                <motion.rect
                  x={node.x}
                  y={node.y}
                  width={nodeWidth}
                  height={nodeHeight}
                  fill={node.color}
                  rx={8}
                  initial={{ opacity: 0, x: node.x + 50 }}
                  animate={{ opacity: 1, x: node.x }}
                  transition={{ duration: 0.6, delay: idx * 0.1 + 0.3 }}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                <text
                  x={node.x + nodeWidth / 2}
                  y={node.y + nodeHeight / 2 - 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                  className="pointer-events-none"
                >
                  {node.label}
                </text>
                <text
                  x={node.x + nodeWidth / 2}
                  y={node.y + nodeHeight / 2 + 10}
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {node.value} errors
                </text>
              </g>
            ))}

            {/* Labels */}
            <text x={leftColumnX + nodeWidth / 2} y={25} textAnchor="middle" fontSize="14" fontWeight="bold" fill="oklch(0.552 0.016 285.938)">
              Error Categories
            </text>
            <text x={rightColumnX + nodeWidth / 2} y={25} textAnchor="middle" fontSize="14" fontWeight="bold" fill="oklch(0.552 0.016 285.938)">
              Affected Markets
            </text>
          </svg>

          <div className="mt-4 text-sm text-muted-foreground text-center">
            Hover over flow lines to see error distribution details • Line thickness represents error volume
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
