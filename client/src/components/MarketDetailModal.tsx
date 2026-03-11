/**
 * Market Detail Modal Component
 * Interactive drill-down view for individual market performance
 */

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, TrendingDown, Users } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { marketInsights } from "@/data/marketInsights";

interface MarketData {
  market: string;
  vg_accuracy: number;
  vhs_accuracy: number;
  vg_vhs_accuracy: number;
  sample_count: number;
  incorrect_count: number;
  weekly_trend?: (number | null)[];
}

interface MarketDetailModalProps {
  market: MarketData | null;
  isOpen: boolean;
  onClose: () => void;
  period?: string; // 'jan2026' | 'feb2026'
  calibrationData?: {
    weeks: string[];
    preCal: (number | null)[];
    postCal: (number | null)[];
    totalOverturns: number;
    avgPostCal: number;
  } | null;
}

export function MarketDetailModal({ market, isOpen, onClose, period, calibrationData }: MarketDetailModalProps) {
  if (!market) return null;

  const getStatusBadge = (accuracy: number) => {
    if (accuracy >= 85) return { label: "On Track", variant: "default" as const, color: "bg-chart-3" };
    if (accuracy >= 80) return { label: "At Risk", variant: "secondary" as const, color: "bg-chart-2" };
    return { label: "Critical", variant: "destructive" as const, color: "bg-chart-1" };
  };

  const status = getStatusBadge(market.vg_vhs_accuracy);
  const errorRate = (market.incorrect_count / market.sample_count) * 100;

  // Get market-specific insights from data analysis
  const insight = marketInsights[market.market];
  
  // Use real error data from analysis
  const topErrors = insight ? insight.topErrors.map(e => ({
    category: e.category,
    count: e.count,
    percentage: Math.round((e.count / insight.totalErrors) * 100)
  })) : [
    { category: "NON_VIOLATING", count: Math.round(market.incorrect_count * 0.36), percentage: 36 },
    { category: "FRAUD_AND_DECEPTION", count: Math.round(market.incorrect_count * 0.15), percentage: 15 },
    { category: "ADULT_SEXUAL_SOLICITATION", count: Math.round(market.incorrect_count * 0.12), percentage: 12 },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{market.market}</DialogTitle>
              <DialogDescription className="mt-1">
                Detailed performance analysis for {period === 'feb2026' ? 'February 2026' : 'January 2026'}
              </DialogDescription>
            </div>
            <Badge variant={status.variant} className={`${status.color} text-white`}>
              {status.label}
            </Badge>
          </div>
        </DialogHeader>

        {/* Pre-Cal vs Post-Cal Calibration Chart — February only */}
        {period === 'feb2026' && calibrationData && (
          <Card className="mt-4 border-blue-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Pre-Cal vs Post-Cal Accuracy Trend</CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Weekly calibration uplift from dispute resolutions. Post-Cal = Pre-Cal + Overturned errors (Audit Errors resolved in MSP's favour).
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Avg Post-Cal</div>
                  <div className="text-xl font-bold text-blue-600">{calibrationData.avgPostCal.toFixed(2)}%</div>
                  <div className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                    ↑ {calibrationData.totalOverturns} overturns
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={calibrationData.weeks.map((w, i) => ({
                  week: w,
                  preCal: calibrationData.preCal[i],
                  postCal: calibrationData.postCal[i],
                }))}>
                  <XAxis dataKey="week" stroke="oklch(0.552 0.016 285.938)" fontSize={11} />
                  <YAxis domain={[80, 100]} stroke="oklch(0.552 0.016 285.938)" fontSize={11} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }}
                    formatter={(value: number, name: string) => [`${value?.toFixed(2)}%`, name === 'preCal' ? 'Pre-Cal' : 'Post-Cal']}
                  />
                  <ReferenceLine y={85} stroke="#ef4444" strokeDasharray="4 4" label={{ value: '85%', position: 'right', fontSize: 10, fill: '#ef4444' }} />
                  <Line type="monotone" dataKey="preCal" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} name="preCal" connectNulls={false} />
                  <Line type="monotone" dataKey="postCal" stroke="#10b981" strokeWidth={2} strokeDasharray="5 3" dot={{ fill: '#10b981', r: 4 }} name="postCal" connectNulls={false} />
                </LineChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div className="flex items-center gap-6 mt-2 justify-center text-xs">
                <div className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-blue-500 inline-block"></span><span>Pre-Cal</span></div>
                <div className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-emerald-500 inline-block border-dashed border-t-2 border-emerald-500"></span><span>Post-Cal</span></div>
              </div>
              {/* Weekly breakdown */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {calibrationData.weeks.map((w, i) => {
                  const pre = calibrationData.preCal[i];
                  const post = calibrationData.postCal[i];
                  const uplift = (pre !== null && post !== null) ? post - pre : null;
                  return (
                    <div key={w} className="text-center p-2 bg-muted rounded">
                      <div className="text-xs text-muted-foreground mb-1">{w}</div>
                      {pre !== null ? (
                        <>
                          <div className="text-sm font-medium text-blue-600">{pre.toFixed(2)}%</div>
                          <div className="text-sm font-bold text-emerald-600">{post?.toFixed(2)}%</div>
                          {uplift !== null && uplift > 0 && (
                            <div className="text-xs text-amber-600 font-medium">+{uplift.toFixed(2)}pp</div>
                          )}
                        </>
                      ) : (
                        <div className="text-xs text-muted-foreground italic">N/A</div>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic">
                Note: Calibration uplift shown is team-level. Market-level dispute breakdown requires full SQL export from dim_qer_audit_disputes_sheet.
              </p>
            </CardContent>
          </Card>
        )}

        {/* 4-Week Trend Sparkline */}
        {market.weekly_trend && market.weekly_trend.some(v => v !== null) && (() => {
          const validTrend = market.weekly_trend!;
          const validValues = validTrend.filter(v => v !== null) as number[];
          const firstVal = validValues[0];
          const lastVal = validValues[validValues.length - 1];
          const chartData = validTrend.map((v, i) => ({ week: `W${i+1}`, accuracy: v }));
          return (
          <Card className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">4-Week Performance Trend</CardTitle>
              <CardDescription>
                Weekly accuracy progression (Post-Cal) • {lastVal > firstVal ? '📈 Improving' : lastVal < firstVal ? '📉 Declining' : '➡️ Stable'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={chartData}>
                  <XAxis dataKey="week" stroke="oklch(0.552 0.016 285.938)" fontSize={12} />
                  <YAxis domain={[60, 100]} stroke="oklch(0.552 0.016 285.938)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'oklch(1 0 0)', 
                      border: '1px solid oklch(0.92 0.004 286.32)',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value.toFixed(2)}%`, 'Accuracy']}
                  />
                  <ReferenceLine y={85} stroke="oklch(0.65 0.24 142)" strokeDasharray="3 3" label={{ value: 'Target 85%', position: 'right', fontSize: 11 }} />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="oklch(0.623 0.214 259.815)" 
                    strokeWidth={3}
                    dot={{ fill: 'oklch(0.623 0.214 259.815)', r: 5 }}
                    activeDot={{ r: 7 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {validTrend.map((acc, idx) => (
                  <div key={idx} className="text-center p-2 bg-muted rounded">
                    <div className="text-xs text-muted-foreground mb-1">Week {idx + 1}</div>
                    {acc !== null ? (
                      <div className={`text-lg font-bold ${ acc >= 85 ? 'text-chart-3' : acc >= 80 ? 'text-chart-2' : 'text-chart-1'}`}>
                        {acc.toFixed(1)}%
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground italic">N/A</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          );
        })()}

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="errors">Error Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Overall Accuracy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold metric-value text-primary">
                      {market.vg_vhs_accuracy.toFixed(2)}%
                    </div>
                    <Progress value={market.vg_vhs_accuracy} className="mt-3" />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Sample Volume
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold metric-value">
                      {market.sample_count.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {market.incorrect_count} errors ({errorRate.toFixed(1)}% error rate)
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Accuracy Breakdown</CardTitle>
                <CardDescription>Performance across different metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">VG Accuracy</span>
                    <span className="text-sm metric-value font-bold">{market.vg_accuracy.toFixed(2)}%</span>
                  </div>
                  <Progress value={market.vg_accuracy} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">VHS+ Accuracy</span>
                    <span className="text-sm metric-value font-bold">{market.vhs_accuracy.toFixed(2)}%</span>
                  </div>
                  <Progress value={market.vhs_accuracy} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">VG+VHS+ Combined</span>
                    <span className="text-sm metric-value font-bold">{market.vg_vhs_accuracy.toFixed(2)}%</span>
                  </div>
                  <Progress value={market.vg_vhs_accuracy} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Error Distribution</CardTitle>
                <CardDescription>
                  Top error categories contributing to {market.incorrect_count} total misclassifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topErrors.map((error, index) => (
                    <motion.div
                      key={error.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{error.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{error.count} errors</span>
                          <Badge variant="outline" className="metric-value">
                            {error.percentage}%
                          </Badge>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-chart-1"
                          initial={{ width: 0 }}
                          animate={{ width: `${error.percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-chart-1">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Primary Issue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    {insight ? (
                      <>
                        <strong>{insight.topErrors[0].category}</strong> errors ({insight.topErrors[0].count} cases) 
                        represent the primary challenge{insight.highSeverityCount > 0 && `, with ${insight.highSeverityCount} high-severity cases requiring immediate attention`}.
                      </>
                    ) : (
                      <>Misclassification of <strong>NON_VIOLATING</strong> content represents the largest error category, suggesting policy interpretation gaps.</>
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-chart-2">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingDown className="h-4 w-4" />
                    Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    {insight ? (
                      <>
                        {insight.trend === 'improving' ? '📈 Improving trend' : insight.trend === 'declining' ? '📉 Declining trend' : insight.trend === 'volatile' ? '⚠️ Volatile performance' : '➡️ Stable'} 
                        ({insight.improvement > 0 ? '+' : ''}{insight.improvement.toFixed(2)}pp W1→W4)
                        {insight.lowSample && ' • Low sample size limits reliability'}
                      </>
                    ) : (
                      <>Current error rate of <strong>{errorRate.toFixed(1)}%</strong> requires immediate attention to prevent operational bottlenecks.</>
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4 mt-4">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Immediate Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {insight ? (
                  <ul className="space-y-3">
                    {insight.immediateActions.map((action, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-primary font-bold">{idx + 1}.</span>
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">1.</span>
                      <span className="text-sm">
                        Schedule targeted training session for <strong>{market.market}</strong> reviewers 
                        focusing on NON_VIOLATING content baseline identification.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">2.</span>
                      <span className="text-sm">
                        Implement weekly calibration exercises with ground truth examples from this market's 
                        most common error patterns.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">3.</span>
                      <span className="text-sm">
                        Increase QA sampling rate to 15% for the next 2 weeks to monitor improvement trajectory.
                      </span>
                    </li>
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="text-base">What's Happening</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {insight ? insight.whatHappening : `${market.market} is currently at ${market.vg_vhs_accuracy.toFixed(2)}% accuracy with ${market.incorrect_count} total errors across ${market.sample_count} samples.`}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 dark:bg-amber-950/20">
              <CardHeader>
                <CardTitle className="text-base">Why It's Happening</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {insight ? insight.whyHappening : `Error patterns suggest policy interpretation challenges, particularly around ${topErrors[0].category} classification.`}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-sm">Expected Outcome</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {insight ? insight.expectedOutcome : `With focused intervention, we project ${market.market} can achieve 85%+ accuracy within 3-4 weeks, reducing error volume by approximately ${Math.round(market.incorrect_count * 0.3)}-${Math.round(market.incorrect_count * 0.4)} cases per period.`}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
