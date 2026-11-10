import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import MobileMenu from "./MobileMenu";
import { navigationConfig, navigationItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/** Floating transparent navigation for Rudransh Trading Academy. */
export default function Header() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [logoError, setLogoError] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        const marker = window.scrollY + 160;
        let current = "home";
        for (const item of navigationItems) {
          const id = item.href.slice(1);
          const element = document.getElementById(id);
          if (element && element.getBoundingClientRect().top + window.scrollY <= marker) {
            current = id;
          }
        }
        setActiveSection(current);
        frame = null;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8 lg:pt-5"
    >
      <div className={[
        "pointer-events-auto relative mx-auto max-w-[1320px] overflow-hidden rounded-[24px] border backdrop-blur-2xl sm:rounded-[30px]",
        "transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || menuOpen
          ? "border-[#D6AD52]/30 bg-[#0B111C]/95 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
          : "border-white/15 bg-[#0B111C]/65 shadow-[0_12px_40px_rgba(0,0,0,0.18)]",
      ].join(" ")}>
        <div className="flex min-h-[74px] items-center justify-between gap-3 px-4 sm:px-6 lg:min-h-[82px] lg:px-7">
          <a href={navigationConfig.brandHref} onClick={() => setMenuOpen(false)} aria-label="Rudransh Trading Academy home" className="group flex min-w-0 shrink-0 items-center gap-3">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black ring-1 ring-[#D6AD52]/50 transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(214,173,82,0.25)] sm:h-14 sm:w-14">
              {logoError ? (
                <span className="font-display text-xl text-[#D6AD52]">RTA</span>
              ) : (
                <img src={siteConfig.branding.logo} alt="" width={56} height={56} className="h-full w-full rounded-full object-contain" onError={() => setLogoError(true)} />
              )}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[13px] font-bold tracking-[0.1em] text-white sm:text-base">RUDRANSH</span>
              <span className="mt-1 block text-[9px] font-semibold tracking-[0.17em] text-[#D6AD52] sm:text-[11px]">TRADING ACADEMY</span>
            </span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 lg:flex">
            {navigationItems.map((item) => {
              const active = activeSection === item.href.slice(1);
              return (
                <a key={item.href} href={item.href} aria-current={active ? "location" : undefined}
                  className={`relative rounded-full px-4 py-3 text-[13px] font-medium transition-colors duration-200 ${active ? "text-[#D6AD52]" : "text-slate-300 hover:text-white"}`}>
                  {active && (
                    <motion.span layoutId="rta-nav-active" className="absolute inset-0 -z-10 rounded-full border border-[#D6AD52]/20 bg-[#D6AD52]/10"
                      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 340, damping: 32 }} />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <a href={navigationConfig.primaryCta.href}
            className="hidden min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#D6AD52] px-5 text-[13px] font-semibold text-[#071426] transition-colors hover:bg-[#EBCB79] lg:inline-flex">
            {navigationConfig.primaryCta.label}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>

          <button ref={menuButtonRef} type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}
            aria-controls="rta-mobile-menu" onClick={() => setMenuOpen((value) => !value)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D6AD52]/25 bg-[#D6AD52]/10 text-[#D6AD52] lg:hidden">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} activeSection={activeSection} />
      </div>
    </motion.header>
  );
}
