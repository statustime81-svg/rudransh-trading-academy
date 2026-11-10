

import {
  useEffect,
  useState,
} from "react";

const MOTION_QUERY =
  "(prefers-reduced-motion: reduce)";

function getReducedMotionPreference(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(
    MOTION_QUERY
  ).matches;
}

export default function useReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] =
    useState<boolean>(
      getReducedMotionPreference
    );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      MOTION_QUERY
    );

    const updatePreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    updatePreference();

    mediaQuery.addEventListener(
      "change",
      updatePreference
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updatePreference
      );
    };
  }, []);

  return reduceMotion;
}

