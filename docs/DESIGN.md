# RareJob Practices — Design Document

## Product Summary

Daily 5-minute English exercise app for RareJob students. Exercises come from the Jitsuyo-Eikaiwa curriculum the student is already studying with their tutor. MVP = shadowing drills + streak system.

**Core loop:** Open app. Do 5-min drill. See score. Close. Come back tomorrow.

---

## 1. User Flows

### 1.1 Onboarding (first launch only)

```
Welcome screen
  "Practice your RareJob lessons daily"
          |
          v
  Select your level
  [Level 3] [Level 4] [Level 5] ...
          |
          v
  Select current chapter
  Chapter 1: Everyday Life
  Chapter 2: Going Out
  ...
          |
          v
  Set daily reminder
  [8:00 AM]  [12:00 PM]  [7:00 PM]  [Skip]
          |
          v
  "You're ready. Let's start."
  [Start first exercise]
```

**Notes:**
- Level/chapter selection syncs with their RareJob tutor progress
- Reminder defaults to 8:00 AM (morning commute)
- Skip is always available — no friction gates
- Total: 4 taps to first exercise


### 1.2 Daily Exercise (core loop)

```
Home screen
  ┌─────────────────────────────┐
  │  Day 3                  🔥3 │
  │                             │
  │  Today's Practice           │
  │  Lesson 1: Mornings         │
  │  Chapter 1: Everyday Life   │
  │                             │
  │  [Start]                    │
  └─────────────────────────────┘
          |
          v
  Exercise: Shadowing
  ┌─────────────────────────────┐
  │  1 / 5              02:30   │
  │                             │
  │  ▶ Listen                   │
  │  "We don't eat breakfast    │
  │   at home."                 │
  │                             │
  │  ○ Record your voice        │
  │                             │
  │  朝ごはんは家では食べません。    │
  └─────────────────────────────┘
          |
      (repeat x5 sentences)
          |
          v
  Score screen
  ┌─────────────────────────────┐
  │  Done!               🔥3    │
  │                             │
  │  Score: 82/100              │
  │  ━━━━━━━━━━━━━━━━━░░░      │
  │                             │
  │  Weak points:               │
  │  · "breakfast" — /ˈbrekfəst/│
  │  · "don't" — stress         │
  │                             │
  │  [Try weak points again]    │
  │  [Done]                     │
  └─────────────────────────────┘
```

**Flow details:**
1. **Listen phase** — Audio plays automatically. Transcript shown with Japanese translation below.
2. **Record phase** — User taps mic, repeats the sentence. AI scores pronunciation.
3. **Silent mode** — If mic is off, user reads along silently and self-rates (Got it / Repeat). For crowded trains.
4. **5 sentences per session** — From the lesson's dialogue. ~1 min per sentence = 5 min total.
5. **Score** — PROGOS-based scoring. Highlights specific words/sounds that need work.


### 1.3 Lesson Browser

```
Lessons tab
  ┌─────────────────────────────┐
  │  Level 3                  ▾ │
  │                             │
  │  Chapter 1: Everyday Life   │
  │  ┌───────────────────────┐  │
  │  │ Lesson 1: Mornings ✓  │  │
  │  │ Lesson 2: Evenings    │  │
  │  │ Lesson 3: Weekends    │  │
  │  │ ...                   │  │
  │  └───────────────────────┘  │
  │                             │
  │  Chapter 2: Going Out       │
  │  ┌───────────────────────┐  │
  │  │ Lesson 1: Shopping    │  │
  │  │ Lesson 2: Restaurants │  │
  │  └───────────────────────┘  │
  └─────────────────────────────┘
          |
     (tap lesson)
          |
          v
  Lesson detail
  ┌─────────────────────────────┐
  │  ← Mornings                 │
  │                             │
  │  Goal: I can listen to and  │
  │  understand someone's       │
  │  morning routine.           │
  │                             │
  │  Exercises:                 │
  │  ● Shadowing       5 min   │
  │  ○ Fill-in-blank   3 min   │
  │  ○ Vocab recall    2 min   │
  │                             │
  │  [Practice shadowing]       │
  └─────────────────────────────┘
```

**Notes:**
- ✓ = practiced at least once
- ● = available now, ○ = coming in v2
- Level dropdown lets user preview ahead but daily exercises follow their tutor's pace
- Lesson goals pulled directly from Jitsuyo-Eikaiwa materials


### 1.4 Progress & Streak

```
Progress tab
  ┌─────────────────────────────┐
  │  February 2026              │
  │                             │
  │  Mo Tu We Th Fr Sa Su       │
  │  ·  ·  ·  ·  ·  ·  ●       │
  │  ●  ●  ●  ○  ●  ·  ·       │
  │  ●  ●  ●  ●  ●  ●  ●       │
  │  ●  ·  ·  ·  ·  ·  ·       │
  │                             │
  │  Current streak: 3 days 🔥  │
  │  Best streak: 7 days        │
  │  Lessons practiced: 4 / 20  │
  │                             │
  │  Weak sounds                │
  │  /d/ vs /dʒ/    ━━━━░░ 60% │
  │  /r/ vs /l/     ━━░░░░ 40% │
  │  /θ/            ━━━░░░ 50% │
  └─────────────────────────────┘
```

**Notes:**
- ● = practiced, ○ = missed, · = future/no data
- Weak sounds aggregated across all practiced lessons
- "Lessons practiced: 4/20" shows MVP coverage
- Streak resets on missed day (simple, no freeze items in MVP)


---

## 2. Screen Map

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Home    │     │ Lessons  │     │ Progress │
│ (today's │     │ (browse  │     │ (streak  │
│  drill)  │     │  & pick) │     │  & stats)│
└────┬─────┘     └──────────┘     └──────────┘
     │            ▲                 ▲
     │            │                 │
     └────── bottom tab bar ────────┘
     │
     v
┌──────────┐     ┌──────────┐
│ Exercise │ ──▶ │  Score   │
│ (shadow) │     │ (result) │
└──────────┘     └──────────┘
```

**5 screens total for MVP.** Onboarding is a one-time overlay, not a separate screen group.


---

## 3. Design System

### 3.1 Color

```
Background
  base        #FFFFFF
  secondary   #F5F5F7       ← Apple grey, used for cards/sections

Text
  primary     #1D1D1F       ← near-black
  secondary   #86868B       ← muted labels
  tertiary    #AEAEB2       ← hints, placeholders

Accent
  green       #34C759       ← RareJob brand adjacent, iOS system green
  green-light #E8FAE6       ← score backgrounds, success states

Functional
  error       #FF3B30
  border      #E5E5EA       ← 1px borders only, no shadows
```

**Rules:**
- No shadows anywhere. Depth via spacing and subtle background color shifts.
- No gradients. Flat fills only.
- Dark mode: invert base ↔ primary, keep green accent.


### 3.2 Typography

System font stack: SF Pro (iOS) / Geist (web fallback).

```
Name          Size    Weight    Use
─────────────────────────────────────────
title         28px    600       Screen titles ("Today's Practice")
body          17px    400       Content, dialogue text, descriptions
caption       13px    400       Labels, timestamps, hints

Only these three. No other sizes.
```

**Rules:**
- Line height: 1.4 for body, 1.2 for title
- Letter spacing: -0.02em for title (Apple-tight), 0 for body
- Japanese text: same sizes, system font handles it


### 3.3 Spacing

4px base grid. Only use these values:

```
4   — inline gaps (icon to label)
8   — tight padding (inside pills/tags)
12  — between related items
16  — section padding, card padding
24  — between sections
32  — major section gaps
48  — screen top/bottom padding
```

### 3.4 Radius

```
4px  — small elements (pills, tags)
12px — cards, buttons
20px — bottom sheet, modals
```

No fully-rounded (999px) elements except the streak fire badge.


### 3.5 Components

#### Button — Primary
```
┌───────────────────────┐
│       Start            │   bg: green
│                        │   text: white
└───────────────────────┘   radius: 12px
                            height: 48px
                            full-width on mobile
```

#### Button — Ghost
```
┌───────────────────────┐
│       Done             │   bg: transparent
│                        │   text: primary
└───────────────────────┘   border: 1px #E5E5EA
                            radius: 12px
                            height: 48px
```

#### Card
```
┌───────────────────────┐
│                       │   bg: #F5F5F7
│   Content here        │   border: none
│                       │   radius: 12px
└───────────────────────┘   padding: 16px
                            no shadow
```

#### Score Bar
```
━━━━━━━━━━━━━━━━━░░░░░░   bg: #E5E5EA
━━━━━━━━━━━━━━━━━          fill: green
                            height: 6px
                            radius: 3px
```

#### Audio Player
```
┌───────────────────────────────┐
│  ▶  ━━━━━━━━━━━━━●━━━  2:30  │   minimal, single line
└───────────────────────────────┘   bg: secondary
                                    radius: 12px
```

#### Mic Button (Record)
```
        ┌─────┐
        │  ◉  │              48x48
        └─────┘              bg: green (recording)
                             bg: secondary (idle)
                             radius: 12px
```

#### Streak Badge
```
  🔥 3                       inline with title
                             caption size
                             color: green when active
                             color: secondary when zero
```

#### Tab Bar
```
┌─────────┬─────────┬─────────┐
│  Today  │ Lessons │Progress │   3 tabs only
└─────────┴─────────┴─────────┘   icon + label
                                   active: green
                                   inactive: secondary text
                                   bg: base white
                                   top border: 1px #E5E5EA
```

#### Weak Point Row
```
┌───────────────────────────────┐
│  "breakfast" — /ˈbrekfəst/   │   text: primary
│  Stress on first syllable    │   subtext: secondary
└───────────────────────────────┘   bg: green-light
                                    radius: 8px
                                    padding: 12px
```


### 3.6 Layout Principles

1. **Single column, always.** No sidebars, no grids. One thing at a time.
2. **48px top safe area.** Consistent breathing room below status bar.
3. **16px horizontal padding.** Edge to edge content within this margin.
4. **Cards float on secondary bg.** Screen bg = secondary (#F5F5F7), cards = base (#FFFFFF).
5. **Bottom-anchored actions.** Primary CTA always at bottom of screen, pinned.
6. **No modals in MVP.** Everything is a push transition.


### 3.7 Interaction Patterns

| Action | Gesture | Feedback |
|--------|---------|----------|
| Play audio | Tap ▶ | Button becomes ❚❚, audio plays |
| Record voice | Tap mic | Mic pulses green, waveform animates |
| Stop recording | Tap mic again | Score calculates, result shown |
| Next sentence | Tap "Next" or swipe left | Slide transition |
| Silent mode toggle | Tap 🔇 in exercise header | Mic hidden, self-rate buttons appear |
| Navigate tabs | Tap tab | Instant switch, no animation |

### 3.8 Silent Mode (key differentiator)

When mic is off (crowded train scenario):

```
┌─────────────────────────────┐
│  1 / 5   🔇          02:30  │
│                             │
│  ▶ Listen                   │
│  "We don't eat breakfast    │
│   at home."                 │
│                             │
│  朝ごはんは家では食べません。    │
│                             │
│  ┌──────────┐ ┌──────────┐  │
│  │  Repeat  │ │  Got it  │  │
│  └──────────┘ └──────────┘  │
└─────────────────────────────┘
```

- No mic button shown
- User listens (with earphones) and reads along
- Self-rates: "Repeat" puts it back in queue, "Got it" moves on
- Still counts toward streak and daily completion
- No score in silent mode — just completion


---

## 4. Content Mapping (Jitsuyo-Eikaiwa → App)

How curriculum maps to exercises:

```
Jitsuyo-Eikaiwa Lesson
  │
  ├── PRESENT section
  │     └── Vocabulary → [v2] Vocab Recall flashcards
  │     └── Grammar Tip → shown as hint during exercises
  │
  ├── UNDERSTAND section (Dialogue)
  │     └── Dialogue lines → Shadowing sentences (MVP)
  │     └── Comprehension Q's → [v2] Fill-in-blank
  │
  └── PRACTICE section
        └── Challenge sentences → Shadowing bonus round
```

**MVP: 5 dialogue lines per lesson, 20 lessons = 100 shadowing sentences.**


---

## 5. MVP Screen Priority

| Priority | Screen | Status |
|----------|--------|--------|
| P0 | Home (daily card) | Build first |
| P0 | Exercise: Shadowing | Core feature |
| P0 | Score/Result | Closes the loop |
| P1 | Lesson Browser | Navigation |
| P1 | Progress/Streak | Retention |
| P2 | Onboarding | Can hardcode level for MVP |
| P2 | Settings | Minimal, reminder time only |
