import { query, internalMutation } from "./_generated/server"
import { v } from "convex/values"
import { authComponent } from "./auth"

export const list = query({
  args: {
    level: v.optional(v.number()),
    chapter: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return []

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
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return null

    return await ctx.db
      .query("lessons")
      .withIndex("by_lessonKey", (q) => q.eq("lessonKey", args.lessonKey))
      .first()
  },
})

export const getByLevelChapter = query({
  args: { level: v.number(), chapter: v.number() },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return []

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
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return []

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

export const insertLesson = internalMutation({
  args: {
    lessonKey: v.string(),
    level: v.number(),
    chapter: v.number(),
    lessonNumber: v.number(),
    chapterTitle: v.string(),
    chapterTitleJp: v.string(),
    title: v.string(),
    titleJp: v.string(),
    goal: v.string(),
    goalJp: v.string(),
    lessonType: v.union(v.literal("LISTENING"), v.literal("SPEAKING"), v.literal("REVIEW")),
    vocabulary: v.array(
      v.object({
        word: v.string(),
        wordJp: v.string(),
        pronunciation: v.string(),
        exampleEn: v.string(),
        exampleJp: v.string(),
      })
    ),
    grammarTip: v.object({
      ruleEn: v.string(),
      ruleJp: v.string(),
      examples: v.array(v.object({ en: v.string(), jp: v.string() })),
    }),
    context: v.string(),
    contextJp: v.string(),
    dialogue: v.array(
      v.object({
        speaker: v.string(),
        lineEn: v.string(),
        lineJp: v.string(),
      })
    ),
    flashcards: v.array(
      v.object({
        front: v.string(),
        back: v.string(),
        type: v.string(),
      })
    ),
    translate: v.array(
      v.object({
        sentenceJp: v.string(),
        correct: v.string(),
        wrong: v.array(v.string()),
      })
    ),
    fillBlank: v.array(
      v.object({
        sentence: v.string(),
        blank: v.string(),
        options: v.array(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("lessons", args)
  },
})
