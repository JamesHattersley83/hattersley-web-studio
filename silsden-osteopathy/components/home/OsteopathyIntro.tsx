import { osteopathyPillars } from "@/lib/content";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function OsteopathyIntro() {
  return (
    <section id="osteopathy" className="section-y scroll-mt-24 bg-mist">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Osteopathy"
          heading="Helping your body move and function at its best."
          intro="Osteopathy takes a whole-body approach to understanding the cause of pain and restricted movement, rather than treating symptoms in isolation. Using hands-on techniques alongside movement and lifestyle advice, treatment is tailored to you — your body, your history and how you want to feel."
        />

        <div className="mt-16 grid divide-y divide-line border-t border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-t-0">
          {osteopathyPillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <div className="h-full px-1 py-8 sm:px-8 sm:py-2 first:sm:pl-0 last:sm:pr-0">
                <span className="font-display text-sm text-plum-500">
                  {pillar.label}
                </span>
                <h3 className="font-display mt-3 text-xl text-charcoal">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-soft">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
