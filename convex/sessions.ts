import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { authComponent } from "./auth"

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

function calculateStreak(
  lastPracticeDate: string | undefined,
  currentStreak: number,
  today: string
): number {
  if (lastPracticeDate === today) return currentStreak

  const todayDate = new Date(today)
  const yesterday = new Date(todayDate)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = formatDate(yesterday)

  if (lastPracticeDate === yesterdayStr) return currentStreak + 1
  return 1
}

export const complete = mutation({
  args: {
    lessonKey: v.string(),
    answers: v.array(
      v.object({
        exerciseType: v.union(
          v.literal("flashcard"),
          v.literal("translate"),
          v.literal("fill-blank")
        ),
        question: v.string(),
        correctAnswer: v.string(),
        userAnswer: v.string(),
        correct: v.boolean(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    const userId = user._id

    const now = Date.now()
    const today = formatDate(new Date())
    const correctCount = args.answers.filter((a) => a.correct).length
    const totalQuestions = args.answers.length
    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0

    // 1. Create session
    const sessionId = await ctx.db.insert("exerciseSessions", {
      userId,
      lessonKey: args.lessonKey,
      completedAt: now,
      totalQuestions,
      correctCount,
      score,
    })

    // 2. Create answer documents
    for (const answer of args.answers) {
      await ctx.db.insert("exerciseAnswers", {
        sessionId,
        userId,
        exerciseType: answer.exerciseType,
        question: answer.question,
        correctAnswer: answer.correctAnswer,
        userAnswer: answer.userAnswer,
        correct: answer.correct,
      })
    }

    // 3. Update user progress
    let progress = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first()

    if (!progress) {
      const id = await ctx.db.insert("userProgress", {
        userId,
        currentStreak: 0,
        longestStreak: 0,
        completedLessons: [],
        weakPoints: [],
        practiceHistory: {},
      })
      progress = (await ctx.db.get(id))!
    }

    // Streak calculation
    const newStreak = calculateStreak(
      progress.lastPracticeDate,
      progress.currentStreak,
      today
    )
    const newLongestStreak = Math.max(progress.longestStreak, newStreak)

    // Completed lessons
    const completedLessons = progress.completedLessons.includes(args.lessonKey)
      ? progress.completedLessons
      : [...progress.completedLessons, args.lessonKey]

    // Merge weak points from wrong answers
    const wpMap = new Map<string, { term: string; translation: string; wrongCount: number }>()
    for (const wp of progress.weakPoints) {
      wpMap.set(wp.term, wp)
    }
    for (const answer of args.answers) {
      if (!answer.correct) {
        const existing = wpMap.get(answer.question)
        if (existing) {
          wpMap.set(answer.question, {
            ...existing,
            wrongCount: existing.wrongCount + 1,
          })
        } else {
          wpMap.set(answer.question, {
            term: answer.question,
            translation: answer.correctAnswer,
            wrongCount: 1,
          })
        }
      }
    }

    // Practice history
    const practiceHistory = {
      ...(progress.practiceHistory as Record<string, boolean>),
      [today]: true,
    }

    await ctx.db.patch(progress._id, {
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastPracticeDate: today,
      completedLessons,
      weakPoints: Array.from(wpMap.values()),
      practiceHistory,
    })

    return { sessionId, score, newStreak }
  },
})

export const listForUser = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return []
    const limit = args.limit ?? 20
    return await ctx.db
      .query("exerciseSessions")
      .withIndex("by_userId_completedAt", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(limit)
  },
})

export const getDetail = query({
  args: { sessionId: v.id("exerciseSessions") },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId)
    if (!session) return null

    const answers = await ctx.db
      .query("exerciseAnswers")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect()

    return { session, answers }
  },
})
