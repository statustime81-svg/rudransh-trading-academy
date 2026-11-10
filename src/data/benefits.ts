
export type BenefitIcon =
  | "book"
  | "analysis"
  | "candles"
  | "layers";

export interface LearningBenefit {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: BenefitIcon;
  verified: boolean;
}

export const learningBenefits: LearningBenefit[] = [
  {
    id: "market-fundamentals",
    number: "01",
    title: "Market Fundamentals",

    description:
      "Explore the fundamentals of stock markets, exchanges, market participants, and trading concepts.",

    icon: "book",
    verified: true,
  },

  {
    id: "fundamental-analysis",
    number: "02",
    title: "Fundamental Analysis",

    description:
      "Explore company financials, ratios, valuation concepts, and business analysis.",

    icon: "analysis",
    verified: true,
  },

  {
    id: "technical-analysis",
    number: "03",
    title: "Technical Analysis",

    description:
      "Explore candlestick patterns, chart formations, support and resistance, and price action.",

    icon: "candles",
    verified: true,
  },

  {
    id: "futures-options",
    number: "04",
    title: "Futures & Options",

    description:
      "Explore derivatives concepts, option chains, hedging, and risk management.",

    icon: "layers",
    verified: true,
  },
];

export function getLearningBenefits(): LearningBenefit[] {
  return learningBenefits.filter(
    (benefit) => benefit.verified
  );
}
