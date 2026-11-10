
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  ShieldCheck,
} from "lucide-react";

import Reveal from "@/components/animations/Reveal";
import ScrollStory, {
  type StoryChapter,
} from "@/components/animations/ScrollStory";

const storyChapters: StoryChapter[] = [
  {
    id: "market-foundations",
    eyebrow: "CHAPTER 01 / FOUNDATIONS",
    title: "Understand the Stock Market",
    description:
      "Discover the foundational concepts of financial markets, stock exchanges, and trading.",
    points: [
      "Stock market fundamentals",
      "Market participants",
      "Trading and investing basics",
    ],
  },
  {
    id: "market-analysis",
    eyebrow: "CHAPTER 02 / ANALYSIS",
    title: "Explore Market Analysis",
    description:
      "Learn the concepts behind chart patterns, price movements, and technical analysis.",
    points: [
      "Candlestick chart concepts",
      "Support and resistance",
      "Price action and indicators",
    ],
  },
  {
    id: "derivatives",
    eyebrow: "CHAPTER 03 / DERIVATIVES",
    title: "Explore Futures & Options",
    description:
      "Build an understanding of futures, options, hedging concepts, and associated financial risks.",
    points: [
      "Futures and options basics",
      "Option chain and Greeks",
      "Risk management concepts",
    ],
  },
];

export default function MarketStorySection() {
  return (
    <section
      id="market-experience"
      aria-labelledby="market-story-title"
      className="relative overflow-hidden border-y border-white/[0.06] bg-[#081525]"
    >
      <div className="container-premium py-20 text-center sm:py-24">
        <Reveal>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6AD52]/20 bg-[#D6AD52]/10 text-[#D6AD52]">
            <ChartNoAxesCombined size={27} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow mt-7">
            THE LEARNING EXPERIENCE
          </span>

          <h2
            id="market-story-title"
            className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Explore the Market.
            <span className="mt-2 block font-display font-normal text-[#D6AD52]">
              One Concept at a Time.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300">
            Follow an animated educational journey through
            stock market foundations, technical analysis,
            and derivatives concepts.
          </p>
        </Reveal>
      </div>

      <ScrollStory chapters={storyChapters} />

      <div className="container-premium py-20 sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-4xl rounded-[26px] border border-[#D6AD52]/15 bg-[#101F33] p-7 text-center sm:p-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#D6AD52]/10 text-[#D6AD52]">
              <ShieldCheck size={25} />
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">
              Education Before Execution.
            </h3>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
              These animations illustrate educational
              concepts only. They do not represent live
              market data, actual trading performance,
              investment recommendations, or guaranteed
              returns.
            </p>

            <a
              href="#admission"
              className="btn-gold mt-8"
            >
              Enquire About the Course
              <ArrowUpRight size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
