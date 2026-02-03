import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Users, Target, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CriticalIssue {
  rank: number;
  market: string;
  errorCategory: string;
  errorCount: number;
  impact: "High" | "Medium" | "Critical";
  recommendation: string;
  icon: React.ReactNode;
}

export function TopCriticalIssues() {
  const criticalIssues: CriticalIssue[] = [
    {
      rank: 1,
      market: "ARABIC",
      errorCategory: "NON_VIOLATING",
      errorCount: 36,
      impact: "Critical",
      recommendation: "Review classification guidelines with Arabic team. High false positive rate indicates potential training gaps or guideline misinterpretation.",
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      rank: 2,
      market: "UKRAINIAN",
      errorCategory: "NON_VIOLATING",
      errorCount: 34,
      impact: "Critical",
      recommendation: "Conduct refresher training on NON_VIOLATING content identification. Consider adding more Ukrainian-specific examples to training materials.",
      icon: <FileText className="h-5 w-5" />
    },
    {
      rank: 3,
      market: "TURKISH",
      errorCategory: "NON_VIOLATING",
      errorCount: 24,
      impact: "High",
      recommendation: "Audit recent Turkish content samples. Pattern suggests over-classification of benign content as violations.",
      icon: <Target className="h-5 w-5" />
    },
    {
      rank: 4,
      market: "INDONESIAN",
      errorCategory: "NON_VIOLATING",
      errorCount: 22,
      impact: "High",
      recommendation: "Increase quality check frequency for Indonesian market. Implement peer review for borderline cases.",
      icon: <Users className="h-5 w-5" />
    },
    {
      rank: 5,
      market: "GERMAN",
      errorCategory: "NON_VIOLATING",
      errorCount: 18,
      impact: "Medium",
      recommendation: "Schedule calibration session with German reviewers. Focus on edge cases and cultural context considerations.",
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical":
        return "bg-red-500 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-amber-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getImpactBorderColor = (impact: string) => {
    switch (impact) {
      case "Critical":
        return "border-l-red-500";
      case "High":
        return "border-l-orange-500";
      case "Medium":
        return "border-l-amber-500";
      default:
        return "border-l-gray-500";
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
              These 5 issues represent 134 errors (19.3% of total). Addressing them will have the highest impact on overall accuracy.
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
            <span className="text-muted-foreground ml-2">Week 1, February 2026</span>
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
