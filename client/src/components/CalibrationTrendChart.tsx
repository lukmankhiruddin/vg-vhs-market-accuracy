/**
 * CalibrationTrendChart - Pre-Cal vs Post-Cal Accuracy Trend
 * Shows weekly movement between pre-calibration and post-calibration scores
 * Post-Cal = Pre-Cal + Overturn Count (Audit Errors resolved in favor of MSP)
 * Design: Swiss International Style - clean lines, data-forward
 */

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface CalibrationDataPoint {
  date: string;
  pre_cal: number;
  post_cal: number;
  uplift: number;
  samples: number;
  overturn_count: number;
}

interface CalibrationTrendChartProps {
  data: CalibrationDataPoint[];
  targetAccuracy?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const preCal = payload.find((p: any) => p.dataKey === "pre_cal");
    const postCal = payload.find((p: any) => p.dataKey === "post_cal");
    const uplift = postCal && preCal ? (postCal.value - preCal.value).toFixed(2) : "0.00";
    const dataPoint = payload[0]?.payload;

    return (
      <div className="bg-background border border-border rounded-lg shadow-xl p-3 text-sm min-w-[200px]">
        <div className="font-bold text-foreground mb-2 border-b border-border pb-1">{label}</div>
        {preCal && (
          <div className="flex justify-between gap-4 mb-1">
            <span className="text-blue-500 font-medium">Pre-Cal:</span>
            <span className="font-mono font-bold">{preCal.value.toFixed(2)}%</span>
          </div>
        )}
        {postCal && (
          <div className="flex justify-between gap-4 mb-1">
            <span className="text-emerald-500 font-medium">Post-Cal:</span>
            <span className="font-mono font-bold">{postCal.value.toFixed(2)}%</span>
          </div>
        )}
        <div className="flex justify-between gap-4 mt-2 pt-1 border-t border-border">
          <span className="text-muted-foreground">Uplift:</span>
          <span className={`font-mono font-bold ${parseFloat(uplift) > 0 ? 'text-emerald-500' : 'text-muted-foreground'}`}>
            {parseFloat(uplift) > 0 ? '+' : ''}{uplift}pp
          </span>
        </div>
        {dataPoint?.overturn_count > 0 && (
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Overturns:</span>
            <span className="font-mono font-bold text-amber-500">{dataPoint.overturn_count}</span>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Samples:</span>
          <span className="font-mono">{dataPoint?.samples?.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

export function CalibrationTrendChart({ data, targetAccuracy = 85 }: CalibrationTrendChartProps) {
  const avgPostCal = useMemo(() => {
    if (!data.length) return 0;
    return data.reduce((sum, d) => sum + d.post_cal, 0) / data.length;
  }, [data]);

  const totalOverturns = useMemo(() => data.reduce((sum, d) => sum + d.overturn_count, 0), [data]);
  const totalUplift = useMemo(() => {
    if (!data.length) return 0;
    const first = data[0];
    const last = data[data.length - 1];
    return last.post_cal - first.pre_cal;
  }, [data]);

  // Y-axis domain
  const allValues = data.flatMap(d => [d.pre_cal, d.post_cal]);
  const minVal = Math.max(60, Math.floor(Math.min(...allValues) - 3));
  const maxVal = Math.min(100, Math.ceil(Math.max(...allValues) + 3));

  if (!data.length) return null;

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold uppercase tracking-widest text-muted-foreground">
              Accuracy Trend
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Pre-Calibration vs Post-Calibration weekly movement</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Avg Post-Cal</div>
              <div className="text-lg font-bold font-mono text-emerald-600">{avgPostCal.toFixed(2)}%</div>
            </div>
            {totalOverturns > 0 && (
              <Badge variant="outline" className="text-amber-600 border-amber-400 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                {totalOverturns} overturns
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="upliftGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[minVal, maxVal]}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
              formatter={(value) => {
                if (value === "pre_cal") return <span style={{ color: "#3b82f6" }}>Pre-Cal</span>;
                if (value === "post_cal") return <span style={{ color: "#10b981" }}>Post-Cal</span>;
                if (value === "uplift") return <span style={{ color: "#f59e0b", opacity: 0.7 }}>Calibration Uplift</span>;
                return value;
              }}
            />
            {/* Target line */}
            <ReferenceLine
              y={targetAccuracy}
              stroke="#ef4444"
              strokeDasharray="6 3"
              strokeWidth={1.5}
              label={{ value: `${targetAccuracy}%`, position: "right", fontSize: 11, fill: "#ef4444" }}
            />
            {/* Uplift area between pre and post */}
            <Area
              type="monotone"
              dataKey="post_cal"
              fill="url(#upliftGradient)"
              stroke="transparent"
              legendType="none"
            />
            {/* Pre-Cal line - solid blue */}
            <Line
              type="monotone"
              dataKey="pre_cal"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ fill: "#3b82f6", r: 5, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 7 }}
              label={{ position: "top", fontSize: 10, fill: "#3b82f6", formatter: (v: number) => `${v.toFixed(2)}%` }}
            />
            {/* Post-Cal line - dashed emerald */}
            <Line
              type="monotone"
              dataKey="post_cal"
              stroke="#10b981"
              strokeWidth={2.5}
              strokeDasharray="6 3"
              dot={{ fill: "#10b981", r: 5, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 7 }}
              label={{ position: "bottom", fontSize: 10, fill: "#10b981", formatter: (v: number) => `${v.toFixed(2)}%` }}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Summary row */}
        <div className="grid grid-cols-4 gap-3 mt-4 pt-3 border-t border-border">
          {data.map((d) => (
            <div key={d.date} className="text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">{d.date}</div>
              <div className="flex flex-col gap-0.5">
                <div className="text-xs font-mono text-blue-500">{d.pre_cal.toFixed(2)}%</div>
                <div className="text-xs font-mono font-bold text-emerald-600">{d.post_cal.toFixed(2)}%</div>
                {d.uplift > 0 && (
                  <div className="text-[10px] text-amber-500 font-medium">+{d.uplift.toFixed(2)}pp</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
