# Plan: User Flows & Design System for RareJob Practices

## Context Summary

**Product:** Daily 5-min English exercise app for existing RareJob students (Japanese market). Content pulled from Jitsuyo-Eikaiwa curriculum. MVP focuses on shadowing exercises for 20 lessons + streak system.

**Key constraints from research:**
- Silent-friendly (train commutes with masks)
- 5-10 min sessions for busy working adults
- Must bridge to human tutoring, not replace it
- Curriculum follows PCPP method (Present, Comprehend, Practice, Production)
- Jitsuyo-Eikaiwa has Levels 3-8, each with chapters/lessons, lesson types: Listening, Speaking, Scanning, Reading, Review

**Design direction:** Minimal, no shadows, Apple-styled, clean white backgrounds, card-based, inspired by the one-screen language coach reference.

**Tech stack:** Next.js 16, React 19, Tailwind CSS 4, TypeScript

---

## What I'll Create

A single markdown file `docs/DESIGN.md` containing:

### 1. User Flows (4 core flows)

- **Onboarding Flow** — Select current RareJob level/chapter, set daily reminder time
- **Daily Exercise Flow** — Open app > see today's exercise > do shadowing drill > see score > streak updated
- **Lesson Browser Flow** — Browse chapters/lessons, pick specific lesson to practice
- **Progress/Streak Flow** — View streak calendar, weak points, lesson completion stats

### 2. Design System (surface-level, minimal)

- **Color palette** — Monochrome base + single accent (green from RareJob brand)
- **Typography** — SF Pro / Geist system font, 3 sizes only
- **Spacing** — 4px grid, limited scale (4, 8, 12, 16, 24, 32, 48)
- **Components** — Card, Button (primary/ghost), Progress bar, Streak indicator, Audio waveform, Score pill
- **Layout principles** — Single-column mobile-first, generous whitespace, no shadows, thin 1px borders only
- **Interaction patterns** — Tap to play audio, swipe between exercises, hold to record

### 3. Screen Inventory (ASCII wireframes)

- Home (daily exercise card + streak)
- Exercise: Shadowing (audio player + transcript + record button)
- Exercise: Score/feedback
- Lesson browser
- Settings (minimal)

---

## Files to create

| File | Purpose |
|------|---------|
| `docs/DESIGN.md` | User flows, design system tokens, component specs, ASCII wireframes |

One file. Concise. Actionable.
