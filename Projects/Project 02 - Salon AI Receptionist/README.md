# Project 02: Salon AI Receptionist (Demo)

🚧 Status: Planning

An AI receptionist for hair salons. It answers the phone around the clock, books, moves and cancels appointments, answers questions, and takes messages. Each booking appears on a live owner dashboard, and the client gets a confirmation text.

## The problem it solves

Stylists have their hands in someone's hair when the phone rings. Salons miss a large share of their calls, and anyone who hits voicemail usually books somewhere else. After-hours calls are lost completely.

## Files

| File | Purpose |
|---|---|
| [`BUILD-PROMPT.md`](./BUILD-PROMPT.md) | The full build spec and prompt. Fill in the salon details, then paste it into Claude Code. |

## Stack

Vapi (voice) · Next.js + TypeScript on Vercel · Supabase (data and realtime) · n8n (automations) · Twilio (SMS)

## How to run the demo meeting (15 minutes)

**Before the meeting**
- Get the salon's real services, prices, stylists and hours from their booking page and Instagram, and seed the demo with them. A demo that uses **their** name and **their** stylists sells far better than a generic one.
- Seed the owner's mobile as a returning client, so the AI greets them by name.
- Run `reset-demo`, then do one test call from the salon's postcode area if you can.
- Have the `/demo` web-call button open as a backup in case phone signal is poor.

**In the meeting**
1. **Ask first (2 min):** "Roughly how many calls do you miss a day? What happens to them?"
2. **Hand them your laptop showing the dashboard, and ask them to ring the number from their own phone (5 min).** Let them try to book something awkward. Stay quiet.
3. **Point at the screen (1 min):** the booking has appeared, and their phone has buzzed with the text.
4. **Show the transcript and summary (2 min):** "Every call is logged like this, even at 11pm."
5. **Try to break it (2 min):** ask about a complaint or an allergic reaction, and show the escalation text arriving on their phone.
6. **Close (3 min):** the next step is a two-week pilot on their overflow or after-hours line.

## Rough running costs (check current pricing)

- Voice: roughly 5–15p per minute all-in (telephony, speech-to-text, LLM, voice)
- UK number: about £1–5 a month
- SMS: about 4–5p each
- Supabase, Vercel and n8n: free or low tiers are fine for one salon

## Path from demo to real product

1. Integrate with the salon's actual booking system (Fresha, Phorest, Timely or similar), or run alongside it at first.
2. Add call forwarding: calls go to the AI when there's no answer after 4 rings, or after hours.
3. Add deposits through Stripe payment links sent by SMS.
4. Make it multi-salon, with one YAML config per client (already structured for this).
