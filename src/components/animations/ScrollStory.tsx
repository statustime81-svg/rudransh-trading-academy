
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  ChartNoAxesCombined,
  Layers3,
} from "lucide-react";

import AnimatedCandles from "./AnimatedCandles";

gsap.registerPlugin(ScrollTrigger);

export interface StoryChapter {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
}

interface ScrollStoryProps {
  chapters: StoryChapter[];
}

const chapterIcons = [
  BookOpen,
  ChartNoAxesCombined,
  Layers3,
];

export default function ScrollStory({
  chapters,
}: ScrollStoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [desktopMode, setDesktopMode] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;

    if (!section || !panel || !chapters.length) return;

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        setDesktopMode(true);

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top+=80",
          end: () =>
            `+=${window.innerHeight * chapters.length * 0.65}`,
          pin: panel,
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const index = Math.min(
              chapters.length - 1,
              Math.floor(self.progress * chapters.length)
            );

            setActiveIndex((previous) =>
              previous === index ? previous : index
            );

            if (progressRef.current) {
              progressRef.current.style.transform =
                `scaleX(${self.progress})`;
            }
          },
        });

        return () => trigger.kill();
      }
    );

    media.add(
      "(max-width: 1023px), (prefers-reduced-motion: reduce)",
      () => {
        setDesktopMode(false);
        setActiveIndex(0);
      }
    );

    return () => media.revert();
  }, [chapters]);

  if (chapters.length === 0) return null;

  const active = chapters[activeIndex] ?? chapters[0];

  if (!active) return null;

  const ActiveIcon =
    chapterIcons[activeIndex % chapterIcons.length] ??
    BookOpen;

  return (
    <div ref={sectionRef} className="relative">
      <div
        ref={panelRef}
        className="relative flex min-h-[620px] items-center overflow-hidden bg-[#081525] py-16 lg:min-h-[calc(100svh-80px)]"
      >
        <div className="container-premium grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">
              INTERACTIVE EDUCATION
            </span>

            <h3 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Understand the
              <span className="block font-display font-normal text-[#D6AD52]">
                Market Concepts.
              </span>
            </h3>

            {desktopMode ? (
              <div key={active.id} className="mt-9 animate-fade-up">
                <div className="flex items-center gap-3 text-[#D6AD52]">
                  <ActiveIcon size={21} />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {active.eyebrow}
                  </span>
                </div>

                <h4 className="mt-5 text-2xl font-semibold text-white">
                  {active.title}
                </h4>

                <p className="mt-4 max-w-lg leading-8 text-slate-300">
                  {active.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {active.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6AD52]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-9 space-y-7">
                {chapters.map((chapter, index) => {
                  const Icon =
                    chapterIcons[index % chapterIcons.length] ??
                    BookOpen;

                  return (
                    <article
                      key={chapter.id}
                      className="border-l-2 border-[#D6AD52]/40 pl-5"
                    >
                      <div className="flex items-center gap-2 text-[#D6AD52]">
                        <Icon size={18} />
                        <span className="text-xs font-semibold">
                          {chapter.eyebrow}
                        </span>
                      </div>

                      <h4 className="mt-3 text-lg font-semibold text-white">
                        {chapter.title}
                      </h4>

                      <p className="mt-3 text-sm leading-7 text-slate-400">
                        {chapter.description}
                      </p>

                      <ul className="mt-4 space-y-2 text-xs text-slate-400">
                        {chapter.points.map((point) => (
                          <li key={point}>• {point}</li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <div className="overflow-hidden rounded-[26px] border border-[#D6AD52]/20 bg-[#102035] p-5 shadow-2xl shadow-black/20 sm:p-8">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
                <span className="text-xs font-semibold tracking-[0.14em] text-[#D6AD52]">
                  MARKET VISUALIZATION
                </span>

                <span className="text-[10px] text-slate-400">
                  Educational Only
                </span>
              </div>

              <AnimatedCandles
                progress={
                  desktopMode
                    ? (activeIndex + 1) / chapters.length
                    : 1
                }
                animated={!desktopMode}
                className="mt-7 w-full"
              />

              <div className="mt-5 border-t border-white/10 pt-4 text-xs text-slate-400">
                Illustrative chart, not live market data
              </div>
            </div>

            {desktopMode && (
              <div className="mt-6">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Scroll Learning Progress</span>
                  <span>
                    {activeIndex + 1}/{chapters.length}
                  </span>
                </div>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    ref={progressRef}
                    className="h-full w-full origin-left scale-x-0 bg-[#D6AD52]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
