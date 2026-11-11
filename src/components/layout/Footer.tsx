
import { useState } from "react";

import {
  ArrowUpRight,
  BookOpen,
  Building2,
  GraduationCap,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";

const NEXOVA_LOGO = "/assets/branding/nexova-logo.png";

function getFooterIcon(label: string) {
  const text = label.toLowerCase();

  if (text.includes("home")) return Home;
  if (text.includes("about")) return Building2;
  if (text.includes("course")) return BookOpen;
  if (text.includes("trainer")) return UserRound;
  if (text.includes("review")) return Star;
  if (text.includes("admission")) return GraduationCap;
  if (text.includes("contact")) return MessageCircle;

  return ArrowUpRight;
}

export default function Footer() {
  const [logoFailed, setLogoFailed] = useState(false);
  const [nexovaFailed, setNexovaFailed] = useState(false);

  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[#FFD21A]/20 bg-[#0B0D10] text-[#F5F3EE]">
      {/* Gold top line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD21A]/50 to-transparent"
      />

      <div className="mx-auto max-w-[1280px] px-5 pb-4 pt-7 sm:px-8 lg:px-10">
        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1.1fr] lg:gap-8">

          {/* Brand */}
          <div>
            <a
              href="#home"
              aria-label="Rudransh Trading Academy Home"
              className="group flex items-center gap-3"
            >
              <div className="flex h-[66px] w-[66px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#FFD21A]/25 bg-[#FFD21A]/5 sm:h-[72px] sm:w-[72px]">
                {logoFailed ? (
                  <span className="font-display text-xl text-[#FFD21A]">
                    RTA
                  </span>
                ) : (
                  <img
                    src={siteConfig.branding.logo}
                    alt="Rudransh Trading Academy logo"
                    loading="lazy"
                    className="h-full w-full object-contain p-1"
                    onError={() => setLogoFailed(true)}
                  />
                )}
              </div>

              <div>
                <span className="block text-lg font-bold tracking-[0.07em] text-white">
                  RUDRANSH
                </span>

                <span className="mt-1 block text-[11px] font-semibold tracking-[0.15em] text-[#FFD21A]">
                  TRADING ACADEMY
                </span>
              </div>
            </a>

            <p className="mt-3 max-w-sm text-xs leading-5 text-white/55">
              {siteConfig.description}
            </p>

            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#FFD21A] transition-colors hover:text-white"
            >
              <MessageCircle size={15} />
              Enquire on WhatsApp
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FFD21A]">
              Quick Links
            </h3>

            <nav
              aria-label="Footer navigation"
              className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2"
            >
              {navigationConfig.footerLinks.map((item) => {
                const Icon = getFooterIcon(item.label);

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex min-w-0 items-center gap-2 text-[12px] text-white/65 transition-colors duration-200 hover:text-[#FFD21A]"
                  >
                    <Icon
                      size={14}
                      className="shrink-0 text-[#FFD21A]/80 transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    />

                    <span className="leading-5">
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FFD21A]">
              Contact Information
            </h3>

            <div className="mt-3 space-y-3">
              <a
                href={siteConfig.contact.tel}
                className="flex items-center gap-2.5 text-xs text-white/70 transition-colors hover:text-[#FFD21A]"
              >
                <Phone
                  size={16}
                  className="shrink-0 text-[#FFD21A]"
                />
                {siteConfig.contact.phoneDisplay}
              </a>

              <a
                href={siteConfig.contact.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-xs leading-5 text-white/70 transition-colors hover:text-[#FFD21A]"
              >
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-[#FFD21A]"
                />
                <span>{siteConfig.address.full}</span>
              </a>
            </div>

            
{/* Compact NEXOVA Credit */}
<a
  href="https://www.nexovax.in/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit NEXOVA X official website"
  className="group mt-4 flex w-fit items-center gap-2.5
             border-t border-white/10 pt-3
             transition-all duration-300"
>
  {/* Circular NEXOVA Logo */}
  <div
    className="flex h-11 w-11 shrink-0 items-center
               justify-center overflow-hidden rounded-full
               border border-[#FFD21A]/35 bg-white p-1
               shadow-[0_0_18px_rgba(255,210,26,0.10)]
               transition-all duration-300
               group-hover:scale-110
               group-hover:border-[#FFD21A]
               group-hover:shadow-[0_0_25px_rgba(255,210,26,0.25)]"
  >
    {nexovaFailed ? (
      <span className="text-xs font-bold text-black">
        NX
      </span>
    ) : (
      <img
        src={NEXOVA_LOGO}
        alt="NEXOVA X logo"
        loading="lazy"
        className="h-full w-full object-contain"
        onError={() => setNexovaFailed(true)}
      />
    )}
  </div>

  {/* Developer Information */}
  <div>
    <p className="text-[10px] uppercase tracking-[0.12em] text-white/45">
      Developed By
    </p>

    <p className="mt-0.5 flex items-center gap-1.5 text-xs font-bold text-[#FFD21A] transition-colors group-hover:text-[#FFE15C]">
      NEXOVA X

      <ArrowUpRight
        size={13}
        className="transition-transform duration-300
                   group-hover:translate-x-0.5
                   group-hover:-translate-y-0.5"
      />
    </p>
  </div>
</a>

          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-5 flex items-start gap-2 border-t border-white/10 pt-3">
          <ShieldCheck
            size={15}
            className="mt-0.5 shrink-0 text-[#FFD21A]"
          />
          <p className="text-[10px] leading-5 text-white/45">
            {siteConfig.disclaimer}
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-3 flex flex-col justify-between gap-1.5 border-t border-white/10 pt-3 text-[10px] text-white/45 sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>

          <p>
            Developed by{" "}
            <span className="font-semibold text-[#FFD21A]">
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
