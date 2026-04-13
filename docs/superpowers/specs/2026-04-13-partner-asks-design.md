# Partner Asks — Apr 16 2026

Scope: four of the five partner asks from the 2026-04-12 meeting, implemented as one coherent feature on `feat/roleplay-pronunciation`.

The Mornings tutor PDF (Level 3, Chapter 1, Lesson 1) turned out to drive all four items — its `FEEDBACK` page specifies the exact rubric, and its `Challenge 2: Discuss your ideas` is the "discuss ideas" section. Scope was expanded mid-flight to include #2 because it fell out for free.

## Items addressed

| # | Partner ask | Approach |
|---|---|---|
| 1 | Put tutor prompts into roleplay | Mornings scenario runs the tutor's Challenge 2 flow verbatim. All scenarios upgraded with tutor-style coaching system prompt. |
| 2 | Implement "discuss ideas" | Mornings scenario = 8 discussion questions from Challenge 2 (Morning Routine / Routine Activities), asked conversationally. |
| 3 | CTA to book RareJob | Subtle CTA component → `https://www.rarejob.com/reservation/` on home (persistent), roleplay result, session result. Taste over volume. |
| 4 | Categorize mistakes, focus on task details | Feedback rubric mirrors the RareJob tutor feedback page: `Lesson Goal Achievement` (1-4 task-focused) + `Range / Accuracy / Fluency` each 1-4 with 1-2 transcript-referenced corrections. Old free-form `strengths`/`improvements` retired. |

Item #5 from the meeting ("focus feedback on task details correction") folds into #4 — the rubric's anchor is task completion, not grammar nitpicks. Item "discuss ideas" (originally deferred) came in via Mornings.

## Data changes

`lib/scenarios.ts` — `Scenario` gets two optional fields:

- `tutorPrompt?: string` — verbatim tutor-instruction block injected into system prompt for curriculum-based scenarios.
- `curriculumSource?: string` — e.g. `"Jitsuyo-Eikaiwa Level 3, Chapter 1, Lesson 1 — Mornings"`. Shown as a badge in the scenario picker.

`convex/schema.ts` `roleplaySessions` — keep existing optional fields for old rows. Add:

- `goalAchievement?: { level: 1|2|3|4, reason: string }`
- `range?: { level: 1|2|3|4, comment: string, examples: string[] }`
- `accuracy?: { level: 1|2|3|4, comment: string, examples: string[] }`
- `fluency?: { level: 1|2|3|4, comment: string, examples: string[] }`

`score` stays as a 0-100 mirror derived from the four 1-4 levels (avg × 25) so existing completed-session listings keep working.

## System prompt changes

`roleplayChat` prompt — add coaching behavior block:

- Ask open follow-ups to keep the student producing language.
- If the student stalls >2 turns, scaffold with a simpler version of the question.
- Never correct grammar mid-conversation (unchanged).
- End with `[SCENARIO_COMPLETE]` when either (a) the scenario's goal is clearly met, or (b) for curriculum scenarios, all discussion prompts are covered.

For curriculum scenarios, append `tutorPrompt` verbatim under a "Lesson content" header so the AI runs the RareJob flow.

## Evaluation prompt

Replace the JSON schema with the RareJob rubric. Prompt pins the rubric labels from the PDF ("Could complete the task with ease / some clarifications / additional instructions / difficulty") and requires every `comment`/`example` to quote or reference a specific transcript moment.

## UI changes

- `roleplay-result.tsx` — rebuilt around the 4-row rubric (Goal Achievement + 3 dimensions). Score pill shows the 1-4 Goal Achievement level prominently, numeric 0-100 secondary.
- `book-rarejob-cta.tsx` — new component (card variant + inline variant).
- Home `app/page.tsx` — persistent card after streak.
- `session-result.tsx` — inline CTA after score card.
- `roleplay-scenarios.tsx` — badge "RareJob Level 3" for curriculum scenarios.

## Out of scope

- Adding more tutor-PDF lessons (only one PDF available; infra is lesson-agnostic, add more later).
- Changing exercise-side feedback. Partner's "categorize mistakes" ask scopes to roleplay for this pass.
- A/B testing CTA placements. Ship tasteful first, measure later.
