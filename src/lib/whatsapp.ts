
import { siteConfig } from "@/config/site";
import type { EnquiryOutput } from "@/lib/validation";

export function buildEnquiryMessage(
  values: EnquiryOutput
): string {
  return [
    "Hello Rudransh Trading Academy,",
    "",
    "I would like to enquire about admission.",
    "",
    "*STUDENT ENQUIRY*",
    "",
    `*Name:* ${values.name}`,
    `*Mobile:* +91 ${values.mobile}`,
    `*Course:* ${values.interestedCourse}`,
    `*Preferred Batch:* ${values.preferredBatch}`,
    `*Message:* ${
      values.message ||
      "Please share course and admission details."
    }`,
    "",
    "Please contact me with further information.",
    "",
    "Thank you.",
  ].join("\n");
}

export function createWhatsAppUrl(
  message: string
): string {
  return (
    `${siteConfig.contact.whatsapp}?text=` +
    encodeURIComponent(message)
  );
}

export function createEnquiryWhatsAppUrl(
  values: EnquiryOutput
): string {
  return createWhatsAppUrl(
    buildEnquiryMessage(values)
  );
}
