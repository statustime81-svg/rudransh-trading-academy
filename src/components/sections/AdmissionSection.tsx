
import {
  ArrowUpRight,
  BookOpenCheck,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

import Reveal from "@/components/animations/Reveal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { siteConfig } from "@/config/site";

const courseTopics = [
  "Stock Market Fundamentals",
  "Fundamental Analysis",
  "Technical Analysis",
  "Futures & Options",
];

export default function AdmissionSection() {
  return (
    <section
      id="admission"
      aria-labelledby="admission-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#0A1829] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(255,210,26,0.07),transparent_45%)]"
      />

      <div className="container-premium relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal direction="right">
            <div className="lg:sticky lg:top-32">
              <span className="eyebrow">
                ADMISSION ENQUIRY
              </span>

              <h2
                id="admission-heading"
                className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
              >
                Your Learning
                <span className="mt-2 block font-display font-normal text-[#FFD21A]">
                  Journey Starts Here.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-slate-300">
                Interested in the Basic to Advanced
                Stock Market Course? Share your details
                with Rudransh Trading Academy to enquire
                about admission and available batches.
              </p>

              <div className="mt-9 rounded-[22px] border border-white/10 bg-[#102035] p-6">
                <div className="flex items-center gap-3">
                  <BookOpenCheck
                    size={24}
                    className="text-[#FFD21A]"
                  />

                  <h3 className="text-lg font-semibold text-white">
                    Course Learning Areas
                  </h3>
                </div>

                <ul className="mt-6 space-y-4">
                  {courseTopics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-3 text-sm text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD21A]" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 space-y-5">
                <a
                  href={siteConfig.contact.tel}
                  className="flex items-center gap-4 text-slate-300 transition-colors hover:text-[#FFD21A]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FFD21A]/20 bg-[#FFD21A]/10 text-[#FFD21A]">
                    <PhoneCall size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Call the Academy
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {siteConfig.contact.phoneDisplay}
                    </p>
                  </div>
                </a>

                <a
                  href={siteConfig.contact.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-300 transition-colors hover:text-[#FFD21A]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FFD21A]/20 bg-[#FFD21A]/10 text-[#FFD21A]">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Academy Location
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      Punpun, Patna, Bihar
                    </p>
                  </div>

                  <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="mt-9 flex items-start gap-3 border-t border-white/10 pt-7">
                <ShieldCheck
                  size={20}
                  className="mt-1 shrink-0 text-[#FFD21A]"
                />

                <p className="text-xs leading-6 text-slate-400">
                  This is an educational course enquiry.
                  No payment or admission confirmation
                  is processed through this form.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#FFD21A]/15 bg-[#102035] p-6 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Prefer to contact us directly?
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Connect with Rudransh Trading Academy
                through WhatsApp.
              </p>
            </div>

            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline shrink-0"
            >
              <MessageCircle size={18} />
              Open WhatsApp
              <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
