
import {
  ArrowUpRight,
  BookOpen,
  ChartCandlestick,
  ChartNoAxesCombined,
  Layers3,
} from "lucide-react";

import Reveal from "@/components/animations/Reveal";
import TiltCard from "@/components/animations/TiltCard";

const benefits = [
  {
    number: "01",
    icon: BookOpen,
    title: "Market Fundamentals",
    description:
      "Explore stock exchanges, market participants and basic trading and investing concepts.",
  },
  {
    number: "02",
    icon: ChartNoAxesCombined,
    title: "Fundamental Analysis",
    description:
      "Discover company analysis, financial statements, ratios and valuation concepts.",
  },
  {
    number: "03",
    icon: ChartCandlestick,
    title: "Technical Analysis",
    description:
      "Study candlestick patterns, support and resistance, trendlines and price action concepts.",
  },
  {
    number: "04",
    icon: Layers3,
    title: "Derivatives Education",
    description:
      "Explore futures, options, option chains, Greeks and risk management concepts.",
  },
];

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      aria-labelledby="benefits-heading"
      className="scroll-mt-24 bg-[#071426] py-24 sm:py-32"
    >
      <div className="container-premium">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">
              EXPLORE THE LEARNING AREAS
            </span>

            <h2
              id="benefits-heading"
              className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              What Will You
              <span className="ml-3 font-display font-normal text-[#FFD21A]">
                Explore?
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400">
              The Basic to Advanced Stock Market Course
              includes four learning areas covering
              financial-market concepts and analysis.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <Reveal
                key={benefit.number}
                delay={index * 0.08}
                className="h-full"
              >
                <TiltCard
                  className="h-full rounded-[22px] border border-white/10 bg-[#102035]"
                  maxTilt={4}
                >
                  <article className="relative flex h-full min-h-[310px] flex-col p-7">
                    <div className="flex items-start justify-between">
                      <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-[#FFD21A]/20 bg-[#FFD21A]/10 text-[#FFD21A]">
                        <Icon size={25} />
                      </div>

                      <span className="text-sm font-semibold text-[#FFD21A]/60">
                        {benefit.number}
                      </span>
                    </div>

                    <h3 className="mt-9 text-xl font-semibold text-white">
                      {benefit.title}
                    </h3>

                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-400">
                      {benefit.description}
                    </p>

                    <a
                      href="#courses"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#FFD21A]"
                    >
                      View Curriculum
                      <ArrowUpRight size={16} />
                    </a>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
