
import {
  useEffect,
  useState,
} from "react";

interface ScrollProgressState {
  scrollY: number;
  progress: number;
  isScrolled: boolean;
  isAtBottom: boolean;
}

const initialState: ScrollProgressState = {
  scrollY: 0,
  progress: 0,
  isScrolled: false,
  isAtBottom: false,
};

function calculateScrollProgress(): ScrollProgressState {
  if (typeof window === "undefined") {
    return initialState;
  }

  const scrollY = Math.max(
    0,
    window.scrollY
  );

  const documentHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );

  const viewportHeight = window.innerHeight;

  const scrollableHeight = Math.max(
    0,
    documentHeight - viewportHeight
  );

  const progress =
    scrollableHeight > 0
      ? Math.min(
          1,
          Math.max(0, scrollY / scrollableHeight)
        )
      : 0;

  return {
    scrollY,
    progress,
    isScrolled: scrollY > 30,
    isAtBottom:
      scrollableHeight > 0 &&
      scrollY >= scrollableHeight - 5,
  };
}

export default function useScrollProgress():
  ScrollProgressState {
  const [scrollState, setScrollState] =
    useState<ScrollProgressState>(
      initialState
    );

  useEffect(() => {
    let frameId: number | null = null;

    const update = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        setScrollState(
          calculateScrollProgress()
        );

        frameId = null;
      });
    };

    update();

    window.addEventListener(
      "scroll",
      update,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      update
    );

    return () => {
      window.removeEventListener(
        "scroll",
        update
      );

      window.removeEventListener(
        "resize",
        update
      );

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return scrollState;
}
