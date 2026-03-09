import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const get = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()
  },
})

export const getOrCreate = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    if (existing) return existing

    const id = await ctx.db.insert("userProgress", {
      userId: args.userId,
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
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
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
