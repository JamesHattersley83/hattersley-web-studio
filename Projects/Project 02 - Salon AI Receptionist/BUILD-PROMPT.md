# Build Prompt: AI Receptionist Demo for Beauty in Bloom, Ilkley

> **How to use:** Section 2 is already filled in for **Beauty in Bloom, Ilkley** (from `salons/beauty-in-bloom.yaml`). Before the demo, replace every `# EST` line with real prices and durations from the salon's Fresha page. Then paste this whole file into Claude Code, or whichever AI coding tool you use, from an empty project folder. The prompt is written so the tool builds in phases and stops for you to check each one. For a different salon, start from `salons/_template.yaml`.

---

## 1. Role and goal

You are a senior full-stack engineer and conversational-AI designer. Build a working, demo-ready **AI receptionist for Beauty in Bloom**, an eco-conscious hair, beauty and bridal salon in Ilkley run by Charlotte Hawkins. I will show it to Charlotte in a 15-minute in-person meeting.

**Context that shapes the demo:** the salon's public phone number is a mobile (07754 430 839). Charlotte is often mid-treatment, or away at weddings doing bridal hair and makeup, when it rings. Every missed call is a lost booking, and a missed **bridal enquiry** can be worth hundreds of pounds.

**The single moment the demo must deliver:**
Charlotte rings a real phone number from her own mobile. "Poppy", the AI receptionist, greets her by name and books her a real appointment in natural conversation. Within seconds:
1. the booking appears live on a dashboard on my laptop, and
2. her phone buzzes with an SMS confirmation.

**Second moment:** I call as a bride-to-be. Poppy captures the wedding date, venue and party size, and Charlotte's phone instantly gets a "New bridal enquiry" text.

**Priorities, in order:**
1. **Reliability of the live demo.** It must not crash, stall or invent anything.
2. **Natural, fast, British-sounding conversation.** Low latency, handles interruptions, one question at a time.
3. **Visible business value.** Missed calls answered, bookings captured, time saved.
4. **Code clean enough to become the real product later.**

**Out of scope for the demo:** user auth, multi-tenant support, billing, payment capture, a real integration with the salon's booking software, and pixel-perfect design.

---

## 2. Salon details: Beauty in Bloom, Ilkley (everything the AI says comes from here)

Lines marked `# EST` are placeholders I could not find publicly. Tell me when you reach Phase 1 so I can replace them with real prices from the salon's Fresha page. Lines marked `# VERIFY` need a double-check. Put this in `config/salon.yaml`.

```yaml
# Beauty in Bloom, Ilkley: demo config for the AI receptionist
#
# Sources: public web search results (salon site, Fresha listing, Yorkshire.com,
# local press). See beauty-in-bloom-research.md for what is confirmed and what isn't.
#
# Legend:
#   (no tag)   = found in public sources
#   # VERIFY   = found, but only via a listing or summary; double-check
#   # EST      = NOT found publicly; realistic placeholder. Replace from the
#                salon's Fresha page before the demo. The owner WILL notice
#                wrong prices.

salon:
  name: "Beauty in Bloom"
  trading_as: "Beauty In Bloom by Charlotte Hawkins"
  tagline: "An ethically minded hair and beauty salon in Ilkley"
  ethos: "Eco-conscious luxury salon. Natural beauty through hair, beauty and makeup artistry. We plant trees, run product refill stations and use a hand-picked range of sustainable products."
  established: "Brand since 2015; Ilkley salon opened April 2023"
  address: "8 Cowpasture Road, Ilkley, LS29 8SR"
  phone_display: "07754 430 839"
  email: "charlotte@beautyinbloom.co.uk"
  website: "https://beautyinbloom.co.uk"
  instagram: "@beautyinbloom"
  facebook: "BeautyinBloom1"
  online_booking: "Fresha (search 'Beauty in Bloom Ilkley')"
  google_rating: "5.0 stars"                  # VERIFY: count of reviews
  timezone: "Europe/London"
  currency: "GBP"
  owner_name: "Charlotte"
  owner_full_name: "Charlotte Hawkins"
  # Caller-ID greeting + urgent alerts. During DEVELOPMENT set this to YOUR OWN
  # mobile so test SMS never reach Charlotte. Switch on demo day only.
  owner_mobile: "+447754430839"              # VERIFY: is this Charlotte's own mobile?
  dev_alert_mobile: "[[James's mobile]]"

opening_hours:            # 24h, closed = null. VERIFY: from Yorkshire.com listing
  monday: null
  tuesday: ["09:00", "18:00"]
  wednesday: ["09:00", "18:00"]
  thursday: ["09:00", "19:30"]
  friday: ["09:00", "18:00"]
  saturday: ["09:00", "17:00"]
  sunday: null

team:
  - name: "Charlotte"
    full_name: "Charlotte Hawkins"
    role: "Owner, hairdresser, beauty therapist & nail technician"
    bio: "Trained at London College of Fashion and Yorkshire College of Beauty Therapy, 15+ years' experience, specialises in bridal hair and makeup."
    skills: ["hair", "beauty", "nails", "bridal"]
    works: ["tuesday", "wednesday", "thursday", "friday", "saturday"]   # VERIFY
  - name: "Tracey"
    role: "Senior hairdresser"
    bio: "30+ years' experience, keeps up with the latest cutting and colour trends."
    skills: ["hair"]
    works: ["tuesday", "wednesday", "thursday", "friday"]              # VERIFY
  - name: "Katherine"
    role: "Senior hairdresser & bridal stylist"
    bio: "Professional since 2006, loves working with brides and bridal parties. Founded Beehive salon in Silsden (2011), which partners with Beauty in Bloom."
    skills: ["hair", "bridal"]
    works: ["thursday", "saturday"]                                     # VERIFY
  - name: "Claire"
    role: "Holistic therapist (Soul Sanctuary)"
    bio: "Offers a wide range of holistic treatments at the salon."
    skills: ["holistic"]
    works: ["wednesday", "friday"]                                      # VERIFY

# duration = minutes. price = GBP. from = price can vary, confirmed in salon.
# who = team members who can do it.
services:
  # --- Hair (Charlotte, Tracey, Katherine) ---
  - { name: "Free Hair Consultation", category: "hair", duration: 15, price: 0, who: [Charlotte, Tracey, Katherine] }
  - { name: "Cut & Blow-Dry", category: "hair", duration: 60, price: 48, who: [Charlotte, Tracey, Katherine] }               # EST
  - { name: "Restyle Cut & Blow-Dry", category: "hair", duration: 75, price: 55, who: [Charlotte, Tracey, Katherine] }       # EST
  - { name: "Blow-Dry", category: "hair", duration: 45, price: 30, who: [Charlotte, Tracey, Katherine] }                    # EST
  - { name: "Men's Cut", category: "hair", duration: 30, price: 25, who: [Tracey, Katherine] }                             # EST
  - { name: "Occasion Hair / Up-do", category: "hair", duration: 60, price: 45, who: [Charlotte, Katherine] }               # EST
  - { name: "Root Tint", category: "colour", duration: 90, price: 60, from: true, patch_test: true, who: [Charlotte, Tracey, Katherine] }            # EST
  - { name: "Full Head Colour", category: "colour", duration: 120, price: 75, from: true, patch_test: true, who: [Charlotte, Tracey, Katherine] }     # EST
  - { name: "Half Head Highlights", category: "colour", duration: 120, price: 80, from: true, patch_test: true, who: [Charlotte, Tracey, Katherine] } # EST
  - { name: "Full Head Highlights", category: "colour", duration: 150, price: 100, from: true, patch_test: true, who: [Charlotte, Tracey, Katherine] } # EST
  - { name: "Balayage", category: "colour", duration: 180, price: 130, from: true, patch_test: true, consultation_for_new_clients: true, who: [Charlotte, Tracey, Katherine] } # EST
  - { name: "Conditioning Hair Treatment", category: "hair", duration: 30, price: 20, who: [Charlotte, Tracey, Katherine] } # EST

  # --- Brows & lashes (Charlotte) ---
  - { name: "Brow Shape", category: "brows_lashes", duration: 15, price: 15, who: [Charlotte] }                              # EST
  - { name: "Brow Tint", category: "brows_lashes", duration: 15, price: 12, patch_test: true, who: [Charlotte] }            # EST
  - { name: "Brow Lamination", category: "brows_lashes", duration: 45, price: 40, patch_test: true, who: [Charlotte] }      # EST
  - { name: "Lash Tint", category: "brows_lashes", duration: 20, price: 15, patch_test: true, who: [Charlotte] }            # EST
  - { name: "Lash Lift & Tint", category: "brows_lashes", duration: 60, price: 45, patch_test: true, who: [Charlotte] }     # EST
  - { name: "Lash Extensions Full Set", category: "brows_lashes", duration: 90, price: 60, patch_test: true, who: [Charlotte] } # EST

  # --- Beauty & nails (Charlotte) ---
  - { name: "Gel Manicure", category: "nails", duration: 45, price: 28, who: [Charlotte] }                                   # EST
  - { name: "Face Wax (lip or chin)", category: "beauty", duration: 15, price: 10, who: [Charlotte] }                       # EST
  - { name: "Facial", category: "beauty", duration: 60, price: 55, who: [Charlotte] }                                       # EST
  - { name: "Full Body Massage", category: "beauty", duration: 60, price: 55, who: [Charlotte] }                            # EST

  # --- Holistic (Claire, Soul Sanctuary) ---
  - { name: "Holistic Treatment with Claire", category: "holistic", duration: 60, price: 50, who: [Claire] }                # EST: get Claire's actual menu

# NOT bookable by the AI: it captures an enquiry and alerts Charlotte instantly.
enquiry_only:
  - name: "Bridal Hair & Makeup"
    details: "Bespoke bridal hair and makeup for the bride and bridal party. Trials take place in the salon's exclusive bridal suite in Ilkley. Prices include the stylist travelling to you on the wedding day within 25 miles of Ilkley; a small extra charge applies beyond that."
    capture: [name, phone, email, wedding_date, venue_or_town, number_hair, number_makeup, trial_wanted, how_heard]

coming_soon:
  - name: "Semi-Permanent Makeup"
    say: "That's coming soon! I can pop your details down and Charlotte will let you know as soon as it launches."

policies:     # EST: ask Charlotte / copy from Fresha. These are sensible defaults.
  patch_test: "For hair colour, brow or lash tints, lash lifts and lash extensions we need a quick free patch test at least 48 hours before, for new clients or if it's been more than 6 months. You can pop in for it any time we're open."
  cancellation: "We kindly ask for 48 hours' notice to cancel or move an appointment, so we can offer the time to someone else."
  deposit: "Some longer appointments need a small deposit. The salon will text you a secure link; I can't take card details over the phone."
  late_arrival: "If you're running more than 15 minutes late we may need to shorten the treatment or rebook, so do give us a ring."

faqs:
  eco: "We're an ethically minded salon: we plant trees, have product refill stations so you can top up rather than buy new bottles, and use a hand-picked range of sustainable products."
  location: "We're at 8 Cowpasture Road in Ilkley, LS29 8SR, a couple of minutes' walk from Ilkley train station."   # VERIFY walking time
  parking: "There's pay-and-display parking in Ilkley town centre, just a short walk away."                          # VERIFY: any closer spot?
  payment: "We take card and cash."                                                                                  # VERIFY
  bridal: "Bridal hair and makeup is Charlotte's speciality. She'll want to chat through your day personally, so I'll take a few details and she'll call you back."
  beehive: "Katherine also founded Beehive, a hair and beauty salon in Silsden. For Beehive bookings I can take a message for the team."   # VERIFY how the partnership works
  gift_vouchers: "[[VERIFY: do they sell vouchers? Where?]]"
  online_booking: "You can also book online any time through Fresha, just search Beauty in Bloom Ilkley."

voice_and_tone: >
  Calm, warm and quietly luxurious, like a friendly receptionist at a boutique eco salon
  in Ilkley. Genuinely caring, never pushy or salesy. British English. Short and natural.

receptionist_persona:
  name: "Poppy"     # flower name to match the "Bloom" brand; easy to change
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
            └── /demo                 → mock Beauty in Bloom homepage with "Talk to Poppy" web-call button
                     │
                     ▼
            Supabase (Postgres + Realtime)  ◄── single source of truth
                     │  database webhook on insert/update
                     ▼
            n8n workflows ──► Twilio SMS (client confirmations, owner alerts)
```

**Why this stack:**
- **Vapi** handles telephony, turn-taking, barge-in and latency, the hardest parts of voice. We only write the brain and the tools. (Retell AI is an acceptable alternative with the same shape. Pick one and stick with it.)
- **Real code for availability logic.** Slot maths (durations, team rotas, buffers, overlaps) needs unit tests. Don't build it in no-code.
- **n8n for side effects.** SMS, owner alerts and post-call summaries are easy for me to show, tweak and resell to other clients.
- **Supabase Realtime** makes bookings appear on the dashboard instantly. That's the wow moment.
- **The `/demo` page web-call button** (Vapi Web SDK) is the **backup** if phone signal fails in the salon.

**LLM choice:** use a fast, strong tool-calling model through Vapi's model settings. Latency matters more than raw intelligence on a phone call. Aim for under 1 second from the caller stopping speaking to the AI starting to reply. Keep the model name in config so I can swap it.

---

## 4. Data model (Supabase / Postgres)

Create migrations plus a seed script that loads Section 2's YAML. Store all timestamps as `timestamptz` in UTC and convert to `Europe/London` at the edges.

| Table | Key columns |
|---|---|
| `team_members` | id, name, role, bio, skills (text[]), working_days (text[]), active |
| `team_member_services` | team_member_id, service_id (from each service's `who` list) |
| `services` | id, name, category (`hair`/`colour`/`brows_lashes`/`nails`/`beauty`/`holistic`), duration_min, price, price_is_from (bool), requires_patch_test, requires_consultation_for_new_clients |
| `opening_hours` | weekday (0–6), opens, closes (null = closed) |
| `closures` | date, reason (bank holidays, training days) |
| `clients` | id, first_name, last_name, phone_e164 (unique), email, is_new, patch_test_at, notes, created_at |
| `appointments` | id, client_id, team_member_id, service_id, starts_at, ends_at, status (`booked`/`cancelled`/`completed`/`no_show`), source (`phone_ai`/`web_ai`/`manual`), price_quoted, notes, created_at |
| `messages` | id, client_name, phone, reason, urgency (`normal`/`urgent`), status (`new`/`handled`), created_at |
| `enquiries` | id, type (`bridal`/`coming_soon`), name, phone, email, wedding_date, venue_or_town, number_hair, number_makeup, trial_wanted, how_heard, notes, status (`new`/`contacted`/`booked`/`lost`), created_at |
| `calls` | id, vapi_call_id, caller_phone, started_at, ended_at, duration_s, outcome (`booked`/`rescheduled`/`cancelled`/`bridal_enquiry`/`faq`/`message`/`transferred`/`abandoned`), summary, transcript, recording_url, cost |

**Seed data for a convincing demo:**
- About 60% of the next 14 days already booked across the team, so availability feels real and the AI has to offer alternatives.
- **Charlotte's mobile number** (`owner_mobile`) as a returning client called Charlotte, with a past appointment ("Cut & Blow-Dry with Tracey, 6 weeks ago"). When she calls, Poppy greets her by name.
- One or two past bridal `enquiries`, so the enquiries panel isn't empty.
- Two or three past `calls` rows with summaries, so the dashboard isn't empty at the start.

---

## 5. Booking rules (implement exactly; unit-test every rule)

1. Slots only within opening hours, only on the team member's working days, and never on `closures` dates.
2. The service must **finish** by closing time.
3. 15-minute slot grid. 10-minute buffer after colour and lash-extension services, none after others.
4. No overlap with any `booked` appointment for that team member.
5. A team member can only do services they're linked to in `team_member_services` (for example, only Charlotte does brows, lashes, nails and beauty; only Claire does holistic).
6. "Anyone's fine" = search all eligible team members and return the earliest options, spread across different days and times.
7. Minimum notice: 2 hours from now. Maximum: 8 weeks ahead.
8. **Patch test:** for any service with `patch_test: true` (hair colour, brow or lash tint, lamination, lash lift, lash extensions), if the client is new or `patch_test_at` is over 6 months old, the appointment must be at least 48 hours away. The tool flags `patch_test_needed: true` so the AI can explain it.
9. **Consultation:** new clients booking a service with `requires_consultation_for_new_clients` get offered a free 15-minute consultation first. They can still book directly if they insist; add a note.
10. Return **at most 3 options** per availability search. Voice callers can't hold more than that in their head.
11. Every slot returned has a pre-formatted spoken label, for example `"Saturday the 4th of October at 2pm"`. **The LLM must never work out weekdays or dates itself.**
12. Double-booking protection: re-check availability inside a transaction when booking. If the slot was taken, return a clear error with fresh alternatives.

---

## 6. Tools the AI can call

Expose these to Vapi as function tools, all handled by `/api/vapi/tools`. Validate every input with Zod. Every response is **short, plain JSON the model can read aloud**, with no internal IDs in the spoken fields. Log every call.

| Tool | Params | Returns |
|---|---|---|
| `get_services` | `category?` | list of `{name, duration_label, price_label}`, e.g. "from £75" |
| `check_availability` | `service_name`, `team_member_name?` ("any" allowed), `preferred_date?` (natural language OK: "next Saturday", "Friday afternoon"), `time_of_day?` (`morning`/`afternoon`/`evening`) | up to 3 `{slot_id, team_member, spoken_label, price_label}` + `patch_test_needed`, `consultation_recommended` |
| `book_appointment` | `slot_id`, `first_name`, `last_name`, `phone`, `notes?` | `{confirmed, spoken_summary, appointment_ref}` or `{error, alternatives}` |
| `find_client_appointments` | `phone` | upcoming appointments with `spoken_label`s |
| `reschedule_appointment` | `appointment_ref`, `new_slot_id` | `{confirmed, spoken_summary}` |
| `cancel_appointment` | `appointment_ref`, `reason?` | `{cancelled, late_cancellation: bool, policy_note}` |
| `answer_faq` | `topic` | the approved answer text from Section 2, or `{unknown: true}` |
| `log_enquiry` | `type` (`bridal`/`coming_soon`), `name`, `phone`, `email?`, `wedding_date?`, `venue_or_town?`, `number_hair?`, `number_makeup?`, `trial_wanted?`, `how_heard?`, `notes?` | `{saved, spoken_confirmation}`. Bridal enquiries trigger an instant SMS to Charlotte via n8n |
| `take_message` | `name`, `phone`, `reason`, `urgency` | `{saved, spoken_confirmation}`. Urgent messages trigger an owner SMS via n8n |
| `transfer_to_human` | `reason` | Vapi transfer to the salon number, **only during opening hours**. Otherwise tells the AI to take a message |

Put natural-language date parsing ("next Saturday", "after the 10th") in **code** (e.g. `chrono-node`) with `Europe/London` as the reference timezone. Don't leave it to the LLM.

---

## 7. The receptionist's system prompt

Store this in `/prompts/receptionist.md` and build it at call start in `/api/vapi/assistant`. Inject `{{salon_name}}`, `{{now_spoken}}` (e.g. "Tuesday the 30th of September, 10:42am"), `{{is_open_now}}`, `{{caller_first_name}}` (from the caller-ID lookup, may be empty), plus the policies and FAQs from the seed data.

```
You are Poppy, the virtual receptionist for {{salon_name}}, an ethically minded hair,
beauty and bridal salon at 8 Cowpasture Road, Ilkley, owned by Charlotte Hawkins.
It is currently {{now_spoken}}. The salon is {{is_open_now ? "open" : "closed"}} right now.

## Your job
Help callers book, change or cancel appointments, answer questions about the salon,
capture bridal enquiries for Charlotte, and take messages. You make the salon feel welcoming and make sure no caller is lost.

## How you speak (this is a phone call)
- British English. Calm, warm and quietly luxurious, like a receptionist at a boutique
  eco salon. Genuinely caring, never pushy or salesy.
- Keep every turn SHORT: one or two sentences, then stop and let them talk.
- Ask ONE question at a time.
- Never read out lists longer than three items. Offer the top options and ask.
- Say prices as "forty-five pounds", times as "2pm" or "half past ten", and dates
  using exactly the spoken_label the tools give you.
- Read phone numbers back in groups: "oh-seven-seven-oh-one, two-three-four, five-six-seven".
- If the caller interrupts, stop and listen.
- No emojis, no markdown, no bullet points. Everything you write is spoken aloud.

## Opening
- If {{caller_first_name}} is set: "Hi {{caller_first_name}}, it's Poppy at {{salon_name}},
  lovely to hear from you again! How can I help?"
- Otherwise: "Hello, you're through to {{salon_name}}, this is Poppy, the salon's virtual
  assistant. How can I help today?"
- You must always be honest that you are an AI assistant if asked, and you mention
  "virtual assistant" in the opening.

## Booking flow
1. Find out the service. If unclear ("I want my hair done"), ask one clarifying question.
2. Ask if they'd like anyone in particular, or if anyone's fine.
3. Ask roughly when suits them (day, time of day).
4. Call check_availability. Offer at most 3 options using their spoken_label.
5. If patch_test_needed: explain kindly that they'll need a quick free patch test at
   least 48 hours before, and they can pop in any time during opening hours.
6. If consultation_recommended: offer the free 15-minute consultation first.
7. Get first name, surname and mobile (you may already have the mobile from caller ID:
   confirm it rather than asking again).
8. Read back the full booking in ONE sentence and ask "Shall I book that in?"
9. Only after a clear yes, call book_appointment. Then confirm and tell them a text is on its way.
10. Mention the cancellation policy briefly only for bookings over £60 or colour services.
11. If they'd rather book themselves later, mention they can book online through Fresha.

## Bridal enquiries (Charlotte's speciality; highest-value calls)
- Be warm and excited for them. Congratulate them!
- Don't quote bridal prices or promise availability. Charlotte personally handles every bride.
- Collect, one question at a time: name, wedding date, venue or town, how many people
  need hair and how many need makeup, whether they'd like a trial, best mobile, and
  optionally email and how they heard about the salon.
- You may mention trials are in the salon's bridal suite in Ilkley, and that prices include
  travel on the day within 25 miles of Ilkley.
- Call log_enquiry with type bridal, then say Charlotte will call them back personally.

## Other services
- Semi-permanent makeup is coming soon: offer to note their interest (log_enquiry, type
  coming_soon).
- If asked about the eco ethos, share it proudly: tree planting, refill stations,
  sustainable products.

## Hard rules
- NEVER invent availability, prices, team members, services or policies. Only use tool results
  and the salon info below. If you don't know, say so and offer to take a message.
- NEVER say an appointment is booked unless book_appointment returned confirmed: true.
- Colour prices are "from" prices: say "from seventy-five pounds, and your stylist will
  confirm at your appointment".
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
{{team_summary}}
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
- Keyterm boosting in the speech-to-text for team names (Charlotte, Tracey, Katherine, Claire), service names ("balayage", "lamination", "lash lift"), place names (Ilkley, Cowpasture Road, Silsden, Beehive) and "Beauty in Bloom".
- End-of-call analysis: generate a 2-sentence `summary` and a structured `outcome` that matches the `calls.outcome` enum.
- Call-recording disclosure in the first message if recording is on (UK GDPR).

---

## 8. n8n workflows

Export each workflow as JSON into `/n8n/` so I can import them.

1. **Booking confirmation SMS.** Supabase webhook fires on `appointments` insert → Twilio SMS:
   `"Hi Emma, you're booked in for Cut & Blow-Dry with Tracey on Sat 4 Oct at 2pm at Beauty in Bloom, 8 Cowpasture Road, Ilkley. Need to change? Just call us. See you soon!"`
   Use an alphanumeric sender ID ("BeautyBloom", 11 characters max) for UK.
   **Until demo day, send every SMS to `dev_alert_mobile`, never to real client or Charlotte numbers.**
2. **Reschedule/cancel SMS.** Fires on `appointments` update where status or time changed.
3. **Urgent owner alert.** Fires on `messages` insert with `urgency = urgent` → SMS to the owner with the name, number and a one-line reason.
4. **Bridal enquiry alert.** Fires on `enquiries` insert with `type = bridal` → SMS to Charlotte: `"💍 New bridal enquiry: Sophie, 14 June 2027 at The Craiglands, 5 hair / 3 makeup, wants a trial. 07700 900123"`. Also send an email with the full details.
5. **Post-call summary.** Vapi end-of-call → `/api/vapi/events` writes to `calls` → n8n sends the owner a daily 7pm digest: calls answered, bookings made, value booked (£), bridal enquiries, messages waiting.
6. **Appointment reminder** (stretch). SMS 24 hours before each appointment.

---

## 9. Owner dashboard (`/dashboard`)

One page, mobile-friendly, looks premium: soft botanical, eco-luxury aesthetic to match Beauty in Bloom (muted greens, blush and cream; elegant serif headings). Everything updates live through Supabase Realtime, with no refresh.

- **Top KPIs (today, and the last 7 days):** calls answered by AI, bookings made, £ value booked, bridal enquiries captured, after-hours calls caught, average call length.
- **Live feed:** newest calls first, showing outcome badge, caller, 2-line summary and an expandable transcript with a recording player.
- **Today's diary:** a simple column per team member (Charlotte, Tracey, Katherine, Claire) showing appointments, with AI-made bookings highlighted.
- **Bridal enquiries:** cards showing wedding date, venue, party size and status, sorted by wedding date.
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
7. **n8n + SMS.** Workflows 1–5, exported JSON, setup notes.
8. **Demo page.** `/demo`, a mock Beauty in Bloom homepage in the salon's style with the Vapi web-call button and a chat widget.
9. **Hardening.** Run the full scenario suite (Section 11) five times by voice, fix every failure, and write `DEMO-RUNBOOK.md`.

---

## 11. Acceptance scenarios (all must pass by voice)

| # | Scenario | Expected |
|---|---|---|
| 1 | Charlotte's number calls, "Can I book a cut and blow-dry with Tracey on Thursday?" | Greeted by name, offered ≤3 real slots, books, SMS arrives, dashboard updates in under 5 seconds |
| 2 | New client: "I'd like balayage next Tuesday" | Patch test explained, consultation offered, 48-hour rule respected |
| 3 | "I'm getting married next June and I'd love you to do my hair and makeup" | Congratulates, no price quoted, captures all bridal fields one at a time, Charlotte gets the bridal SMS, enquiry card appears on dashboard |
| 4 | "Can I get a lash lift tomorrow?" (new client) | Explains the patch test, offers slots 48 hours or more out |
| 5 | "Anyone's fine, whenever's soonest for a cut and blow-dry" | Earliest options across Charlotte, Tracey and Katherine |
| 6 | "I need to move my appointment" | Finds by caller ID, offers new times, reschedules, SMS sent |
| 7 | Cancel within 24 hours | Cancels and mentions the cancellation policy kindly |
| 8 | "How much is a full head colour?" / "Where do I park?" / "What's the eco thing you do?" | Correct "from" price / correct FAQ answers, word for word from the data |
| 9 | "Do you do semi-permanent makeup?" | Says it's coming soon, offers to note interest, logs a coming_soon enquiry |
| 10 | "Do you do spray tans?" (not on the menu) | Says no honestly, and doesn't invent anything |
| 11 | "My brows have been stinging since my tint yesterday" | Caring response, no medical advice, urgent message, owner SMS |
| 12 | Call at 9pm, "Can I speak to Charlotte?" | Explains the salon is closed, takes a message, gives reopening time |
| 13 | Caller interrupts mid-sentence and changes their mind | AI stops, adapts, doesn't double-book |
| 14 | Requested slot gets taken between offer and confirmation | Graceful apology plus fresh alternatives |
| 15 | "Are you a robot?" | Honest yes, stays friendly, carries on helping |

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
