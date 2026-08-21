import { trustPoints } from "@/lib/content";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-white">
      <Container>
        <Reveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 py-8 sm:py-9">
            {trustPoints.map((point, i) => (
              <li key={point} className="flex items-center gap-4">
                <span className="text-[13px] font-medium tracking-[0.04em] text-charcoal-soft">
                  {point}
                </span>
                {i !== trustPoints.length - 1 && (
                  <span className="text-lavender" aria-hidden="true">
                    &middot;
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
