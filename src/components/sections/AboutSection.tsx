
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  BookOpen,
  MapPin,
  ArrowRight,
  ChartNoAxesCombined,
} from "lucide-react";

import { siteConfig } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_IMAGE = "/assets/about/academy-about.webp";

const highlights = [
  {
    icon: BookOpen,
    title: "One Complete Course",
    description: "Four structured learning modules",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Market Education",
    description: "From fundamentals to derivatives",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [imageFailed, setImageFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          if (imageRef.current) {
            gsap.fromTo(
              imageRef.current,
              {
                autoAlpha: 0,
                x: -45,
                scale: 0.97,
              },
              {
                autoAlpha: 1,
                x: 0,
                scale: 1,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 82%",
                  once: true,
                },
              }
            );
          }

          const elements =
            contentRef.current?.querySelectorAll<HTMLElement>(
              "[data-about-reveal]"
            );

          if (elements?.length) {
            gsap.fromTo(
              elements,
              {
                autoAlpha: 0,
                y: 26,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  once: true,
                },
              }
            );
          }
        }, section);

        return () => ctx.revert();
      }
    );

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const artwork = artworkRef.current;
        if (!artwork) return;

        const tween = gsap.fromTo(
          artwork,
          {
            yPercent: -1,
          },
          {
            yPercent: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.3,
            },
          }
        );

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="
        relative scroll-mt-28 overflow-hidden
        bg-[#0B0D10]
        px-[clamp(1rem,4vw,4rem)]
        py-[clamp(3rem,7vh,5.5rem)]
        text-[#F5F3EE]
      "
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-40 top-[15%] h-[35vw] w-[35vw] min-h-72 min-w-72 rounded-full bg-[#FFD21A]/[0.045] blur-[110px]" />

        <div className="absolute -right-40 bottom-0 h-[30vw] w-[30vw] min-h-64 min-w-64 rounded-full bg-[#FFD21A]/[0.025] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid items-center gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT: PREMIUM IMAGE */}
          <div
            ref={imageRef}
            className="relative mx-auto w-full max-w-[480px] lg:mx-0"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[26px] border border-[#FFD21A]/10"
            />

            <div
              className="
                group relative aspect-[4/5] w-full
                overflow-hidden rounded-[26px]
                border border-[#FFD21A]/25
                bg-[#100E0B]
                shadow-[0_28px_85px_rgba(0,0,0,0.38)]
              "
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,210,26,0.13),transparent_70%)]"
              />

              {/* Gold illustration */}
              <div
                ref={artworkRef}
                className="absolute inset-0 flex items-center justify-center"
              >
                {!imageFailed ? (
                  <img
                    src={ABOUT_IMAGE}
                    alt="Golden bull illustration representing stock market education"
                    loading="lazy"
                    decoding="async"
                    className="
                      h-full w-full scale-[1.06] object-cover object-center
                      transition-transform duration-700
                      ease-out
                      group-hover:scale-[1.035]
                    "
                    onError={() => setImageFailed(true)}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                    {!logoFailed ? (
                      <img
                        src={siteConfig.branding.logo}
                        alt="Rudransh Trading Academy"
                        className="h-32 w-32 object-contain sm:h-40 sm:w-40"
                        onError={() => setLogoFailed(true)}
                      />
                    ) : (
                      <span className="font-display text-6xl text-[#FFD21A]">
                        RTA
                      </span>
                    )}

                    <span className="text-center text-xs font-semibold tracking-[0.16em] text-[#FFD21A]">
                      RUDRANSH TRADING ACADEMY
                    </span>
                  </div>
                )}
              </div>

              {/* Subtle vignette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0D10]/70 via-transparent to-[#0B0D10]/10"
              />

              {/* Top badge */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-[#FFD21A]/25 bg-[#0B0D10]/75 px-3 py-2 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFD21A]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#FFE15C]">
                  Rudransh / Patna
                </span>
              </div>

              {/* Bottom caption */}
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 border-t border-[#FFD21A]/20 pt-3">
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#F5F3EE]/70">
                  Learn • Understand • Analyze
                </span>

                <ArrowUpRight
                  size={18}
                  className="text-[#FFD21A]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div ref={contentRef} className="min-w-0">
            {/* Eyebrow */}
            <div
              data-about-reveal
              className="flex items-center gap-3"
            >
              <span className="h-px w-9 bg-[#FFD21A]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFD21A]">
                About The Academy
              </span>
            </div>

            {/* Heading */}
            <h2
              id="about-heading"
              data-about-reveal
              className="
                mt-5 font-display
                text-[clamp(2.3rem,4.2vw,4.8rem)]
                leading-[1.08]
                tracking-[-0.035em]
              "
            >
              Where Knowledge
              <span className="mt-1 block italic text-[#FFD21A]">
                Meets the Market.
              </span>
            </h2>

            {/* Lead paragraph */}
            <p
              data-about-reveal
              className="mt-5 max-w-[540px] text-[clamp(1rem,1.4vw,1.15rem)] font-medium leading-[1.7]"
            >
              A foundation for understanding financial
              markets.
            </p>

            {/* Description */}
            <p
              data-about-reveal
              className="mt-3 max-w-[550px] text-[clamp(0.85rem,1.1vw,0.98rem)] leading-[1.9] text-[#F5F3EE]/60"
            >
              Rudransh Trading Academy, located in
              Punpun, Patna, Bihar, offers a Basic to
              Advanced Stock Market Course covering
              market fundamentals, fundamental analysis,
              technical analysis and futures &amp; options.
            </p>

            {/* Course highlights */}
            <div
              data-about-reveal
              className="mt-6 grid gap-3 sm:grid-cols-2"
            >
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      group rounded-2xl border
                      border-[#FFD21A]/15
                      bg-[#F5F3EE]/[0.025]
                      p-[clamp(0.9rem,1.5vw,1.25rem)]
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-[#FFD21A]/40
                      hover:bg-[#FFD21A]/[0.04]
                    "
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FFD21A]/20 bg-[#FFD21A]/10 text-[#FFD21A]">
                        <Icon
                          size={19}
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </span>

                      <div>
                        <h3 className="text-[13px] font-semibold text-[#F5F3EE]">
                          {item.title}
                        </h3>

                        <p className="mt-1.5 text-xs leading-5 text-[#F5F3EE]/55">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Location */}
            <div
              data-about-reveal
              className="mt-5 flex items-center gap-2 text-xs text-[#F5F3EE]/55"
            >
              <MapPin
                size={16}
                className="shrink-0 text-[#FFD21A]"
              />

              <span>
                Dularpur, Punpun, Patna, Bihar
              </span>
            </div>

            {/* CTA */}
            <div
              data-about-reveal
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <a
                href="#courses"
                className="
                  group inline-flex min-h-12
                  items-center justify-center gap-3
                  rounded-full bg-[#FFD21A]
                  px-6 py-3 text-sm font-semibold
                  text-[#0B0D10]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_12px_35px_rgba(255,210,26,0.2)]
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#FFD21A]
                "
              >
                Explore Curriculum

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href="#contact"
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#F5F3EE]/80 transition-colors hover:text-[#FFD21A]"
              >
                Contact Academy

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
