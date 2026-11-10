
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "gold" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

const variants: Record<ButtonVariant, string> = {
  gold:
    "border-[#D6AD52] bg-[#D6AD52] text-[#071426] " +
    "hover:bg-[#EBC878] hover:border-[#EBC878]",

  outline:
    "border-[#D6AD52]/50 bg-transparent text-white " +
    "hover:border-[#D6AD52] hover:bg-[#D6AD52]/10",

  ghost:
    "border-transparent bg-white/[0.05] text-white " +
    "hover:bg-white/[0.10]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-xs",
  md: "min-h-12 px-6 py-3 text-sm",
  lg: "min-h-14 px-7 py-4 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 " +
  "rounded-xl border font-semibold " +
  "transition-[background,border-color,transform] duration-300 " +
  "hover:-translate-y-0.5 " +
  "focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-4 " +
  "focus-visible:outline-[#D6AD52]";

export default function Button(
  props: ButtonProps | LinkProps
) {
  
const {
  variant = "gold",
  size = "md",
  fullWidth = false,
  className = "",
} = props;


  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  if ("href" in props && typeof props.href === "string") {
    const {
      href,
      children: linkChildren,
      variant: _variant,
      size: _size,
      fullWidth: _fullWidth,
      className: _className,
      ...rest
    } = props as LinkProps;

    void _variant;
    void _size;
    void _fullWidth;
    void _className;

    const isExternal = /^https?:\/\//i.test(href);

    return (
      <a
        {...rest}
        href={href}
        className={classes}
        target={rest.target ?? (isExternal ? "_blank" : undefined)}
        rel={
          rest.rel ??
          (isExternal ? "noopener noreferrer" : undefined)
        }
      >
        {linkChildren}
      </a>
    );
  }

  const {
    children: buttonChildren,
    variant: _variant,
    size: _size,
    fullWidth: _fullWidth,
    className: _className,
    type = "button",
    ...rest
  } = props as ButtonProps;

  void _variant;
  void _size;
  void _fullWidth;
  void _className;

  return (
    <button
      {...rest}
      type={type}
      className={classes}
    >
      {buttonChildren}
    </button>
  );
}
