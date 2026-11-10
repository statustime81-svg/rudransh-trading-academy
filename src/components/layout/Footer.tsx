
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [logoFailed, setLogoFailed] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          gsap.fromTo(
            "[data-footer-reveal]",
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: footer,
                start: "top 95%",
                once: true,
              },
            }
          );
        }, footer);

        return () => context.revert();
      }
    );

    return () => media.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-[#D6AD52]/20 bg-[#0B0D10] text-[#F5F3EE]"
    >
      {/* Subtle gold top line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D6AD52]/60 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-5 pt-9 sm:px-8 lg:px-10 lg:pt-11">
        {/* Main footer */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1fr] lg:gap-10">
          {/* BRAND */}
          <div data-footer-reveal>
            <a
              href="#home"
              aria-label="Rudransh Trading Academy Home"
              className="group inline-flex items-center gap-4"
            >
              <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#D6AD52]/25 bg-[#D6AD52]/5 transition-transform duration-300 group-hover:scale-105 sm:h-[84px] sm:w-[84px]">
                {logoFailed ? (
                  <span className="font-display text-2xl text-[#D6AD52]">
                    RTA
                  </span>
                ) : (
                  <img
                    src={siteConfig.branding.logo}
                    alt="Rudransh Trading Academy logo"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain p-1.5"
                    onError={() => setLogoFailed(true)}
                  />
                )}
              </div>

              <div>
                <span className="block font-display text-[clamp(1.35rem,2vw,1.8rem)] font-semibold leading-tight">
                  RUDRANSH
                </span>

                <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.17em] text-[#D6AD52]">
                  TRADING ACADEMY
                </span>
              </div>
            </a>

            <p className="mt-4 max-w-sm text-[13px] leading-6 text-[#F5F3EE]/55">
              {siteConfig.description}
            </p>

            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#D6AD52] transition-colors hover:text-[#F5F3EE]"
            >
              <MessageCircle size={16} />
              Enquire on WhatsApp
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* QUICK LINKS */}
          <div data-footer-reveal>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D6AD52]">
              Quick Links
            </h3>

            <nav
              aria-label="Footer navigation"
              className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-1"
            >
              {navigationConfig.footerLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-fit text-[13px] text-[#F5F3EE]/65 transition-colors hover:text-[#D6AD52]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div data-footer-reveal>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D6AD52]">
              Contact Information
            </h3>

            <div className="mt-4 space-y-4">
              <a
                href={siteConfig.contact.tel}
                className="flex items-center gap-3 text-[13px] text-[#F5F3EE]/70 transition-colors hover:text-[#D6AD52]"
              >
                <Phone
                  size={17}
                  className="shrink-0 text-[#D6AD52]"
                />
                {siteConfig.contact.phoneDisplay}
              </a>

              <a
                href={siteConfig.contact.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-[13px] leading-6 text-[#F5F3EE]/70 transition-colors hover:text-[#D6AD52]"
              >
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#D6AD52]"
                />
                {siteConfig.address.full}
              </a>
            </div>
          </div>
        </div>

        {/* Compact disclaimer */}
        <div
          data-footer-reveal
          className="mt-7 flex items-start gap-2.5 border-t border-[#D6AD52]/15 pt-4"
        >
          <ShieldCheck
            size={16}
            className="mt-0.5 shrink-0 text-[#D6AD52]"
          />

          <p className="text-[11px] leading-5 text-[#F5F3EE]/45">
            {siteConfig.disclaimer}
          </p>
        </div>

        {/* Copyright */}
        <div
          data-footer-reveal
          className="mt-4 flex flex-col justify-between gap-2 border-t border-[#D6AD52]/10 pt-4 text-[11px] text-[#F5F3EE]/45 sm:flex-row sm:items-center"
        >
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <p>
            Developed by{" "}
            <span className="font-semibold text-[#D6AD52]">
              {siteConfig.developer.name}
            </span>
            {" | "}
            {siteConfig.developer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
