
import { useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { X } from "lucide-react";
import EnquiryForm from "@/components/forms/EnquiryForm";

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionModal({
  isOpen,
  onClose,
}: AdmissionModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements =
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

      const focusable = Array.from(focusableElements).filter(
        (element) => element.getClientRects().length > 0
      );

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        event.preventDefault();
        return;
      }

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="admission-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.25,
          }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6"
        >
          {/* Background overlay */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-[#0B0D10]/90 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Popup panel */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Admission Enquiry Form"
            tabIndex={-1}
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 36, scale: 0.96 }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: reducedMotion ? 0 : 20,
              scale: reducedMotion ? 1 : 0.98,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 w-full max-w-[720px] overflow-hidden rounded-[28px] border border-[#D6AD52]/25 bg-[#0B0D10] shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
          >
            {/* Gold top line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D6AD52] to-transparent" />

            {/* Close */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close admission enquiry"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#D6AD52]/20 bg-[#0B0D10] text-[#F5F3EE] transition-colors hover:border-[#D6AD52] hover:text-[#D6AD52] sm:right-5 sm:top-5"
            >
              <X size={20} />
            </button>

            {/* Scrollable form area */}
            <div className="max-h-[min(88dvh,850px)] overflow-y-auto overscroll-contain p-2 pt-12 sm:p-5 sm:pt-12">
              <EnquiryForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
