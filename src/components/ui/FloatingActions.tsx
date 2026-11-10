
import {
  MessageCircle,
  Phone,
} from "lucide-react";

import { siteConfig } from "@/config/site";

export default function FloatingActions() {
  return (
    <div
      className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:bottom-7 sm:right-7"
      aria-label="Quick contact actions"
    >
      <a
        href={siteConfig.contact.tel}
        aria-label={`Call Rudransh Trading Academy at ${siteConfig.contact.phoneDisplay}`}
        title="Call Academy"
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#D6AD52]/40 bg-[#102035] text-[#D6AD52] shadow-xl shadow-black/30 transition-transform duration-300 hover:-translate-y-1 hover:bg-[#1B3048] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6AD52]"
      >
        <Phone size={21} aria-hidden="true" />
      </a>

      <a
        href={siteConfig.contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Rudransh Trading Academy on WhatsApp"
        title="WhatsApp Enquiry"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#128C62] text-white shadow-xl shadow-black/30 transition-transform duration-300 hover:-translate-y-1 hover:bg-[#0E7953] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <MessageCircle size={26} aria-hidden="true" />

        <span className="pointer-events-none absolute right-[calc(100%+12px)] hidden whitespace-nowrap rounded-lg border border-white/10 bg-[#102035] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
          Enquire on WhatsApp
        </span>
      </a>
    </div>
  );
}
