/**
 * LocalBusiness / MedicalBusiness structured data — NOT wired up yet.
 *
 * Google's guidelines require structured data to match real, published
 * business information, so this is deliberately left unused until the
 * placeholders in `lib/config.ts` (BUSINESS.addressLine1, postcode, phone,
 * email, hours) are replaced with verified details. Fabricating NAP data in
 * JSON-LD would be actively harmful for local SEO.
 *
 * Once verified, fill this in and render it from app/layout.tsx with:
 *
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
 *   />
 */
import { BUSINESS } from "./config";

export const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: BUSINESS.name,
  areaServed: BUSINESS.areaServed,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.addressLine1,
    addressLocality: BUSINESS.town,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postcode,
    addressCountry: "GB",
  },
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
} as const;
