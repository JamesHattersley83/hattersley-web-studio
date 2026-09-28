# Project 06: Salon AI Receptionist (Demo)

🚧 Status: Planning

An AI receptionist for hair and beauty salons. It answers the phone around the clock, books, moves and cancels appointments, answers questions, and takes messages. Each booking appears on a live owner dashboard, and the client gets a confirmation text.

## The problem it solves

Stylists have their hands in someone's hair when the phone rings. Salons miss a large share of their calls, and anyone who hits voicemail usually books somewhere else. After-hours calls are lost completely.

## Files

| File | Purpose |
|---|---|
| [`BUILD-PROMPT.md`](./BUILD-PROMPT.md) | The full build spec and prompt, already filled in for **Beauty in Bloom, Ilkley**. Paste it into Claude Code. |
| [`salons/beauty-in-bloom.yaml`](./salons/beauty-in-bloom.yaml) | Beauty in Bloom's config: team, services, prices (from their website), hours, policies and FAQs. Check the `# EST` durations before the demo. |
| [`salons/beauty-in-bloom-research.md`](./salons/beauty-in-bloom-research.md) | What's confirmed, what still needs checking, pitch angles and sources. |
| [`salons/_template.yaml`](./salons/_template.yaml) | Blank config for the next salon prospect. |

## Stack

Vapi (voice) · Next.js + TypeScript on Vercel · Supabase (data and realtime) · n8n (automations) · Twilio (SMS)

## Target salon

**Beauty in Bloom**, 8 Cowpasture Road, Ilkley: an eco-conscious hair, beauty and bridal salon owned by Charlotte Hawkins. The AI receptionist is called **Poppy**.

## How to run the demo meeting (15 minutes)

**Before the meeting**
- Work through the "Still to fill in" checklist in `salons/beauty-in-bloom-research.md` (mainly treatment durations and who does what).
- Seed Charlotte's mobile as a returning client, so Poppy greets her by name.
- Run `reset-demo`, then do one test call from the salon's postcode area if you can.
- Have the `/demo` web-call button open as a backup in case phone signal is poor.

**In the meeting**
1. **Ask first (2 min):** "When your mobile rings while you're mid-colour or at a wedding, what happens to that call?"
2. **Hand Charlotte your laptop showing the dashboard, and ask her to ring Poppy from her own phone (4 min).** Poppy greets her by name. Let her book something awkward, like a lash lift tomorrow. Stay quiet.
3. **Point at the screen (1 min):** the booking has appeared, and her phone has buzzed with the text.
4. **The bridal moment (3 min):** you call as a bride-to-be. Poppy congratulates you and captures the date, venue and party size, and Charlotte's phone gets a "New bridal enquiry" text. "That's the call you'd otherwise miss while you're at a wedding."
5. **Show the transcript and summary (2 min):** "Every call is logged like this, even at 11pm."
6. **Close (3 min):** the next step is a two-week pilot on missed and after-hours calls. It sits alongside Fresha, not instead of it.

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
