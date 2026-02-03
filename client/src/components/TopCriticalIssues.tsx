import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Users, Target, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CriticalIssue {
  rank: number;
  market: string;
  errorCategory: string;
  errorCount: number;
  impact: "CRITICAL - EXTREMELY HIGH" | "CRITICAL - VERY HIGH" | "HIGH - VERY HIGH" | "Critical" | "High" | "Medium";
  recommendation: string;
  icon: React.ReactNode;
}

export function TopCriticalIssues() {
  const criticalIssues: CriticalIssue[] = [
    {
      rank: 1,
      market: "DOI_SUPPORT_TERRORISM",
      errorCategory: "Terrorism Support",
      errorCount: 23,
      impact: "CRITICAL - EXTREMELY HIGH",
      recommendation: "URGENT: Standardize interpretation of 'support' vs 'mention' across markets. Implement mandatory escalation for terrorism-related content. Highest errors in ARABIC (6), PAKISTAN_OTHERS (4), INDONESIAN (4).",
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      rank: 2,
      market: "PROSTITUTION",
      errorCategory: "Commercial Sexual Exploitation",
      errorCount: 19,
      impact: "CRITICAL - VERY HIGH",
      recommendation: "Critical misclassification of commercial sexual exploitation. Update policy examples and implement peer review for all prostitution-related cases. Focus on ARABIC (5), INDONESIAN (3), PAKISTAN_OTHERS (3).",
      icon: <Users className="h-5 w-5" />
    },
    {
      rank: 3,
      market: "CHILD_SEXUALIZATION",
      errorCategory: "Child Safety Violation",
      errorCount: 13,
      impact: "CRITICAL - EXTREMELY HIGH",
      recommendation: "CRITICAL: Child safety violation. Immediate retraining required on child sexualization identification. Zero-tolerance policy enforcement. Concentrated in ARABIC (4), PAKISTAN_OTHERS (3), INDONESIAN (2).",
      icon: <Target className="h-5 w-5" />
    },
    {
      rank: 4,
      market: "FRAUD_FINANCIAL_INSTRUMENT",
      errorCategory: "Financial Fraud",
      errorCount: 9,
      impact: "HIGH - VERY HIGH",
      recommendation: "Enhance training on financial fraud detection. Update guidelines with current scam patterns and regional variations. Primary issues in ARABIC (3), MAGHREB (2), RUSSIAN (2).",
      icon: <FileText className="h-5 w-5" />
    },
    {
      rank: 5,
      market: "ADULT_NCST",
      errorCategory: "Non-Consensual Content",
      errorCount: 8,
      impact: "HIGH - VERY HIGH",
      recommendation: "Clarify non-consensual sexual content policy boundaries. Implement sensitivity training and trauma-informed review protocols. Errors spread across ARABIC (2), INDONESIAN (2), MALAY (2).",
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  const getImpactColor = (impact: string) => {
    if (impact.includes("CRITICAL") || impact.includes("EXTREMELY HIGH")) {
      return "bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 animate-pulse";
    }
    if (impact.includes("HIGH")) {
      return "bg-orange-600 dark:bg-orange-700 text-white hover:bg-orange-700";
    }
    switch (impact) {
      case "Critical":
        return "bg-red-600 dark:bg-red-700 text-white hover:bg-red-700";
      case "High":
        return "bg-orange-600 dark:bg-orange-700 text-white hover:bg-orange-700";
      case "Medium":
        return "bg-yellow-600 dark:bg-yellow-700 text-white hover:bg-yellow-700";
      default:
        return "bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700";
    }
  };

  const getImpactBorderColor = (impact: string) => {
    if (impact.includes("CRITICAL") || impact.includes("EXTREMELY HIGH")) {
      return "border-t-red-600";
    }
    if (impact.includes("HIGH")) {
      return "border-t-orange-600";
    }
    switch (impact) {
      case "Critical":
        return "border-t-red-600";
      case "High":
        return "border-t-orange-600";
      case "Medium":
        return "border-t-yellow-600";
      default:
        return "border-t-gray-500";
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
            <p className="text-sm text-muted-foreground">
              These 5 high-severity policy areas represent 72 errors (62.1% of EXTREMELY_HIGH/VERY_HIGH errors, 10.4% of total). Critical for user safety and platform integrity.
            </p>
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
                  <Badge variant="outline" className="text-xs mb-2">
                    {issue.errorCategory.replace(/_/g, ' ')}
                  </Badge>
                  <div className="font-mono font-bold text-red-600 dark:text-red-400 text-xl">
                    {issue.errorCount} errors
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-muted/40 rounded p-2.5 text-xs leading-relaxed">
                  <div className="font-semibold text-primary mb-1">ACTION:</div>
                  <p className="text-foreground/90">
                    {issue.recommendation}
                  </p>
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
            <span className="text-muted-foreground ml-2">Week 4, February 2026</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold">Expected Impact:</span>
            <span className="text-green-600 dark:text-green-400 ml-2 font-semibold">+2-3% accuracy improvement</span>
          </div>
        </div>
      </div>
    </div>
  );
}
