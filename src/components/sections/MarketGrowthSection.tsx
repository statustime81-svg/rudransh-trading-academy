
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  BookOpen,
  ChartNoAxesCombined,
  ShieldCheck,
} from "lucide-react";

import MarketGrowthVisual from
  "@/components/animations/MarketGrowthVisual";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  {
    icon: BookOpen,
    label: "Market Fundamentals",
  },
  {
    icon: ChartNoAxesCombined,
    label: "Technical Analysis",
  },
  {
    icon: ShieldCheck,
    label: "Risk Management Concepts",
  },
];

export default function MarketGrowthSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            "[data-growth-reveal]",
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                once: true,
              },
            }
          );
        }, section);

        return () => ctx.revert();
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="market-experience"
      aria-labelledby="market-growth-heading"
      className="
        relative scroll-mt-28 overflow-hidden
        bg-[#0B0D10]
        px-5 py-[clamp(3rem,6vh,5rem)]
        text-[#F5F3EE]
        sm:px-8 lg:px-10
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Compact section heading */}
        <div
          data-growth-reveal
          className="mx-auto mb-9 max-w-3xl text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFD21A]">
            The Learning Experience
          </p>

          <h2
            id="market-growth-heading"
            className="mt-3 font-display text-[clamp(2.3rem,4vw,4rem)] leading-[1.12]"
          >
            Explore the Market.
            <span className="block italic text-[#FFD21A]">
              One Concept at a Time.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#F5F3EE]/65">
            Learn financial market concepts through
            structured education and visual illustrations.
          </p>
        </div>

        {/* Left text + right moving chart */}
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div data-growth-reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFD21A]">
              Interactive Education
            </p>

            <h3 className="mt-4 font-display text-[clamp(2rem,3.2vw,3.5rem)] leading-[1.13]">
              Understand the
              <span className="block italic text-[#FFD21A]">
                Market Concepts.
              </span>
            </h3>

            <p className="mt-5 max-w-lg text-sm leading-7 text-[#F5F3EE]/65">
              Explore how financial charts represent
              changes over time. Discover market
              fundamentals, analysis concepts and
              risk management as part of the academy's
              curriculum.
            </p>

            <div className="mt-6 space-y-3">
              {topics.map((topic) => {
                const Icon = topic.icon;

                return (
                  <div
                    key={topic.label}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#FFD21A]/20 bg-[#FFD21A]/10 text-[#FFD21A]">
                      <Icon
                        size={17}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </span>

                    <span className="text-sm text-[#F5F3EE]/85">
                      {topic.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <a
              href="#courses"
              className="
                mt-8 inline-flex items-center gap-2
                rounded-full bg-[#FFD21A]
                px-6 py-3.5 text-sm font-semibold
                text-[#0B0D10]
                transition-transform duration-300
                hover:-translate-y-1
              "
            >
              Explore Curriculum
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="min-w-0">
            <MarketGrowthVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
