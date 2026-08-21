"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BOOKING_URL } from "@/lib/config";
import Button from "../ui/Button";
import Container from "../ui/Container";
import PhotoPanel from "../ui/PhotoPanel";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? {} : { opacity: 0, y: 18 };
  const animate = shouldReduceMotion ? {} : { opacity: 1, y: 0 };

  return (
    <section id="top" className="section-y !pt-8 lg:!pt-16">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <motion.p
              initial={initial}
              animate={animate}
              transition={{ duration: 0.6, ease }}
              className="text-xs font-medium uppercase tracking-[0.18em] text-plum-700"
            >
              Osteopathy &middot; Pilates &middot; Silsden
            </motion.p>

            <motion.h1
              initial={initial}
              animate={animate}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="font-display mt-5 text-[clamp(3rem,5vw,5.5rem)] leading-[1.02] font-medium text-balance text-charcoal"
            >
              Helping you move, feel and live better.
            </motion.h1>

            <motion.p
              initial={initial}
              animate={animate}
              transition={{ duration: 0.6, delay: 0.24, ease }}
              className="mt-6 max-w-md text-[18px] leading-[1.7] text-charcoal-soft"
            >
              Professional osteopathic care and Pilates in Silsden, helping
              you reduce discomfort, restore movement and feel confident in
              your body again.
            </motion.p>

            <motion.div
              initial={initial}
              animate={animate}
              transition={{ duration: 0.6, delay: 0.36, ease }}
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book an appointment
              </Button>
              <a
                href="#osteopathy"
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-plum-800 transition-colors hover:text-plum-900"
              >
                Explore osteopathy
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.97 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="lg:col-span-7 lg:pl-6"
          >
            <PhotoPanel
              label="Amy treating a patient in the Silsden treatment room"
              caption="Amy treating a patient, Silsden treatment room"
              motif="figure"
              aspect="aspect-[6/5] lg:aspect-[11/9]"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
