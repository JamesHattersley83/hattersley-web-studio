import Container from "../ui/Container";
import PhotoPanel from "../ui/PhotoPanel";
import Reveal from "../ui/Reveal";

export default function PilatesFeature() {
  return (
    <section id="pilates" className="section-y scroll-mt-24 bg-plum-800">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-lavender">
                Pilates
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-4 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.08] font-medium text-balance text-cream">
                Move better.
                <br />
                Feel stronger.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6 max-w-md space-y-5 text-[17px] leading-[1.7] text-cream/80">
                <p>
                  Pilates complements osteopathic treatment by building
                  strength, control and body awareness — helping the results
                  of treatment last.
                </p>
                <p>
                  Sessions are tailored to your ability, whether you&rsquo;re
                  returning to movement after injury or building a stronger,
                  more resilient body for the long term.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <a
                href="#prices"
                className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-cream transition-colors hover:text-lavender"
              >
                Discover Pilates
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <PhotoPanel
              label="Pilates equipment in the Silsden Osteopathy studio"
              caption="The Pilates studio at Silsden Osteopathy"
              motif="studio"
              tone="plum"
              aspect="aspect-[6/5]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
