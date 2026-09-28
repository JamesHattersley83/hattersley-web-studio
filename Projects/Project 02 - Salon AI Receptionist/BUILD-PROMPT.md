# Build Prompt: Salon AI Receptionist Demo

> **How to use:** Fill in Section 2 with the real salon's details. Take them from its website, Instagram, Google Business profile and booking page (Fresha, Phorest, Treatwell, Booksy and so on). Then paste this whole file into Claude Code, or whichever AI coding tool you use, from an empty project folder. The prompt is written so the tool builds in phases and stops for you to check each one.

---

## 1. Role and goal

You are a senior full-stack engineer and conversational-AI designer. Build a working, demo-ready **AI receptionist for a UK hair salon**. I will show it to the salon owner in a 15-minute in-person meeting.

**The single moment the demo must deliver:**
The owner rings a real phone number from their own mobile. The AI greets them by name, books them a real appointment in natural conversation, and within seconds:
1. the booking appears live on a dashboard on my laptop, and
2. their phone buzzes with an SMS confirmation.

**Priorities, in order:**
1. **Reliability of the live demo.** It must not crash, stall or invent anything.
2. **Natural, fast, British-sounding conversation.** Low latency, handles interruptions, one question at a time.
3. **Visible business value.** Missed calls answered, bookings captured, time saved.
4. **Code clean enough to become the real product later.**

**Out of scope for the demo:** user auth, multi-tenant support, billing, payment capture, a real integration with the salon's booking software, and pixel-perfect design.

---

## 2. Salon details (fill this in; everything the AI says comes from here)

```yaml
salon:
  name: "[[Salon Name]]"
  tagline: "[[e.g. Award-winning colour specialists in Ilkley]]"
  address: "[[Full address + postcode]]"
  phone_display: "[[Salon's real number, for reference only]]"
  website: "[[URL]]"
  timezone: "Europe/London"
  currency: "GBP"
  owner_name: "[[Owner first name]]"
  owner_mobile: "[[+44... used for demo caller-ID greeting and urgent alerts]]"

opening_hours:            # 24h, closed = null
  monday: null
  tuesday: ["09:00", "17:30"]
  wednesday: ["09:00", "20:00"]
  thursday: ["09:00", "20:00"]
  friday: ["09:00", "17:30"]
  saturday: ["08:30", "16:00"]
  sunday: null

stylists:
  - name: "[[Sarah]]"
    level: "director"       # junior | stylist | senior | director
    works: ["tuesday", "wednesday", "thursday", "saturday"]
    specialisms: ["balayage", "colour correction"]
  - name: "[[Jess]]"
    level: "senior"
    works: ["tuesday", "thursday", "friday", "saturday"]
    specialisms: ["curly hair", "cuts"]
  - name: "[[Tom]]"
    level: "stylist"
    works: ["wednesday", "thursday", "friday", "saturday"]
    specialisms: ["men's cuts", "fades"]

services:                 # duration in minutes; price per level; "from" = price may vary
  - name: "Cut & Blow-Dry"
    category: "cutting"
    duration: 60
    prices: { stylist: 45, senior: 52, director: 60 }
  - name: "Men's Cut"
    category: "cutting"
    duration: 30
    prices: { stylist: 22, senior: 26, director: 30 }
  - name: "Full Head Colour"
    category: "colour"
    duration: 120
    prices: { stylist: 70, senior: 80, director: 90 }
    from: true
    requires_patch_test: true
  - name: "Balayage"
    category: "colour"
    duration: 180
    prices: { senior: 140, director: 165 }
    from: true
    requires_patch_test: true
    requires_consultation_for_new_clients: true
  - name: "Blow-Dry"
    category: "styling"
    duration: 45
    prices: { stylist: 28, senior: 32, director: 35 }
  - name: "Free Consultation"
    category: "consultation"
    duration: 15
    prices: { stylist: 0, senior: 0, director: 0 }

policies:
  patch_test: "Required at least 48 hours before any colour service for new colour clients, or if it's been over 6 months. Takes 5 minutes, free, walk-in during opening hours."
  cancellation: "Please give 48 hours' notice. Late cancellations or no-shows may be charged 50%."
  deposit: "New clients booking colour services over £100 pay a £20 deposit (the salon will text a link; the AI does NOT take payment)."
  late_arrival: "If you're more than 15 minutes late we may need to shorten or rebook."

faqs:
  parking: "[[e.g. Free 2-hour parking on Brook Street, 1 minute walk]]"
  payment: "[[e.g. Card, cash, Apple Pay. No cheques.]]"
  kids: "[[e.g. Children's cuts (under 12) £18 with any stylist]]"
  products: "[[e.g. We stock Olaplex, Kérastase and Davines]]"
  accessibility: "[[e.g. Ground floor, step-free access, accessible toilet]]"
  gift_vouchers: "[[e.g. Available in salon or online at ...]]"

voice_and_tone: "Warm, upbeat, professional, a bit chatty but never waffly. Sounds like a friendly local salon receptionist, not a call centre. British English."
```

---

## 3. Architecture (use this; don't substitute without asking me)

```
Caller's phone ──► Vapi phone number (UK)
                     │  speech-to-text (Deepgram), LLM, text-to-speech (ElevenLabs British voice)
                     │  tool calls (HTTPS, JSON)
                     ▼
            Next.js app on Vercel (TypeScript)
            ├── /api/vapi/assistant   → per-call config: injects date/time + caller lookup
            ├── /api/vapi/tools       → all receptionist tools (availability, booking...)
            ├── /api/vapi/events      → end-of-call report (transcript, summary, recording URL)
            ├── /dashboard            → live owner dashboard (Supabase Realtime)
            └── /demo                 → mock salon homepage with "Talk to us" web-call button
                     │
                     ▼
            Supabase (Postgres + Realtime)  ◄── single source of truth
                     │  database webhook on insert/update
                     ▼
            n8n workflows ──► Twilio SMS (client confirmations, owner alerts)
```

**Why this stack:**
- **Vapi** handles telephony, turn-taking, barge-in and latency, the hardest parts of voice. We only write the brain and the tools. (Retell AI is an acceptable alternative with the same shape. Pick one and stick with it.)
- **Real code for availability logic.** Slot maths (durations, stylist rotas, buffers, overlaps) needs unit tests. Don't build it in no-code.
- **n8n for side effects.** SMS, owner alerts and post-call summaries are easy for me to show, tweak and resell to other clients.
- **Supabase Realtime** makes bookings appear on the dashboard instantly. That's the wow moment.
- **The `/demo` page web-call button** (Vapi Web SDK) is the **backup** if phone signal fails in the salon.

**LLM choice:** use a fast, strong tool-calling model through Vapi's model settings. Latency matters more than raw intelligence on a phone call. Aim for under 1 second from the caller stopping speaking to the AI starting to reply. Keep the model name in config so I can swap it.

---

## 4. Data model (Supabase / Postgres)

Create migrations plus a seed script that loads Section 2's YAML. Store all timestamps as `timestamptz` in UTC and convert to `Europe/London` at the edges.

| Table | Key columns |
|---|---|
| `stylists` | id, name, level, working_days (text[]), specialisms (text[]), active |
| `services` | id, name, category, duration_min, prices (jsonb by level), price_is_from (bool), requires_patch_test, requires_consultation_for_new_clients |
| `opening_hours` | weekday (0–6), opens, closes (null = closed) |
| `closures` | date, reason (bank holidays, training days) |
| `clients` | id, first_name, last_name, phone_e164 (unique), email, is_new, last_colour_at, patch_test_at, notes, created_at |
| `appointments` | id, client_id, stylist_id, service_id, starts_at, ends_at, status (`booked`/`cancelled`/`completed`/`no_show`), source (`phone_ai`/`web_ai`/`manual`), price_quoted, notes, created_at |
| `messages` | id, client_name, phone, reason, urgency (`normal`/`urgent`), status (`new`/`handled`), created_at |
| `calls` | id, vapi_call_id, caller_phone, started_at, ended_at, duration_s, outcome (`booked`/`rescheduled`/`cancelled`/`faq`/`message`/`transferred`/`abandoned`), summary, transcript, recording_url, cost |

**Seed data for a convincing demo:**
- About 60% of the next 14 days already booked across stylists, so availability feels real and the AI has to offer alternatives.
- The **owner's own mobile number** as a returning client, with a past appointment ("Cut & Blow-Dry with Sarah, 6 weeks ago"). When they call, the AI greets them by name. This is the second wow moment.
- Two or three past `calls` rows with summaries, so the dashboard isn't empty at the start.

---

## 5. Booking rules (implement exactly; unit-test every rule)

1. Slots only within opening hours, only on the stylist's working days, and never on `closures` dates.
2. The service must **finish** by closing time.
3. 15-minute slot grid. 10-minute buffer after colour services, none after cuts.
4. No overlap with any `booked` appointment for that stylist.
5. Stylist can only do services priced for their level (for example, Balayage has no `stylist` price, so Tom can't do it).
6. "Any stylist" = search all eligible stylists and return the earliest options, spread across different days and times.
7. Minimum notice: 2 hours from now. Maximum: 8 weeks ahead.
8. **Patch test:** for a colour service, if the client is new or `patch_test_at` is over 6 months old, the appointment must be at least 48 hours away. The tool flags `patch_test_needed: true` so the AI can explain it.
9. **Consultation:** new clients booking a service with `requires_consultation_for_new_clients` get offered a free 15-minute consultation first. They can still book directly if they insist; add a note.
10. Return **at most 3 options** per availability search. Voice callers can't hold more than that in their head.
11. Every slot returned has a pre-formatted spoken label, for example `"Saturday the 4th of October at 2pm"`. **The LLM must never work out weekdays or dates itself.**
12. Double-booking protection: re-check availability inside a transaction when booking. If the slot was taken, return a clear error with fresh alternatives.

---

## 6. Tools the AI can call

Expose these to Vapi as function tools, all handled by `/api/vapi/tools`. Validate every input with Zod. Every response is **short, plain JSON the model can read aloud**, with no internal IDs in the spoken fields. Log every call.

| Tool | Params | Returns |
|---|---|---|
| `get_services` | `category?` | list of `{name, duration_label, price_label}`, e.g. "from £80 with a senior stylist" |
| `check_availability` | `service_name`, `stylist_name?` ("any" allowed), `preferred_date?` (natural language OK: "next Saturday", "Friday afternoon"), `time_of_day?` (`morning`/`afternoon`/`evening`) | up to 3 `{slot_id, stylist, spoken_label, price_label}` + `patch_test_needed`, `consultation_recommended` |
| `book_appointment` | `slot_id`, `first_name`, `last_name`, `phone`, `notes?` | `{confirmed, spoken_summary, appointment_ref}` or `{error, alternatives}` |
| `find_client_appointments` | `phone` | upcoming appointments with `spoken_label`s |
| `reschedule_appointment` | `appointment_ref`, `new_slot_id` | `{confirmed, spoken_summary}` |
| `cancel_appointment` | `appointment_ref`, `reason?` | `{cancelled, late_cancellation: bool, policy_note}` |
| `answer_faq` | `topic` | the approved answer text from Section 2, or `{unknown: true}` |
| `take_message` | `name`, `phone`, `reason`, `urgency` | `{saved, spoken_confirmation}`. Urgent messages trigger an owner SMS via n8n |
| `transfer_to_human` | `reason` | Vapi transfer to the salon number, **only during opening hours**. Otherwise tells the AI to take a message |

Put natural-language date parsing ("next Saturday", "after the 10th") in **code** (e.g. `chrono-node`) with `Europe/London` as the reference timezone. Don't leave it to the LLM.

---

## 7. The receptionist's system prompt

Store this in `/prompts/receptionist.md` and build it at call start in `/api/vapi/assistant`. Inject `{{salon_name}}`, `{{now_spoken}}` (e.g. "Tuesday the 30th of September, 10:42am"), `{{is_open_now}}`, `{{caller_first_name}}` (from the caller-ID lookup, may be empty), plus the policies and FAQs from the seed data.

```
You are Rosie, the virtual receptionist for {{salon_name}}, a hair salon in {{town}}.
It is currently {{now_spoken}}. The salon is {{is_open_now ? "open" : "closed"}} right now.

## Your job
Help callers book, change or cancel appointments, answer questions about the salon,
and take messages. You make the salon feel welcoming and make sure no caller is lost.

## How you speak (this is a phone call)
- British English. Warm, friendly, upbeat, like a great local salon receptionist.
- Keep every turn SHORT: one or two sentences, then stop and let them talk.
- Ask ONE question at a time.
- Never read out lists longer than three items. Offer the top options and ask.
- Say prices as "forty-five pounds", times as "2pm" or "half past ten", and dates
  using exactly the spoken_label the tools give you.
- Read phone numbers back in groups: "oh-seven-seven-oh-one, two-three-four, five-six-seven".
- If the caller interrupts, stop and listen.
- No emojis, no markdown, no bullet points. Everything you write is spoken aloud.

## Opening
- If {{caller_first_name}} is set: "Hi {{caller_first_name}}, it's Rosie at {{salon_name}},
  lovely to hear from you again! How can I help?"
- Otherwise: "Hello, you're through to {{salon_name}}, this is Rosie, the salon's virtual
  assistant. How can I help today?"
- You must always be honest that you are an AI assistant if asked, and you mention
  "virtual assistant" in the opening.

## Booking flow
1. Find out the service. If unclear ("I want my hair done"), ask one clarifying question.
2. Ask if they have a preferred stylist, or if anyone's fine.
3. Ask roughly when suits them (day, time of day).
4. Call check_availability. Offer at most 3 options using their spoken_label.
5. If patch_test_needed: explain kindly that for colour they'll need a quick free patch
   test at least 48 hours before, and they can pop in any time during opening hours.
6. If consultation_recommended: offer the free 15-minute consultation first.
7. Get first name, surname and mobile (you may already have the mobile from caller ID:
   confirm it rather than asking again).
8. Read back the full booking in ONE sentence and ask "Shall I book that in?"
9. Only after a clear yes, call book_appointment. Then confirm and tell them a text is on its way.
10. Mention the cancellation policy briefly only for bookings over £60 or colour services.

## Hard rules
- NEVER invent availability, prices, stylists, services or policies. Only use tool results
  and the salon info below. If you don't know, say so and offer to take a message.
- NEVER say an appointment is booked unless book_appointment returned confirmed: true.
- Colour prices are "from" prices: say "from eighty pounds, and your stylist will confirm
  at your appointment".
- Do not give medical, allergy or scalp-condition advice. If someone mentions a reaction,
  burn, allergy or anything health-related: be caring, recommend they speak to a
  pharmacist or GP if it's urgent, and take an URGENT message for the owner.
- Complaints: apologise sincerely, don't argue or offer refunds or discounts, take an
  URGENT message and say the owner will personally call back.
- Don't take card details or payments. If a deposit is needed, say the salon will text a link.
- If the caller asks for a person and the salon is open, use transfer_to_human. If closed,
  take a message and say when the salon reopens.
- If the caller is abusive, politely end the call.
- Stay on topic. For anything unrelated to the salon, gently steer back.

## Salon information
{{opening_hours_spoken}}
{{stylists_summary}}
{{policies}}
{{faqs}}

## Ending
Before ending, check "Is there anything else I can help with?" Then close warmly:
"Lovely, thanks for calling {{salon_name}}, see you soon!"
```

**Vapi assistant settings:**
- Voice: a warm British voice from ElevenLabs. Give me 3 options to choose from.
- `firstMessage` set from the opening above.
- Background sound off.
- Silence timeout of 20 seconds, max call duration of 10 minutes.
- Keyterm boosting in the speech-to-text for stylist names, service names ("balayage", "Olaplex") and the salon name.
- End-of-call analysis: generate a 2-sentence `summary` and a structured `outcome` that matches the `calls.outcome` enum.
- Call-recording disclosure in the first message if recording is on (UK GDPR).

---

## 8. n8n workflows

Export each workflow as JSON into `/n8n/` so I can import them.

1. **Booking confirmation SMS.** Supabase webhook fires on `appointments` insert → Twilio SMS:
   `"Hi Emma, you're booked in for Cut & Blow-Dry with Sarah on Sat 4 Oct at 2pm at [[Salon]]. Need to change? Just call us. See you soon!"`
   Use an alphanumeric sender ID (the salon name) for UK.
2. **Reschedule/cancel SMS.** Fires on `appointments` update where status or time changed.
3. **Urgent owner alert.** Fires on `messages` insert with `urgency = urgent` → SMS to the owner with the name, number and a one-line reason.
4. **Post-call summary.** Vapi end-of-call → `/api/vapi/events` writes to `calls` → n8n sends the owner a daily 7pm digest: calls answered, bookings made, value booked (£), messages waiting.
5. **Appointment reminder** (stretch). SMS 24 hours before each appointment.

---

## 9. Owner dashboard (`/dashboard`)

One page, mobile-friendly, looks premium: clean, neutral salon aesthetic. Everything updates live through Supabase Realtime, with no refresh.

- **Top KPIs (today, and the last 7 days):** calls answered by AI, bookings made, £ value booked, after-hours calls caught, average call length.
- **Live feed:** newest calls first, showing outcome badge, caller, 2-line summary and an expandable transcript with a recording player.
- **Today's diary:** a simple column per stylist showing appointments, with AI-made bookings highlighted.
- **Messages:** list with urgent ones pinned, plus a "mark handled" button.
- A small **"New booking!" toast with a sound** when an AI booking lands. This is what the owner sees during the demo.

---

## 10. Build phases (stop after each for me to test; commit each phase)

1. **Foundation.** Next.js + TypeScript + Tailwind, Supabase schema, migrations and seed from the YAML, `.env.example`, README.
2. **Booking engine.** Availability, booking, reschedule and cancel logic as pure functions, with **unit tests for every rule in Section 5**, including timezone edge cases around British Summer Time changes.
3. **Tools API.** `/api/vapi/tools` with Zod validation and a local test script, so I can call every tool with curl before connecting voice.
4. **Text-mode rehearsal.** A `/playground` page where I chat by text with the exact same system prompt and tools. Use it to tune conversations cheaply before touching voice.
5. **Voice.** Vapi assistant config as code (a script that creates or updates it through the Vapi API), phone number, `/api/vapi/assistant` caller lookup, end-of-call webhook.
6. **Dashboard.** Realtime KPIs, feed, diary and messages.
7. **n8n + SMS.** Workflows 1–4, exported JSON, setup notes.
8. **Demo page.** `/demo`, a mock homepage in the salon's style with the Vapi web-call button and a chat widget.
9. **Hardening.** Run the full scenario suite (Section 11) five times by voice, fix every failure, and write `DEMO-RUNBOOK.md`.

---

## 11. Acceptance scenarios (all must pass by voice)

| # | Scenario | Expected |
|---|---|---|
| 1 | Owner's number calls, "Can I book a cut and blow-dry with Sarah on Saturday?" | Greeted by name, offered ≤3 real slots, books, SMS arrives, dashboard updates in under 5 seconds |
| 2 | New client: "I'd like balayage next Tuesday" | Patch test explained, consultation offered, 48-hour rule respected |
| 3 | "Anyone's fine, whenever's soonest for a men's cut" | Earliest options across stylists |
| 4 | "I need to move my appointment" | Finds by caller ID, offers new times, reschedules, SMS sent |
| 5 | Cancel within 24 hours | Cancels and mentions the late-cancellation policy kindly |
| 6 | "How much is a full head colour?" / "Where do I park?" | Correct "from" price / correct FAQ answer, word for word from the data |
| 7 | "Do you do eyelash extensions?" (not on the menu) | Says no honestly, and doesn't invent anything |
| 8 | "My scalp's been burning since my colour yesterday" | Caring response, no medical advice, urgent message, owner SMS |
| 9 | Call at 9pm, "Can I speak to someone?" | Explains the salon is closed, takes a message, gives reopening time |
| 10 | Caller interrupts mid-sentence and changes their mind | AI stops, adapts, doesn't double-book |
| 11 | Requested slot gets taken between offer and confirmation | Graceful apology plus fresh alternatives |
| 12 | "Are you a robot?" | Honest yes, stays friendly, carries on helping |

---

## 12. Deliverables

- A repo that runs with `npm install && npm run dev` plus `.env.example` (Supabase, Vapi, Twilio, n8n webhook URLs).
- `README.md`: setup from zero, including creating the Vapi assistant and number, running the seed and importing the n8n workflows.
- `DEMO-RUNBOOK.md`: pre-meeting checklist, demo script, backup plan and how to reset the data.
- `scripts/reset-demo.ts`: wipes and re-seeds bookings so every demo starts fresh.
- `scripts/seed-from-yaml.ts`: point it at a new salon's YAML and the demo is re-skinned for the next prospect.

## 13. Working rules for you (the AI builder)

- Ask me before adding any paid service not listed here.
- Never commit secrets. Keep everything in `.env.local`.
- Prefer boring, well-documented libraries.
- After each phase, give me: what you built, how to test it (exact commands or steps), and anything I need to sign up for or configure.
- If something in this spec conflicts or is unclear, ask. Don't guess.
