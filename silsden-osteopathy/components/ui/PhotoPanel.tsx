/**
 * Stand-in for real photography.
 *
 * No photographs of Amy, the treatment room or the Pilates studio were
 * available in the project, so rather than use generic stock photos of
 * strangers passed off as "Amy", each image slot on the page is an abstract,
 * on-brand editorial panel. Swap the <PhotoPanel> usage for a real
 * `next/image` once photography is supplied — the aspect ratios and caption
 * pattern are designed to drop straight in.
 */

type Motif = "figure" | "botanical" | "studio";

type PhotoPanelProps = {
  label: string;
  caption?: string;
  motif?: Motif;
  tone?: "cream" | "plum";
  aspect?: string;
  className?: string;
};

function Motif({ motif, tone }: { motif: Motif; tone: "cream" | "plum" }) {
  const stroke = tone === "plum" ? "#F3EEF4" : "#4A3359";

  if (motif === "botanical") {
    return (
      <svg viewBox="0 0 400 500" fill="none" className="h-full w-full" aria-hidden="true">
        <path
          d="M120 480C110 380 140 300 90 220C50 156 70 90 130 40"
          stroke={stroke}
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
        <path
          d="M130 40C150 70 190 74 210 50"
          stroke={stroke}
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
        <path
          d="M100 220C130 214 152 232 150 264"
          stroke={stroke}
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
        <path
          d="M300 460C316 380 296 300 330 232C356 178 344 110 296 60"
          stroke={stroke}
          strokeOpacity="0.16"
          strokeWidth="1.5"
        />
        <circle cx="130" cy="40" r="3" fill={stroke} fillOpacity="0.3" />
        <circle cx="296" cy="60" r="3" fill={stroke} fillOpacity="0.24" />
      </svg>
    );
  }

  if (motif === "studio") {
    return (
      <svg viewBox="0 0 400 500" fill="none" className="h-full w-full" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1={40 + i * 64}
            y1="30"
            x2={40 + i * 64}
            y2="470"
            stroke={stroke}
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        ))}
        <line x1="30" y1="360" x2="370" y2="360" stroke={stroke} strokeOpacity="0.2" strokeWidth="1.5" />
        <line x1="30" y1="140" x2="370" y2="140" stroke={stroke} strokeOpacity="0.14" strokeWidth="1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 500" fill="none" className="h-full w-full" aria-hidden="true">
      <path
        d="M200 60C240 60 268 92 268 136C268 172 246 198 216 210C270 224 306 264 306 320C306 396 258 452 200 452C142 452 94 396 94 320C94 264 130 224 184 210C154 198 132 172 132 136C132 92 160 60 200 60Z"
        stroke={stroke}
        strokeOpacity="0.16"
        strokeWidth="1.5"
      />
      <path
        d="M140 300C160 340 180 356 200 356C220 356 240 340 260 300"
        stroke={stroke}
        strokeOpacity="0.16"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function PhotoPanel({
  label,
  caption,
  motif = "figure",
  tone = "cream",
  aspect = "aspect-[4/5]",
  className = "",
}: PhotoPanelProps) {
  const bg =
    tone === "plum"
      ? "bg-gradient-to-br from-plum-700 via-plum-800 to-plum-900"
      : "bg-gradient-to-br from-lavender-soft via-cream to-mist";

  return (
    <figure className={`relative ${className}`}>
      <div
        role="img"
        aria-label={`${label} — photography placeholder`}
        className={`relative overflow-hidden rounded-sm ${aspect} ${bg}`}
      >
        <div className="absolute inset-0 p-8 md:p-12">
          <Motif motif={motif} tone={tone} />
        </div>
        <div
          className={`absolute inset-0 ${
            tone === "plum"
              ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
              : "shadow-[inset_0_0_0_1px_rgba(50,43,56,0.08)]"
          }`}
        />
      </div>
      {caption && (
        <figcaption
          className={`mt-3 flex items-center gap-2 text-xs tracking-[0.06em] ${
            tone === "plum" ? "text-cream/60" : "text-charcoal-soft"
          }`}
        >
          <span className="h-px w-6 bg-current opacity-40" aria-hidden="true" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
