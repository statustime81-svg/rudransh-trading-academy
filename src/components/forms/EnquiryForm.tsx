
import { useEffect, useId, useRef } from "react";
import gsap from "gsap";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  MessageCircle,
  Phone,
  UserRound,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

import {
  enquirySchema,
  type EnquiryInput,
  type EnquiryOutput,
} from "@/lib/validation";

import {
  createEnquiryWhatsAppUrl,
} from "@/lib/whatsapp";

import {
  COURSE_NAME,
  COURSE_OPTIONS,
  BATCH_PREFERENCES,
  DEFAULT_ENQUIRY_VALUES,
} from "@/types/enquiry";

// ========================================
// FORM STYLES - TAILWIND CSS V4
// ========================================

const inputClass = [
  "w-full min-h-11",
  "rounded-xl",
  "border border-[#FFD21A]/20",
  "bg-[#090C10]",
  "px-3.5 py-3",
  "text-[13px] text-[#F5F3EE]",
  "outline-none",
  "placeholder:text-[#F5F3EE]/35",
  "transition-[border-color,background-color,box-shadow]",
  "duration-300",
  "hover:border-[#FFD21A]/40",
  "focus:border-[#FFD21A]",
  "focus:bg-[#11151B]",
  "focus:ring-[3px]",
  "focus:ring-[#FFD21A]/10",
  "aria-[invalid=true]:border-red-400/60",
].join(" ");

const labelClass = [
  "mb-2 flex items-center gap-2",
  "text-[11px] font-semibold",
  "tracking-[0.02em]",
  "text-[#F5F3EE]/85",
].join(" ");

const selectClass = [
  inputClass,
  "cursor-pointer",
  "appearance-none",
  "pr-10",
].join(" ");

// ========================================
// VALIDATION ERROR COMPONENT
// ========================================

function ErrorText({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 text-[11px] leading-5 text-red-300"
    >
      {message}
    </p>
  );
}

// ========================================
// MAIN ENQUIRY FORM
// ========================================

export default function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);

  // Unique IDs for the page form and popup form.
  const formId = useId();

  const ids = {
    name: `${formId}-name`,
    mobile: `${formId}-mobile`,
    course: `${formId}-course`,
    batch: `${formId}-batch`,
    message: `${formId}-message`,
  };

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<
    EnquiryInput,
    unknown,
    EnquiryOutput
  >({
    resolver: zodResolver(enquirySchema),

    mode: "onSubmit",

    defaultValues: DEFAULT_ENQUIRY_VALUES,
  });

  // ========================================
  // GSAP FORM REVEAL ANIMATION
  // ========================================

  useEffect(() => {
    const form = formRef.current;

    if (!form) return;

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          const elements =
            form.querySelectorAll<HTMLElement>(
              "[data-form-reveal]"
            );

          gsap.fromTo(
            elements,
            {
              autoAlpha: 0,
              y: 14,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.07,
              ease: "power3.out",
              clearProps:
                "transform,opacity,visibility",
            }
          );
        }, form);

        return () => context.revert();
      }
    );

    return () => media.revert();
  }, []);

  // ========================================
  // WHATSAPP SUBMISSION
  // ========================================

  const submitEnquiry = (
    values: EnquiryOutput
  ) => {
    const whatsappUrl =
      createEnquiryWhatsAppUrl(values);

    // Opens WhatsApp with the selected course,
    // batch preference and student details.
    // Student sends the message manually.
    window.location.assign(whatsappUrl);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(submitEnquiry)}
      noValidate
      className="
        relative isolate overflow-hidden
        rounded-[26px]
        border border-[#FFD21A]/25
        bg-[#11151B]
        p-[clamp(1.1rem,2.2vw,2rem)]
        text-[#F5F3EE]
        shadow-[0_24px_70px_rgba(0,0,0,0.28)]
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-[#FFD21A]/[0.07] blur-[80px]"
      />

      {/* Gold border */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[20%] top-0 h-px bg-gradient-to-r from-transparent via-[#FFD21A]/80 to-transparent"
      />

      <div className="relative">
        {/* FORM HEADER */}

        <div data-form-reveal>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD21A]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFD21A]">
              Admission Enquiry
            </span>
          </div>

          <h3 className="mt-3 font-display text-[clamp(1.55rem,2.4vw,2.2rem)] leading-[1.15] tracking-[-0.025em]">
            Begin Your{" "}
            <span className="italic text-[#FFD21A]">
              Learning Journey.
            </span>
          </h3>

          <p className="mt-2.5 max-w-lg text-xs leading-6 text-[#F5F3EE]/55 sm:text-[13px]">
            Fill in your details to enquire about
            admission at Rudransh Trading Academy.
          </p>
        </div>

        <div
          data-form-reveal
          className="my-5 h-px bg-gradient-to-r from-[#FFD21A]/35 via-[#FFD21A]/10 to-transparent"
        />

        {/* FORM FIELDS */}

        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
          {/* FULL NAME */}

          <div data-form-reveal>
            <label
              htmlFor={ids.name}
              className={labelClass}
            >
              <UserRound
                size={15}
                className="text-[#FFD21A]"
              />

              Full Name
              <span className="text-[#FFD21A]">
                *
              </span>
            </label>

            <input
              id={ids.name}
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              className={inputClass}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name
                  ? `${ids.name}-error`
                  : undefined
              }
              {...register("name")}
            />

            <ErrorText
              id={`${ids.name}-error`}
              message={errors.name?.message}
            />
          </div>

          {/* MOBILE NUMBER */}

          <div data-form-reveal>
            <label
              htmlFor={ids.mobile}
              className={labelClass}
            >
              <Phone
                size={15}
                className="text-[#FFD21A]"
              />

              Mobile Number
              <span className="text-[#FFD21A]">
                *
              </span>
            </label>

            <input
              id={ids.mobile}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              className={inputClass}
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={
                errors.mobile
                  ? `${ids.mobile}-error`
                  : undefined
              }
              {...register("mobile")}
            />

            <ErrorText
              id={`${ids.mobile}-error`}
              message={errors.mobile?.message}
            />
          </div>

          {/* INTERESTED COURSE DROPDOWN */}

          <div data-form-reveal>
            <label
              htmlFor={ids.course}
              className={labelClass}
            >
              <BookOpen
                size={15}
                className="text-[#FFD21A]"
              />

              Interested Course
              <span className="text-[#FFD21A]">
                *
              </span>
            </label>

            <div className="relative">
              <select
                id={ids.course}
                className={selectClass}
                aria-invalid={Boolean(
                  errors.interestedCourse
                )}
                aria-describedby={
                  errors.interestedCourse
                    ? `${ids.course}-error`
                    : undefined
                }
                {...register("interestedCourse")}
              >
                {COURSE_OPTIONS.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option === COURSE_NAME
                      ? `${option} (Complete Course)`
                      : option}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FFD21A]"
                aria-hidden="true"
              />
            </div>

            <ErrorText
              id={`${ids.course}-error`}
              message={
                errors.interestedCourse?.message
              }
            />
          </div>

          {/* PREFERRED BATCH DROPDOWN */}

          <div data-form-reveal>
            <label
              htmlFor={ids.batch}
              className={labelClass}
            >
              <CalendarDays
                size={15}
                className="text-[#FFD21A]"
              />

              Preferred Batch
              <span className="text-[#FFD21A]">
                *
              </span>
            </label>

            <div className="relative">
              <select
                id={ids.batch}
                className={selectClass}
                aria-invalid={Boolean(
                  errors.preferredBatch
                )}
                aria-describedby={
                  errors.preferredBatch
                    ? `${ids.batch}-error`
                    : undefined
                }
                {...register("preferredBatch")}
              >
                {BATCH_PREFERENCES.map((batch) => (
                  <option
                    key={batch}
                    value={batch}
                  >
                    {batch}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FFD21A]"
                aria-hidden="true"
              />
            </div>

            <ErrorText
              id={`${ids.batch}-error`}
              message={
                errors.preferredBatch?.message
              }
            />
          </div>
        </div>

        {/* USER MESSAGE */}

        <div
          data-form-reveal
          className="mt-4"
        >
          <label
            htmlFor={ids.message}
            className={labelClass}
          >
            <MessageCircle
              size={15}
              className="text-[#FFD21A]"
            />

            Your Message
          </label>

          <textarea
            id={ids.message}
            rows={3}
            placeholder="What would you like to know about the course or admission?"
            className={`${inputClass} min-h-[100px] resize-y`}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message
                ? `${ids.message}-error`
                : undefined
            }
            {...register("message")}
          />

          <ErrorText
            id={`${ids.message}-error`}
            message={errors.message?.message}
          />
        </div>

        {/* SUBMIT BUTTON */}

        <div
          data-form-reveal
          className="mt-5"
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              group flex min-h-12 w-full
              items-center justify-center gap-2.5
              rounded-xl bg-[#FFD21A]
              px-5 py-3
              text-[13px] font-semibold
              text-[#0B0D10]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[#FFE15C]
              hover:shadow-[0_12px_35px_rgba(255,210,26,0.2)]
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#FFD21A]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <MessageCircle size={18} />

            {isSubmitting
              ? "Preparing Enquiry..."
              : "Continue to WhatsApp"}

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        {/* PRIVACY NOTE */}

        <div
          data-form-reveal
          className="mt-4 flex items-start justify-center gap-2"
        >
          <ShieldCheck
            size={15}
            className="mt-0.5 shrink-0 text-[#FFD21A]/75"
          />

          <p className="max-w-md text-center text-[10px] leading-5 text-[#F5F3EE]/45">
            Your details are not stored on this website.
            WhatsApp opens with a prepared enquiry
            that you can review and send.
          </p>
        </div>
      </div>
    </form>
  );
}
