import { type ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <div
      className={`${isCenter ? "mx-auto text-center max-w-(--container-narrow)" : "max-w-xl"} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={`text-xs font-medium uppercase tracking-[0.18em] ${
              isLight ? "text-lavender" : "text-plum-700"
            }`}
          >
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={`font-display mt-4 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.08] font-medium text-balance ${
            isLight ? "text-cream" : "text-charcoal"
          }`}
        >
          {heading}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-[17px] leading-[1.7] ${
              isLight ? "text-cream/80" : "text-charcoal-soft"
            } ${isCenter ? "mx-auto" : ""}`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
