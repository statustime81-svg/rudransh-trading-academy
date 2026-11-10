
/**
 * Rudransh Trading Academy
 * Admission Enquiry Types & Configuration
 */

// ======================================
// MAIN COURSE CONFIGURATION
// ======================================

export const COURSE_ID =
  "basic-to-advanced-stock-market" as const;

export const COURSE_NAME =
  "Basic to Advanced Stock Market Course" as const;

// ======================================
// COURSE & MODULE OPTIONS
// ======================================

export const COURSE_OPTIONS = [
  COURSE_NAME,
  "Basics of Stock Market",
  "Fundamental Analysis",
  "Technical Analysis",
  "Futures & Options",
] as const;

// Allow the main course AND all four modules.
export type CourseName =
  (typeof COURSE_OPTIONS)[number];

// ======================================
// BATCH PREFERENCES
// ======================================

export const BATCH_PREFERENCES = [
  "Upcoming Batch",
  "Morning Batch",
  "Afternoon Batch",
  "Evening Batch",
  "Flexible Timing",
  "Please Contact Me",
] as const;

export type BatchPreference =
  (typeof BATCH_PREFERENCES)[number];

// ======================================
// ENQUIRY FORM TYPES
// ======================================

export interface EnquiryFormValues {
  name: string;
  mobile: string;
  interestedCourse: CourseName;
  preferredBatch: BatchPreference;
  message: string;
}

// ======================================
// DEFAULT FORM VALUES
// ======================================

export const DEFAULT_ENQUIRY_VALUES: EnquiryFormValues = {
  name: "",
  mobile: "",
  interestedCourse: COURSE_NAME,
  preferredBatch: "Please Contact Me",
  message: "",
};
