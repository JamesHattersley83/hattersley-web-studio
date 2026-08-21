import Container from "../ui/Container";
import PhotoPanel from "../ui/PhotoPanel";
import Reveal from "../ui/Reveal";

export default function MeetAmy() {
  return (
    <section id="about" className="section-y scroll-mt-24 bg-white">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <PhotoPanel
              label="Portrait of Amy at Silsden Osteopathy"
              caption="Amy, Silsden Osteopathy"
              motif="botanical"
              aspect="aspect-[4/5]"
            />
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-plum-700">
                About Silsden Osteopathy
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-4 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.08] font-medium text-balance text-charcoal">
                Personal care centred around you.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6 max-w-lg space-y-5 text-[17px] leading-[1.7] text-charcoal-soft">
                <p>
                  Silsden Osteopathy was founded to offer a calmer, more
                  personal alternative to hurried healthcare — time to
                  properly listen, a thorough assessment, and treatment
                  built around the person in front of Amy, not a generic
                  protocol.
                </p>
                <p>
                  Every appointment starts with understanding how pain or
                  restricted movement is affecting your day-to-day life,
                  before working together on a plan to help you move and
                  feel better.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <a
                href="#osteopathy"
                className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-plum-800 transition-colors hover:text-plum-900"
              >
                More about Amy&rsquo;s approach
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
