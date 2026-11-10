
import { useId } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

const trendPath = [
  "M 0 560",
  "L 70 545",
  "L 135 566",
  "L 205 518",
  "L 275 530",
  "L 350 465",
  "L 430 492",
  "L 510 445",
  "L 585 475",
  "L 660 414",
  "L 740 435",
  "L 815 365",
  "L 890 405",
  "L 975 335",
  "L 1050 350",
  "L 1125 275",
  "L 1190 300",
  "L 1260 225",
  "L 1320 240",
  "L 1400 120",
].join(" ");

const chartData = [
  510, 492, 500, 470, 488, 455, 465, 443,
  420, 435, 410, 427, 390, 402, 380, 395,
  360, 378, 342, 352, 331, 346, 315, 323,
  295, 310, 278, 288, 250, 265, 230, 218,
];

const particles = Array.from(
  { length: 180 },
  (_, index) => {
    const column = index % 30;
    const row = Math.floor(index / 30);

    const x = column * 49 + 10;
    const y =
      600 +
      row * 15 +
      Math.sin(column * 0.43 + row * 0.3) * 28;

    return {
      x,
      y,
      radius: index % 7 === 0 ? 1.5 : 0.8,
      opacity:
        0.12 + ((index * 7) % 10) / 55,
    };
  }
);

interface HeroMarketVisualProps {
  className?: string;
}

export default function HeroMarketVisual({
  className = "",
}: HeroMarketVisualProps) {
  const reducedMotion = useReducedMotion();
  const rawId = useId().replace(/:/g, "");

  const areaId = `rta-area-${rawId}`;
  const glowId = `rta-glow-${rawId}`;
  const chartPathId = `rta-path-${rawId}`;

  return (
    <div
      className={`rta-hero-market ${className}`}
      aria-hidden="true"
    >
      {/* Soft cinematic lighting */}
      <div className="rta-hero-market-glow" />

      <svg
        viewBox="0 0 1440 740"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="rta-hero-market-svg"
      >
        <defs>
          <linearGradient
            id={areaId}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#D6AD52"
              stopOpacity="0.22"
            />

            <stop
              offset="70%"
              stopColor="#D6AD52"
              stopOpacity="0.045"
            />

            <stop
              offset="100%"
              stopColor="#D6AD52"
              stopOpacity="0"
            />
          </linearGradient>

          <filter
            id={glowId}
            x="-50%"
            y="-100%"
            width="200%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* Grid */}
        <g className="rta-hero-grid">
          {Array.from({ length: 17 }, (_, index) => (
            <line
              key={`vertical-${index}`}
              x1={index * 90}
              y1="0"
              x2={index * 90}
              y2="740"
              stroke="#F5F3EE"
              strokeOpacity="0.06"
            />
          ))}

          {Array.from({ length: 9 }, (_, index) => (
            <line
              key={`horizontal-${index}`}
              x1="0"
              y1={index * 90}
              x2="1440"
              y2={index * 90}
              stroke="#F5F3EE"
              strokeOpacity="0.06"
            />
          ))}
        </g>

        {/* Background candlestick concepts */}
        <g className="rta-hero-candle-layer">
          {chartData.map((y, index) => {
            const x = index * 45 + 20;
            const rising = index % 5 !== 2;
            const bodyHeight = 18 + (index % 4) * 7;

            return (
              <motion.g
                key={index}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 30 }
                }
                animate={{
                  opacity: rising ? 0.25 : 0.13,
                  y: 0,
                }}
                transition={{
                  delay: reducedMotion
                    ? 0
                    : index * 0.035,
                  duration: reducedMotion ? 0 : 0.55,
                }}
              >
                <line
                  x1={x}
                  y1={y - 18}
                  x2={x}
                  y2={y + bodyHeight + 15}
                  stroke={
                    rising ? "#D6AD52" : "#F5F3EE"
                  }
                  strokeWidth="1.4"
                />

                <rect
                  x={x - 6}
                  y={y}
                  width="12"
                  height={bodyHeight}
                  rx="1"
                  fill={
                    rising ? "#D6AD52" : "#F5F3EE"
                  }
                />
              </motion.g>
            );
          })}
        </g>

        {/* Golden chart fill */}
        <path
          d={`${trendPath} L 1400 740 L 0 740 Z`}
          fill={`url(#${areaId})`}
        />

        {/* Constant underlying line */}
        <path
          id={chartPathId}
          d={trendPath}
          fill="none"
          stroke="#D6AD52"
          strokeWidth="2"
          strokeOpacity="0.38"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Main cinematic glow */}
        <path
          d={trendPath}
          fill="none"
          stroke="#D6AD52"
          strokeWidth="12"
          strokeOpacity="0.42"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter={`url(#${glowId})`}
        />

        {/* Main golden line */}
        <motion.path
          d={trendPath}
          fill="none"
          stroke="#D6AD52"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={
            reducedMotion
              ? false
              : { pathLength: 0 }
          }
          animate={{ pathLength: 1 }}
          transition={{
            duration: reducedMotion ? 0 : 2.6,
            ease: "easeInOut",
          }}
        />

        {/* Continuously traveling highlight */}
        {!reducedMotion && (
          <>
            <path
              d={trendPath}
              fill="none"
              stroke="#F5F3EE"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 180"
              className="rta-hero-traveling-line"
            />

            <circle
              r="9"
              fill="#D6AD52"
              opacity="0.25"
              filter={`url(#${glowId})`}
            >
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path={trendPath}
              />
            </circle>

            <circle
              r="5"
              fill="#F5F3EE"
              stroke="#D6AD52"
              strokeWidth="2"
            >
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path={trendPath}
              />
            </circle>
          </>
        )}

        {/* Golden dots wave */}
        <g className="rta-hero-particles">
          {particles.map((particle, index) => (
            <circle
              key={index}
              cx={particle.x}
              cy={particle.y}
              r={particle.radius}
              fill="#D6AD52"
              opacity={particle.opacity}
            />
          ))}
        </g>

        {/* Arrow on final high point */}
        <motion.g
          initial={
            reducedMotion
              ? false
              : { opacity: 0, scale: 0.7 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: reducedMotion ? 0 : 2.2,
            duration: reducedMotion ? 0 : 0.5,
          }}
          style={{
            transformOrigin: "1400px 120px",
          }}
        >
          <path
            d="M 1375 135 L 1404 107 L 1401 132 M 1404 107 L 1379 110"
            fill="none"
            stroke="#D6AD52"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </svg>

      <div className="rta-hero-market-bottom-fade" />
    </div>
  );
}
