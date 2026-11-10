
import { z } from "zod";

import {
  BATCH_PREFERENCES,
  COURSE_OPTIONS,
} from "@/types/enquiry";

// ========================================
// MOBILE NUMBER NORMALIZATION
// ========================================

function normalizeMobile(value: string): string {
  const digits = value.replace(/\D/g, "");

  // Convert +91XXXXXXXXXX to XXXXXXXXXX
  if (
    digits.length === 12 &&
    digits.startsWith("91")
  ) {
    return digits.slice(2);
  }

  return digits;
}

// ========================================
// ADMISSION ENQUIRY VALIDATION
// ========================================

export const enquirySchema = z.object({
  // Full Name
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name is too long."),

  // Indian Mobile Number
  mobile: z
    .string()
    .trim()
    .transform(normalizeMobile)
    .pipe(
      z
        .string()
        .regex(
          /^[6-9]\d{9}$/,
          "Enter a valid 10-digit Indian mobile number."
        )
    ),

  // Main Course + Four Learning Modules
  interestedCourse: z.enum(COURSE_OPTIONS, {
    error: "Please select a valid course or module.",
  }),

  // Preferred Batch
  preferredBatch: z.enum(BATCH_PREFERENCES, {
    error: "Please select your preferred batch.",
  }),

  // Optional Message
  message: z
    .string()
    .trim()
    .max(
      1000,
      "Message cannot exceed 1000 characters."
    ),
});

// ========================================
// TYPES FOR REACT HOOK FORM
// ========================================

export type EnquiryInput =
  z.input<typeof enquirySchema>;

export type EnquiryOutput =
  z.output<typeof enquirySchema>;
