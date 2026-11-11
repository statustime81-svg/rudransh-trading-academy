
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  BookOpen,
  ChartNoAxesCombined,
  GraduationCap,
  MapPin,
} from "lucide-react";

import { siteConfig } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const learningAreas = [
  {
    icon: BookOpen,
    title: "Market Fundamentals",
    description: "Understanding stock market basics",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Technical Analysis",
    description: "Charts, patterns and market concepts",
  },
];

export default function TrainerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          if (imageRef.current) {
            gsap.fromTo(
              imageRef.current,
              {
                opacity: 0,
                x: -55,
              },
              {
                opacity: 1,
                x: 0,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  once: true,
                },
              }
            );
          }

          if (contentRef.current) {
            const elements =
              contentRef.current.querySelectorAll(
                "[data-trainer-reveal]"
              );

            gsap.fromTo(
              elements,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 78%",
                  once: true,
                },
              }
            );
          }
        }, section);

        return () => context.revert();
      }
    );

    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const image = imageInnerRef.current;

        if (!image) return;

        const tween = gsap.fromTo(
          image,
          {
            yPercent: -1,
            scale: 1.02,
          },
          {
            yPercent: 1,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trainer"
      aria-labelledby="trainer-heading"
      className="relative scroll-mt-28 overflow-hidden bg-[#0B0D10] py-20 text-[#F5F3EE] lg:py-28"
    >
      {/* Background lighting */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-[450px] w-[450px] rounded-full bg-[#FFD21A]/[0.04] blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">

          {/* LEFT: TRAINER PHOTO */}

          <div
            ref={imageRef}
            className="group relative mx-auto w-full max-w-[480px] lg:mx-0"
          >
            {/* Outer decorative border */}

            <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-[#FFD21A]/15" />

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[26px] border border-[#FFD21A]/25 bg-[#161719] shadow-[0_30px_90px_rgba(0,0,0,0.4)]">

              {/* Actual trainer image */}

              <div
                ref={imageInnerRef}
                className="absolute inset-0 h-full w-full"
              >
                {!imageError ? (
                  <img
                    src={siteConfig.trainer.image}
                    alt={`${siteConfig.trainer.name}, trainer at Rudransh Trading Academy`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full scale-[1.06] object-cover object-top"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,210,26,0.12),transparent_65%)] px-6 text-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#FFD21A]/30 bg-[#FFD21A]/10">
                      <GraduationCap
                        size={54}
                        strokeWidth={1.2}
                        className="text-[#FFD21A]"
                      />
                    </div>

                    <p className="mt-6 font-display text-3xl text-[#F5F3EE]">
                      Rajesh Kumar
                    </p>

                    <p className="mt-2 text-sm text-[#FFD21A]">
                      Academy Trainer
                    </p>
                  </div>
                )}
              </div>

              {/* Photo gradient */}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0D10]/90 via-[#0B0D10]/10 to-transparent" />

              {/* Top decorative label */}

              <div className="absolute left-5 top-5 rounded-full border border-[#FFD21A]/30 bg-[#0B0D10]/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FFD21A] backdrop-blur-lg">
                Meet Your Trainer
              </div>

              {/* Bottom trainer details */}

              <div className="absolute bottom-7 left-6 right-6 sm:bottom-9 sm:left-9">
                <div className="mb-4 h-px w-12 bg-[#FFD21A]" />

                <h3 className="font-display text-3xl text-[#F5F3EE] sm:text-4xl">
                  {siteConfig.trainer.name}
                </h3>

                <p className="mt-2 text-sm font-medium text-[#FFD21A]">
                  {siteConfig.trainer.title}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: TRAINER CONTENT */}

          <div
            ref={contentRef}
            className="relative py-2 lg:py-6"
          >
            {/* Eyebrow */}

            <div
              data-trainer-reveal
              className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFD21A]"
            >
              <span className="h-px w-9 bg-[#FFD21A]" />
              THE PERSON BEHIND THE LEARNING
            </div>

            {/* Heading */}

            <h2
              id="trainer-heading"
              data-trainer-reveal
              className="mt-7 font-display text-[clamp(3rem,5vw,5.4rem)] leading-[1.08] tracking-[-0.035em]"
            >
              Meet Your
              <span className="mt-2 block italic text-[#FFD21A]">
                Trainer.
              </span>
            </h2>

            {/* Trainer name */}

            <div
              data-trainer-reveal
              className="mt-8"
            >
              <h3 className="text-2xl font-semibold text-[#F5F3EE]">
                {siteConfig.trainer.name}
              </h3>

              <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-[#FFD21A]">
                {siteConfig.trainer.title}
              </p>
            </div>

            {/* Description */}

            <p
              data-trainer-reveal
              className="mt-7 max-w-xl text-[15px] leading-8 text-[#F5F3EE]/70"
            >
              Meet Rajesh Kumar, introduced in the academy's
              course information as a stock market trainer
              and educator. Explore the topics covered by
              Rudransh Trading Academy's Basic to Advanced
              Stock Market Course.
            </p>

            {/* Divider */}

            <div
              data-trainer-reveal
              className="my-9 h-px w-full bg-[#FFD21A]/20"
            />

            {/* Learning areas */}

            <div
              data-trainer-reveal
              className="grid gap-4 sm:grid-cols-2"
            >
              {learningAreas.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-[#FFD21A]/15 bg-[#F5F3EE]/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD21A]/35 hover:bg-[#FFD21A]/[0.045]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FFD21A]/20 bg-[#FFD21A]/10 text-[#FFD21A]">
                      <Icon
                        size={22}
                        strokeWidth={1.7}
                      />
                    </div>

                    <h4 className="mt-5 text-sm font-semibold text-[#F5F3EE]">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-xs leading-6 text-[#F5F3EE]/60">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Location */}

            <div
              data-trainer-reveal
              className="mt-7 flex items-center gap-3 text-sm text-[#F5F3EE]/60"
            >
              <MapPin
                size={18}
                className="shrink-0 text-[#FFD21A]"
              />

              Rudransh Trading Academy, Punpun, Patna
            </div>

            {/* CTA */}

            <div
              data-trainer-reveal
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <a
                href="#courses"
                className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#FFD21A] px-7 py-3.5 text-sm font-semibold text-[#0B0D10] shadow-[0_12px_35px_rgba(255,210,26,0.13)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E7C577]"
              >
                Explore the Course

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href="#admission"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#F5F3EE] transition-colors hover:text-[#FFD21A]"
              >
                Admission Enquiry
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
