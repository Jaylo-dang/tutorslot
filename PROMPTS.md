# PROMPTS.md — TutorSlot

- **Student:** Haojia Dang
- **Course:** MGMT 6110 Human-AI Collaboration · Problem Set 1
- **User type:** External
- **User sentence:** A first-year MBAI postgraduate — a working adult, on a phone on Sunday evening — opens this screen to book one online Zoom tutoring session for this week, and knows it worked when the slot appears in "My week" with a booking reference.
- **Live link:** https://tutorslot-nu.vercel.app/
- **Repository:** https://github.com/Jaylo-dang/tutorslot
- **Built with:** Google AI Studio (Build), Gemini 3.8 Flash
---

## Prompt 1 — the master prompt (R·G·O·G·C)

```
ROLE: You are a senior front-end developer building a React web app.

GOAL: Build the front end of TutorSlot, a web product for first-year
postgraduate students in a one-year Business AI master's programme - one
cohort of about 60, mostly working adults, opening this on a phone on a
Sunday evening. Their job on this product is: "book one online tutoring
session for this week, in a subject I am behind on, at a time I am
actually free." ONE screen only. On that screen:
1) A header with the product name and the current week's date range.
2) A "My week" strip at the top showing the sessions this student has
   already booked this week. When there are none it reads "No sessions
   booked yet this week."
3) A filter row: subject chips (Statistics, Python, Machine Learning,
   Finance Analytics, Strategy) and day chips (Mon to Sun). Chips toggle
   on and off and filter the list below immediately, with no page
   reload. Include a "Clear filters" control.
4) A list of at least 12 available tutoring slots as cards. Each card
   shows: tutor name, subject, day and start time, duration in minutes,
   "Online - Zoom", and seats left.
5) Clicking a card opens a confirmation panel with the slot details and
   the question "Book this session?", with Confirm and Cancel.
6) On Confirm: the slot is given a booking reference like TS-4821, it
   appears in the "My week" strip at the top, the card switches to a
   "Booked" state that cannot be booked again, and seats left goes down
   by one.
7) When the filters match nothing, the list area shows "No slots match
   these filters this week" instead of empty space.

OUTPUT: A running app. Keep every invented value in ONE data file of its
own, with at least 12 slot rows and 5 tutors, so the screen looks real.
One component per section (header, my-week strip, filters, slot list,
slot card, confirm panel). Every state change happens without reloading
the page. Readable on a phone at arm's length: cards stack in a single
column on a narrow screen and tap targets are large. When you are done,
list the files you created and what each one holds.

GUARDRAILS: Screens and invented data only. Do NOT call the Gemini API
or any other model. Do NOT call any outside service or fetch from any
URL. No database, no login, no sign-up, no user accounts, no analytics.
No calendar integration, no email, no payment, no chat, no
notifications. No second screen, no routing, no settings page. No
features I did not list above. Invented tutor names, times and reference
numbers only. No real university's, company's or person's name, logo or
trademark anywhere on the screen. Nothing confidential.

CONTEXT: Individual Problem Set 1 for MGMT 6110 Human-AI Collaboration
at SMU. Built in Google AI Studio, pushed to GitHub, deployed on Vercel,
and opened on a phone by classmates in Week 3. I am not a programmer:
when you make a choice I did not specify, say so in one line rather than
burying it.
```

**What came back:** 20 files, and a running preview. I checked the preview
against the seven numbered Goal items one at a time. All seven were there,
including the one that mattered most — on Confirm the slot got a reference,
appeared in "My week", the card locked into a Booked state, and seats left
dropped by one. Two things arrived that I had not asked for: it picked the
year **2025** for the week range, and it shipped a Gemini client, a
`GEMINI_API_KEY` line in `vite.config.ts` and a `.env.example`, even though
the Guardrails say the app must not call any model.

**What I changed next and why:** Nothing functional. Every Goal item passed,
so changing the specification would have been changing it for its own sake.
I moved to appearance instead — which turned out to be where I made my
mistake.

---

## Prompt 2 — the design theme

```
Apply the "High Density" design theme to the app.
```

**What came back:** A denser three-column layout and a dark header, which is
what I asked for. **It also rewrote the invented data without being asked.**
Tutor names changed (Dr. Elena Vance → Dr. Marcus Vance, David Okafor →
David Chen, Sarah Lindqvist → Sarah Al-Mansoor, and a new tutor Elena
Rostova appeared), the header gained "Business AI Master's (Cohort 2024)",
and the week shifted from "Mon 8 Sep – Sun 14 Sep 2025" to "Mon 7 Sep –
Sun 13 Sep". I asked for a theme and got a content rewrite alongside it.

**What I changed next and why:** I did not undo it — the data is invented
either way and nothing on the Goal list broke. What I take from it is that
**this prompt was missing "Change nothing else."**, the one sentence the
studio taught for exactly this failure. A theme is not supposed to touch
content, and because I moved two variables in one message I cannot say
which instruction caused the rename. Every follow-up prompt from here ends
with that sentence.

---

## Build log — decisions and failures that were not prompts

- **I opened the Code tab and did not read it.** 20 files written while I
  typed four paragraphs. I verified seven numbered items and zero lines of
  code. That ratio is the honest description of what I was able to judge.
- **`vite.config.ts` reads `GEMINI_API_KEY`, and there is a `.env.example`.**
  I found this in the Code tab, before deploying. I chose *not* to supply
  the key on Vercel: on a public repository with a public URL, that config
  line would have published a live key to anyone who opened the site. My own
  Guardrails said no model calls, so the correct move was to leave the key
  absent, not to feed it. The deployment loaded fine without it.
- **Safari could not complete the GitHub authorisation.** The OAuth popup
  spun and bounced back to the sign-in screen every time — cross-site
  cookies. I stopped retrying after the third attempt and moved to Firefox,
  where it went through on the first try. About twenty minutes lost to a
  browser, not to the build.
- **I created `PROMPTS.md` in the wrong directory.** GitHub's "Add file"
  inherited the folder I happened to be viewing, so the file was headed for
  `/public/` instead of the repository root. Caught it by reading the
  breadcrumb before committing. Same habit as checking the repository page
  rather than trusting the screen that said it worked.
- **Deployed to Vercel with no white screen.** Production URL tested in a
  private window and on a phone: opens for a stranger, no sign-in.
