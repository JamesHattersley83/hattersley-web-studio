import { type AnchorHTMLAttributes, type ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "inverse";
  className?: string;
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel" | "onClick">;

const variants = {
  primary: "bg-plum-800 text-cream hover:bg-plum-900",
  inverse: "bg-cream text-plum-900 hover:bg-lavender-soft",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-[3px] px-7 py-3.5 text-[15px] font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
