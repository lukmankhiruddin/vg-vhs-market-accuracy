/**
 * Interactive Chart Components for VG+VHS Market Accuracy Dashboard
 * Design: Finance-grade interactive visualizations with hover effects
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Sankey, Rectangle } from 'recharts';
import { useState } from 'react';

interface MarketData {
  market: string;
  vg_accuracy: number;
  vhs_accuracy: number;
  vg_vhs_accuracy: number;
  sample_count: number;
  incorrect_count: number;
}

// Custom tooltip for better interactivity
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-4">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold metric-value">{entry.value.toFixed(2)}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomTooltipCount = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-4">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold metric-value">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Animated Bar Chart for Market Accuracy Comparison
export function MarketAccuracyBarChart({ data }: { data: MarketData[] }) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const chartData = data
    .sort((a, b) => a.vg_vhs_accuracy - b.vg_vhs_accuracy)
    .map(m => ({
      market: m.market,
      'VG+VHS+ Accuracy': m.vg_vhs_accuracy,
      'VG Accuracy': m.vg_accuracy,
      'VHS+ Accuracy': m.vhs_accuracy,
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Accuracy Comparison</CardTitle>
        <CardDescription>Hover over bars to see detailed breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.005 220)" />
            <XAxis 
              dataKey="market" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar 
              dataKey="VG+VHS+ Accuracy" 
              fill="oklch(0.45 0.12 220)"
              radius={[4, 4, 0, 0]}
              onMouseEnter={(data) => setHoveredBar(data.market)}
              onMouseLeave={() => setHoveredBar(null)}
              opacity={hoveredBar ? 0.6 : 1}
            />
            <Bar 
              dataKey="VG Accuracy" 
              fill="oklch(0.65 0.18 145)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="VHS+ Accuracy" 
              fill="oklch(0.75 0.15 60)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Radar Chart for Multi-dimensional Market Performance
export function MarketPerformanceRadar({ data }: { data: MarketData[] }) {
  const radarData = data.slice(0, 6).map(m => ({
    market: m.market,
    'VG Accuracy': m.vg_accuracy,
    'VHS+ Accuracy': m.vhs_accuracy,
    'VG+VHS+ Accuracy': m.vg_vhs_accuracy,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Performance Radar</CardTitle>
        <CardDescription>Multi-dimensional accuracy view (top 6 markets)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="oklch(0.88 0.005 220)" />
            <PolarAngleAxis dataKey="market" tick={{ fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
            <Radar 
              name="VG Accuracy" 
              dataKey="VG Accuracy" 
              stroke="oklch(0.65 0.18 145)" 
              fill="oklch(0.65 0.18 145)" 
              fillOpacity={0.3}
            />
            <Radar 
              name="VHS+ Accuracy" 
              dataKey="VHS+ Accuracy" 
              stroke="oklch(0.75 0.15 60)" 
              fill="oklch(0.75 0.15 60)" 
              fillOpacity={0.3}
            />
            <Radar 
              name="VG+VHS+ Accuracy" 
              dataKey="VG+VHS+ Accuracy" 
              stroke="oklch(0.45 0.12 220)" 
              fill="oklch(0.45 0.12 220)" 
              fillOpacity={0.5}
            />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Error Distribution Pie Chart
export function ErrorDistributionPie() {
  const errorData = [
    { name: 'NON_VIOLATING', value: 50, color: 'oklch(0.65 0.24 27)' },
    { name: 'FRAUD_AND_DECEPTION', value: 14, color: 'oklch(0.75 0.15 60)' },
    { name: 'ADULT_SEXUAL_SOLICITATION', value: 13, color: 'oklch(0.55 0.15 30)' },
    { name: 'PORN', value: 11, color: 'oklch(0.65 0.12 340)' },
    { name: 'DANGEROUS_INDIVIDUALS', value: 10, color: 'oklch(0.55 0.12 260)' },
    { name: 'OTHERS', value: 42, color: 'oklch(0.70 0.08 220)' },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Distribution by Category</CardTitle>
        <CardDescription>Interactive breakdown of 140 total errors</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={errorData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={activeIndex !== null ? 100 : 90}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {errorData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltipCount />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Sample Volume vs Accuracy Scatter
export function SampleVolumeAccuracyChart({ data }: { data: MarketData[] }) {
  const scatterData = data.map(m => ({
    market: m.market,
    samples: m.sample_count,
    accuracy: m.vg_vhs_accuracy,
    errors: m.incorrect_count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample Volume vs Accuracy</CardTitle>
        <CardDescription>Bubble size represents error count</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={scatterData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.005 220)" />
            <XAxis 
              dataKey="market" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12 }}
              label={{ value: 'Sample Count', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              label={{ value: 'Accuracy (%)', angle: 90, position: 'insideRight' }}
            />
            <Tooltip content={<CustomTooltipCount />} />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="samples" 
              fill="oklch(0.70 0.08 220)"
              name="Sample Count"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              yAxisId="right"
              dataKey="accuracy" 
              fill="oklch(0.65 0.18 145)"
              name="Accuracy (%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Trend Line Chart (Weekly)
export function WeeklyTrendChart() {
  const trendData = [
    { week: 'Week 1 (Jan 2-8)', accuracy: 83.13, samples: 1150, errors: 194 },
    { week: 'Week 2 (Jan 9-15)', accuracy: 84.92, samples: 1253, errors: 189 },
    { week: 'Week 3 (Jan 16-22)', accuracy: 85.03, samples: 1149, errors: 172 },
    { week: 'Week 4 (Jan 23-29)', accuracy: 87.13, samples: 1088, errors: 140 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Accuracy Trend</CardTitle>
        <CardDescription>January 2026 performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.005 220)" />
            <XAxis dataKey="week" />
            <YAxis domain={[85, 89]} tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="accuracy" 
              stroke="oklch(0.45 0.12 220)" 
              strokeWidth={3}
              dot={{ r: 6, fill: 'oklch(0.45 0.12 220)' }}
              activeDot={{ r: 8 }}
              name="Accuracy (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Vendor Performance Comparison
export function VendorPerformanceChart() {
  const vendorData = [
    { vendor: 'CPL', accuracy: 84.22, samples: 2757, errors: 435 },
    { vendor: 'Accenture_NA', accuracy: 86.69, samples: 1623, errors: 216 },
    { vendor: 'Accenture', accuracy: 83.08, samples: 260, errors: 44 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Performance Comparison</CardTitle>
        <CardDescription>Accuracy and volume by organization</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={vendorData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.005 220)" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="vendor" type="category" width={120} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="accuracy" 
              fill="oklch(0.45 0.12 220)"
              name="Accuracy (%)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
