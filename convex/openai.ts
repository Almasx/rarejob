"use node"

import { action } from "./_generated/server"
import { internal } from "./_generated/api"
import { v } from "convex/values"
import OpenAI from "openai"

function getClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

export const generateSpeech = action({
  args: { text: v.string(), voice: v.optional(v.string()) },
  handler: async (_ctx, args) => {
    const openai = getClient()
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: (args.voice as "alloy" | "nova" | "shimmer") || "nova",
      input: args.text,
      response_format: "mp3",
    })

    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString("base64")
    return `data:audio/mp3;base64,${base64}`
  },
})

const EXAMPLE_LESSON_JSON = `{
  "title": "Mornings",
  "titleJp": "朝の日課",
  "goal": "I can listen to and understand someone's morning routine.",
  "goalJp": "朝の日課を聞いて理解できるようになる。",
  "lessonType": "LISTENING",
  "vocabulary": [
    { "word": "wake up", "wordJp": "起きる", "pronunciation": "weɪk ʌp", "exampleEn": "I wake up at 7 a.m.", "exampleJp": "私は午前7時に起きます。" },
    { "word": "do my hair", "wordJp": "髪を整える", "pronunciation": "duː maɪ hɛr", "exampleEn": "She does her hair every morning.", "exampleJp": "彼女は毎朝髪を整えます。" },
    { "word": "eat breakfast", "wordJp": "朝ごはんを食べる", "pronunciation": "iːt ˈbrɛkfəst", "exampleEn": "We don't eat breakfast at home.", "exampleJp": "私たちは家で朝ごはんを食べません。" },
    { "word": "brush my teeth", "wordJp": "歯を磨く", "pronunciation": "brʌʃ maɪ tiːθ", "exampleEn": "He brushes his teeth after breakfast.", "exampleJp": "彼は朝食の後に歯を磨きます。" },
    { "word": "take a shower", "wordJp": "シャワーを浴びる", "pronunciation": "teɪk ə ˈʃaʊər", "exampleEn": "I take a shower in the morning.", "exampleJp": "私は朝シャワーを浴びます。" },
    { "word": "get dressed", "wordJp": "服を着る", "pronunciation": "ɡɛt drɛst", "exampleEn": "I get dressed before breakfast.", "exampleJp": "私は朝食の前に服を着ます。" }
  ],
  "grammarTip": {
    "ruleEn": "Use simple present tense to talk about facts or routine.",
    "ruleJp": "現在形を使って事実や日課について話すことができます。",
    "examples": [
      { "en": "I wake up at 7 a.m.", "jp": "私は午前7時に起きます。" },
      { "en": "She washes the dishes.", "jp": "彼女は皿を洗います。" },
      { "en": "He doesn't wake up at 7 a.m.", "jp": "彼は午前7時に起きません。" }
    ]
  },
  "context": "Saori and Catherine are visiting Catherine's family in Taiwan.",
  "contextJp": "サオリとキャサリンは台湾にいるキャサリンの家族を訪ねています。",
  "dialogue": [
    { "speaker": "Catherine", "lineEn": "My dad wakes up at 6 a.m. every day.", "lineJp": "お父さんは毎日午前6時に起きます。" },
    { "speaker": "Saori", "lineEn": "That's early! Does he eat breakfast at home?", "lineJp": "早いですね！家で朝ごはんを食べますか？" },
    { "speaker": "Catherine", "lineEn": "No, we don't eat breakfast at home.", "lineJp": "いいえ、家では朝ごはんを食べません。" },
    { "speaker": "Saori", "lineEn": "Really? What does your mom do in the morning?", "lineJp": "本当ですか？お母さんは朝何をしますか？" },
    { "speaker": "Catherine", "lineEn": "She does her hair and brushes her teeth.", "lineJp": "髪を整えて歯を磨きます。" },
    { "speaker": "Saori", "lineEn": "I take a shower and get dressed first.", "lineJp": "私はまずシャワーを浴びて服を着ます。" }
  ],
  "flashcards": [
    { "front": "wake up", "back": "起きる", "type": "en-to-jp" },
    { "front": "朝ごはんを食べる", "back": "eat breakfast", "type": "jp-to-en" },
    { "front": "brush my teeth", "back": "歯を磨く", "type": "en-to-jp" },
    { "front": "服を着る", "back": "get dressed", "type": "jp-to-en" },
    { "front": "do my hair", "back": "髪を整える", "type": "en-to-jp" },
    { "front": "シャワーを浴びる", "back": "take a shower", "type": "jp-to-en" }
  ],
  "translate": [
    { "sentenceJp": "彼は朝ごはんを食べません。", "correct": "He doesn't eat breakfast.", "wrong": ["He don't eat breakfast.", "He isn't eat breakfast."] },
    { "sentenceJp": "彼女は毎朝髪を整えます。", "correct": "She does her hair every morning.", "wrong": ["She does she hair every morning.", "She do her hair every morning."] },
    { "sentenceJp": "私は朝食の前に服を着ます。", "correct": "I get dressed before breakfast.", "wrong": ["I gets dressed before breakfast.", "I doesn't get dressed before breakfast."] }
  ],
  "fillBlank": [
    { "sentence": "He ___ eat breakfast.", "blank": "doesn't", "options": ["doesn't", "don't", "isn't", "aren't"] },
    { "sentence": "She does ___ hair for an hour.", "blank": "her", "options": ["her", "she", "his", "my"] },
    { "sentence": "I ___ dressed before breakfast.", "blank": "get", "options": ["get", "gets", "getting", "got"] },
    { "sentence": "They ___ drink tea for breakfast.", "blank": "don't", "options": ["don't", "doesn't", "isn't", "aren't"] }
  ]
}`

export const generateLesson = action({
  args: {
    interest: v.string(),
    level: v.number(),
    chapter: v.number(),
  },
  handler: async (ctx, args) => {
    const levelDesc = args.level <= 3
      ? "A2-B1 (elementary to intermediate)"
      : "B1-B2 (intermediate to upper-intermediate)"

    // Pick a random lesson type
    const types = ["LISTENING", "SPEAKING"] as const
    const lessonType = types[Math.floor(Math.random() * types.length)]

    const prompt = `Generate a complete English lesson for Japanese students at ${levelDesc} level.

Topic: "${args.interest}"
Lesson type: ${lessonType}

Requirements:
- 6 vocabulary items with Japanese translations and IPA pronunciation
- Grammar tip with rule in English and Japanese, plus 3 examples
- Context sentence setting up a dialogue (English + Japanese)
- 6 dialogue lines between 2 speakers (use Japanese names like Saori, Yuki, Kenji + international names)
- 6 flashcards (alternate en-to-jp and jp-to-en types)
- 3 translate exercises (Japanese sentence → English, with 2 plausible wrong answers)
- 4 fill-in-the-blank exercises (sentence with ___ blank, correct answer, and 3 wrong options)

Wrong answers in translate and fill-blank should be common mistakes Japanese students make.

Output ONLY valid JSON matching this exact structure (no markdown, no explanation):
${EXAMPLE_LESSON_JSON}`

    const openai = getClient()
    const response = await openai.responses.create({
      model: "gpt-5",
      input: prompt,
    })

    const text = response.output_text.trim()
    const jsonStr = text.replace(/^```json?\s*/, "").replace(/\s*```$/, "")
    const lesson = JSON.parse(jsonStr)

    // Generate a unique lesson key
    const lessonKey = `custom-${Date.now()}`

    // Insert into DB
    await ctx.runMutation(internal.lessons.insertLesson, {
      lessonKey,
      level: args.level,
      chapter: args.chapter,
      lessonNumber: 99,
      chapterTitle: args.interest,
      chapterTitleJp: args.interest,
      title: lesson.title,
      titleJp: lesson.titleJp,
      goal: lesson.goal,
      goalJp: lesson.goalJp,
      lessonType: lesson.lessonType === "SPEAKING" ? "SPEAKING" : lesson.lessonType === "REVIEW" ? "REVIEW" : "LISTENING",
      vocabulary: lesson.vocabulary,
      grammarTip: lesson.grammarTip,
      context: lesson.context,
      contextJp: lesson.contextJp,
      dialogue: lesson.dialogue,
      flashcards: lesson.flashcards,
      translate: lesson.translate,
      fillBlank: lesson.fillBlank,
    })

    return lessonKey
  },
})

export const chat = action({
  args: {
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
        content: v.string(),
      })
    ),
    lessonContext: v.optional(v.string()),
    weakPoints: v.optional(v.array(v.string())),
    practiceGoals: v.optional(v.array(v.string())),
  },
  handler: async (_ctx, args) => {
    const systemPrompt = `You are a friendly, patient English practice partner for Japanese students learning English.
You speak simply and clearly at an A2-B1 level.
Keep responses short (1-3 sentences).
If the student makes a grammar mistake, gently correct it and continue the conversation.
Use vocabulary and topics from the lesson context when available.
Respond naturally as a conversation partner, not as a teacher giving a lecture.
${args.lessonContext ? `\nLesson context: ${args.lessonContext}` : ""}
${args.weakPoints?.length ? `\nThe student struggles with these words/phrases, try to use them naturally: ${args.weakPoints.join(", ")}` : ""}
${args.practiceGoals?.length ? `\nThe student wants to practice: ${args.practiceGoals.join(", ")}` : ""}`

    const openai = getClient()
    const input = [
      { role: "system" as const, content: systemPrompt },
      ...args.messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    ]

    const response = await openai.responses.create({
      model: "gpt-5",
      instructions: systemPrompt,
      input: input.filter((m) => m.role !== "system"),
    })

    return response.output_text ?? ""
  },
})

type WrongAnswer = {
  userId: string
  question: string
  userAnswer: string
  correctAnswer: string
  exerciseType: string
  correct: boolean
}

type RecentAnswer = {
  question: string
  correctAnswer: string
  exerciseType: string
  correct: boolean
}

export const generateGrammarJournal = action({
  args: { sessionId: v.id("exerciseSessions") },
  handler: async (ctx, args) => {
    const { answers, lessonKey } = await ctx.runQuery(
      internal.sessions.getWrongAnswers,
      { sessionId: args.sessionId }
    ) as { answers: WrongAnswer[]; lessonKey: string }

    if (answers.length === 0) return null

    const wrongAnswerList = answers.map((a: WrongAnswer) => ({
      question: a.question,
      userAnswer: a.userAnswer,
      correctAnswer: a.correctAnswer,
      exerciseType: a.exerciseType,
    }))

    const prompt = `You are an English grammar tutor for Japanese students at A2-B1 level. Analyze these wrong answers from an exercise session.

For each mistake, provide:
1. A clear grammar explanation in English (2-3 sentences, simple language)
2. The same explanation in Japanese
3. The grammar rule name (e.g., "Subject-verb agreement", "Article usage", "Preposition choice")
4. One example sentence showing the correct usage

Be encouraging, not critical. Focus on helping the student understand WHY their answer was wrong.

Wrong answers:
${JSON.stringify(wrongAnswerList)}

Output ONLY valid JSON (no markdown) as an array:
[{ "question": "...", "userAnswer": "...", "correctAnswer": "...", "exerciseType": "...", "explanationEn": "...", "explanationJp": "...", "grammarRule": "...", "exampleCorrect": "..." }]`

    const openai = getClient()
    const response = await openai.responses.create({
      model: "gpt-5",
      input: prompt,
    })

    const text = response.output_text.trim()
    const jsonStr = text.replace(/^```json?\s*/, "").replace(/\s*```$/, "")
    const entries = JSON.parse(jsonStr)

    await ctx.runMutation(internal.journal.insertEntry, {
      userId: answers[0].userId,
      sessionId: args.sessionId,
      lessonKey,
      createdAt: Date.now(),
      entries,
    })

    return { entryCount: entries.length }
  },
})

export const generateDailyReview = action({
  args: {},
  handler: async (ctx): Promise<string | null> => {
    const userProgress = await ctx.runQuery(internal.progress.getForAction) as {
      userId: string
      weakPoints: { term: string; translation: string; wrongCount: number }[]
    } | null
    if (!userProgress) return null

    const today = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split("T")[0]

    // Check if already generated today
    const existing = await ctx.runQuery(internal.review.getByUserDate, {
      userId: userProgress.userId,
      date: today,
    }) as { _id: string } | null
    if (existing) return existing._id

    const recentAnswers = await ctx.runQuery(internal.sessions.getRecentAnswers, {
      userId: userProgress.userId,
      limit: 10,
    }) as RecentAnswer[]

    const weakPoints = userProgress.weakPoints ?? []
    const recentWrong = recentAnswers
      .filter((a: RecentAnswer) => !a.correct)
      .map((a: RecentAnswer) => ({ question: a.question, correctAnswer: a.correctAnswer, type: a.exerciseType }))
    const recentCorrect = recentAnswers
      .filter((a: RecentAnswer) => a.correct)
      .slice(0, 10)
      .map((a: RecentAnswer) => ({ question: a.question, correctAnswer: a.correctAnswer, type: a.exerciseType }))

    const prompt = `You are creating a personalized daily review for a Japanese English student at A2-B1 level.

Their weak points (terms they frequently get wrong):
${JSON.stringify(weakPoints.slice(0, 10))}

Recently incorrect answers:
${JSON.stringify(recentWrong.slice(0, 10))}

Recently correct answers (for reinforcement):
${JSON.stringify(recentCorrect)}

Generate exactly 8 review exercises mixing:
- 4-5 exercises targeting weak points (prioritize highest wrongCount)
- 3-4 exercises reviewing recently learned items

Exercise types to generate:
- "flashcard": { "type": "flashcard", "question": "English or Japanese word/phrase", "correctAnswer": "the translation", "source": "weak-point" or "recent" }
- "translate": { "type": "translate", "question": "Japanese sentence", "correctAnswer": "correct English", "options": ["correct answer", "wrong1", "wrong2"], "source": "weak-point" or "recent" }
- "fill-blank": { "type": "fill-blank", "question": "Sentence with ___ blank", "correctAnswer": "correct word", "options": ["correct", "wrong1", "wrong2", "wrong3"], "source": "weak-point" or "recent" }

Make wrong options reflect common Japanese learner mistakes. Include the wrongCount for weak-point items.

Output ONLY valid JSON array (no markdown):
[{ "type": "...", "question": "...", "correctAnswer": "...", "options": [...], "source": "...", "wrongCount": ... }]`

    const openai = getClient()
    const response = await openai.responses.create({
      model: "gpt-5",
      input: prompt,
    })

    const text = response.output_text.trim()
    const jsonStr = text.replace(/^```json?\s*/, "").replace(/\s*```$/, "")
    const exercises = JSON.parse(jsonStr)

    await ctx.runMutation(internal.review.insertDailyReview, {
      userId: userProgress.userId,
      date: today,
      exercises,
      completed: false,
    })

    return today
  },
})

export const roleplayChat = action({
  args: {
    sessionId: v.id("roleplaySessions"),
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
      })
    ),
    userMessage: v.string(),
    scenarioId: v.string(),
    userRole: v.string(),
    aiRole: v.string(),
    goal: v.string(),
  },
  handler: async (ctx, args): Promise<{ text: string; isComplete: boolean }> => {
    const allMessages = [
      ...args.messages,
      { role: "user" as const, content: args.userMessage },
    ]

    const systemPrompt = `You are playing the role of "${args.aiRole}" in a roleplay scenario for a Japanese student learning English.
The student is playing "${args.userRole}".
Scenario: ${args.scenarioId}
Goal for the student: ${args.goal}

Rules:
- Stay in character at all times as ${args.aiRole}.
- Speak naturally at A2-B1 English level (simple but realistic).
- Keep responses short (1-3 sentences). Be conversational, not lecture-like.
- If the student makes a grammar mistake, do NOT correct it during the roleplay. Stay in character.
- Guide the conversation toward the goal naturally. Don't rush.
- When the student has clearly achieved the goal (completed the task), append exactly [SCENARIO_COMPLETE] at the very end of your response. Only do this once, and only when the goal is genuinely accomplished.
- Never mention that this is a roleplay or that you are an AI.`

    const openai = getClient()
    const input = allMessages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }))

    const response = await openai.responses.create({
      model: "gpt-5",
      instructions: systemPrompt,
      input,
    })

    const text = response.output_text ?? ""
    const isComplete = text.includes("[SCENARIO_COMPLETE]")
    const cleanText = text.replace("[SCENARIO_COMPLETE]", "").trim()

    await ctx.runMutation(internal.roleplay.appendMessages, {
      sessionId: args.sessionId,
      newMessages: [
        { role: "user", content: args.userMessage },
        { role: "assistant", content: cleanText },
      ],
    })

    return { text: cleanText, isComplete }
  },
})

export const roleplayEvaluate = action({
  args: {
    sessionId: v.id("roleplaySessions"),
    scenarioId: v.string(),
    userRole: v.string(),
    aiRole: v.string(),
    goal: v.string(),
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
      })
    ),
  },
  handler: async (ctx, args): Promise<{
    score: number
    feedbackEn: string
    feedbackJp: string
    strengths: string[]
    improvements: string[]
  }> => {
    const transcript = args.messages
      .map((m) => `${m.role === "user" ? args.userRole : args.aiRole}: ${m.content}`)
      .join("\n")

    const prompt = `You are an English teacher evaluating a Japanese student's roleplay conversation.

Scenario: ${args.scenarioId}
Student role: ${args.userRole}
AI role: ${args.aiRole}
Goal: ${args.goal}

Transcript:
${transcript}

Evaluate the student's English performance. Consider:
- Grammar accuracy
- Vocabulary range and appropriateness
- Communication effectiveness (did they achieve the goal?)
- Naturalness and politeness
- Fluency (sentence structure variety)

Output ONLY valid JSON (no markdown):
{
  "score": <number 0-100>,
  "feedbackEn": "<2-3 sentence summary in English>",
  "feedbackJp": "<same feedback in Japanese>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<area 1>", "<area 2>", "<area 3>"]
}

Be encouraging. Strengths and improvements should be specific to what happened in the conversation, not generic. If the student achieved the goal, score should be at least 60.`

    const openai = getClient()
    const response = await openai.responses.create({
      model: "gpt-5",
      input: prompt,
    })

    const text = response.output_text.trim()
    const jsonStr = text.replace(/^```json?\s*/, "").replace(/\s*```$/, "")
    const evaluation = JSON.parse(jsonStr) as {
      score: number
      feedbackEn: string
      feedbackJp: string
      strengths: string[]
      improvements: string[]
    }

    await ctx.runMutation(internal.roleplay.completeSession, {
      sessionId: args.sessionId,
      score: evaluation.score,
      feedbackEn: evaluation.feedbackEn,
      feedbackJp: evaluation.feedbackJp,
      strengths: evaluation.strengths,
      improvements: evaluation.improvements,
    })

    return evaluation
  },
})

export const transcribeAudio = action({
  args: {
    audioBase64: v.string(),
    mimeType: v.string(),
  },
  handler: async (_ctx, args): Promise<string> => {
    const openai = getClient()

    const buffer = Buffer.from(args.audioBase64, "base64")
    const extension = args.mimeType.includes("mp4") ? "mp4" : "webm"
    const file = new File([buffer], `recording.${extension}`, { type: args.mimeType })

    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file,
      language: "en",
    })

    return transcription.text
  },
})

export const comparePronunciation = action({
  args: {
    original: v.string(),
    transcription: v.string(),
  },
  handler: async (_ctx, args): Promise<{
    score: number
    differences: { expected: string; got: string; type: string }[]
    tipEn: string
    tipJp: string
  }> => {
    const openai = getClient()

    const prompt = `You are an English pronunciation coach for Japanese students.

Compare the original sentence with what the student actually said (transcribed by Whisper).

Original: "${args.original}"
Student said: "${args.transcription}"

Analyze and output ONLY valid JSON (no markdown):
{
  "score": <number 0-100>,
  "differences": [
    { "expected": "word", "got": "word_or_empty", "type": "mispronounced|missing|extra" }
  ],
  "tipEn": "<one short pronunciation tip in English>",
  "tipJp": "<same tip in Japanese>"
}

Rules:
- Score 90-100: nearly perfect. Score 70-89: good with minor issues. Score 50-69: needs practice. Below 50: try again.
- For Japanese speakers, pay special attention to: L/R confusion, TH sounds, V/B confusion, word-final consonants, vowel insertion.
- If transcription is empty or nonsensical, score 0 and give encouragement.
- "differences" should only contain words that differ. Empty array if perfect match.
- Keep tips actionable and specific to what was wrong.`

    const response = await openai.responses.create({
      model: "gpt-5",
      input: prompt,
    })

    const text = response.output_text.trim()
    const jsonStr = text.replace(/^```json?\s*/, "").replace(/\s*```$/, "")
    return JSON.parse(jsonStr) as {
      score: number
      differences: { expected: string; got: string; type: string }[]
      tipEn: string
      tipJp: string
    }
  },
})
