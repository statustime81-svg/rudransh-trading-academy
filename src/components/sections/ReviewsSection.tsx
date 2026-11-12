import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
  Quote,
  Star,
  ChevronDown,
} from "lucide-react";

import type { GoogleReview } from "@/data/reviews";

gsap.registerPlugin(ScrollTrigger);

const AUTOPLAY_SECONDS = 4.5;

type ReviewsSectionProps = {
  reviews: GoogleReview[];
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

function ReviewStars({ rating }: { rating: number }) {
  const total = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${total} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          strokeWidth={1.4}
          fill={index < total ? "#16A34A" : "none"}
          className={
            index < total
              ? "text-[#16A34A]"
              : "text-[#F87171]/20"
          }
        />
      ))}
    </div>
  );
}

export default function ReviewsSection({
  reviews,
}: ReviewsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const touchStartRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] =
    useState(false);

  const total = reviews.length;
  const currentIndex = total ? activeIndex % total : 0;
  const activeReview = reviews[currentIndex];

  const nextReview = useCallback(() => {
    if (total <= 1) return;
    setExpanded(false);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const previousReview = useCallback(() => {
    if (total <= 1) return;
    setExpanded(false);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const canAutoplay =
    total > 1 &&
    !paused &&
    !hovered &&
    !expanded &&
    visible &&
    pageVisible &&
    !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const handleMotion = () => {
      setReducedMotion(media.matches);
    };

    const handleVisibility = () => {
      setPageVisible(!document.hidden);
    };

    handleMotion();
    handleVisibility();

    media.addEventListener("change", handleMotion);
    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      media.removeEventListener("change", handleMotion);
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry?.isIntersecting ?? false);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            "[data-review-reveal]",
            {
              autoAlpha: 0,
              y: 24,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
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

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    gsap.killTweensOf(content);

    if (reducedMotion) {
      gsap.set(content, { clearProps: "all" });
      return;
    }

    const timeline = gsap.timeline();

    timeline.fromTo(
      content,
      {
        autoAlpha: 0,
        y: 16,
        x: 20,
      },
      {
        autoAlpha: 1,
        y: 0,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    return () => {
      timeline.kill();
      gsap.set(content, { clearProps: "all" });
    };
  }, [currentIndex, reducedMotion]);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    gsap.killTweensOf(bar);
    gsap.set(bar, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    if (!canAutoplay) return;

    const tween = gsap.to(bar, {
      scaleX: 1,
      duration: AUTOPLAY_SECONDS,
      ease: "none",
      onComplete: nextReview,
    });

    return () => {
      tween.kill();
    };
  }, [currentIndex, canAutoplay, nextReview]);

  const handleTouchStart = (
    event: TouchEvent<HTMLDivElement>
  ) => {
    const touch = event.touches[0];
    if (!touch) return;

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (
    event: TouchEvent<HTMLDivElement>
  ) => {
    const start = touchStartRef.current;
    const end = event.changedTouches[0];

    touchStartRef.current = null;

    if (!start || !end) return;

    const dx = end.clientX - start.x;
    const dy = end.clientY - start.y;

    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) {
      return;
    }

    if (dx < 0) nextReview();
    else previousReview();
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative scroll-mt-28 overflow-hidden bg-[#0B0D10] px-4 py-16 text-[#F5F3EE] sm:px-6 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#16A34A]/[0.035] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div
          data-review-reveal
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#16A34A]">
            Student Testimonials
          </p>

          <h2
            id="reviews-heading"
            className="mt-3 font-display text-[clamp(2.1rem,4vw,4rem)] leading-[1.08]"
          >
            Learner{" "}
            <span className="italic text-[#16A34A]">
              Stories.
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#F5F3EE]/55">
            Real feedback shared in Google reviews
            by learners of Rudransh Trading Academy.
          </p>
        </div>

        {activeReview ? (
          <div
            data-review-reveal
            className="mx-auto mt-8 max-w-[980px]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="overflow-hidden rounded-[28px] border border-[#16A34A]/20 bg-[#070B12] shadow-[0_25px_70px_rgba(0,0,0,0.32)]">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#16A34A]/80 to-transparent" />

              <div className="px-5 py-5 sm:px-7 sm:py-6 lg:px-8">
                {/* Top row */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#16A34A]">
                      Learner Stories /{" "}
                      {String(currentIndex + 1).padStart(
                        2,
                        "0"
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={previousReview}
                      aria-label="Previous review"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#16A34A]/30 text-[#16A34A] transition-all duration-300 hover:bg-[#16A34A]/10"
                    >
                      <ArrowLeft size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={nextReview}
                      aria-label="Next review"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16A34A] text-[#0B0D10] transition-all duration-300 hover:scale-105"
                    >
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </div>

                {/* Main content */}
                <div
                  ref={contentRef}
                  className="mt-5"
                >
                  <Quote
                    size={24}
                    strokeWidth={1.8}
                    className="text-[#F87171]"
                  />

                  <blockquote
                    className={[
                      "mt-4 whitespace-pre-line font-semibold",
                      "text-[clamp(1.45rem,2.1vw,2.2rem)]",
                      "leading-[1.45] tracking-[-0.02em]",
                      "text-[#F5F3EE]",
                      !expanded ? "line-clamp-3" : "",
                    ].join(" ")}
                  >
                    {activeReview.text
                      ? activeReview.text
                      : "No written comment was included with this review."}
                  </blockquote>

                  {activeReview.text &&
                    activeReview.text.length > 180 && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded((prev) => !prev)
                        }
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#16A34A] transition-colors hover:text-white"
                      >
                        {expanded
                          ? "Show Less"
                          : "Read Full Review"}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}

                  {/* Bottom row */}
                  <div className="mt-6 flex flex-col gap-4 border-t border-[#16A34A]/12 pt-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#16A34A]/35 bg-[#16A34A]/10 font-semibold text-[#16A34A]">
                        {getInitials(activeReview.name)}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {activeReview.name}
                        </h3>
                        <p className="mt-1 text-sm text-[#F5F3EE]/55">
                          Google Review
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <ReviewStars
                        rating={activeReview.rating}
                      />
                      <p className="text-xs text-[#F5F3EE]/45">
                        {activeReview.postedLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom controls row */}
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="h-[2px] overflow-hidden rounded-full bg-[#16A34A]/15">
                      <div
                        ref={progressRef}
                        className="h-full w-full origin-left scale-x-0 bg-[#16A34A]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPaused((prev) => !prev)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#16A34A]/20 text-[#16A34A] transition-colors hover:bg-[#16A34A]/10"
                      aria-label={
                        paused
                          ? "Resume autoplay"
                          : "Pause autoplay"
                      }
                    >
                      {paused ? (
                        <Play
                          size={14}
                          fill="currentColor"
                        />
                      ) : (
                        <Pause
                          size={14}
                          fill="currentColor"
                        />
                      )}
                    </button>

                    <a
                      href="https://maps.app.goo.gl/wqbJAvUE3t3rhXN79"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#16A34A] transition-colors hover:text-white"
                    >
                      View on Google
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-right text-[11px] text-[#F5F3EE]/40">
              {activeIndex + 1} / {total}
            </p>
          </div>
        ) : (
          <p className="mt-8 text-center text-sm text-[#F5F3EE]/60">
            No reviews available.
          </p>
        )}

        <p className="mx-auto mt-7 max-w-xl text-center text-[10px] leading-5 text-[#F5F3EE]/40">
          Reviews are shown from supplied Google
          review content. Individual experiences may
          vary.
        </p>
      </div>
    </section>
  );
}