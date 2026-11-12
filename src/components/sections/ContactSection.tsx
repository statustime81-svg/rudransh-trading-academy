
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  MapPin,
  PhoneCall,
  MessageCircle,
  Navigation,
  Clock3,
  ExternalLink,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Academy contact details
const PHONE = "+916202812177";
const DISPLAY_PHONE = "+91 6202812177";
const WHATSAPP = "https://wa.me/916202812177";

const MAPS_URL =
  "https://maps.app.goo.gl/wqbJAvUE3t3rhXN79";

const ADDRESS =
  "Near SMD College, Dularpur, Punpun, Patna, Bihar 804453";

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(
    "Rudransh Trading Academy, Dularpur, Punpun, Patna, Bihar"
  ) +
  "&output=embed";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            "[data-contact-reveal]",
            {
              autoAlpha: 0,
              y: 35,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                once: true,
              },
            }
          );
        }, section);

        return () => ctx.revert();
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="
        relative scroll-mt-28 overflow-hidden
        bg-[#0B0D10]
        px-[clamp(1rem,4vw,4rem)]
        py-[clamp(3.5rem,8vh,6rem)]
        text-[#F5F3EE]
      "
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-40 top-1/4 h-[35vw] w-[35vw] min-h-72 min-w-72 rounded-full bg-[#16A34A]/[0.045] blur-[100px]" />
        <div className="absolute -right-40 bottom-0 h-[30vw] w-[30vw] min-h-72 min-w-72 rounded-full bg-[#16A34A]/[0.035] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        {/* SECTION HEADING */}
        <div
          data-contact-reveal
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#16A34A]/50" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#16A34A]">
              Contact & Location
            </span>

            <span className="h-px w-8 bg-[#16A34A]/50" />
          </div>

          <h2
            id="contact-heading"
            className="mt-4 font-display text-[clamp(2.3rem,4.6vw,4.7rem)] leading-[1.1] tracking-[-0.035em]"
          >
            Visit or Contact
            <span className="ml-2 italic text-[#F87171]">
              Our Academy.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[clamp(0.8rem,1.1vw,0.95rem)] leading-7 text-[#F5F3EE]/60">
            Have questions about our stock market course,
            admission process or upcoming batches?
            Connect with Rudransh Trading Academy.
          </p>
        </div>

        {/* CONTACT + MAP GRID */}
        <div className="mt-[clamp(2rem,5vh,3.5rem)] grid items-stretch gap-5 lg:grid-cols-[0.83fr_1.17fr] lg:gap-7">
          {/* LEFT SIDE */}
          <div
            data-contact-reveal
            className="flex flex-col gap-4"
          >
            {/* CALL CARD */}
            <a
              href={`tel:${PHONE}`}
              className="
                group relative flex items-center gap-4
                rounded-[22px]
                border border-[#16A34A]/15
                bg-[#14171B]
                p-[clamp(1rem,2vw,1.5rem)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[#16A34A]/45
                hover:bg-[#191B1E]
                hover:shadow-[0_15px_45px_rgba(0,0,0,0.25)]
              "
            >
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-[#16A34A]/25 bg-[#16A34A]/10 text-[#16A34A]">
                <PhoneCall size={22} strokeWidth={1.7} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#16A34A]">
                  Call the Academy
                </p>

                <h3 className="mt-1 text-[clamp(1.05rem,1.6vw,1.35rem)] font-semibold text-[#F5F3EE]">
                  {DISPLAY_PHONE}
                </h3>

                <p className="mt-1 text-xs text-[#F5F3EE]/45">
                  Tap to call directly
                </p>
              </div>

              <ArrowUpRight
                size={20}
                className="shrink-0 text-[#16A34A] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            {/* WHATSAPP CARD */}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative flex items-center gap-4
                rounded-[22px]
                border border-[#16A34A]/15
                bg-[#14171B]
                p-[clamp(1rem,2vw,1.5rem)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[#16A34A]/45
                hover:bg-[#191B1E]
                hover:shadow-[0_15px_45px_rgba(0,0,0,0.25)]
              "
            >
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-[#16A34A]/25 bg-[#16A34A]/10 text-[#16A34A]">
                <MessageCircle
                  size={23}
                  strokeWidth={1.7}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F87171]">
                  WhatsApp Enquiry
                </p>

                <h3 className="mt-1 text-[clamp(1.05rem,1.6vw,1.35rem)] font-semibold">
                  Ask About Admission
                </h3>

                <p className="mt-1 text-xs text-[#F5F3EE]/45">
                  Chat directly with the academy
                </p>
              </div>

              <ArrowUpRight
                size={20}
                className="shrink-0 text-[#16A34A] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            {/* ACADEMY ADDRESS */}
            <div className="relative flex-1 rounded-[24px] border border-[#16A34A]/20 bg-[#14171B] p-[clamp(1.2rem,2.2vw,1.75rem)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#16A34A]/25 bg-[#16A34A]/10 text-[#16A34A]">
                  <MapPin size={22} strokeWidth={1.6} />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#16A34A]">
                    Visit Our Academy
                  </p>

                  <h3 className="mt-2 font-display text-[clamp(1.4rem,2vw,1.8rem)]">
                    Rudransh Trading Academy
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-[#F5F3EE]/65">
                    {ADDRESS}
                  </p>
                </div>
              </div>

              <div className="mt-7 h-px bg-[#16A34A]/15" />

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#16A34A] transition-colors hover:text-[#F5F3EE]"
              >
                <Navigation size={16} />

                Get Directions

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE - MAP */}
          <div
            data-contact-reveal
            className="
              group relative flex min-h-[360px]
              flex-col overflow-hidden
              rounded-[26px]
              border border-[#16A34A]/20
              bg-[#14171B]
              shadow-[0_24px_70px_rgba(0,0,0,0.28)]
              sm:min-h-[430px]
              lg:min-h-[min(64vh,580px)]
            "
          >
            {/* Map header */}
            <div className="flex items-center justify-between gap-4 border-b border-[#16A34A]/15 bg-[#14171B] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#16A34A]/10 text-[#F87171]">
                  <Navigation size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#F5F3EE]">
                    Find Us on Google Maps
                  </h3>

                  <p className="mt-1 text-[11px] text-[#F5F3EE]/50">
                    Punpun, Patna, Bihar
                  </p>
                </div>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open academy location in Google Maps"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#16A34A]/25 text-[#16A34A] transition-colors hover:bg-[#16A34A]/10"
              >
                <ExternalLink size={17} />
              </a>
            </div>

            {/* Google Map iframe */}
            <div className="relative min-h-[270px] flex-1 bg-[#17221E]">
              <iframe
                title="Rudransh Trading Academy location map"
                src={MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            {/* Map footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#16A34A]/15 bg-[#14171B] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2 text-xs text-[#F5F3EE]/60">
                <MapPin
                  size={15}
                  className="text-[#16A34A]"
                />
                Dularpur, Punpun, Patna
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#16A34A] transition-colors hover:text-[#F5F3EE]"
              >
                Open Full Map
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM NOTE */}
        <div
          data-contact-reveal
          className="mt-6 flex items-start gap-3 rounded-2xl border border-[#16A34A]/10 bg-[#F5F3EE]/[0.025] px-5 py-4"
        >
          <Clock3
            size={18}
            className="mt-0.5 shrink-0 text-[#16A34A]"
          />

          <p className="text-xs leading-6 text-[#F5F3EE]/60">
            For class schedules, admission enquiries
            and upcoming batches, please contact
            the academy directly before visiting.
          </p>
        </div>
      </div>
    </section>
  );
}
