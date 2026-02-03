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
    <div className="space-y-4">
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

      {criticalIssues.map((issue, index) => (
        <motion.div
          key={issue.rank}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`border-l-4 ${getImpactBorderColor(issue.impact)} hover:shadow-lg transition-shadow`}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                {/* Rank Badge */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">#{issue.rank}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-base">{issue.market}</h4>
                        <Badge variant="outline" className="text-xs">
                          {issue.errorCategory.replace(/_/g, ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-mono font-bold text-red-600 dark:text-red-400 text-lg">
                          {issue.errorCount} errors
                        </span>
                        <span>•</span>
                        <Badge className={`${getImpactColor(issue.impact)} text-xs`}>
                          {issue.impact} Impact
                        </Badge>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="p-2 rounded-lg bg-muted/50 text-muted-foreground flex-shrink-0">
                      {issue.icon}
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="bg-muted/30 rounded-md p-3 border-l-2 border-primary/50">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide flex-shrink-0 mt-0.5">
                        Action:
                      </span>
                      <p className="text-sm text-foreground">
                        {issue.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

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
