import { Star } from "lucide-react";
import { GOOGLE_RATING } from "@/lib/config";
import { demoReviews, type Review } from "@/lib/content";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

function GoogleG() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-3.1-.4-4.6H24v9h11.8c-.5 2.8-2.1 5.1-4.4 6.7v5.6h7.1c4.2-3.8 6.6-9.5 6.6-16.7Z"
      />
      <path
        fill="#34A853"
        d="M24 46c6 0 11-2 14.5-5.3l-7.1-5.6c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8 41.1 15.4 46 24 46Z"
      />
      <path
        fill="#FBBC05"
        d="M11.8 28.2c-.4-1.3-.7-2.7-.7-4.2s.2-2.9.7-4.2v-5.7H4.5A21.9 21.9 0 0 0 2 24c0 3.5.9 6.9 2.5 9.9l7.3-5.7Z"
      />
      <path
        fill="#EA4335"
        d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 30 2 24 2 15.4 2 8 6.9 4.5 14.1l7.3 5.7c1.7-5.2 6.5-9.1 12.2-9.1Z"
      />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="size-4 fill-plum-700 text-plum-700" />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex h-full min-w-[82%] snap-start flex-col rounded-[3px] border border-line bg-white p-8 sm:min-w-0">
      <Stars />
      <p className="mt-5 flex-1 text-[15px] leading-[1.7] text-charcoal-soft">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span className="flex size-9 items-center justify-center rounded-full bg-mist text-xs font-medium text-plum-800">
          {review.initials}
        </span>
        <div className="leading-tight">
          <p className="text-[14px] font-medium text-charcoal">{review.name}</p>
          <p className="text-[13px] text-charcoal-soft">{review.relativeDate}</p>
        </div>
      </div>
    </div>
  );
}

export default function GoogleReviews() {
  const ratingLabel = GOOGLE_RATING.count
    ? `${GOOGLE_RATING.average.toFixed(1)} · ${GOOGLE_RATING.count} Google reviews`
    : `${GOOGLE_RATING.average.toFixed(1)} rating on Google`;

  return (
    <section className="section-y bg-white">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Reviews"
          heading="Kind words from our patients"
        />

        <Reveal delay={0.1}>
          <div className="mt-6 flex items-center justify-center gap-3">
            <GoogleG />
            <Stars />
            <span className="text-[14px] font-medium text-charcoal-soft">
              {ratingLabel}
            </span>
          </div>
        </Reveal>

        <div className="mt-14 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0">
          {demoReviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.08} className="min-w-[82%] sm:min-w-0">
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
