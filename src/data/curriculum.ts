
export interface CurriculumModule {
  id: string;
  number: string;
  title: string;
  description: string;
  topics: string[];
  icon: "book" | "chart" | "candles" | "layers";
}

export const course = {
  id: "basic-to-advanced-stock-market",

  title: "Basic to Advanced Stock Market Course",

  subtitle:
    "A structured introduction to financial markets, analysis, and derivatives.",

  description:
    "Explore core stock market concepts through four curriculum modules covering market fundamentals, company analysis, price charts, and futures & options.",

  duration: null,
  fee: null,

  modules: [
    {
      id: "market-basics",
      number: "01",
      title: "Basics of Stock Market",
      description:
        "Understand how stock markets work and explore essential market concepts.",
      icon: "book",
      topics: [
        "Introduction to Stock Market",
        "Primary and Secondary Markets",
        "Stock Exchanges",
        "Market Participants",
        "Trading and Investing Basics",
        "Demat and Trading Accounts",
      ],
    },
    {
      id: "fundamental-analysis",
      number: "02",
      title: "Fundamental Analysis",
      description:
        "Explore how companies and financial information are analyzed.",
      icon: "chart",
      topics: [
        "Introduction to Fundamental Analysis",
        "Company Analysis",
        "Financial Statements",
        "Financial Ratios",
        "Valuation Concepts",
        "Business and Industry Analysis",
      ],
    },
    {
      id: "technical-analysis",
      number: "03",
      title: "Technical Analysis",
      description:
        "Learn the concepts used to interpret price movements and market charts.",
      icon: "candles",
      topics: [
        "Introduction to Technical Analysis",
        "Candlestick Patterns",
        "Support and Resistance",
        "Trendlines",
        "Chart Patterns",
        "Technical Indicators",
        "Price Action Concepts",
      ],
    },
    {
      id: "futures-options",
      number: "04",
      title: "Futures & Options",
      description:
        "Explore derivatives concepts and associated market risks.",
      icon: "layers",
      topics: [
        "Introduction to Derivatives",
        "Futures Contracts",
        "Options Basics",
        "Call and Put Options",
        "Option Chain",
        "Option Greeks",
        "Hedging Concepts",
        "Risk Management",
      ],
    },
  ] satisfies CurriculumModule[],
} as const;

export const curriculumModules = course.modules;

export type Course = typeof course;
