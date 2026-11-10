
import { siteConfig } from "@/config/site";

export const seoConfig = {
  title:
    "Rudransh Trading Academy | Stock Market Course in Patna",

  description:
    "Explore stock market education at Rudransh Trading Academy in Punpun, Patna. Learn market fundamentals, fundamental analysis, technical analysis, and futures & options.",

  keywords: [
    "Rudransh Trading Academy",
    "Stock Market Course Patna",
    "Trading Academy Punpun",
    "Stock Market Education Bihar",
    "Technical Analysis Course",
    "Fundamental Analysis",
    "Futures and Options Education",
  ],

  siteName: siteConfig.name,

  locale: "en_IN",

  themeColor: "#071426",

  // Set after the production domain is confirmed.
  productionUrl: "",

  // Enable after the actual branded OG image exists.
  ogImage: "",

  robots: "index, follow",

  openGraph: {
    type: "website",
    title: "Rudransh Trading Academy",
    description:
      "Explore stock market education and the Basic to Advanced Stock Market Course.",
  },
} as const;

export function getCanonicalUrl(): string | undefined {
  const url = seoConfig.productionUrl.trim();

  if (!url) return undefined;

  try {
    const parsed = new URL(url);

    if (
      !["https:", "http:"].includes(parsed.protocol)
    ) {
      return undefined;
    }

    return `${parsed.origin}/`;
  } catch {
    return undefined;
  }
}

export function getBusinessStructuredData() {
  const canonicalUrl = getCanonicalUrl();

  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",

    name: siteConfig.name,

    description: siteConfig.description,

    ...(canonicalUrl
      ? { url: canonicalUrl }
      : {}),

    telephone: siteConfig.contact.phone,

    address: {
      "@type": "PostalAddress",

      streetAddress:
        `${siteConfig.address.house}, ${siteConfig.address.landmark}`,

      addressLocality:
        `${siteConfig.address.locality}, ${siteConfig.address.city}`,

      addressRegion: siteConfig.address.state,

      postalCode: siteConfig.address.postalCode,

      addressCountry: "IN",
    },

    hasMap: siteConfig.contact.maps,

    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "admissions enquiries",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function getCourseStructuredData() {
  const canonicalUrl = getCanonicalUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Course",

    name: siteConfig.course.name,

    description:
      "Stock market education covering market basics, fundamental analysis, technical analysis, and futures & options.",

    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,

      ...(canonicalUrl
        ? { url: canonicalUrl }
        : {}),
    },

    educationalLevel: "Beginner to Advanced",

    inLanguage: "en",

    ...(canonicalUrl
      ? { url: `${canonicalUrl}#courses` }
      : {}),
  };
}
