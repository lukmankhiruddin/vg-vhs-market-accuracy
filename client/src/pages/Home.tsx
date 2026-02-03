/**
 * VG+VHS Market Accuracy Executive Dashboard
 * Design: Swiss International Style meets Modern Data Visualization
 * - Data-first presentation with grid-based precision
 * - Strategic color use: red (critical), amber (warning), green (target)
 * - Command-center aesthetic with asymmetric layout
 * - Typography: IBM Plex Sans (headings), Inter (body), JetBrains Mono (metrics)
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, Target, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface MarketData {
  market: string;
  vg_accuracy: number;
  vhs_accuracy: number;
  vg_vhs_accuracy: number;
  sample_count: number;
  incorrect_count: number;
}

export default function Home() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  useEffect(() => {
    // In production, this would fetch from an API
    // For now, we'll use the analyzed data
    const data: MarketData[] = [
      { market: "ARABIC", vg_accuracy: 80.90, vhs_accuracy: 97.75, vg_vhs_accuracy: 78.65, sample_count: 89, incorrect_count: 19 },
      { market: "GERMAN", vg_accuracy: 81.63, vhs_accuracy: 96.94, vg_vhs_accuracy: 81.63, sample_count: 98, incorrect_count: 18 },
      { market: "INDONESIAN", vg_accuracy: 87.83, vhs_accuracy: 96.30, vg_vhs_accuracy: 84.66, sample_count: 189, incorrect_count: 29 },
      { market: "CHINESE_MANDARIN", vg_accuracy: 84.82, vhs_accuracy: 95.54, vg_vhs_accuracy: 84.82, sample_count: 112, incorrect_count: 17 },
      { market: "PAKISTAN_OTHERS", vg_accuracy: 90.32, vhs_accuracy: 96.77, vg_vhs_accuracy: 87.10, sample_count: 93, incorrect_count: 12 },
      { market: "UKRAINIAN", vg_accuracy: 88.73, vhs_accuracy: 97.18, vg_vhs_accuracy: 88.73, sample_count: 71, incorrect_count: 8 },
      { market: "HUNGARIAN", vg_accuracy: 90.67, vhs_accuracy: 98.67, vg_vhs_accuracy: 89.33, sample_count: 75, incorrect_count: 8 },
      { market: "TURKISH", vg_accuracy: 90.74, vhs_accuracy: 99.07, vg_vhs_accuracy: 89.81, sample_count: 108, incorrect_count: 11 },
      { market: "MAGHREB", vg_accuracy: 92.08, vhs_accuracy: 100.00, vg_vhs_accuracy: 92.08, sample_count: 101, incorrect_count: 8 },
      { market: "MALAY", vg_accuracy: 92.45, vhs_accuracy: 100.00, vg_vhs_accuracy: 92.45, sample_count: 53, incorrect_count: 4 },
      { market: "RUSSIAN", vg_accuracy: 94.95, vhs_accuracy: 98.99, vg_vhs_accuracy: 93.94, sample_count: 99, incorrect_count: 6 },
    ];
    setMarketData(data);
  }, []);

  const overallAccuracy = 87.13;
  const totalSamples = 1088;
  const totalErrors = 140;
  const marketsAtRisk = marketData.filter(m => m.vg_vhs_accuracy < 85).length;

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return "text-chart-3"; // Green
    if (accuracy >= 85) return "text-chart-2"; // Amber
    return "text-chart-1"; // Red
  };

  const getAccuracyBadge = (accuracy: number) => {
    if (accuracy >= 90) return { variant: "default" as const, label: "On Track", className: "bg-chart-3 text-white" };
    if (accuracy >= 85) return { variant: "secondary" as const, label: "At Risk", className: "bg-chart-2 text-white" };
    return { variant: "destructive" as const, label: "Critical", className: "bg-chart-1 text-white" };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">VG+VHS Market Accuracy</h1>
              <p className="text-muted-foreground mt-1">January 2026 Executive Summary</p>
            </div>
            <Badge variant="outline" className="text-sm px-4 py-2">
              Period: Jan 23-29, 2026
            </Badge>
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
            <Card className="bg-card/95 backdrop-blur">
              <CardHeader className="pb-3">
                <CardDescription className="text-xs uppercase tracking-wider">Overall Accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`text-5xl font-bold metric-value ${getAccuracyColor(overallAccuracy)}`}>
                  {overallAccuracy.toFixed(2)}%
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-destructive">↓ 7.87pp</span> below target (95%)
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/95 backdrop-blur">
              <CardHeader className="pb-3">
                <CardDescription className="text-xs uppercase tracking-wider">Total Samples</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold metric-value text-foreground">
                  {totalSamples.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Across 11 markets
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/95 backdrop-blur">
              <CardHeader className="pb-3">
                <CardDescription className="text-xs uppercase tracking-wider">Misclassifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold metric-value text-chart-1">
                  {totalErrors}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Requiring manual review
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/95 backdrop-blur">
              <CardHeader className="pb-3">
                <CardDescription className="text-xs uppercase tracking-wider">Markets at Risk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold metric-value text-chart-2">
                  {marketsAtRisk}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Below 85% threshold
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Happening Section */}
      <section className="py-12 bg-card">
        <div className="container">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">What's Happening</h2>
              <p className="text-muted-foreground max-w-3xl">
                Overall VG+VHS+ market accuracy for January 2026 stands at <strong className="text-foreground">87.13%</strong>, 
                which is <strong className="text-destructive">7.87 percentage points below the 95% target</strong>. This performance 
                gap is driven by a significant number of misclassifications, with <strong className="text-foreground">140 errors 
                requiring manual review</strong> in January alone.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Critical Markets</CardTitle>
                <CardDescription>Markets below 85% accuracy threshold</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData
                    .filter(m => m.vg_vhs_accuracy < 85)
                    .sort((a, b) => a.vg_vhs_accuracy - b.vg_vhs_accuracy)
                    .map((market) => (
                      <div key={market.market} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                        <div>
                          <div className="font-medium">{market.market}</div>
                          <div className="text-sm text-muted-foreground">{market.sample_count} samples</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold metric-value ${getAccuracyColor(market.vg_vhs_accuracy)}`}>
                            {market.vg_vhs_accuracy.toFixed(2)}%
                          </div>
                          <div className="text-sm text-muted-foreground">{market.incorrect_count} errors</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Overview</CardTitle>
                <CardDescription>All markets ranked by accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marketData
                    .sort((a, b) => b.vg_vhs_accuracy - a.vg_vhs_accuracy)
                    .map((market) => {
                      const badge = getAccuracyBadge(market.vg_vhs_accuracy);
                      return (
                        <div key={market.market} className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-sm font-medium w-32 truncate">{market.market}</span>
                            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-full ${market.vg_vhs_accuracy >= 90 ? 'bg-chart-3' : market.vg_vhs_accuracy >= 85 ? 'bg-chart-2' : 'bg-chart-1'}`}
                                style={{ width: `${market.vg_vhs_accuracy}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-medium metric-value ml-3 w-16 text-right">
                            {market.vg_vhs_accuracy.toFixed(1)}%
                          </span>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why It's Happening Section */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-chart-2/10">
              <TrendingDown className="h-6 w-6 text-chart-2" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Why It's Happening</h2>
              <p className="text-muted-foreground max-w-3xl">
                The primary driver of inaccuracy is the misclassification of <strong className="text-foreground">NON_VIOLATING</strong> content, 
                which accounts for <strong className="text-foreground">50 of the 140 total errors</strong>. This suggests a fundamental 
                misunderstanding of the baseline for what constitutes a violation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Error Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">NON_VIOLATING</span>
                    <span className="text-lg font-bold metric-value text-chart-1">50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">FRAUD_AND_DECEPTION</span>
                    <span className="text-lg font-bold metric-value text-chart-2">14</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ADULT_SEXUAL_SOLICITATION</span>
                    <span className="text-lg font-bold metric-value text-chart-2">13</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">PORN</span>
                    <span className="text-lg font-bold metric-value text-chart-2">11</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vendor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Accenture_NA</span>
                      <span className="text-lg font-bold metric-value text-chart-2">85.88%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">439 samples</div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">CPL</span>
                      <span className="text-lg font-bold metric-value text-chart-2">87.83%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">641 samples</div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Accenture</span>
                      <span className="text-lg font-bold metric-value text-chart-3">100.00%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">8 samples</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Week 4 (Jan 23-29)</span>
                      <span className="text-lg font-bold metric-value">87.11%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">225 samples</div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Week 5 (Jan 30+)</span>
                      <span className="text-lg font-bold metric-value">87.14%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">863 samples</div>
                  </div>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      Performance remains stable but consistently below target across both weeks.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Risks & Impact Section */}
      <section 
        className="py-12 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url('https://private-us-east-1.manuscdn.com/sessionFile/kNILivNRDQjmdO0cTx9Sxo/sandbox/oXmpvZ1AXPkXcZBOGWMsKS-img-3_1770148645000_na1fn_c3RyYXRlZ2ljLWluc2lnaHRzLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva05JTGl2TlJEUWptZE8wY1R4OVN4by9zYW5kYm94L29YbXB2WjFBWFBrWGNaQk9HV01zS1MtaW1nLTNfMTc3MDE0ODY0NTAwMF9uYTFmbl9jM1J5WVhSbFoybGpMV2x1YzJsbmFIUnpMV0puLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pG81N1jRa8kMC8M681kSt8RLUTb8Lm323ZWep1UdmantqGZRtVNAy6yY-bt3bcDcror21mXQlUa82jrEwxNzS1i1pQvgUPZGaGukLuhkhRGlinASyHBF5S85yc3YByUQRNENwkdkbafqJTaKq6GtLIKvZ2Wq2VD1m2cPKx40lHPcrMQY~oZQfNhGy982ntEkisHuJiUXPxmmK44a0kpaGG4mvuMut3JvXT8czcXjyg62ctWNe2F9c99Cb1CDfvTK2TZRFXUawCjHtP8l--OLAQpO6yfiTUaU9Y0V~b4QdXQCIQyRPJZbhwX~4j4awpmhdjO4OsYT7pu0xMeC8cWNUQ__')`
        }}
      >
        <div className="container">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Callout Risks & Expected Impact</h2>
              <p className="text-muted-foreground max-w-3xl">
                Continued underperformance in market accuracy poses several significant risks to platform integrity and operational efficiency.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="border-l-4 border-l-chart-1">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-chart-1" />
                  User Experience Degradation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Inaccurate classifications lead to both false negatives (missing harmful content) and false positives 
                  (incorrectly removing benign content), directly impacting user trust and platform safety.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-chart-1">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-chart-1" />
                  Brand and Reputational Damage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Failure to effectively police the platform can lead to negative press, regulatory scrutiny, and a decline 
                  in user confidence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-chart-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-chart-2" />
                  Operational Inefficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The high volume of incorrect classifications creates a significant downstream workload for manual review teams, 
                  increasing operational costs and diverting resources from other critical tasks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-12 bg-card">
        <div className="container">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-chart-3/10">
              <Target className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Recommendations</h2>
              <p className="text-muted-foreground max-w-3xl">
                To address these challenges and improve market accuracy, we recommend a three-pronged approach focused on 
                training, analysis, and quality assurance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <Card className="border-t-4 border-t-primary">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-primary text-primary-foreground">Priority 1</Badge>
                </div>
                <CardTitle className="text-lg">Targeted Training and Recalibration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Implement immediate, targeted training for the lowest-performing markets: <strong>ARABIC, GERMAN, INDONESIAN, and CHINESE_MANDARIN</strong>.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Conduct a comprehensive review and recalibration of the <strong>NON_VIOLATING</strong> content policy with all vendor partners to ensure a shared understanding of the baseline.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-primary">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-primary text-primary-foreground">Priority 2</Badge>
                </div>
                <CardTitle className="text-lg">Deep-Dive Analysis into High-Risk Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Initiate a deep-dive analysis into the <strong>FRAUD_AND_DECEPTION</strong>, <strong>ADULT_SEXUAL_SOLICITATION</strong>, and <strong>PORN</strong> violation categories.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Identify the specific sub-categories and nuances that are causing the most confusion for reviewers.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-primary">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-primary text-primary-foreground">Priority 3</Badge>
                </div>
                <CardTitle className="text-lg">Strengthen Quality Assurance and Feedback Loops</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Enhance the QA process to provide more granular and actionable feedback to individual reviewers and teams.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Establish a more frequent and robust feedback loop between the policy team and the vendor partners to quickly address emerging trends and policy ambiguities.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-background">
        <div className="container">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              VG+VHS Market Accuracy Dashboard • January 2026
            </p>
            <p className="text-sm text-muted-foreground">
              Prepared for Executive Leadership
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
