import { motion } from "framer-motion";
import { AlertTriangle, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CriticalIssue {
  rank: number;
  market: string;
  errorCategory: string;
  errorCount: number;
  impact: "EXTREMELY HIGH" | "VERY HIGH" | "HIGH" | "Critical" | "High" | "Medium";
  recommendation: string;
  icon: React.ReactNode;
}

interface TopCriticalIssuesProps {
  period?: string;
}

const janIssues: CriticalIssue[] = [
  {
    rank: 1,
    market: "ADULT_SEXUAL_EXPLOITATION",
    errorCategory: "Adult Sexual Exploitation",
    errorCount: 20,
    impact: "EXTREMELY HIGH",
    recommendation: "CHINESE_MANDARIN (4) • INDONESIAN (4) • PAKISTAN_OTHERS (4) • MAGHREB (3) • ARABIC (2) • RUSSIAN (1) • MALAY (1) • HUNGARIAN (1)",
    icon: <Users className="h-5 w-5" />
  },
  {
    rank: 2,
    market: "DANGEROUS_INDIVIDUALS_AND_ORGS",
    errorCategory: "Dangerous Individuals & Organizations",
    errorCount: 30,
    impact: "VERY HIGH",
    recommendation: "PAKISTAN_OTHERS (10) • ARABIC (9) • MAGHREB (4) • GERMAN (2) • MALAY (2) • TURKISH (1) • INDONESIAN (1) • HUNGARIAN (1)",
    icon: <AlertTriangle className="h-5 w-5" />
  },
  {
    rank: 3,
    market: "ADULT_SEXUAL_SOLICITATION",
    errorCategory: "Adult Sexual Solicitation",
    errorCount: 19,
    impact: "VERY HIGH",
    recommendation: "INDONESIAN (5) • HUNGARIAN (4) • MALAY (3) • MAGHREB (2) • TURKISH (1) • GERMAN (1) • CHINESE_MANDARIN (1) • PAKISTAN_OTHERS (1) • ARABIC (1)",
    icon: <Users className="h-5 w-5" />
  }
];

const febIssues: CriticalIssue[] = [
  {
    rank: 1,
    market: "DANGEROUS_INDIVIDUALS_AND_ORGS",
    errorCategory: "Dangerous Individuals & Organizations",
    errorCount: 32,
    impact: "VERY HIGH",
    recommendation: "ARABIC (9) • ITALIAN (6) • PAKISTAN_OTHERS (5) • MALAY (4) • HUNGARIAN (3) • TURKISH (2) • GERMAN (1) • MAGHREB (1) • PERSIAN (1)",
    icon: <AlertTriangle className="h-5 w-5" />
  },
  {
    rank: 2,
    market: "ADULT_SEXUAL_EXPLOITATION",
    errorCategory: "Adult Sexual Exploitation",
    errorCount: 12,
    impact: "VERY HIGH",
    recommendation: "CHINESE_MANDARIN (3) • ITALIAN (2) • PAKISTAN_OTHERS (2) • HUNGARIAN (1) • PERSIAN (1) • RUSSIAN (1) • TURKISH (1) • UKIA (1)",
    icon: <Users className="h-5 w-5" />
  },
  {
    rank: 3,
    market: "DRUGS_AND_PHARMACEUTICALS",
    errorCategory: "Drugs & Pharmaceuticals",
    errorCount: 11,
    impact: "VERY HIGH",
    recommendation: "UKIA (5) • ARABIC (1) • GERMAN (1) • MAGHREB (1) • MALAY (1) • PAKISTAN_OTHERS (1) • UKRAINIAN (1)",
    icon: <AlertTriangle className="h-5 w-5" />
  }
];

export function TopCriticalIssues({ period = 'jan2026' }: TopCriticalIssuesProps) {
  const criticalIssues = period === 'feb2026' ? febIssues : janIssues;

  const summaryText = period === 'feb2026'
    ? "These 3 policy groups account for 55 high-severity errors out of 686 total (8.0%). Addressing these will improve accuracy by +1.11pp."
    : "These 3 policy groups account for 69 critical errors out of 690 total (10%). Addressing these will improve accuracy by +1.5pp.";

  const nextReview = period === 'feb2026' ? "Week 1, March 2026" : "Week 4, February 2026";

  const expectedImpact = period === 'feb2026'
    ? "+1.11pp accuracy improvement (87.23% → 88.34%)"
    : "+1.5pp accuracy improvement (85.13% → 86.63%)";

  const getImpactColor = (impact: string) => {
    if (impact.includes("EXTREMELY HIGH")) {
      return "bg-red-700 dark:bg-red-800 text-white hover:bg-red-800 animate-pulse font-bold";
    }
    if (impact.includes("VERY HIGH")) {
      return "bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 font-semibold";
    }
    if (impact.includes("HIGH")) {
      return "bg-orange-600 dark:bg-orange-700 text-white hover:bg-orange-700";
    }
    switch (impact) {
      case "Critical": return "bg-red-600 dark:bg-red-700 text-white hover:bg-red-700";
      case "High": return "bg-orange-600 dark:bg-orange-700 text-white hover:bg-orange-700";
      case "Medium": return "bg-yellow-600 dark:bg-yellow-700 text-white hover:bg-yellow-700";
      default: return "bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700";
    }
  };

  const getImpactBorderColor = (impact: string) => {
    if (impact.includes("EXTREMELY HIGH")) return "border-t-red-700 border-t-4";
    if (impact.includes("VERY HIGH")) return "border-t-red-600 border-t-4";
    if (impact.includes("HIGH")) return "border-t-orange-600";
    switch (impact) {
      case "Critical": return "border-t-red-600";
      case "High": return "border-t-orange-600";
      case "Medium": return "border-t-yellow-600";
      default: return "border-t-gray-500";
    }
  };

  return (
    <div>
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-red-100 dark:bg-red-950/30">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-1">Priority Action Required</h3>
            <p className="text-sm text-muted-foreground">{summaryText}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {criticalIssues.map((issue, index) => (
          <motion.div
            key={issue.rank}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card className={`border-t-4 ${getImpactBorderColor(issue.impact).replace('border-l-', 'border-t-')} hover:shadow-lg transition-all h-full`}>
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">#{issue.rank}</span>
                  </div>
                  <Badge className={`${getImpactColor(issue.impact)} text-xs`}>
                    {issue.impact}
                  </Badge>
                </div>

                {/* Market & Category */}
                <div className="mb-3">
                  <h4 className="font-bold text-base mb-1">{issue.market}</h4>
                  <div className="font-mono font-bold text-red-600 dark:text-red-400 text-xl">
                    {issue.errorCount} errors
                  </div>
                </div>

                {/* Affected Markets */}
                <div className="bg-muted/40 rounded p-2.5">
                  <div className="font-semibold text-primary text-xs mb-2">AFFECTED MARKETS:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {issue.recommendation.split(' • ').map((market, idx) => {
                      const [name, count] = market.split(' (');
                      const errorCount = parseInt(count?.replace(')', '') || '0');
                      const isHighPriority = errorCount >= 4;

                      return (
                        <div
                          key={idx}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                            isHighPriority
                              ? 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                              : 'bg-muted text-muted-foreground border border-border'
                          }`}
                        >
                          <span className="font-semibold">{name.trim()}</span>
                          <span className="opacity-75">({errorCount})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-semibold">Next Review:</span>
            <span className="text-muted-foreground ml-2">{nextReview}</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold">Expected Impact:</span>
            <span className="text-green-600 dark:text-green-400 ml-2 font-semibold">{expectedImpact}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
