import { query, internalMutation } from "./_generated/server"
import { v } from "convex/values"
import { authComponent } from "./auth"

export const insertEntry = internalMutation({
  args: {
    userId: v.string(),
    sessionId: v.id("exerciseSessions"),
    lessonKey: v.string(),
    createdAt: v.number(),
    entries: v.array(
      v.object({
        question: v.string(),
        userAnswer: v.string(),
        correctAnswer: v.string(),
        exerciseType: v.string(),
        explanationEn: v.string(),
        explanationJp: v.string(),
        grammarRule: v.string(),
        exampleCorrect: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("grammarJournal", args)
  },
})

export const listForUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return []

    return await ctx.db
      .query("grammarJournal")
      .withIndex("by_userId_createdAt", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(20)
  },
})

export const getBySession = query({
  args: { sessionId: v.id("exerciseSessions") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return null

    return await ctx.db
      .query("grammarJournal")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .first()
  },
})
