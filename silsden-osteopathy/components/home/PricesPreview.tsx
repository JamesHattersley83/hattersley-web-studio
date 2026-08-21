import { BOOKING_URL } from "@/lib/config";
import { prices } from "@/lib/content";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function PricesPreview() {
  return (
    <section id="prices" className="section-y scroll-mt-24 bg-mist">
      <Container narrow>
        <SectionHeading
          align="center"
          eyebrow="Prices"
          heading="Simple, transparent pricing."
        />

        <Reveal delay={0.1}>
          <ul className="mt-14 divide-y divide-line border-y border-line">
            {prices.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-6 py-6"
              >
                <div>
                  <p className="text-[16px] font-medium text-charcoal">
                    {item.name}
                  </p>
                  {item.note && (
                    <p className="mt-1 text-[13px] text-charcoal-soft">
                      {item.note}
                    </p>
                  )}
                </div>
                <p className="font-display shrink-0 text-xl text-plum-800">
                  {item.price}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <p className="text-[14px] text-charcoal-soft">
              Prices to be confirmed — please get in touch for current fees.
            </p>
            <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book an appointment
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
