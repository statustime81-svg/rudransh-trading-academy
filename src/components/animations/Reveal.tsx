
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

type RevealDirection = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 36,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const offsets: Record<
    RevealDirection,
    { x: number; y: number }
  > = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const offset = offsets[direction];

  const variants: Variants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      x: reduceMotion ? 0 : offset.x,
      y: reduceMotion ? 0 : offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount: 0.15,
        margin: "0px 0px -30px 0px",
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
