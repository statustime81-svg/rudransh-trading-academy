
import {
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

import { useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 5,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
  });

  const [glarePosition, setGlarePosition] = useState({
    x: 50,
    y: 50,
  });

  const [hovered, setHovered] = useState(false);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;

    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const bounds = cardRef.current?.getBoundingClientRect();

    if (!bounds) return;

    const localX =
      (event.clientX - bounds.left) / bounds.width;

    const localY =
      (event.clientY - bounds.top) / bounds.height;

    setRotation({
      x: (0.5 - localY) * maxTilt * 2,
      y: (localX - 0.5) * maxTilt * 2,
    });

    setGlarePosition({
      x: localX * 100,
      y: localY * 100,
    });
  };

  const reset = () => {
    setRotation({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      className={`relative ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="relative h-full overflow-hidden rounded-[inherit]"
        style={{
          transform: reduceMotion
            ? "none"
            : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
          transition: hovered
            ? "transform 90ms ease-out"
            : "transform 450ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {children}

        {glare && !reduceMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: `radial-gradient(
                circle at ${glarePosition.x}% ${glarePosition.y}%,
                rgba(214,173,82,0.13),
                transparent 48%
              )`,
              opacity: hovered ? 1 : 0,
              transition: "opacity 300ms ease",
            }}
          />
        )}
      </div>
    </div>
  );
}
