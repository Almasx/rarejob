import { query, mutation } from "./_generated/server"
import { v } from "convex/values"
import { authComponent } from "./auth"

export const get = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return null
    return await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first()
  },
})

export const getOrCreate = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    const userId = user._id

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first()

    if (existing) return existing

    const id = await ctx.db.insert("userProgress", {
      userId,
      currentStreak: 0,
      longestStreak: 0,
      completedLessons: [],
      weakPoints: [],
      practiceHistory: {},
    })

    return await ctx.db.get(id)
  },
})

export const getDashboard = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) {
      return {
        streak: 0,
        completedCount: 0,
        weakPoints: [] as { term: string; translation: string; wrongCount: number }[],
        practiceHistory: {} as Record<string, boolean>,
        completedLessons: [] as string[],
      }
    }

    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first()

    if (!progress) {
      return {
        streak: 0,
        completedCount: 0,
        weakPoints: [] as { term: string; translation: string; wrongCount: number }[],
        practiceHistory: {} as Record<string, boolean>,
        completedLessons: [] as string[],
      }
    }

    return {
      streak: progress.currentStreak,
      completedCount: progress.completedLessons.length,
      weakPoints: progress.weakPoints,
      practiceHistory: progress.practiceHistory as Record<string, boolean>,
      completedLessons: progress.completedLessons,
    }
  },
})

export const completeOnboarding = mutation({
  args: {
    level: v.number(),
    chapter: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    const userId = user._id

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first()

    if (existing) {
      await ctx.db.patch(existing._id, {
        currentLevel: args.level,
        currentChapter: args.chapter,
        onboardingCompleted: true,
      })
    } else {
      await ctx.db.insert("userProgress", {
        userId,
        currentStreak: 0,
        longestStreak: 0,
        completedLessons: [],
        weakPoints: [],
        practiceHistory: {},
        currentLevel: args.level,
        currentChapter: args.chapter,
        onboardingCompleted: true,
      })
    }
  },
})
