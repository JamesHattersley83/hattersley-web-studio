import { conditions } from "@/lib/content";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function Conditions() {
  return (
    <section id="conditions" className="section-y scroll-mt-24 bg-white">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Conditions"
          heading="Conditions we can help with"
          intro="A selection of the everyday aches, pains and restrictions patients bring to Silsden Osteopathy."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((condition, i) => {
            const Icon = condition.icon;
            return (
              <Reveal key={condition.name} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-[3px] border border-line bg-cream/60 p-8 transition-colors duration-200 hover:border-plum-500/40">
                  <Icon
                    className="size-6 text-plum-700"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="font-display mt-5 text-lg text-charcoal">
                    {condition.name}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.65] text-charcoal-soft">
                    {condition.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
