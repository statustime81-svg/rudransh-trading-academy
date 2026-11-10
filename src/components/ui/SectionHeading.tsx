
import type { ReactNode } from "react";

import Reveal from "@/components/animations/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  id?: string;
  children?: ReactNode;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  as: HeadingTag = "h2",
  id,
  children,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={className}>
      <div
        className={
          centered
            ? "mx-auto max-w-3xl text-center"
            : "max-w-3xl text-left"
        }
      >
        {eyebrow && (
          <span className="eyebrow">{eyebrow}</span>
        )}

        <HeadingTag
          id={id}
          className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-[54px]"
        >
          {title}

          {highlight && (
            <>
              {" "}
              <span className="font-display font-normal text-[#D6AD52]">
                {highlight}
              </span>
            </>
          )}
        </HeadingTag>

        {description && (
          <p
            className={`mt-6 text-base leading-8 text-slate-400 ${
              centered ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
          >
            {description}
          </p>
        )}

        {children && (
          <div className="mt-8">{children}</div>
        )}
      </div>
    </Reveal>
  );
}
