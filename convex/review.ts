import { query, mutation, internalMutation, internalQuery } from "./_generated/server"
import { v } from "convex/values"
import { authComponent } from "./auth"

export const insertDailyReview = internalMutation({
  args: {
    userId: v.string(),
    date: v.string(),
    exercises: v.array(
      v.object({
        type: v.union(
          v.literal("flashcard"),
          v.literal("translate"),
          v.literal("fill-blank")
        ),
        question: v.string(),
        correctAnswer: v.string(),
        options: v.optional(v.array(v.string())),
        source: v.union(v.literal("weak-point"), v.literal("recent")),
        wrongCount: v.optional(v.number()),
      })
    ),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("dailyReviews", args)
  },
})

export const getByUserDate = internalQuery({
  args: { userId: v.string(), date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("dailyReviews")
      .withIndex("by_userId_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date)
      )
      .first()
  },
})

export const getTodayReview = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return null

    const today = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split("T")[0]

    return await ctx.db
      .query("dailyReviews")
      .withIndex("by_userId_date", (q) =>
        q.eq("userId", user._id).eq("date", today)
      )
      .first()
  },
})

export const completeReview = mutation({
  args: {
    reviewId: v.id("dailyReviews"),
    score: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)

    const review = await ctx.db.get(args.reviewId)
    if (!review || review.userId !== user._id) return

    await ctx.db.patch(args.reviewId, {
      completed: true,
      score: args.score,
    })
  },
})
