'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasCompletedOnboarding, getUserProfile } from '@/lib/user-store';
import { HeroInput } from '@/components/home/hero-input';
import { CourseGrid } from '@/components/home/course-grid';

export default function Home() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!hasCompletedOnboarding()) {
      router.replace('/onboarding');
      return;
    }
    const profile = getUserProfile();
    if (profile) setUserName(profile.name);
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-2xl mx-auto px-5 pt-14 pb-12 sm:px-6 lg:max-w-4xl lg:px-10">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-[22px] sm:text-[28px] font-semibold text-text-primary mb-2">
            {userName ? `Hi ${userName}, what` : 'What'} would you like to learn?
          </h1>
          <p className="text-[15px] text-text-secondary">
            Choose a topic or describe what you want to practice
          </p>
        </div>

        <div className="mb-10 sm:mb-12">
          <HeroInput />
        </div>

        <div>
          <h2 className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide mb-4">
            Popular Courses
          </h2>
          <CourseGrid />
        </div>
      </main>
    </div>
  );
}
