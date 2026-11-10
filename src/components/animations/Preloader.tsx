
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { siteConfig } from "@/config/site";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({
  onComplete,
}: PreloaderProps) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setVisible(false),
      reduceMotion ? 200 : 2000
    );

    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence
      onExitComplete={() => onComplete?.()}
    >
      {visible && (
        <motion.div
          key="rta-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: "easeInOut",
          }}
          role="status"
          aria-label="Loading Rudransh Trading Academy"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080D14] px-5"
        >
          <div className="flex w-full flex-col items-center justify-center text-center">

            {/* Center Logo */}
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, scale: 0.85 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex items-center justify-center"
            >
              {/* Subtle Gold Glow */}
              <div className="pointer-events-none absolute -inset-8 rounded-full bg-[#D6AD52]/10 blur-3xl" />

              <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
                {logoError ? (
                  <span className="font-display text-5xl text-[#D6AD52]">
                    RTA
                  </span>
                ) : (
                  <img
                    src={siteConfig.branding.logo}
                    alt="Rudransh Trading Academy Logo"
                    className="h-full w-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                )}
              </div>
            </motion.div>

            {/* Academy Name */}
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                delay: reduceMotion ? 0 : 0.3,
              }}
              className="mt-7"
            >
              <h2 className="text-xl font-semibold tracking-[0.16em] text-white sm:text-2xl">
                RUDRANSH
              </h2>

              <p className="mt-2 text-xs font-medium tracking-[0.26em] text-[#D6AD52] sm:text-sm">
                TRADING ACADEMY
              </p>
            </motion.div>

            {/* Simple Loading Line */}
            <div className="mt-9 h-[2px] w-44 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 1.8,
                  ease: "easeInOut",
                }}
                className="h-full w-full origin-left rounded-full bg-[#D6AD52]"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: reduceMotion ? 0 : 0.5,
              }}
              className="mt-4 text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500"
            >
              Preparing Your Experience
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
