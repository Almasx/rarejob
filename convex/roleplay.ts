import { query, mutation, internalMutation } from "./_generated/server"
import { v } from "convex/values"
import { authComponent } from "./auth"

export const startSession = mutation({
  args: {
    scenarioId: v.string(),
    firstMessage: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)

    return await ctx.db.insert("roleplaySessions", {
      userId: user._id,
      scenarioId: args.scenarioId,
      status: "active",
      messages: [{ role: "assistant", content: args.firstMessage }],
      startedAt: Date.now(),
    })
  },
})

export const appendMessages = internalMutation({
  args: {
    sessionId: v.id("roleplaySessions"),
    newMessages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId)
    if (!session) throw new Error("Session not found")

    await ctx.db.patch(args.sessionId, {
      messages: [...session.messages, ...args.newMessages],
    })
  },
})

export const completeSession = internalMutation({
  args: {
    sessionId: v.id("roleplaySessions"),
    score: v.number(),
    feedbackEn: v.string(),
    feedbackJp: v.string(),
    strengths: v.array(v.string()),
    improvements: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, {
      status: "completed",
      completedAt: Date.now(),
      score: args.score,
      feedbackEn: args.feedbackEn,
      feedbackJp: args.feedbackJp,
      strengths: args.strengths,
      improvements: args.improvements,
    })
  },
})

export const getActive = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return null

    return await ctx.db
      .query("roleplaySessions")
      .withIndex("by_userId_status", (q) =>
        q.eq("userId", user._id).eq("status", "active")
      )
      .first()
  },
})

export const getSession = query({
  args: { sessionId: v.id("roleplaySessions") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return null

    const session = await ctx.db.get(args.sessionId)
    if (!session || session.userId !== user._id) return null
    return session
  },
})

export const listCompleted = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return []

    return await ctx.db
      .query("roleplaySessions")
      .withIndex("by_userId_status", (q) =>
        q.eq("userId", user._id).eq("status", "completed")
      )
      .order("desc")
      .take(20)
  },
})
