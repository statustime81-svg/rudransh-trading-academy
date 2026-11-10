
import {
  motion,
  useReducedMotion,
} from "framer-motion";

interface AnimatedCandlesProps {
  className?: string;
  progress?: number;
  animated?: boolean;
}

const data = [
  [155, 142, 130, 166],
  [144, 151, 138, 163],
  [152, 125, 117, 160],
  [128, 112, 102, 139],
  [113, 125, 107, 136],
  [126, 100, 91, 135],
  [102, 89, 77, 113],
  [92, 105, 85, 115],
  [106, 78, 69, 116],
  [81, 65, 55, 92],
  [67, 75, 59, 86],
  [77, 52, 42, 88],
  [55, 41, 31, 67],
  [43, 57, 35, 69],
  [58, 34, 24, 71],
] as const;

export default function AnimatedCandles({
  className = "",
  progress = 1,
  animated = true,
}: AnimatedCandlesProps) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animated && !reduceMotion;

  const count = Math.min(
    data.length,
    Math.max(0, Math.ceil(data.length * progress))
  );

  const visible = data.slice(0, count);

  const pathPoints = visible
    .map((item, index) => {
      const x = 27 + index * 27;
      return `${x},${item[1]}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 460 210"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label="Illustrative stock market candlestick chart"
    >
      {[30, 70, 110, 150, 190].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="460"
          y2={y}
          stroke="white"
          strokeOpacity="0.08"
          strokeDasharray="4 6"
        />
      ))}

      {visible.map(([open, close, high, low], index) => {
        const x = 27 + index * 27;
        const bullish = close < open;
        const color = bullish ? "#16B88C" : "#E16B71";

        return (
          <motion.g
            key={index}
            initial={
              shouldAnimate
                ? { opacity: 0, scaleY: 0 }
                : false
            }
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: shouldAnimate ? 0.4 : 0,
              delay: shouldAnimate ? index * 0.045 : 0,
            }}
            style={{
              transformOrigin: `${x}px ${low}px`,
            }}
          >
            <line
              x1={x}
              y1={high}
              x2={x}
              y2={low}
              stroke={color}
              strokeWidth="1.5"
            />

            <rect
              x={x - 6}
              y={Math.min(open, close)}
              width="12"
              height={Math.max(2, Math.abs(open - close))}
              fill={color}
              rx="1.5"
            />
          </motion.g>
        );
      })}

      {count > 1 && (
        <motion.polyline
          points={pathPoints}
          fill="none"
          stroke="#D6AD52"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={
            shouldAnimate
              ? { opacity: 0, pathLength: 0 }
              : false
          }
          whileInView={{ opacity: 1, pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: shouldAnimate ? 1.5 : 0,
          }}
        />
      )}

      <text
        x="12"
        y="205"
        fontSize="10"
        fill="#9BA8BA"
      >
        Illustrative data • For education only
      </text>
    </svg>
  );
}
