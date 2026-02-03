/**
 * Market Detail Modal Component
 * Interactive drill-down view for individual market performance
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, TrendingDown, Users } from "lucide-react";
import { motion } from "framer-motion";

interface MarketData {
  market: string;
  vg_accuracy: number;
  vhs_accuracy: number;
  vg_vhs_accuracy: number;
  sample_count: number;
  incorrect_count: number;
}

interface MarketDetailModalProps {
  market: MarketData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MarketDetailModal({ market, isOpen, onClose }: MarketDetailModalProps) {
  if (!market) return null;

  const getStatusBadge = (accuracy: number) => {
    if (accuracy >= 90) return { label: "On Track", variant: "default" as const, color: "bg-chart-3" };
    if (accuracy >= 85) return { label: "At Risk", variant: "secondary" as const, color: "bg-chart-2" };
    return { label: "Critical", variant: "destructive" as const, color: "bg-chart-1" };
  };

  const status = getStatusBadge(market.vg_vhs_accuracy);
  const errorRate = (market.incorrect_count / market.sample_count) * 100;

  // Mock detailed data - in production this would come from API
  const topErrors = [
    { category: "NON_VIOLATING", count: Math.round(market.incorrect_count * 0.36), percentage: 36 },
    { category: "FRAUD_AND_DECEPTION", count: Math.round(market.incorrect_count * 0.15), percentage: 15 },
    { category: "ADULT_SEXUAL_SOLICITATION", count: Math.round(market.incorrect_count * 0.12), percentage: 12 },
    { category: "PORN", count: Math.round(market.incorrect_count * 0.10), percentage: 10 },
    { category: "OTHERS", count: Math.round(market.incorrect_count * 0.27), percentage: 27 },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{market.market}</DialogTitle>
              <DialogDescription className="mt-1">
                Detailed performance analysis for January 2026
              </DialogDescription>
            </div>
            <Badge variant={status.variant} className={`${status.color} text-white`}>
              {status.label}
            </Badge>
          </div>
        </DialogHeader>

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
                    Misclassification of <strong>NON_VIOLATING</strong> content represents the largest 
                    error category, suggesting policy interpretation gaps.
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
                    Current error rate of <strong>{errorRate.toFixed(1)}%</strong> requires 
                    immediate attention to prevent operational bottlenecks.
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Policy Team:</strong> Provide clarified guidance on edge cases specific to 
                    {market.market} cultural context.
                  </p>
                  <p>
                    <strong>Operations:</strong> Allocate additional review time for complex cases to 
                    reduce rushed decisions.
                  </p>
                  <p>
                    <strong>Training:</strong> Develop market-specific training modules addressing the 
                    top 3 error categories identified above.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-sm">Expected Outcome</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  With focused intervention, we project <strong>{market.market}</strong> can achieve 
                  <strong className="text-foreground"> 90%+ accuracy</strong> within 3-4 weeks, 
                  reducing error volume by approximately <strong className="text-foreground">
                  {Math.round(market.incorrect_count * 0.3)}-{Math.round(market.incorrect_count * 0.4)} cases
                  </strong> per period.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
