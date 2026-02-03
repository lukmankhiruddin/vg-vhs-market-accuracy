/**
 * Market-specific insights derived from raw data analysis
 * Generated from 4-week VG+VHS accuracy data (W1-W4)
 */

export interface MarketInsight {
  market: string;
  accuracy: number;
  status: 'critical' | 'at-risk' | 'on-track' | 'excellent';
  trend: 'improving' | 'declining' | 'volatile' | 'stable';
  improvement: number;
  totalErrors: number;
  topErrors: Array<{ category: string; count: number }>;
  highSeverityCount: number;
  highSeverityCategories: Array<{ category: string; count: number }>;
  nonViolatingErrors: number;
  lowSample: boolean;
  avgSample: number;
  whatHappening: string;
  whyHappening: string;
  immediateActions: string[];
  expectedOutcome: string;
}

export const marketInsights: Record<string, MarketInsight> = {
  "ARABIC": {
    market: "ARABIC",
    accuracy: 73.95,
    status: "critical",
    trend: "improving",
    improvement: 6.29,
    totalErrors: 123,
    topErrors: [
      { category: "NON_VIOLATING", count: 30 },
      { category: "FRAUD_AND_DECEPTION", count: 15 },
      { category: "ADULT_SEXUAL_SOLICITATION", count: 12 }
    ],
    highSeverityCount: 18,
    highSeverityCategories: [
      { category: "CHILD_SEXUAL_EXPLOITATION", count: 5 },
      { category: "DANGEROUS_INDIVIDUALS_AND_ORGS", count: 4 }
    ],
    nonViolatingErrors: 30,
    lowSample: false,
    avgSample: 119,
    whatHappening: "ARABIC is the lowest-performing market at 73.95%, significantly below the 85% target. However, the market shows strong improvement momentum (+6.29pp from W1 to W4), reaching 78.65% in Week 4.",
    whyHappening: "High error volume (123 total errors) driven by NON_VIOLATING over-flagging (30 errors) and 18 high-severity misclassifications including 5 CHILD_SEXUAL_EXPLOITATION cases. Cultural nuances in Arabic content may be causing baseline identification challenges.",
    immediateActions: [
      "Deploy specialized training on Arabic cultural context and NON_VIOLATING baseline identification",
      "Implement mandatory peer review for all high-severity categories (CHILD_SEXUAL_EXPLOITATION, DANGEROUS_INDIVIDUALS_AND_ORGS)",
      "Increase sample size to 150+ per week to improve statistical reliability"
    ],
    expectedOutcome: "With intensive intervention, ARABIC can reach 80%+ accuracy within 4 weeks (reducing 25-30 errors). Achieving 85% target will require 8-12 weeks of sustained focus on high-severity error elimination."
  },

  "CHINESE_MANDARIN": {
    market: "CHINESE_MANDARIN",
    accuracy: 85.40,
    status: "on-track",
    trend: "declining",
    improvement: -4.86,
    totalErrors: 111,
    topErrors: [
      { category: "NON_VIOLATING", count: 27 },
      { category: "PORN", count: 15 },
      { category: "GAMBLING_AND_GAMES", count: 11 }
    ],
    highSeverityCount: 10,
    highSeverityCategories: [
      { category: "CHILD_SEXUAL_EXPLOITATION", count: 4 },
      { category: "SSIED", count: 2 }
    ],
    nonViolatingErrors: 27,
    lowSample: false,
    avgSample: 115,
    whatHappening: "CHINESE_MANDARIN just meets the 85% target but shows concerning decline (-4.86pp from W1 89.68% to W4 84.82%). The market is at risk of falling below target if the trend continues.",
    whyHappening: "Declining performance driven by 27 NON_VIOLATING over-flags and 10 high-severity errors including 4 CHILD_SEXUAL_EXPLOITATION cases. The consistent downward trend suggests reviewer fatigue or policy drift.",
    immediateActions: [
      "Conduct urgent calibration session to address NON_VIOLATING over-flagging pattern",
      "Implement weekly quality reviews focusing on CHILD_SEXUAL_EXPLOITATION and SSIED edge cases",
      "Analyze W1 vs W4 cases to identify root cause of performance decline"
    ],
    expectedOutcome: "Stabilizing performance at 87-88% accuracy is achievable within 2-3 weeks by eliminating NON_VIOLATING errors (potential +2.4pp gain). Requires immediate action to prevent further decline."
  },

  "GERMAN": {
    market: "GERMAN",
    accuracy: 83.17,
    status: "at-risk",
    trend: "declining",
    improvement: -4.57,
    totalErrors: 96,
    topErrors: [
      { category: "NON_VIOLATING", count: 25 },
      { category: "PORN", count: 19 },
      { category: "ADULT_SEXUAL_SOLICITATION", count: 11 }
    ],
    highSeverityCount: 5,
    highSeverityCategories: [
      { category: "DANGEROUS_INDIVIDUALS_AND_ORGS", count: 2 },
      { category: "FRAUD_AND_DECEPTION", count: 1 }
    ],
    nonViolatingErrors: 25,
    lowSample: false,
    avgSample: 101,
    whatHappening: "GERMAN is below target at 83.17% and declining (-4.57pp from W1 86.21% to W4 81.63%). Performance deteriorated consistently across all four weeks, indicating systemic issues.",
    whyHappening: "Primary driver is NON_VIOLATING over-flagging (25 errors, 26% of total). Combined with PORN (19) and ADULT_SEXUAL_SOLICITATION (11) misclassifications, suggesting baseline calibration drift.",
    immediateActions: [
      "Share top 10 NON_VIOLATING false positives in weekly team briefings for immediate correction",
      "Implement spot checks on PORN and ADULT_SEXUAL_SOLICITATION decisions to identify confusion patterns",
      "Schedule refresher training on German cultural norms and content baselines"
    ],
    expectedOutcome: "Eliminating NON_VIOLATING over-flags can improve accuracy to 89%+ within 3 weeks (potential +6.2pp gain). This is a high-priority quick win opportunity."
  },

  "HUNGARIAN": {
    market: "HUNGARIAN",
    accuracy: 88.15,
    status: "on-track",
    trend: "volatile",
    improvement: 1.20,
    totalErrors: 48,
    topErrors: [
      { category: "NON_VIOLATING", count: 12 },
      { category: "ADULT_SEXUAL_SOLICITATION", count: 5 },
      { category: "HATE", count: 5 }
    ],
    highSeverityCount: 4,
    highSeverityCategories: [
      { category: "CHILD_SEXUAL_EXPLOITATION", count: 2 },
      { category: "FRAUD_AND_DECEPTION", count: 2 }
    ],
    nonViolatingErrors: 12,
    lowSample: true,
    avgSample: 72,
    whatHappening: "HUNGARIAN exceeds target at 88.15% but shows high volatility (W2: 92.41% → W3: 82.43% → W4: 89.33%). Low sample size (72 avg) limits statistical reliability.",
    whyHappening: "Weekly swings of 10+ percentage points suggest inconsistent reviewer performance or insufficient sample size. Only 48 total errors, but 4 high-severity cases (including 2 CHILD_SEXUAL_EXPLOITATION) are concerning.",
    immediateActions: [
      "Monitor trends closely and validate with spot checks rather than increasing sample targets",
      "Flag high-severity cases (CHILD_SEXUAL_EXPLOITATION, FRAUD_AND_DECEPTION) for team lead review in weekly meetings",
      "Document edge cases to build market-specific guidance library"
    ],
    expectedOutcome: "Maintain 88-90% accuracy range with improved consistency. Low sample size makes aggressive targets unrealistic; focus on quality over volume."
  },

  "INDONESIAN": {
    market: "INDONESIAN",
    accuracy: 86.94,
    status: "on-track",
    trend: "volatile",
    improvement: -1.15,
    totalErrors: 123,
    topErrors: [
      { category: "ADULT_SEXUAL_SOLICITATION", count: 22 },
      { category: "NON_VIOLATING", count: 21 },
      { category: "FRAUD_AND_DECEPTION", count: 12 }
    ],
    highSeverityCount: 22,
    highSeverityCategories: [
      { category: "FRAUD_AND_DECEPTION", count: 6 },
      { category: "ADULT_SEXUAL_EXPLOITATION", count: 5 }
    ],
    nonViolatingErrors: 21,
    lowSample: false,
    avgSample: 174,
    whatHappening: "INDONESIAN is above target at 86.94% but carries the highest error volume (123 total) and highest high-severity count (22). Performance is volatile with a slight decline (-1.15pp).",
    whyHappening: "High volume driven by ADULT_SEXUAL_SOLICITATION (22), NON_VIOLATING (21), and 22 high-severity errors including 6 FRAUD_AND_DECEPTION. Large sample size (174 avg) amplifies error impact.",
    immediateActions: [
      "Prioritize ADULT_SEXUAL_SOLICITATION calibration with Indonesian-specific examples",
      "Implement specialized quality reviews for FRAUD_AND_DECEPTION and ADULT_SEXUAL_EXPLOITATION cases",
      "Share top 10 NON_VIOLATING false positives in weekly briefings"
    ],
    expectedOutcome: "Reducing ADULT_SEXUAL_SOLICITATION and NON_VIOLATING errors by 50% can improve accuracy to 90%+ within 4 weeks (potential +3.2pp gain). High-severity focus will reduce compliance risk."
  },

  "MAGHREB": {
    market: "MAGHREB",
    accuracy: 90.04,
    status: "excellent",
    trend: "improving",
    improvement: 4.90,
    totalErrors: 67,
    topErrors: [
      { category: "NON_VIOLATING", count: 12 },
      { category: "DANGEROUS_INDIVIDUALS_AND_ORGS", count: 10 },
      { category: "ADULT_SEXUAL_SOLICITATION", count: 9 }
    ],
    highSeverityCount: 9,
    highSeverityCategories: [
      { category: "DANGEROUS_INDIVIDUALS_AND_ORGS", count: 4 },
      { category: "DRUGS_AND_PHARMACEUTICALS", count: 2 }
    ],
    nonViolatingErrors: 12,
    lowSample: false,
    avgSample: 113,
    whatHappening: "MAGHREB is the top performer at 90.04% with strong improvement momentum (+4.90pp from W1 87.18% to W4 92.08%). This market demonstrates excellence and should be studied as a model.",
    whyHappening: "Consistent improvement driven by effective error management. Only 67 total errors with balanced distribution. Team demonstrates strong policy understanding and cultural competency.",
    immediateActions: [
      "Document MAGHREB team's best practices and share across all markets",
      "Maintain current quality standards with monthly calibration check-ins",
      "Use MAGHREB reviewers as trainers for struggling markets (ARABIC, GERMAN, TURKISH)"
    ],
    expectedOutcome: "Sustain 90%+ accuracy and target 92-93% by eliminating remaining NON_VIOLATING errors. MAGHREB can serve as benchmark for other markets."
  },

  "MALAY": {
    market: "MALAY",
    accuracy: 85.53,
    status: "on-track",
    trend: "improving",
    improvement: 5.36,
    totalErrors: 51,
    topErrors: [
      { category: "NON_VIOLATING", count: 15 },
      { category: "PORN", count: 9 },
      { category: "FRAUD_AND_DECEPTION", count: 5 }
    ],
    highSeverityCount: 13,
    highSeverityCategories: [
      { category: "HUMAN_EXPLOITATION", count: 4 },
      { category: "SSIED", count: 2 }
    ],
    nonViolatingErrors: 15,
    lowSample: true,
    avgSample: 59,
    whatHappening: "MALAY just meets target at 85.53% with strong improvement (+5.36pp from W1 87.10% to W4 92.45%). Low sample size (59 avg) limits reliability, but trend is positive.",
    whyHappening: "Strong W4 performance (92.45%) offset by W2 dip (74.60%). 13 high-severity errors including 4 HUMAN_EXPLOITATION cases require attention despite overall positive trend.",
    immediateActions: [
      "Monitor trends closely and validate with spot checks rather than increasing sample targets",
      "Flag HUMAN_EXPLOITATION and SSIED cases for team lead review in weekly meetings",
      "Share successful W4 strategies with team to maintain momentum"
    ],
    expectedOutcome: "Maintain 85-90% accuracy range with continued improvement. Low sample size makes aggressive targets unrealistic; focus on sustaining W4 performance levels."
  },

  "PAKISTAN_OTHERS": {
    market: "PAKISTAN_OTHERS",
    accuracy: 86.18,
    status: "on-track",
    trend: "improving",
    improvement: 6.82,
    totalErrors: 84,
    topErrors: [
      { category: "DANGEROUS_INDIVIDUALS_AND_ORGS", count: 20 },
      { category: "NON_VIOLATING", count: 18 },
      { category: "ADULT_SEXUAL_SOLICITATION", count: 10 }
    ],
    highSeverityCount: 17,
    highSeverityCategories: [
      { category: "DANGEROUS_INDIVIDUALS_AND_ORGS", count: 8 },
      { category: "HUMAN_EXPLOITATION", count: 3 }
    ],
    nonViolatingErrors: 18,
    lowSample: false,
    avgSample: 123,
    whatHappening: "PAKISTAN_OTHERS is above target at 86.18% with strong improvement (+6.82pp from W1 80.28% to W4 87.10%). The market shows excellent recovery from low W1 performance.",
    whyHappening: "Improvement driven by better handling of DANGEROUS_INDIVIDUALS_AND_ORGS (20 errors, 8 high-severity). NON_VIOLATING over-flagging (18) remains an opportunity area.",
    immediateActions: [
      "Continue specialized training on DANGEROUS_INDIVIDUALS_AND_ORGS with Pakistan-specific context",
      "Implement quality reviews for high-severity DANGEROUS_INDIVIDUALS_AND_ORGS and HUMAN_EXPLOITATION cases",
      "Share top 10 NON_VIOLATING false positives in weekly briefings"
    ],
    expectedOutcome: "Eliminating NON_VIOLATING errors can improve accuracy to 90%+ within 3 weeks (potential +3.7pp gain). Strong improvement trajectory suggests team is receptive to interventions."
  },

  "RUSSIAN": {
    market: "RUSSIAN",
    accuracy: 89.22,
    status: "on-track",
    trend: "volatile",
    improvement: 3.94,
    totalErrors: 61,
    topErrors: [
      { category: "NON_VIOLATING", count: 14 },
      { category: "ADULT_SEXUAL_SOLICITATION", count: 8 },
      { category: "PORN", count: 7 }
    ],
    highSeverityCount: 2,
    highSeverityCategories: [
      { category: "FRAUD_AND_DECEPTION", count: 1 },
      { category: "SSIED", count: 1 }
    ],
    nonViolatingErrors: 14,
    lowSample: false,
    avgSample: 93,
    whatHappening: "RUSSIAN exceeds target at 89.22% with only 2 high-severity errors (lowest across all markets). Performance is volatile but trending positive (+3.94pp improvement).",
    whyHappening: "Strong high-severity error control demonstrates excellent policy understanding. NON_VIOLATING over-flagging (14 errors) is the primary opportunity for improvement.",
    immediateActions: [
      "Share top 10 NON_VIOLATING false positives in weekly briefings",
      "Document RUSSIAN team's high-severity error prevention strategies for other markets",
      "Maintain current quality standards with monthly calibration check-ins"
    ],
    expectedOutcome: "Eliminating NON_VIOLATING errors can improve accuracy to 93%+ within 2-3 weeks (potential +3.8pp gain). RUSSIAN is a strong candidate for excellence tier (90%+)."
  },

  "TURKISH": {
    market: "TURKISH",
    accuracy: 81.76,
    status: "at-risk",
    trend: "improving",
    improvement: 17.94,
    totalErrors: 105,
    topErrors: [
      { category: "NON_VIOLATING", count: 18 },
      { category: "BULLYING_AND_HARASSMENT", count: 13 },
      { category: "DANGEROUS_INDIVIDUALS_AND_ORGS", count: 12 }
    ],
    highSeverityCount: 17,
    highSeverityCategories: [
      { category: "CHILD_SEXUAL_EXPLOITATION", count: 6 },
      { category: "DANGEROUS_INDIVIDUALS_AND_ORGS", count: 5 }
    ],
    nonViolatingErrors: 18,
    lowSample: false,
    avgSample: 108,
    whatHappening: "TURKISH is below target at 81.76% but shows exceptional improvement (+17.94pp from W1 71.88% to W4 89.81%). This is the biggest improvement across all markets, reaching 89.81% in W4.",
    whyHappening: "Despite low 4-week average, W4 performance (89.81%) demonstrates the team has turned the corner. 17 high-severity errors including 6 CHILD_SEXUAL_EXPLOITATION cases require continued focus.",
    immediateActions: [
      "Document and replicate W4 success factors across future weeks",
      "Implement mandatory peer review for CHILD_SEXUAL_EXPLOITATION and DANGEROUS_INDIVIDUALS_AND_ORGS cases",
      "Share top 10 NON_VIOLATING false positives in weekly briefings"
    ],
    expectedOutcome: "Sustaining W4 performance (89.81%) will bring 4-week average to 85%+ within 2 weeks. TURKISH demonstrates that rapid improvement is achievable with focused intervention."
  },

  "UKRAINIAN": {
    market: "UKRAINIAN",
    accuracy: 86.53,
    status: "on-track",
    trend: "improving",
    improvement: 9.16,
    totalErrors: 56,
    topErrors: [
      { category: "NON_VIOLATING", count: 17 },
      { category: "FRAUD_AND_DECEPTION", count: 8 },
      { category: "PORN", count: 6 }
    ],
    highSeverityCount: 8,
    highSeverityCategories: [
      { category: "FRAUD_AND_DECEPTION", count: 6 },
      { category: "CHILD_SEXUAL_EXPLOITATION", count: 1 }
    ],
    nonViolatingErrors: 17,
    lowSample: true,
    avgSample: 84,
    whatHappening: "UKRAINIAN is above target at 86.53% with strong improvement (+9.16pp from W1 79.57% to W4 88.73%). Low sample size (84 avg) limits reliability, but trend is positive.",
    whyHappening: "Strong recovery from low W1 performance. NON_VIOLATING over-flagging (17 errors) and 6 FRAUD_AND_DECEPTION high-severity cases are primary opportunities.",
    immediateActions: [
      "Monitor trends closely and validate with spot checks rather than increasing sample targets",
      "Implement quality reviews for FRAUD_AND_DECEPTION cases with Ukrainian-specific examples",
      "Share top 10 NON_VIOLATING false positives in weekly briefings"
    ],
    expectedOutcome: "Maintain 86-90% accuracy range with continued improvement. Low sample size makes aggressive targets unrealistic; focus on sustaining improvement momentum."
  }
};
