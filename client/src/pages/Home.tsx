/**
 * VG+VHS Market Accuracy Executive Dashboard - Interactive Version
 * Design: Swiss International Style with finance-grade interactivity
 * Features: Animated metrics, interactive charts, drill-down modals, hover effects
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, TrendingDown, Target, Users, BarChart3, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedMetricCard, AnimatedProgressBar } from "@/components/AnimatedMetricCard";
import { 
  WeeklyTrendChart,
  VendorPerformanceChart
} from "@/components/InteractiveCharts";
import { MarketDetailModal } from "@/components/MarketDetailModal";
import { TopCriticalIssues } from "@/components/TopCriticalIssues";
import { toast } from "sonner";

interface MarketData {
  market: string;
  vg_accuracy: number;
  vhs_accuracy: number;
  vg_vhs_accuracy: number;
  sample_count: number;
  incorrect_count: number;
  weekly_trend?: number[]; // W1, W2, W3, W4 accuracy percentages
  avg_sample: number; // 4-week average sample count
}

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('jan2026');
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<MarketData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredMarket, setHoveredMarket] = useState<string | null>(null);

  // Period definitions
  const periods = {
    jan2026: {
      label: 'January 2026',
      dateRange: 'Jan 2-29, 2026',
      overallAccuracy: 85.02,
      totalSamples: 4640,
      totalErrors: 695,
      data: [
        { market: "ARABIC", vg_accuracy: 73.95, vhs_accuracy: 73.95, vg_vhs_accuracy: 73.95, sample_count: 476, incorrect_count: 123, weekly_trend: [72.36, 69.47, 76.69, 78.65], avg_sample: 119 },
        { market: "CHINESE_MANDARIN", vg_accuracy: 85.40, vhs_accuracy: 85.40, vg_vhs_accuracy: 85.40, sample_count: 459, incorrect_count: 66, weekly_trend: [89.68, 85.09, 81.31, 84.82], avg_sample: 115 },
        { market: "GERMAN", vg_accuracy: 83.17, vhs_accuracy: 83.17, vg_vhs_accuracy: 83.17, sample_count: 404, incorrect_count: 68, weekly_trend: [86.21, 81.25, 84.11, 81.63], avg_sample: 101 },
        { market: "HUNGARIAN", vg_accuracy: 88.15, vhs_accuracy: 88.15, vg_vhs_accuracy: 88.15, sample_count: 287, incorrect_count: 34, weekly_trend: [88.14, 92.41, 82.43, 89.33], avg_sample: 72 },
        { market: "INDONESIAN", vg_accuracy: 86.94, vhs_accuracy: 86.94, vg_vhs_accuracy: 86.94, sample_count: 697, incorrect_count: 91, weekly_trend: [85.81, 86.96, 91.10, 84.66], avg_sample: 174 },
        { market: "MAGHREB", vg_accuracy: 90.04, vhs_accuracy: 90.04, vg_vhs_accuracy: 90.04, sample_count: 452, incorrect_count: 44, weekly_trend: [87.18, 91.18, 89.80, 92.08], avg_sample: 113 },
        { market: "MALAY", vg_accuracy: 85.53, vhs_accuracy: 85.53, vg_vhs_accuracy: 85.53, sample_count: 235, incorrect_count: 34, weekly_trend: [87.10, 74.60, 89.47, 92.45], avg_sample: 59 },
        { market: "PAKISTAN_OTHERS", vg_accuracy: 86.18, vhs_accuracy: 86.18, vg_vhs_accuracy: 86.18, sample_count: 492, incorrect_count: 67, weekly_trend: [80.28, 89.76, 88.46, 87.10], avg_sample: 123 },
        { market: "RUSSIAN", vg_accuracy: 89.22, vhs_accuracy: 89.22, vg_vhs_accuracy: 89.22, sample_count: 371, incorrect_count: 40, weekly_trend: [90.00, 88.73, 84.68, 93.94], avg_sample: 93 },
        { market: "TURKISH", vg_accuracy: 81.76, vhs_accuracy: 81.76, vg_vhs_accuracy: 81.76, sample_count: 433, incorrect_count: 78, weekly_trend: [71.88, 85.48, 78.10, 89.81], avg_sample: 108 },
        { market: "UKRAINIAN", vg_accuracy: 86.53, vhs_accuracy: 86.53, vg_vhs_accuracy: 86.53, sample_count: 334, incorrect_count: 45, weekly_trend: [79.57, 87.64, 91.36, 88.73], avg_sample: 84 },
      ]
    },
    feb2026: {
      label: 'February 2026',
      dateRange: 'Feb 1-28, 2026',
      overallAccuracy: 0, // To be updated with February data
      totalSamples: 0,
      totalErrors: 0,
      data: [] // To be populated with February data
    }
  };

  useEffect(() => {
    // Load data for selected period
    const currentPeriod = periods[selectedPeriod as keyof typeof periods];
    setMarketData(currentPeriod.data);
  }, [selectedPeriod]);

  // Get current period data
  const currentPeriod = periods[selectedPeriod as keyof typeof periods];
  const overallAccuracy = currentPeriod.overallAccuracy;
  const targetAccuracy = 85;
  const totalSamples = currentPeriod.totalSamples;
  const totalErrors = currentPeriod.totalErrors;
  const marketsAtRisk = marketData.filter(m => m.vg_vhs_accuracy < 85).length;
  const marketsOnTrack = marketData.filter(m => m.vg_vhs_accuracy >= 85).length;
  const totalMarkets = marketData.length;
  
  // Calculate biggest improver from weekly trends
  const biggestImprover = marketData.length > 0 ? marketData.reduce((best, current) => {
    if (!current.weekly_trend || current.weekly_trend.length < 2) return best;
    const currentImprovement = current.weekly_trend[current.weekly_trend.length - 1] - current.weekly_trend[0];
    if (!best.weekly_trend || best.weekly_trend.length < 2) return current;
    const bestImprovement = best.weekly_trend[best.weekly_trend.length - 1] - best.weekly_trend[0];
    return currentImprovement > bestImprovement ? current : best;
  }, marketData[0]) : null;
  
  const biggestImproverGain = biggestImprover && biggestImprover.weekly_trend && biggestImprover.weekly_trend.length >= 2
    ? biggestImprover.weekly_trend[biggestImprover.weekly_trend.length - 1] - biggestImprover.weekly_trend[0]
    : 0;
  
  // Check if current period has data
  const hasData = marketData.length > 0 && totalSamples > 0;

  const handleMarketClick = (market: MarketData) => {
    setSelectedMarket(market);
    setIsModalOpen(true);
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 85) return "text-chart-3"; // Green - at or above target
    if (accuracy >= 80) return "text-chart-2"; // Amber - approaching target
    return "text-chart-1"; // Red - critical
  };

  const getAccuracyBgColor = (accuracy: number) => {
    if (accuracy >= 85) return "bg-chart-3"; // Green - at or above target
    if (accuracy >= 80) return "bg-chart-2"; // Amber - approaching target
    return "bg-chart-1"; // Red - critical
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/80">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold tracking-tight">VG+VHS Market Accuracy</h1>
                <Badge variant="secondary" className="text-xs">
                  Melissa Rose's QER Team
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-muted-foreground">4-Week Performance Review • {currentPeriod.label}</p>
                <span className="text-muted-foreground">•</span>
                <a 
                  href="https://docs.google.com/spreadsheets/d/1s7-cup_Y74jWD8FjGl2gLPwL7XZXUs--Ug4axoUDRbY/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  📊 Source Data
                </a>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Created & Maintained by</span>
                <a 
                  href="https://fb.workplace.com/profile.php?id=61576344549587"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Lukman Khiruddin QER
                </a>
              </div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan2026">January 2026</SelectItem>
                  <SelectItem value="feb2026">February 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Metrics Section */}
      <section 
        className="relative py-16 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.85), rgba(26, 26, 26, 0.85)), url('https://private-us-east-1.manuscdn.com/sessionFile/kNILivNRDQjmdO0cTx9Sxo/sandbox/oXmpvZ1AXPkXcZBOGWMsKS-img-1_1770148656000_na1fn_aGVyby1hYnN0cmFjdC1kYXRh.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva05JTGl2TlJEUWptZE8wY1R4OVN4by9zYW5kYm94L29YbXB2WjFBWFBrWGNaQk9HV01zS1MtaW1nLTFfMTc3MDE0ODY1NjAwMF9uYTFmbl9hR1Z5YnkxaFluTjBjbUZqZEMxa1lYUmgucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Y1KsNl0AhrcN~qLE~xPIyLeLEIX20DOMA45eB5XzBZ7Ta-mtsWYhevffz9DGcktWOekL5WPzWqKT-BZhvY1qJJnsNteMmQcg0pnljGbrppJ8W-A55GD4Ks-qKFdingLyRJPCR-CkB92HZf-0hHt~7pKFA2qf0cOD8UeEfD2PHlI7OjQW-gZ4cQjG6qK0FCyTZUbsUmj7HWml8mOTSIjR2num-E7Vj5K2YdE6-RkK9tKgPqAXYPUOM5Jaf24hWAleMT1QVYvUW-ST6G798vKNfvf4-WhieIZDrwkK3YxLpgFly~Iw3LSto8w-2yUdW8E98uuhbD3EejTXkutDEisPyw__')`
        }}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AnimatedMetricCard
              title="Overall Accuracy"
              value={hasData ? overallAccuracy : 0}
              suffix={hasData ? "%" : ""}
              subtitle={hasData ? `${overallAccuracy >= targetAccuracy ? '✓' : '↑'} ${Math.abs(overallAccuracy - targetAccuracy).toFixed(2)}pp ${overallAccuracy >= targetAccuracy ? 'above' : 'to'} target (${targetAccuracy}%)` : "Pending data"}
              colorClass={hasData ? getAccuracyColor(overallAccuracy) : "text-muted-foreground"}
              isPercentage={false}
              delay={0}
              icon={BarChart3}
            />
            <AnimatedMetricCard
              title="Biggest Improver"
              value={hasData && biggestImprover ? biggestImprover.market : "N/A"}
              subtitle={hasData && biggestImprover ? `${biggestImproverGain >= 0 ? '+' : ''}${biggestImproverGain.toFixed(2)}pp (W1→W4)` : "Pending data"}
              colorClass={hasData ? "text-chart-3" : "text-muted-foreground"}
              delay={200}
              icon={TrendingDown}
            />
            <AnimatedMetricCard
              title="Target Achievement"
              value={hasData ? `${marketsOnTrack}/${totalMarkets}` : "N/A"}
              subtitle={hasData ? "Markets on track (≥85%)" : "Pending data"}
              colorClass={hasData ? "text-chart-3" : "text-muted-foreground"}
              delay={400}
              icon={Target}
            />
            <AnimatedMetricCard
              title="Markets at Risk"
              value={hasData ? marketsAtRisk : "N/A"}
              subtitle={hasData ? "Below 85% threshold" : "Pending data"}
              colorClass={hasData ? "text-chart-2" : "text-muted-foreground"}
              delay={600}
              icon={AlertTriangle}
            />
          </div>
        </div>
      </section>

      {/* Market Cards with Click-through */}
      <section className="py-12 bg-card">
        <div className="container">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Market Performance Review</h2>
              <p className="text-muted-foreground max-w-3xl">
                Click on any market card to view detailed analysis, error breakdown, and recommended actions
              </p>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {marketData
              .sort((a, b) => a.vg_vhs_accuracy - b.vg_vhs_accuracy)
              .map((market, index) => (
                <motion.div
                  key={market.market}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  onHoverStart={() => setHoveredMarket(market.market)}
                  onHoverEnd={() => setHoveredMarket(null)}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 border-l-4"
                    style={{
                      borderLeftColor: market.vg_vhs_accuracy >= 85 
                        ? 'oklch(0.65 0.18 145)' 
                        : market.vg_vhs_accuracy >= 80 
                        ? 'oklch(0.75 0.15 60)' 
                        : 'oklch(0.65 0.24 27)'
                    }}
                    onClick={() => handleMarketClick(market)}
                  >
                    <CardHeader className="pb-1.5 pt-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold">{market.market}</CardTitle>
                        <Badge 
                          className={`${getAccuracyBgColor(market.vg_vhs_accuracy)} text-white text-xs px-2 py-0.5`}
                        >
                          {market.vg_vhs_accuracy >= 85 ? 'On Track' : market.vg_vhs_accuracy >= 80 ? 'At Risk' : 'Critical'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2.5 pb-3">
                      <div className={`text-3xl font-bold metric-value ${getAccuracyColor(market.vg_vhs_accuracy)}`}>
                        {market.vg_vhs_accuracy.toFixed(2)}%
                      </div>
                      <AnimatedProgressBar 
                        value={market.vg_vhs_accuracy} 
                        colorClass={getAccuracyBgColor(market.vg_vhs_accuracy)}
                        delay={index * 50}
                      />
                      
                      {/* Weekly Sampling Average Box */}
                      <div className={`p-2 rounded-md border ${
                        market.avg_sample < 100 
                          ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800' 
                          : 'bg-muted/50 border-border'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Weekly Avg</div>
                            <div className="text-lg font-bold font-mono">{market.avg_sample}</div>
                          </div>
                          {market.avg_sample < 100 && (
                            <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                          )}
                        </div>
                        {market.avg_sample < 100 && (
                          <div className="text-[10px] text-amber-700 dark:text-amber-400 mt-1">
                            ⚠️ Low sample
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{market.incorrect_count} errors</span>
                        <span className="font-medium">Details →</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
      {/* Top 3 High-Severity Policy Issues */}
      {marketData.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-2">Top 3 High-Severity Policy Issues</h2>
              <p className="text-muted-foreground">
                EXTREMELY_HIGH & VERY_HIGH severity violations requiring immediate intervention for user safety and platform integrity
              </p>
            </motion.div>

            <TopCriticalIssues />
          </div>
        </section>
      )}      {/* Contributing Factors */}
      {marketData.length > 0 && (
        <section className="py-12 bg-background">
        <div className="container">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-chart-2/10">
              <TrendingDown className="h-6 w-6 text-chart-2" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Contributing Factors</h2>
              <p className="text-muted-foreground max-w-3xl">
                Analysis of vendor performance and weekly progression patterns across all markets
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Error Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold metric-value text-chart-1">202</div>
                  <p className="text-sm text-muted-foreground">
                    <strong>NON_VIOLATING</strong> misclassifications represent 29.1% of all errors (4-week)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Improvement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold metric-value text-chart-3">+4.0pp</div>
                  <p className="text-sm text-muted-foreground">
                    Overall accuracy improved from <strong>83.13% (W1)</strong> to <strong>87.13% (W4)</strong> across all markets
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Win Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold metric-value text-green-600">+1.5pp</div>
                  <p className="text-sm text-muted-foreground">
                    Accuracy gain from fixing <strong>Top 3 high-severity policy groups</strong> (69 errors)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </section>
      )}

      {/* Strategic Recommendations */}
      {marketData.length > 0 && (
        <section className="py-12 bg-muted/30 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url('https://private-us-east-1.manuscdn.com/sessionFile/kNILivNRDQjmdO0cTx9Sxo/sandbox/oXmpvZ1AXPkXcZBOGWMsKS-img-3_1770148645000_na1fn_c3RyYXRlZ2ljLWluc2lnaHRzLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva05JTGl2TlJEUWptZE8wY1R4OVN4by9zYW5kYm94L29YbXB2WjFBWFBrWGNaQk9HV01zS1MtaW1nLTNfMTc3MDE0ODY0NTAwMF9uYTFmbl9jM1J5WVhSbFoybGpMV2x1YzJsbmFIUnpMV0puLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pG81N1jRa8kMC8M681kSt8RLUTb8Lm323ZWep1UdmantqGZRtVNAy6yY-bt3bcDcror21mXQlUa82jrEwxNzS1i1pQvgUPZGaGukLuhkhRGlinASyHBF5S85yc3YByUQRNENwkdkbafqJTaKq6GtLIKvZ2Wq2VD1m2cPKx40lHPcrMQY~oZQfNhGy982ntEkisHuJiUXPxmmK44a0kpaGG4mvuMut3JvXT8czcXjyg62ctWNe2F9c99Cb1CDfvTK2TZRFXUawCjHtP8l--OLAQpO6yfiTUaU9Y0V~b4QdXQCIQyRPJZbhwX~4j4awpmhdjO4OsYT7pu0xMeC8cWNUQ__')`
        }}
      >
        <div className="container">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-chart-3/10">
              <Target className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Path to 90% Accuracy</h2>
              <p className="text-muted-foreground max-w-3xl">
                Data-driven roadmap to achieve 90% accuracy (+4.98pp improvement) by end of February 2026
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                priority: 1,
                title: "Eliminate False Positives (NON_VIOLATING Over-Flagging)",
                impact: "+4.35pp → 89.37%",
                errors: "202 errors (29.1% of total)",
                actions: [
                  "Deploy targeted training for ARABIC (36 errors), TURKISH (31), INDONESIAN (27) on NON_VIOLATING vs FRAUD_AND_DECEPTION distinction",
                  "Share top 10 misclassified cases in weekly team briefings and implement bi-weekly calibration sessions for high-error markets"
                ]
              },
              {
                priority: 2,
                title: "Zero-Tolerance for High-Severity Errors",
                impact: "+1.5pp → 86.51%",
                errors: "69 critical errors (EXTREMELY_HIGH/VERY_HIGH)",
                actions: [
                  "Mandate 100% QA review for DANGEROUS_INDIVIDUALS_AND_ORGS, ADULT_SEXUAL_EXPLOITATION content in PAKISTAN_OTHERS, ARABIC, MAGHREB",
                  "Deploy specialized training on terrorism content (PAKISTAN_OTHERS) and sexual exploitation (ARABIC) with weekly quality reviews"
                ]
              },
              {
                priority: 3,
                title: "Increase Sample Size for Statistical Reliability",
                impact: "Improve confidence in accuracy metrics",
                errors: "3 markets with insufficient sampling",
                actions: [
                  "Monitor HUNGARIAN, MALAY, UKRAINIAN accuracy trends closely due to low sample sizes (72, 59, 84 avg/week)",
                  "Validate accuracy metrics with additional spot checks before making strategic decisions based on these markets"
                ]
              }
            ].map((rec, index) => (
              <motion.div
                key={rec.priority}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-t-4 border-t-primary h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-primary text-primary-foreground">
                        Priority {rec.priority}
                      </Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {rec.impact}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{rec.errors}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      {rec.actions.map((action, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        </section>
      )}

      {/* Market Detail Modal */}
      <MarketDetailModal 
        market={selectedMarket}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
