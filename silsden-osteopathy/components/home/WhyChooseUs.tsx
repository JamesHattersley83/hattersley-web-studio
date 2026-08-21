import { whyChooseUs } from "@/lib/content";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";

export default function WhyChooseUs() {
  return (
    <section className="section-y bg-cream">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-plum-700">
                Why Silsden Osteopathy
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-4 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.08] font-medium text-balance text-charcoal">
                Care that&rsquo;s considered, not rushed.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {whyChooseUs.map((item, i) => (
                <Reveal key={item.number} delay={(i % 2) * 0.08}>
                  <li className="border-t border-line pt-5">
                    <span className="font-display text-sm text-plum-500">
                      {item.number}
                    </span>
                    <h3 className="font-display mt-2 text-lg text-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-charcoal-soft">
                      {item.description}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
