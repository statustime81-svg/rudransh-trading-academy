
export type MediaCategory =
  | "academy"
  | "classroom"
  | "trainer"
  | "event"
  | "curriculum";

export interface AcademyMedia {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: MediaCategory;
  verified: boolean;
  approvedForWebsite: boolean;
}

export const academyMedia: AcademyMedia[] = [
  {
    id: "academy-exterior",
    src: "/assets/academy/exterior.webp",
    alt: "Rudransh Trading Academy exterior",
    caption: "Academy Exterior",
    category: "academy",
    verified: false,
    approvedForWebsite: false,
  },
  {
    id: "academy-classroom",
    src: "/assets/academy/classroom.webp",
    alt: "Rudransh Trading Academy classroom",
    caption: "Academy Classroom",
    category: "classroom",
    verified: false,
    approvedForWebsite: false,
  },
  {
    id: "trainer-rajesh-kumar",
    src: "/assets/trainer/rajesh-kumar.webp",
    alt: "Rajesh Kumar",
    caption: "Academy Trainer",
    category: "trainer",
    verified: false,
    approvedForWebsite: false,
  },
];

export const brandAssets = {
  logo: "/assets/brand/rta-logo.png",
  logoOptimized: "/assets/brand/rta-logo.webp",
  curriculumPoster:
    "/assets/curriculum/official-curriculum.webp",
} as const;

export function getApprovedMedia(
  category?: MediaCategory
): AcademyMedia[] {
  return academyMedia.filter((item) => {
    const approved =
      item.verified && item.approvedForWebsite;

    if (!approved) return false;

    if (category && item.category !== category) {
      return false;
    }

    return true;
  });
}

export const approvedGalleryMedia =
  getApprovedMedia().filter(
    (item) => item.category !== "curriculum"
  );
