
export const siteConfig = {
  name: "Rudransh Trading Academy",
  shortName: "RTA",

  tagline: "Learn • Analyze • Trade • Grow",

  description:
    "Explore stock market education covering market fundamentals, fundamental analysis, technical analysis, and futures & options.",

  developer: {
    name: "NEXOVA X",
    tagline: "Built Beyond Limits",
  },

  contact: {
    phoneDisplay: "+91 6202812177",
    phone: "+916202812177",
    tel: "tel:+916202812177",
    whatsapp: "https://wa.me/916202812177",

    maps:
      "https://maps.app.goo.gl/wqbJAvUE3t3rhXN79",
  },

  address: {
    house: "House No. 1",
    landmark: "Near SMD College",
    locality: "Dularpur, Punpun",
    city: "Patna",
    state: "Bihar",
    postalCode: "804453",
    country: "India",

    full:
      "House No. 1, Near SMD College, Dularpur, Punpun, Patna, Bihar - 804453",
  },

  branding: {
    logo: "/assets/brand/rta-logo.png",
    logoWebp: "/assets/brand/rta-logo.webp",
    favicon: "/favicon.png",
    primary: "#071426",
    secondary: "#111318",
    accent: "#D6AD52",
    marketGreen: "#13A875",
  },

  trainer: {
    name: "Rajesh Kumar",
    title: "Stock Market Trainer & Educator",
    image: "/assets/trainer/rajesh-kumar.webp",
  },

  course: {
    name: "Basic to Advanced Stock Market Course",
    durationVisible: false,
    benefitsVisible: false,
    modulesCount: 4,
  },

  features: {
    showDuration: false,
    showFreeDemo: false,
    showLifetimeSupport: false,
    showUnverifiedReviews: false,
    showUnverifiedGallery: false,
    enableSupabase: false,
    enableWhatsAppEnquiry: true,
  },

  disclaimer:
    "Stock market trading involves financial risk. Course content is provided for educational purposes only and does not constitute investment advice. No guaranteed returns are offered.",
} as const;

export type SiteConfig = typeof siteConfig;
