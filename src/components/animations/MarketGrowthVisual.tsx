
import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mainPath =
  "M 0 440 L 90 395 L 150 415 L 230 310 " +
  "L 310 360 L 410 240 L 490 295 " +
  "L 590 190 L 680 255 L 770 170 " +
  "L 860 205 L 970 90 L 1080 15";

const secondaryPath =
  "M 0 475 L 95 445 L 185 450 L 260 365 " +
  "L 340 395 L 430 305 L 515 345 " +
  "L 610 275 L 695 300 L 795 220 " +
  "L 885 240 L 975 160 L 1080 115";

const dataLabels = [
  { x: 160, y: 265, text: "+7.14" },
  { x: 375, y: 172, text: "+2.18" },
  { x: 600, y: 312, text: "+31.6" },
  { x: 845, y: 108, text: "+40.2" },
  { x: 920, y: 355, text: "+16.3" },
];

const backgroundNumbers = [
  { x: 65, y: 95, text: "+0.19" },
  { x: 260, y: 140, text: "143.20" },
  { x: 480, y: 410, text: "+8.36" },
  { x: 725, y: 55, text: "219.40" },
  { x: 910, y: 460, text: "+12.8" },
  { x: 1050, y: 260, text: "243.1" },
];

const dots = Array.from({ length: 32 }, (_, index) => ({
  x: (index * 127 + 63) % 1080,
  y: (index * 83 + 29) % 520,
  radius: index % 5 === 0 ? 2.2 : 1,
}));

export default function MarketGrowthVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const secondaryRef = useRef<SVGPathElement>(null);
  const pointRef = useRef<SVGGElement>(null);
  const arrowRef = useRef<SVGGElement>(null);

  const uniqueId = useId().replace(/:/g, "");
  const gradientId = `market-green-${uniqueId}`;
  const glowId = `market-glow-${uniqueId}`;
  const areaId = `market-area-${uniqueId}`;

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    const glow = glowRef.current;
    const secondary = secondaryRef.current;
    const point = pointRef.current;
    const arrow = arrowRef.current;

    if (
      !container ||
      !path ||
      !glow ||
      !secondary ||
      !point ||
      !arrow
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const length = path.getTotalLength();
      const secondaryLength = secondary.getTotalLength();

      const movePoint = (progress: number) => {
        const distance = length * progress;
        const position = path.getPointAtLength(distance);

        gsap.set(point, {
          x: position.x,
          y: position.y,
        });
      };

      const media = gsap.matchMedia();

      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const progress = { value: 0 };

          gsap.set([path, glow], {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          gsap.set(secondary, {
            strokeDasharray: secondaryLength,
            strokeDashoffset: secondaryLength,
          });

          gsap.set(arrow, {
            autoAlpha: 0,
            scale: 0.75,
            transformOrigin: "center center",
          });

          gsap.set(
            container.querySelectorAll("[data-market-label]"),
            { autoAlpha: 0, y: 12 }
          );

          movePoint(0);

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: container,
              start: "top 88%",
              end: "bottom 22%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          timeline.to(
            progress,
            {
              value: 1,
              duration: 1,
              onUpdate: () => {
                movePoint(progress.value);
              },
            },
            0
          );

          timeline.to(
            [path, glow],
            {
              strokeDashoffset: 0,
              duration: 1,
            },
            0
          );

          timeline.to(
            secondary,
            {
              strokeDashoffset: 0,
              duration: 0.9,
            },
            0.1
          );

          timeline.to(
            arrow,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.15,
              ease: "power2.out",
            },
            0.83
          );

          timeline.to(
            container.querySelectorAll("[data-market-label]"),
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.035,
              duration: 0.2,
            },
            0.2
          );

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        }
      );

      media.add(
        "(prefers-reduced-motion: reduce)",
        () => {
          gsap.set([path, glow, secondary], {
            strokeDasharray: "none",
            strokeDashoffset: 0,
          });

          gsap.set(arrow, {
            autoAlpha: 1,
            scale: 1,
          });

          gsap.set(
            container.querySelectorAll("[data-market-label]"),
            {
              autoAlpha: 1,
              y: 0,
            }
          );

          movePoint(1);
        }
      );

      return () => media.revert();
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Illustrative financial market chart showing an upward trend. The graph animates as the page scrolls."
      className="
        relative w-full overflow-hidden
        rounded-[26px]
        border border-[#D6AD52]/15
        bg-[#04120D]
        shadow-[0_30px_85px_rgba(0,0,0,0.35)]
      "
    >
      {/* Atmospheric lighting */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_75%_35%,rgba(0,255,100,0.12),transparent_48%),radial-gradient(ellipse_at_20%_70%,rgba(0,180,90,0.10),transparent_48%)]
        "
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020907]/80"
      />

      <div className="relative px-3 pt-4 sm:px-5 sm:pt-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#39E88A]">
              Market Growth Visualization
            </p>

            <p className="mt-1 text-xs text-white/45">
              Educational illustration
            </p>
          </div>

          <span className="rounded-full border border-[#39E88A]/20 bg-[#39E88A]/10 px-3 py-1.5 text-[10px] text-[#9DFFC5]">
            Scroll to explore
          </span>
        </div>

        <svg
          viewBox="0 0 1080 540"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-3 block h-auto w-full"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0" stopColor="#00A94F" />
              <stop offset=".65" stopColor="#14EF69" />
              <stop offset="1" stopColor="#8BFF46" />
            </linearGradient>

            <linearGradient
              id={areaId}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0"
                stopColor="#20F875"
                stopOpacity=".18"
              />
              <stop
                offset="1"
                stopColor="#20F875"
                stopOpacity="0"
              />
            </linearGradient>

            <filter
              id={glowId}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>

          {/* Financial terminal grid */}
          <g stroke="#8BFFCB" strokeOpacity=".075">
            {Array.from({ length: 13 }, (_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 90}
                x2={i * 90}
                y1="0"
                y2="540"
              />
            ))}

            {Array.from({ length: 7 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                x2="1080"
                y1={i * 90}
                y2={i * 90}
              />
            ))}
          </g>

          {/* Soft financial numbers in background */}
          {backgroundNumbers.map((item) => (
            <text
              key={`${item.x}-${item.y}`}
              x={item.x}
              y={item.y}
              fill="#4DEB95"
              opacity=".13"
              fontSize="25"
              fontWeight="600"
            >
              {item.text}
            </text>
          ))}

          {/* Small particles */}
          {dots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={dot.radius}
              fill="#64FFB0"
              opacity={i % 4 === 0 ? ".38" : ".13"}
            />
          ))}

          {/* Graph area fill */}
          <path
            d={`${mainPath} L1080 540 L0 540 Z`}
            fill={`url(#${areaId})`}
            opacity=".65"
          />

          {/* Secondary line */}
          <path
            ref={secondaryRef}
            d={secondaryPath}
            fill="none"
            stroke="#4DFFAA"
            strokeOpacity=".5"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Main glowing line */}
          <path
            ref={glowRef}
            d={mainPath}
            fill="none"
            stroke="#1DFF72"
            strokeWidth="19"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity=".5"
            filter={`url(#${glowId})`}
          />

          {/* Sharp graph */}
          <path
            ref={pathRef}
            d={mainPath}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Moving highlight point */}
          <g ref={pointRef}>
            <circle
              r="19"
              fill="#1DFF72"
              opacity=".16"
            />
            <circle
              r="8"
              fill="#C8FFE2"
              stroke="#38F982"
              strokeWidth="3"
            />
          </g>

          {/* Rising arrowhead */}
          <g ref={arrowRef}>
            <path
              d="M1024 26 L1076 -5 L1061 62 L1048 40 L1026 58 L1010 43 L1035 24 Z"
              fill="#58FF46"
              stroke="#B5FF76"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </g>

          {/* Floating labels */}
          {dataLabels.map((item) => (
            <g
              key={item.text}
              data-market-label
            >
              <text
                x={item.x}
                y={item.y}
                fill="#D8FFF0"
                fontSize="23"
                fontWeight="500"
              >
                {item.text}
              </text>
            </g>
          ))}
        </svg>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-1 py-4">
          <span className="text-[10px] text-white/50 sm:text-xs">
            Market concepts, visually explained
          </span>

          <span className="text-[10px] text-[#39E88A] sm:text-xs">
            Learn • Analyze • Grow
          </span>
        </div>
      </div>
    </div>
  );
}
