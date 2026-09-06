# REFLECTION.md — TutorSlot

**Haojia Dang · MGMT 6110 Human-AI Collaboration · Problem Set 1**

## Q1 — Who are my users, and what changes for them?

My users are **external**: first-year students in a one-year Business AI
master's programme, most of them working adults,
opening a phone in the evening because a class they are behind on is coming
around again. They choose whether to use this product and can walk away from it.

What we do today has two steps. First, we ask a classmate. That step is fast,
free, and often enough, and my product does not try to replace it. When the
classmate does not know either, we fall back to the second step: booking time
with a professor. That is the step that goes slowly — working out who covers
the subject, working out when they are free, sending the request, waiting for a
reply, and settling a time over several messages. It is also the step people
quietly skip, because the friction is high enough that "I'll catch up on my own"
usually wins.

TutorSlot targets that second step and nothing else. The available hours are
already on the screen, filtered by the subject the student is behind on and the
evening they are actually free, and confirming produces a booking reference and
a line in "My week" in one tap.

I should be plain about a limit here. I am describing a workflow I have lived,
not one I researched. I asked nobody in the cohort before building, and I only
wrote these two steps down while writing this reflection — after the product
was already live.

## Q2 — Augmented capacity and constrained capacity

**Augmented.** I have never written a line of code. In a little over three
hours — just over an hour on Saturday night, and a bit more than two on Sunday
afternoon — I had a working, phone-readable interface live at a public URL, and
went back into it to correct what I found. Almost none of that time went into
building. It went into deciding what the screen was for: who the user was, what
the one job was, and what "it worked" would look like on screen. Writing the
R·G·O·G·C prompt took longer than the agent took to build from it.

**Constrained.** For most of those three hours I could not tell whether what I
was looking at was right or wrong. The agent wrote twenty files; I read zero.
What I actually verified was the seven numbered items on my own Goal list — does
the chip filter, does Confirm produce a reference — and nothing else. The data
file, the component structure, the build configuration, and every case I never
thought to specify all shipped unchecked.

Two things about that constraint are worth naming precisely.

The first is that I did not resolve it by learning to judge. I resolved it by
adding a second AI. Through the whole build I worked with an assistant that told
me which button to press, what the config file meant, and what to check next. So
the honest description of my weekend is one person and two agents, with the
agents doing the building *and* the judging. That is not verification becoming
the bottleneck; it is verification handed one level further out, where I can see
it even less.

The second is that the constraint reached upstream of the code. I specified a
user, a job and a moment of success confidently enough to write a full brief,
and I never checked the claim sitting underneath it. The two-step workflow in Q1
is something I only articulated after the app was already deployed. No agent
could have caught that, because it was never a coding question.

## Q3 — In, on, or out of the loop: where was my judgment actually needed?

**Where my judgment changed the outcome.** Three times, and all three because
the evidence was visibly on a screen. GitHub's "Create new file" inherited the
folder I happened to be viewing, and I caught from the breadcrumb that
`PROMPTS.md` was about to be created inside `/public/` instead of the repository
root. In the Markdown Preview I saw that my front matter had run together into
one block, and split it into a list. And I eventually saw that the header
carried the wrong year, which became Prompt 3. None of these needed any
knowledge of code. All three needed me to actually look at what was in front of
me.

**Where I was nominally in the loop and added nothing.** Nearly everywhere else,
and this is the more useful half. I clicked "All repositories" on GitHub's
authorisation screen without understanding what I was granting. I accepted
Vercel's detected build settings because they were already filled in. And the
single most consequential decision in this build — *not* pasting
`GEMINI_API_KEY` into Vercel, which would have published a live key inside the
JavaScript of a public site sitting on a public repository — was not mine. I
was told, and I complied. I was in the loop in the sense that I did the
clicking. I added nothing to it.

**Looking forward.** For this product, browsing and filtering can sit **out of
the loop**: reversible, low stakes, high volume, and the student sees at once if
the list is wrong. Confirming a booking should stay **in the loop**, because it
consumes a seat someone else wanted and the cost of an error falls on a third
party who never agreed to anything. Reminders to tutors belong **on the loop** —
batched, sampled, with a kill switch. I would move confirmation out only with a
measured false-booking rate below roughly one in a thousand across a full term,
plus one-tap reversal. Neither exists, so neither is something I could sign off
today.

## Q4 — What did it build that I never sketched?

Three things, and what matters is *when* I found each.

**The year.** My header read "Mon 8 Sep – Sun 14 Sep **2025**". It is 2026. The
agent chose a year because I never gave it one, and the wrong year sat on the
screen through the first build, through every screenshot I took, through the
push to GitHub and through the deploy. I looked at it dozens of times and did
not see it. Even when it was pointed out to me that the model had picked a year
I never specified, I could not locate what was wrong with it; I only understood
several minutes later. That is the most honest fact in this submission: the
defect was fully visible, required no code to spot, and I still needed telling
twice.

What would have caught it is in my own Goal list. Item 1 said "the current
week's date range". "Current" is not checkable — it hands the decision back to
the model and leaves me nothing to test the answer against. Had I written "the
week of 8–14 September 2026", the acceptance test would have failed in thirty
seconds. An acceptance criterion can only catch what it actually states.

**The silent rewrite.** My second prompt was four words — *"Apply the High
Density design theme"* — and alongside the layout it rewrote my invented data:
three tutors renamed, a fourth invented, the header gained a cohort line, the
week shifted by a day. I did not notice at all. I found out while writing this
log, when someone compared my two screenshots for me. The missing piece was the
sentence the studio taught and I left off: *"Change nothing else."*

**The uninvited server.** It shipped a Gemini client, a `GEMINI_API_KEY` line in
`vite.config.ts` and a `.env.example`, despite Guardrails saying the app must
call no model at all. I asked for a screen and was handed a kitchen. I found it
in the Code tab before deploying — but only because I had been told where to
look.

## Q5 — Three pointers for an organisation

1. **Write acceptance criteria as values, not categories.** "The current week"
   let a wrong year sit in front of me all afternoon, through a deploy;
   "the week of 8–14 September 2026" would have failed in thirty seconds. A
   criterion that needs judgement to check will not get checked.
2. **Require "change nothing else" on every follow-up, and show the diff before
   it ships.** A four-word styling request silently rewrote my content and I
   never saw it. Where nobody reads generated code, that is precisely how an
   unreviewed data change reaches production.
3. **Nobody deploys who cannot explain the config file.** The one decision that
   mattered in my build — withholding an API key that would otherwise have been
   published in browser JavaScript — was made by an assistant, not by me. Put a
   named person on that gate, or automate the check. Do not leave it to whether
   someone happened to be advised well.
