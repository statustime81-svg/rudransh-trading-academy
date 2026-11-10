
import { useEffect, useState } from "react";

export default function useMediaQuery(
  query: string,
  defaultValue = false
): boolean {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    updateMatches();

    mediaQuery.addEventListener("change", updateMatches);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMatches
      );
    };
  }, [query]);

  return matches;
}

export const mediaQueries = {
  mobile: "(max-width: 639px)",
  tablet: "(min-width: 640px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
  touch: "(pointer: coarse)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;
