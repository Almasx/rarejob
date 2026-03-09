import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  lessons: defineTable({
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
    lessonType: v.union(
      v.literal("LISTENING"),
      v.literal("SPEAKING"),
      v.literal("REVIEW")
    ),
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
  })
    .index("by_lessonKey", ["lessonKey"])
    .index("by_level_chapter", ["level", "chapter"])
    .index("by_level_chapter_number", ["level", "chapter", "lessonNumber"]),

  userProgress: defineTable({
    userId: v.string(),
    currentStreak: v.number(),
    longestStreak: v.number(),
    lastPracticeDate: v.optional(v.string()),
    completedLessons: v.array(v.string()),
    weakPoints: v.array(
      v.object({
        term: v.string(),
        translation: v.string(),
        wrongCount: v.number(),
      })
    ),
    practiceHistory: v.any(),
    currentLevel: v.optional(v.number()),
    currentChapter: v.optional(v.number()),
  }).index("by_userId", ["userId"]),

  exerciseSessions: defineTable({
    userId: v.string(),
    lessonKey: v.string(),
    completedAt: v.number(),
    totalQuestions: v.number(),
    correctCount: v.number(),
    score: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_lessonKey", ["userId", "lessonKey"])
    .index("by_userId_completedAt", ["userId", "completedAt"]),

  exerciseAnswers: defineTable({
    sessionId: v.id("exerciseSessions"),
    userId: v.string(),
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
    .index("by_sessionId", ["sessionId"])
    .index("by_userId_correct", ["userId", "correct"]),
})
