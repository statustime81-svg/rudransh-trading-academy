
export interface NavigationItem {
  label: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const navigationConfig = {
  brandHref: "#home",

  primaryCta: {
    label: "Enquire Now",
    href: "#admission",
  },

  secondaryCta: {
    label: "Explore Curriculum",
    href: "#courses",
  },

  footerLinks: [
    { label: "Home", href: "#home" },
    { label: "About Academy", href: "#about" },
    { label: "Course Curriculum", href: "#courses" },
    { label: "Trainer", href: "#trainer" },
    { label: "Google Reviews", href: "#reviews" },
    { label: "Admission Enquiry", href: "#admission" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const sectionIds = {
  home: "home",
  about: "about",
  trainer: "trainer",
  courses: "courses",
  benefits: "benefits",
  marketExperience: "market-experience",
  gallery: "gallery",
  reviews: "reviews",
  admission: "admission",
  contact: "contact",
} as const;
