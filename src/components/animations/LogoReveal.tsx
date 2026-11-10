
import { useState } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { siteConfig } from "@/config/site";

interface LogoRevealProps {
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

const logoSizes = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32 sm:h-40 sm:w-40",
};

function LogoReveal({
  size = "lg",
  showName = true,
}: LogoRevealProps) {
  const [imageError, setImageError] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{
          opacity: 0,
          scale: reduceMotion ? 1 : 0.7,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          ease: "easeOut",
        }}
        className={`relative flex ${logoSizes[size]} items-center justify-center`}
      >
        <div className="absolute inset-0 rounded-full bg-[#D6AD52]/15 blur-2xl" />

        {!imageError ? (
          <img
            src={siteConfig.branding.logo}
            alt="Rudransh Trading Academy Logo"
            onError={() => setImageError(true)}
            className="relative z-10 h-full w-full object-contain"
          />
        ) : (
          <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full border border-[#D6AD52]/40 bg-[#D6AD52]/10">
            <span className="font-display text-4xl text-[#D6AD52]">
              RTA
            </span>
          </div>
        )}
      </motion.div>

      {showName && (
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.2,
          }}
          className="mt-5"
        >
          <h2 className="text-xl font-bold tracking-[0.15em] text-white sm:text-2xl">
            RUDRANSH
          </h2>

          <p className="mt-2 text-xs font-medium tracking-[0.3em] text-[#D6AD52]">
            TRADING ACADEMY
          </p>
        </motion.div>
      )}
    </div>
  );
}

// IMPORTANT: Default export required by Preloader.tsx
export default LogoReveal;
