import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { BOOKING_URL, BUSINESS } from "@/lib/config";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";

export default function Location() {
  return (
    <section id="location" className="section-y scroll-mt-24 bg-white">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-plum-700">
                Location &amp; Contact
              </p>
              <h2 className="font-display mt-4 text-[clamp(2rem,3.4vw,2.8rem)] leading-[1.1] font-medium text-charcoal">
                Find us in Silsden.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-plum-700" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Address</dt>
                    <dd className="text-[15px] leading-[1.6] text-charcoal">
                      {BUSINESS.addressLine1}
                      <br />
                      {BUSINESS.town}, {BUSINESS.region}
                      <br />
                      {BUSINESS.postcode}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="mt-0.5 size-5 shrink-0 text-plum-700" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Phone</dt>
                    <dd className="text-[15px] text-charcoal">
                      {BUSINESS.phoneHref ? (
                        <a href={BUSINESS.phoneHref} className="hover:text-plum-800">
                          {BUSINESS.phone}
                        </a>
                      ) : (
                        BUSINESS.phone
                      )}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="mt-0.5 size-5 shrink-0 text-plum-700" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd className="text-[15px] text-charcoal">
                      {BUSINESS.emailHref ? (
                        <a href={BUSINESS.emailHref} className="hover:text-plum-800">
                          {BUSINESS.email}
                        </a>
                      ) : (
                        BUSINESS.email
                      )}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="mt-0.5 size-5 shrink-0 text-plum-700" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Opening hours</dt>
                    <dd className="space-y-1 text-[15px] text-charcoal">
                      {BUSINESS.hours.map((h) => (
                        <p key={h.day} className="flex gap-3">
                          <span className="text-charcoal-soft">{h.day}</span>
                          <span>{h.time}</span>
                        </p>
                      ))}
                    </dd>
                  </div>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-medium text-plum-800 hover:text-plum-900"
                >
                  Get directions →
                </a>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-medium text-plum-800 hover:text-plum-900"
                >
                  Book an appointment →
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-mist sm:aspect-[16/10]">
              <svg
                viewBox="0 0 400 250"
                className="h-full w-full"
                aria-hidden="true"
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <line
                    key={`v${i}`}
                    x1={i * 50}
                    y1="0"
                    x2={i * 50}
                    y2="250"
                    stroke="#4A3359"
                    strokeOpacity="0.08"
                  />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line
                    key={`h${i}`}
                    x1="0"
                    y1={i * 50}
                    x2="400"
                    y2={i * 50}
                    stroke="#4A3359"
                    strokeOpacity="0.08"
                  />
                ))}
                <circle cx="200" cy="125" r="7" fill="#4A3359" />
                <circle cx="200" cy="125" r="16" fill="#4A3359" fillOpacity="0.15" />
              </svg>
              <p className="absolute bottom-4 left-4 text-xs tracking-[0.06em] text-charcoal-soft">
                Map placeholder — Silsden, West Yorkshire
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
