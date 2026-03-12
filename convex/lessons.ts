import { query } from "./_generated/server"
import { v } from "convex/values"

export const list = query({
  args: {
    level: v.optional(v.number()),
    chapter: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q

    if (args.level !== undefined && args.chapter !== undefined) {
      q = ctx.db
        .query("lessons")
        .withIndex("by_level_chapter", (idx) =>
          idx.eq("level", args.level!).eq("chapter", args.chapter!)
        )
    } else {
      q = ctx.db.query("lessons")
    }

    const lessons = await q.collect()

    return lessons
      .sort((a, b) => a.lessonNumber - b.lessonNumber)
      .map((l) => ({
        _id: l._id,
        lessonKey: l.lessonKey,
        title: l.title,
        titleJp: l.titleJp,
        goal: l.goal,
        goalJp: l.goalJp,
        lessonType: l.lessonType,
        lessonNumber: l.lessonNumber,
      }))
  },
})

export const getByKey = query({
  args: { lessonKey: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lessons")
      .withIndex("by_lessonKey", (q) => q.eq("lessonKey", args.lessonKey))
      .first()
  },
})

export const getByLevelChapter = query({
  args: { level: v.number(), chapter: v.number() },
  handler: async (ctx, args) => {
    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_level_chapter", (q) =>
        q.eq("level", args.level).eq("chapter", args.chapter)
      )
      .collect()

    return lessons.sort((a, b) => a.lessonNumber - b.lessonNumber)
  },
})

export const getChaptersForLevel = query({
  args: { level: v.number() },
  handler: async (ctx, args) => {
    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_level_chapter", (idx) => idx.eq("level", args.level))
      .collect()

    const seen = new Map<number, { chapter: number; title: string; titleJp: string }>()
    for (const l of lessons) {
      if (!seen.has(l.chapter)) {
        seen.set(l.chapter, {
          chapter: l.chapter,
          title: l.chapterTitle,
          titleJp: l.chapterTitleJp,
        })
      }
    }

    return Array.from(seen.values()).sort((a, b) => a.chapter - b.chapter)
  },
})
