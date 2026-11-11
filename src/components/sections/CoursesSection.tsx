
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  BookOpen,
  ChartNoAxesCombined,
  ChartCandlestick,
  Layers3,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

import {
  course,
  curriculumModules,
} from "@/data/curriculum";


gsap.registerPlugin(ScrollTrigger);

// ===========================================
// MODULE ICONS
// ===========================================

const icons = [
  BookOpen,
  ChartNoAxesCombined,
  ChartCandlestick,
  Layers3,
];

// ===========================================
// WHATSAPP MESSAGE GENERATOR
// ===========================================

function getCourseWhatsAppUrl(
  moduleTitle: string
): string {
  const message = [
    "Hello Rudransh Trading Academy,",
    "",
    "I would like to know more about your",
    "*Basic to Advanced Stock Market Course*.",
    "",
    `*Interested Module:* ${moduleTitle}`,
    "",
    "Please share the following details:",
    "1. Detailed curriculum",
    "2. Admission procedure",
    "3. Course fees",
    "4. Upcoming batch information",
    "",
    "Thank you.",
  ].join("\n");

  return (
    `https://wa.me/916202812177?text=` +
    encodeURIComponent(message)
  );
}

// ===========================================
// COURSE CARD COMPONENT
// ===========================================

interface CourseCardProps {
  module: (typeof curriculumModules)[number];
  index: number;
}

function CourseCard({
  module,
  index,
}: CourseCardProps) {
  const [expanded, setExpanded] = useState(false);

  const Icon = icons[index] ?? BookOpen;

  const whatsappUrl = getCourseWhatsAppUrl(
    module.title
  );

  const visibleTopics = expanded
    ? module.topics
    : module.topics.slice(0, 4);

  const hasMoreTopics = module.topics.length > 4;

  return (
    <article
      data-course-reveal
      className="
        group relative flex h-full flex-col
        rounded-[22px]
        border border-[#FFD21A]/15
        bg-[#F5F3EE]/[0.025]
        p-[clamp(1rem,2vw,1.5rem)]
        transition-[transform,border-color,background-color,box-shadow]
        duration-300
        hover:-translate-y-1
        hover:border-[#FFD21A]/45
        hover:bg-[#FFD21A]/[0.035]
        hover:shadow-[0_14px_40px_rgba(0,0,0,0.2)]
        focus-within:border-[#FFD21A]/50
      "
    >
      {/* Full-card link behind interactive content */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Know more about ${module.title} on WhatsApp`}
        className="
          absolute inset-0 z-0
          rounded-[22px]
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-[#FFD21A]
        "
      />

      {/* Icon and number */}
      <div className="pointer-events-none relative z-10 flex items-center justify-between">
        <div
          className="
            flex h-11 w-11 items-center
            justify-center rounded-xl
            border border-[#FFD21A]/20
            bg-[#FFD21A]/10
            text-[#FFD21A]
            transition-transform duration-300
            group-hover:scale-105
          "
        >
          <Icon
            size={22}
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </div>

        <span className="text-2xl font-semibold text-[#FFD21A]/25">
          {module.number}
        </span>
      </div>

      {/* Module title */}
      <h3
        className="
          pointer-events-none relative z-10
          mt-4 font-display
          text-[clamp(1.35rem,2vw,1.8rem)]
          leading-snug
          text-[#F5F3EE]
        "
      >
        {module.title}
      </h3>

      {/* Short description */}
      <p className="pointer-events-none relative z-10 mt-2 line-clamp-2 text-xs leading-5 text-[#F5F3EE]/60 sm:text-[13px]">
        {module.description}
      </p>

      {/* Topics */}
      <div className="pointer-events-none relative z-10 mt-4 border-t border-[#FFD21A]/15 pt-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FFD21A]">
          Learning Topics
        </p>

        <ul className="grid gap-2 sm:grid-cols-2">
          {visibleTopics.map((topic) => (
            <li
              key={topic}
              className="flex items-start gap-2 text-xs leading-5 text-[#F5F3EE]/75"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#FFD21A]" />
              <span>{topic}</span>
            </li>
          ))}
        </ul>

        {/* Expand topics */}
        {hasMoreTopics && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => {
              setExpanded((previous) => !previous);
            }}
            className="
              pointer-events-auto relative z-20
              mt-4 inline-flex
              items-center gap-2
              text-xs font-semibold
              text-[#FFD21A]
              transition-colors
              hover:text-[#F5F3EE]
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#FFD21A]
            "
          >
            {expanded
              ? "Show Less Topics"
              : `View All ${module.topics.length} Topics`}

            <ChevronDown
              size={15}
              className={`transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* WhatsApp CTA */}
      <div
        className="
          pointer-events-none relative z-10
          mt-auto flex items-center
          justify-between gap-3
          border-t border-[#FFD21A]/15
          pt-4
        "
        style={{ marginTop: "20px" }}
      >
        <span className="flex items-center gap-2 text-xs font-semibold text-[#FFD21A]">
          <MessageCircle
            size={16}
            aria-hidden="true"
          />

          Know More on WhatsApp
        </span>

        <span
          className="
            flex h-8 w-8 shrink-0
            items-center justify-center
            rounded-full
            bg-[#FFD21A]/10
            text-[#FFD21A]
            transition-transform duration-300
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
          "
        >
          <ArrowUpRight size={17} />
        </span>
      </div>
    </article>
  );
}

// ===========================================
// MAIN COURSES SECTION
// ===========================================

export default function CoursesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          gsap.fromTo(
            "[data-course-reveal]",
            {
              opacity: 0,
              y: 28,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                once: true,
              },
            }
          );
        }, section);

        return () => context.revert();
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="courses"
      aria-labelledby="courses-heading"
      className="
        relative scroll-mt-28
        overflow-hidden
        bg-[#0B0D10]
        px-4 py-[clamp(3rem,7vh,5rem)]
        text-[#F5F3EE]
        sm:px-6 lg:px-8
      "
    >
      {/* Background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-[#FFD21A]/[0.035] blur-[90px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div
          data-course-reveal
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FFD21A]">
            Our Learning Path
          </span>

          <h2
            id="courses-heading"
            className="
              mt-3 font-display
              text-[clamp(2rem,3.5vw,3.6rem)]
              leading-tight
            "
          >
            Explore Our{" "}
            <span className="italic text-[#FFD21A]">
              Curriculum.
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[13px] leading-6 text-[#F5F3EE]/60 sm:text-sm">
            {course.description}
          </p>
        </div>

        {/* Four cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:gap-5">
          {curriculumModules.map((module, index) => (
            <CourseCard
              key={module.id}
              module={module}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Admission CTA */}
        <div
          data-course-reveal
          className="mt-9 text-center"
        >
          <p className="mb-4 text-xs text-[#F5F3EE]/55">
            One course covering four learning modules.
          </p>

          <a
            href="#admission"
            className="
              inline-flex min-h-11 items-center
              justify-center gap-2
              rounded-full bg-[#FFD21A]
              px-6 py-3
              text-sm font-semibold
              text-[#0B0D10]
              transition-transform duration-300
              hover:-translate-y-1
            "
          >
            Enquire for Admission
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
