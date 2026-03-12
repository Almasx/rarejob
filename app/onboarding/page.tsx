"use client"

import { Button } from "@/components/button"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { AnimatePresence, motion } from "framer-motion"
import { atom, useAtom, useAtomValue } from "jotai"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"
import useMeasure from "react-use-measure"

const stepAtom = atom(0)
const selectedLevelAtom = atom<number | null>(null)
const selectedChapterAtom = atom<number | null>(null)

export default function OnboardingPage() {
  const step = useAtomValue(stepAtom)
  const [measureRef, bounds] = useMeasure()

  const currentView = (() => {
    switch (step) {
      case 0: return <WelcomeStep />
      case 1: return <LevelStep />
      case 2: return <ChapterStep />
    }
  })()

  return (
    <div className="px-5 py-10 flex flex-col gap-6 min-h-dvh justify-center">
      <motion.div
        className="card-raised overflow-hidden"
        animate={{ height: bounds.height > 0 ? bounds.height : "auto" }}
        transition={spring}
      >
        <div ref={measureRef}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={step} {...crossfade}>
              {currentView}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <BottomActions />
    </div>
  )
}

function WelcomeStep() {
  return (
    <div className="p-6">
      <div className="flex justify-center mb-12 pt-8">
        <div className="relative w-[240px] h-[140px]">
          {FLASHCARDS.map((card) => (
            <div
              key={card.kanji}
              className={`${card.className} w-[140px] rounded-xl bg-white shadow-md ring-1 ring-black/[0.06] px-4 py-3 text-center ${card.rotate}`}
            >
              <p className="text-base font-bold leading-tight mb-0.5">{card.kanji}</p>
              <p className="text-text-tertiary text-caption">{card.english}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="mb-2">Your daily English drills</h2>
      <p className="text-text-secondary text-base leading-relaxed">
        Flashcards, translation, and fill-in-the-blank — 5 minutes a day, matched to your chapter.
      </p>
    </div>
  )
}

function LevelStep() {
  const [selectedLevel, setSelectedLevel] = useAtom(selectedLevelAtom)

  return (
    <div className="p-6">
      <h2 className="mb-1">What level are you studying?</h2>
      <p className="text-text-secondary text-base mb-4">
        Match this to your RareJob tutor lessons.
      </p>
      <div className="divide-y divide-border">
        {LEVELS.map((level) => (
          <SelectRow
            key={level.value}
            selected={selectedLevel === level.value}
            onClick={() => setSelectedLevel(level.value)}
          >
            <span>{level.label}</span>
            <span className="text-text-tertiary font-normal ml-2 text-caption">
              {level.desc}
            </span>
          </SelectRow>
        ))}
      </div>
    </div>
  )
}

function ChapterStep() {
  const selectedLevel = useAtomValue(selectedLevelAtom)
  const [selectedChapter, setSelectedChapter] = useAtom(selectedChapterAtom)

  const chapters = useQuery(
    api.lessons.getChaptersForLevel,
    selectedLevel !== null ? { level: selectedLevel } : "skip"
  )

  return (
    <div className="p-6">
      <h2 className="mb-1">Which chapter are you on?</h2>
      <p className="text-text-secondary text-base mb-4">
        We&apos;ll start your exercises from here.
      </p>

      {chapters === undefined ? (
        <div className="py-10">
          <div className="h-4 w-3/4 mx-auto rounded bg-fill-empty animate-pulse mb-3" />
          <div className="h-4 w-1/2 mx-auto rounded bg-fill-empty animate-pulse" />
        </div>
      ) : chapters.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-text-secondary text-caption mb-1">
            No chapters for Level {selectedLevel} yet.
          </p>
          <p className="text-text-tertiary text-caption">
            Pick a different level to get started.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {chapters.map((ch) => (
            <SelectRow
              key={ch.chapter}
              selected={selectedChapter === ch.chapter}
              onClick={() => setSelectedChapter(ch.chapter)}
            >
              <span>Chapter {ch.chapter}</span>
              <span className="text-text-tertiary font-normal ml-2 text-caption">
                {ch.title}
              </span>
            </SelectRow>
          ))}
        </div>
      )}
    </div>
  )
}

function SelectRow({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      className="w-full flex items-center justify-between py-4 last:pb-0 text-left active:opacity-70 transition-opacity"
      onClick={onClick}
    >
      <span
        className="text-base font-medium transition-colors"
        style={{ color: selected ? "var(--accent)" : "var(--text-primary)" }}
      >
        {children}
      </span>
      <motion.div
        initial={false}
        animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
        transition={spring}
      >
        <Check size={18} color="var(--accent)" strokeWidth={2.5} />
      </motion.div>
    </button>
  )
}
function BottomActions() {
  const router = useRouter()
  const [step, setStep] = useAtom(stepAtom)
  const selectedLevel = useAtomValue(selectedLevelAtom)
  const [selectedChapter, setSelectedChapter] = useAtom(selectedChapterAtom)

  const chapters = useQuery(
    api.lessons.getChaptersForLevel,
    selectedLevel !== null ? { level: selectedLevel } : "skip"
  )
  const completeOnboarding = useMutation(api.progress.completeOnboarding)

  const hasNoChapters = chapters && chapters.length === 0

  const handleSetStep = (s: number) => {
    if (s === 2) setSelectedChapter(null)
    setStep(s)
  }

  const handleFinish = async () => {
    if (selectedLevel === null || selectedChapter === null) return
    await completeOnboarding({ level: selectedLevel, chapter: selectedChapter })
    router.replace("/")
  }

  return (
    <div className="mt-auto flex items-center gap-3">
      {step > 0 && (
        <button
          className="text-text-tertiary text-base font-medium px-4 py-3.5 active:opacity-60 transition-opacity"
          onClick={() => handleSetStep(step - 1)}
        >
          Back
        </button>
      )}

      {step === 0 && (
        <Button className="flex-1" onClick={() => handleSetStep(1)}>
          Get Started
        </Button>
      )}

      {step === 1 && (
        <Button
          className="flex-1"
          disabled={selectedLevel === null}
          onClick={() => handleSetStep(2)}
        >
          Continue
        </Button>
      )}

      {step === 2 && hasNoChapters && (
        <Button className="flex-1" onClick={() => handleSetStep(1)}>
          Choose a Different Level
        </Button>
      )}

      {step === 2 && !hasNoChapters && (
        <Button
          className="flex-1"
          disabled={selectedChapter === null}
          onClick={handleFinish}
        >
          Start Practicing
        </Button>
      )}
    </div>
  )
}

const spring = { type: "spring" as const, duration: 0.3, bounce: 0 }

const LEVELS = [
  { value: 3, label: "Level 3", desc: "Jitsuyo Eikaiwa 3" },
  { value: 4, label: "Level 4", desc: "Jitsuyo Eikaiwa 4" },
  { value: 5, label: "Level 5", desc: "Jitsuyo Eikaiwa 5" },
]

const FLASHCARDS = [
  { kanji: "通勤", english: "commute", className: "absolute left-8 bottom-4", rotate: "rotate-[-10deg]" },
  { kanji: "日課", english: "routine", className: "absolute right-8 top-2", rotate: "rotate-[12deg]" },
  { kanji: "朝ごはん", english: "breakfast", className: "absolute left-[50px] top-[30px]", rotate: "" },
]

const crossfade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
} as const
