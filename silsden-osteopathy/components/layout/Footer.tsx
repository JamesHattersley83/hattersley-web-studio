import { BUSINESS } from "@/lib/config";
import { footerLinks } from "@/lib/content";
import Container from "../ui/Container";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-plum-950 text-cream">
      <Container className="section-y grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-cream/70">
            Osteopathy and Pilates in Silsden, West Yorkshire.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-cream/50">
            Navigation
          </p>
          <ul className="mt-5 space-y-3">
            {footerLinks.navigation.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[15px] text-cream/80 transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Treatments">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-cream/50">
            Treatments
          </p>
          <ul className="mt-5 space-y-3">
            {footerLinks.treatments.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[15px] text-cream/80 transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-cream/50">
            Contact
          </p>
          <ul className="mt-5 space-y-3 text-[15px] text-cream/80">
            <li>{BUSINESS.phone}</li>
            <li>{BUSINESS.email}</li>
            <li>
              {BUSINESS.addressLine1}
              <br />
              {BUSINESS.town}, {BUSINESS.region}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-8 text-[13px] text-cream/50 sm:flex-row">
          <p>© {year} Silsden Osteopathy</p>
          <div className="flex items-center gap-6">
            <span className="cursor-default">Privacy Policy</span>
            <span className="cursor-default">Cookie Policy</span>
          </div>
          <p>Website by Hattersley Web Studio</p>
        </Container>
      </div>
    </footer>
  );
}
