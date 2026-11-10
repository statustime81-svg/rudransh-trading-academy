
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowUpRight,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

import {
  navigationItems,
  navigationConfig,
} from "@/config/navigation";

import { siteConfig } from "@/config/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection?: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  activeSection = "home",
}: MobileMenuProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.nav
          key="rta-mobile-menu"
          id="rta-mobile-menu"
          aria-label="Mobile navigation"
          initial={
            reduceMotion
              ? false
              : { height: 0, opacity: 0 }
          }
          animate={{
            height: "auto",
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden border-t border-white/10 lg:hidden"
        >
          <div className="flex flex-col gap-1 px-4 pb-5 pt-4 sm:px-6">
            {navigationItems.map((item, index) => {
              const active =
                activeSection === item.href.slice(1);

              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={
                    active ? "location" : undefined
                  }
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 9 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                    delay: reduceMotion
                      ? 0
                      : index * 0.04,
                  }}
                  className={[
                    "flex min-h-12 items-center",
                    "justify-between rounded-xl",
                    "px-4 py-3 text-sm font-medium",
                    "transition-colors duration-200",
                    active
                      ? "border border-[#D6AD52]/20 bg-[#D6AD52]/10 text-[#D6AD52]"
                      : "border border-transparent text-slate-200 hover:bg-white/[0.06]",
                  ].join(" ")}
                >
                  <span>{item.label}</span>

                  <ChevronRight
                    size={17}
                    className={
                      active
                        ? "text-[#D6AD52]"
                        : "text-slate-500"
                    }
                  />
                </motion.a>
              );
            })}

            <a
              href={navigationConfig.primaryCta.href}
              onClick={onClose}
              className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D6AD52] px-5 text-sm font-semibold text-[#071426]"
            >
              Enquire for Admission
              <ArrowUpRight size={17} />
            </a>

            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium text-white"
            >
              <MessageCircle
                size={18}
                className="text-[#D6AD52]"
              />
              WhatsApp Us
            </a>

            <div className="mt-5 border-t border-white/10 pt-5 text-center">
              <p className="text-[10px] uppercase tracking-[0.19em] text-[#D6AD52]">
                Learn • Analyze • Trade • Grow
              </p>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
