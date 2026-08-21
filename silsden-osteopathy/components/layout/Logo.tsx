import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="#top"
      className="group inline-flex items-center gap-3"
      aria-label="Silsden Osteopathy — home"
    >
      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-full border ${
          light ? "border-cream/40 text-cream" : "border-plum-800/30 text-plum-800"
        }`}
        aria-hidden="true"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1C10 1 11.5 2.6 11.5 4.7C11.5 6.2 10.7 7.4 9.4 7.9C10.9 8.4 12 9.9 12 11.7C12 13.9 10.2 15.5 8 15.5C5.8 15.5 4 13.9 4 11.7C4 9.9 5.1 8.4 6.6 7.9C5.3 7.4 4.5 6.2 4.5 4.7C4.5 2.6 6 1 8 1Z"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[19px] tracking-[0.01em] ${
            light ? "text-cream" : "text-charcoal"
          }`}
        >
          Silsden Osteopathy
        </span>
        <span
          className={`mt-1 hidden text-[10px] font-medium uppercase tracking-[0.16em] sm:block ${
            light ? "text-cream/60" : "text-charcoal-soft"
          }`}
        >
          Osteopathy &amp; Pilates
        </span>
      </span>
    </Link>
  );
}
