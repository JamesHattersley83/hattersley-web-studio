import { BOOKING_URL } from "@/lib/config";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";

export default function FinalCTA() {
  return (
    <section className="section-y bg-plum-900">
      <Container narrow className="text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-lavender">
            Ready when you are
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mx-auto mt-5 max-w-2xl text-[clamp(2.4rem,4.2vw,3.8rem)] leading-[1.06] font-medium text-balance text-cream">
            Start feeling more like yourself again.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-md text-[17px] leading-[1.7] text-cream/75">
            Whether you&rsquo;re dealing with pain, restricted movement or
            simply want to move with more confidence, we&rsquo;re here to
            help.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <Button
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="inverse"
            className="mt-9"
          >
            Book an appointment
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
