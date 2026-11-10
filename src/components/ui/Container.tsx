
import type {
  ElementType,
  ReactNode,
} from "react";

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
}

const containerSizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-none",
};

export default function Container({
  children,
  as: Component = "div",
  size = "lg",
  className = "",
}: ContainerProps) {
  return (
    <Component
      className={[
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerSizes[size],
        className,
      ].join(" ")}
    >
      {children}
    </Component>
  );
}
