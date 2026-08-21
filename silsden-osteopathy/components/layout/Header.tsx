"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BOOKING_URL } from "@/lib/config";
import { navigation } from "@/lib/content";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-line bg-cream/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between">
        <div className={`transition-[padding] duration-300 ${scrolled ? "py-3" : "py-5"}`}>
          <Logo />
        </div>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[14px] font-medium text-charcoal-soft transition-colors hover:text-plum-800"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3"
          >
            Book Appointment
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex size-11 items-center justify-center text-charcoal lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-50 flex flex-col bg-cream lg:hidden"
          >
            <Container className="flex items-center justify-between py-5">
              <Logo />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-11 items-center justify-center text-charcoal"
                aria-label="Close menu"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </Container>

            <nav
              className="flex flex-1 flex-col justify-center gap-1 px-8"
              aria-label="Mobile primary"
            >
              {navigation.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.35,
                    delay: shouldReduceMotion ? 0 : 0.05 * i,
                  }}
                  className="font-display border-b border-line py-4 text-3xl text-charcoal transition-colors hover:text-plum-800"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <Container className="pb-10">
              <Button
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="w-full min-h-14"
              >
                Book Appointment
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
