/**
 * Central site configuration.
 *
 * Values marked PLACEHOLDER have not been supplied and must be replaced with
 * real, verified information before launch. Nothing here is invented as fact —
 * placeholders are intentionally left visible/obvious rather than guessed.
 */

/**
 * Cliniko (or other) online booking destination.
 * Every "Book an appointment" CTA on the site reads from this single constant,
 * so the real booking link only needs to be set in one place.
 */
export const BOOKING_URL = "https://silsdenosteopathy.cliniko.com/bookings"; // PLACEHOLDER — replace with the real Cliniko online booking URL

export const BUSINESS = {
  name: "Silsden Osteopathy",
  town: "Silsden",
  region: "West Yorkshire",
  areaServed: ["Silsden", "Keighley", "Steeton", "Addingham", "Skipton"],

  // PLACEHOLDER — none of the details below have been supplied yet.
  addressLine1: "Add practice address",
  postcode: "Add postcode",
  phone: "Add phone number",
  phoneHref: "", // e.g. "tel:+441535000000" once a real number is available
  email: "Add email address",
  emailHref: "", // e.g. "mailto:hello@silsdenosteopathy.co.uk"
  hours: [
    { day: "Monday – Friday", time: "Add opening hours" },
    { day: "Saturday", time: "Add opening hours" },
    { day: "Sunday", time: "Closed" },
  ],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Silsden+Osteopathy+Silsden",
} as const;

/**
 * Google review summary shown in the reviews section.
 * PLACEHOLDER — replace with live values once the Google Business Profile
 * (or a reviews API/plugin) is connected. See components/home/GoogleReviews.tsx.
 */
export const GOOGLE_RATING = {
  average: 5.0,
  count: undefined as number | undefined, // e.g. 42 — left unset until verified
};
