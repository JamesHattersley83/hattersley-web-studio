import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlignVerticalJustifyCenter,
  Baby,
  Bone,
  Brain,
  Dumbbell,
  Move,
  PersonStanding,
  Waves,
} from "lucide-react";

export const navigation = [
  { label: "Home", href: "#top" },
  { label: "Osteopathy", href: "#osteopathy" },
  { label: "Conditions", href: "#conditions" },
  { label: "Pilates", href: "#pilates" },
  { label: "Prices", href: "#prices" },
  { label: "About Amy", href: "#about" },
  { label: "Contact", href: "#location" },
] as const;

export const trustPoints = [
  "Registered Osteopath",
  "Silsden, West Yorkshire",
  "Personalised Treatment",
  "Osteopathy & Pilates",
] as const;

export type Condition = {
  name: string;
  description: string;
  icon: LucideIcon;
};

// Real conditions commonly treated by osteopaths. Edit to match Amy's exact
// scope of practice if it differs.
export const conditions: Condition[] = [
  {
    name: "Back pain",
    description:
      "Support for acute and long-standing back pain, from general stiffness to more restricted movement.",
    icon: Bone,
  },
  {
    name: "Neck pain",
    description:
      "Treatment for neck stiffness and discomfort, often linked to posture, tension or day-to-day strain.",
    icon: PersonStanding,
  },
  {
    name: "Shoulder pain",
    description:
      "Helping to ease shoulder discomfort and restore a fuller, more comfortable range of movement.",
    icon: Move,
  },
  {
    name: "Headaches",
    description:
      "Assessment and treatment for headaches related to tension in the neck, shoulders and upper back.",
    icon: Brain,
  },
  {
    name: "Joint pain",
    description:
      "A whole-body approach to joint discomfort, looking at how the body moves and works as a whole.",
    icon: Activity,
  },
  {
    name: "Sports injuries",
    description:
      "Treatment and rehabilitation support to help you recover and return to activity with confidence.",
    icon: Dumbbell,
  },
  {
    name: "Muscle tension",
    description:
      "Releasing tight, overworked muscles and addressing the underlying cause of ongoing tension.",
    icon: Waves,
  },
  {
    name: "Postural discomfort",
    description:
      "Support for the aches and stiffness that build up from desk work, driving and everyday posture.",
    icon: AlignVerticalJustifyCenter,
  },
  {
    name: "Pregnancy-related discomfort",
    description:
      "Gentle, appropriate treatment to help ease the aches and strain that can come with pregnancy.",
    icon: Baby,
  },
];

export const osteopathyPillars = [
  {
    label: "01",
    title: "Initial Consultation",
    description:
      "A thorough case history and physical assessment to understand what's going on and how it's affecting you.",
  },
  {
    label: "02",
    title: "Osteopathic Treatment",
    description:
      "Hands-on treatment tailored to you, alongside practical movement and lifestyle advice.",
  },
  {
    label: "03",
    title: "Follow-up Appointments",
    description:
      "Ongoing care that adapts as you progress, helping to maintain and build on improvement.",
  },
] as const;

export const whyChooseUs = [
  {
    number: "01",
    title: "Personalised treatment",
    description: "Plans built around you and your body, not a generic protocol.",
  },
  {
    number: "02",
    title: "Whole-body approach",
    description: "Looking beyond symptoms to understand the underlying cause.",
  },
  {
    number: "03",
    title: "Professional, attentive care",
    description: "Time to properly listen, assess and treat — never rushed.",
  },
  {
    number: "04",
    title: "Osteopathy and Pilates, together",
    description: "Complementary care under one roof that works together, not in isolation.",
  },
  {
    number: "05",
    title: "Convenient Silsden location",
    description: "Easy to reach across Silsden, Keighley and the surrounding area.",
  },
] as const;

export type Review = {
  name: string;
  initials: string;
  text: string;
  relativeDate: string;
};

/**
 * Demo review data for development/design purposes only.
 * Replace with live data from the Google Business Profile (via API or
 * a reviews plugin) before launch — see components/home/GoogleReviews.tsx.
 */
export const demoReviews: Review[] = [
  {
    name: "S. Holroyd",
    initials: "SH",
    text: "Really thorough first appointment — took the time to explain what was going on and what we'd do about it. Already feeling the benefit after a few sessions.",
    relativeDate: "2 weeks ago",
  },
  {
    name: "J. Marsden",
    initials: "JM",
    text: "Friendly, professional and easy to book in with. The Pilates sessions have made a real difference alongside my treatment.",
    relativeDate: "1 month ago",
  },
  {
    name: "R. Ackroyd",
    initials: "RA",
    text: "Lovely calm space and a genuinely personal approach. Would recommend to anyone in Silsden looking for an osteopath.",
    relativeDate: "2 months ago",
  },
];

export type PriceItem = {
  name: string;
  price: string;
  note?: string;
};

/**
 * PLACEHOLDER pricing — real fees have not been supplied. £XX values must be
 * replaced with confirmed prices before launch; do not guess real figures.
 */
export const prices: PriceItem[] = [
  { name: "Initial Osteopathy Consultation", price: "£XX", note: "Includes assessment & treatment" },
  { name: "Follow-up Osteopathy Appointment", price: "£XX" },
  { name: "Pilates Session", price: "£XX" },
];

export const footerLinks = {
  navigation: [
    { label: "Home", href: "#top" },
    { label: "About Amy", href: "#about" },
    { label: "Prices", href: "#prices" },
    { label: "Contact", href: "#location" },
  ],
  treatments: [
    { label: "Osteopathy", href: "#osteopathy" },
    { label: "Conditions", href: "#conditions" },
    { label: "Pilates", href: "#pilates" },
  ],
};
