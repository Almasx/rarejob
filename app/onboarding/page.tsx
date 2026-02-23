'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { UserProfile } from '@/lib/types';
import { saveUserProfile } from '@/lib/user-store';
import { LevelSelector } from '@/components/onboarding/level-selector';
import { InterestsPicker } from '@/components/onboarding/interests-picker';
import { ProfileForm } from '@/components/onboarding/profile-form';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    filter: 'blur(8px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    filter: 'blur(8px)',
  }),
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [level, setLevel] = useState<UserProfile['level'] | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState('Japanese');
  const containerRef = useRef<HTMLDivElement>(null);

  function toggleInterest(id: string) {
    setInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }

  function canProceed() {
    if (step === 0) return level !== null;
    if (step === 1) return interests.length > 0;
    if (step === 2) return name.trim().length > 0;
    return false;
  }

  function handleNext() {
    if (step < 2) {
      setDirection(1);
      setStep(step + 1);
    } else {
      const profile: UserProfile = {
        name: name.trim(),
        level: level!,
        interests,
        nativeLanguage,
      };
      saveUserProfile(profile);
      router.replace('/');
    }
  }

  function handleBack() {
    setDirection(-1);
    setStep(step - 1);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header — progress bar pinned to top */}
      <header className="sticky top-0 z-10 bg-background px-6 pt-14 pb-4">
        <div className="max-w-lg mx-auto flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={false}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          ))}
        </div>
      </header>

      {/* Content — top-aligned, animated */}
      <main className="flex-1 px-6 pt-10" ref={containerRef}>
        <div className="w-full max-w-lg mx-auto relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {step === 0 && <LevelSelector selected={level} onSelect={setLevel} />}
              {step === 1 && <InterestsPicker selected={interests} onToggle={toggleInterest} />}
              {step === 2 && (
                <ProfileForm
                  name={name}
                  onNameChange={setName}
                  nativeLanguage={nativeLanguage}
                  onLanguageChange={setNativeLanguage}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer — buttons pinned to bottom, centered */}
      <footer className="sticky bottom-0 z-10 bg-background px-6 py-12">
        <div className="max-w-lg mx-auto flex flex-col items-center gap-3">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full py-3 rounded-xl bg-accent text-white text-[15px] font-medium disabled:opacity-40 transition-all hover:brightness-110"
          >
            {step === 2 ? 'Start Learning' : 'Continue'}
          </button>
          <button
            onClick={handleBack}
            className={`text-[15px] text-text-secondary hover:text-text-primary transition-colors ${step === 0 ? 'invisible' : ''}`}
          >
            Back
          </button>
        </div>
      </footer>
    </div>
  );
}
