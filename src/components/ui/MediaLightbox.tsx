
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface MediaLightboxProps {
  images: LightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function MediaLightbox({
  images,
  activeIndex,
  onClose,
  onIndexChange,
}: MediaLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isOpen =
    activeIndex !== null &&
    activeIndex >= 0 &&
    activeIndex < images.length;

  const currentImage =
    isOpen && activeIndex !== null
      ? images[activeIndex]
      : undefined;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        onIndexChange((activeIndex + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        onIndexChange(
          (activeIndex - 1 + images.length) % images.length
        );
      }

      if (event.key === "Tab") {
        const dialog = document.getElementById(
          "rta-gallery-dialog"
        );

        if (!dialog) return;

        const controls = Array.from(
          dialog.querySelectorAll<HTMLButtonElement>(
            "button:not(:disabled)"
          )
        );

        if (controls.length === 0) return;

        const first = controls[0];
        const last = controls[controls.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [
    isOpen,
    activeIndex,
    images.length,
    onClose,
    onIndexChange,
  ]);

  return (
    <AnimatePresence>
      {isOpen && currentImage && activeIndex !== null && (
        <motion.div
          id="rta-gallery-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Academy photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[#02060D]/95 p-4 backdrop-blur-xl sm:p-8"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={23} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  onIndexChange(
                    (activeIndex - 1 + images.length) %
                      images.length
                  )
                }
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#152235] text-white sm:left-8"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={() =>
                  onIndexChange(
                    (activeIndex + 1) % images.length
                  )
                }
                aria-label="Next photo"
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#152235] text-white sm:right-8"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <motion.div
            key={currentImage.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="flex w-full max-w-5xl flex-col items-center gap-5 px-8"
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
            />

            <div className="text-center">
              <p className="text-sm font-medium text-white">
                {currentImage.caption ?? currentImage.alt}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                {activeIndex + 1} / {images.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
