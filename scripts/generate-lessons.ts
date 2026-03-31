import OpenAI from "openai"
import { writeFileSync, mkdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const client = new OpenAI()

const LESSON_TYPE_PATTERN = ["LISTENING", "LISTENING", "SPEAKING", "SPEAKING", "REVIEW"] as const

const CHAPTERS = [
  { level: 3, chapter: 2, title: "Travel & Getting Around", titleJp: "旅行と移動" },
  { level: 4, chapter: 1, title: "Work Life", titleJp: "仕事と職場" },
  { level: 4, chapter: 2, title: "Social Situations", titleJp: "社交の場面" },
]

const LESSON_TOPICS: Record<string, string[]> = {
  "3-2": ["At the Airport", "Taking the Train", "Asking for Directions", "At the Hotel", "Review"],
  "4-1": ["Office Introductions", "Email & Messages", "Meetings", "Giving Presentations", "Review"],
  "4-2": ["Making Plans", "At a Restaurant", "Compliments & Small Talk", "Invitations", "Review"],
}

const EXAMPLE_LESSON = `{
  "lessonKey": "l3-c1-01",
  "lessonNumber": 1,
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
    "ruleEn": "Use simple present tense to talk about facts or routine. With I/you/we/they use the base form. With he/she/it add -s or -es.",
    "ruleJp": "現在形を使って事実や日課について話すことができます。I/you/we/theyには動詞の原形を、he/she/itには-sまたは-esをつけます。",
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
    { "speaker": "Catherine", "lineEn": "No, we don't eat breakfast at home. We buy breakfast at a food stand.", "lineJp": "いいえ、家では朝ごはんを食べません。屋台で朝ごはんを買います。" },
    { "speaker": "Saori", "lineEn": "Really? What does your mom do in the morning?", "lineJp": "本当ですか？お母さんは朝何をしますか？" },
    { "speaker": "Catherine", "lineEn": "She does her hair and brushes her teeth. Then we go out together.", "lineJp": "髪を整えて歯を磨きます。それから一緒に出かけます。" },
    { "speaker": "Saori", "lineEn": "I take a shower and get dressed first. Then I eat breakfast at home.", "lineJp": "私はまずシャワーを浴びて服を着ます。それから家で朝ごはんを食べます。" }
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

async function generateLesson(
  level: number,
  chapter: number,
  chapterTitle: string,
  chapterTitleJp: string,
  lessonNumber: number,
  topic: string,
  lessonType: string,
) {
  const levelDesc = level === 3 ? "A2-B1 (elementary to intermediate)" : "B1-B2 (intermediate to upper-intermediate)"
  const isReview = lessonType === "REVIEW"

  const prompt = `Generate a complete English lesson for Japanese students at ${levelDesc} level.

Topic: "${topic}"
Chapter: "${chapterTitle}" (${chapterTitleJp})
Lesson type: ${lessonType}
Lesson number: ${lessonNumber}
Level: ${level}, Chapter: ${chapter}
Lesson key: "l${level}-c${chapter}-${String(lessonNumber).padStart(2, "0")}"

${isReview ? "This is a REVIEW lesson. Use vocabulary and grammar from the previous 4 lessons in this chapter. Mix content from all previous topics." : ""}

Requirements:
- 6 vocabulary items with Japanese translations and IPA pronunciation
- Grammar tip with rule in English and Japanese, plus 3 examples
- Context sentence setting up a dialogue (English + Japanese)
- 6 dialogue lines between 2 speakers (use Japanese names like Saori, Yuki, Kenji + international names)
- 6 flashcards (alternate en-to-jp and jp-to-en types)
- 3 translate exercises (Japanese sentence → English, with 2 plausible wrong answers)
- 4 fill-in-the-blank exercises (sentence with ___ blank, correct answer, and 3 wrong options)

Wrong answers in translate and fill-blank should be common mistakes Japanese students make (e.g., forgetting -s, wrong pronoun, confusing similar words).

Output ONLY valid JSON matching this exact structure (no markdown, no explanation):
${EXAMPLE_LESSON}`

  const response = await client.responses.create({
    model: "gpt-5",
    input: prompt,
  })

  const text = response.output_text.trim()
  // Strip markdown code fences if present
  const jsonStr = text.replace(/^```json?\s*/, "").replace(/\s*```$/, "")
  return JSON.parse(jsonStr)
}

async function generateTopicsForInterest(interest: string, level: number): Promise<{ title: string; titleJp: string; topics: string[] }> {
  const levelDesc = level === 3 ? "A2-B1 (elementary to intermediate)" : "B1-B2 (intermediate to upper-intermediate)"

  const response = await client.responses.create({
    model: "gpt-5",
    input: `Generate a chapter for Japanese English learners at ${levelDesc} level about "${interest}".

Return ONLY valid JSON (no markdown):
{
  "title": "Chapter title in English",
  "titleJp": "Chapter title in Japanese",
  "topics": ["Lesson 1 topic", "Lesson 2 topic", "Lesson 3 topic", "Lesson 4 topic", "Review"]
}

The 5 topics should progress from basic to advanced within the theme. Lesson 5 must be "Review".`,
  })

  const text = response.output_text.trim()
  const jsonStr = text.replace(/^```json?\s*/, "").replace(/\s*```$/, "")
  return JSON.parse(jsonStr)
}

async function runCustom(interest: string, level: number, chapter: number) {
  const outputDir = join(__dirname, "output")
  mkdirSync(outputDir, { recursive: true })

  console.log(`Generating chapter for interest: "${interest}" (Level ${level}, Chapter ${chapter})\n`)
  console.log("  Generating topics...")

  const chapterInfo = await generateTopicsForInterest(interest, level)
  console.log(`  Chapter: ${chapterInfo.title} (${chapterInfo.titleJp})`)
  console.log(`  Topics: ${chapterInfo.topics.join(", ")}\n`)

  type Job = { level: number; chapter: number; chapterTitle: string; chapterTitleJp: string; lessonNumber: number; topic: string; lessonType: string }
  const jobs: Job[] = chapterInfo.topics.map((topic, i) => ({
    level, chapter,
    chapterTitle: chapterInfo.title, chapterTitleJp: chapterInfo.titleJp,
    lessonNumber: i + 1, topic,
    lessonType: LESSON_TYPE_PATTERN[i],
  }))

  console.log(`Generating ${jobs.length} lessons in parallel...\n`)

  const results = await Promise.allSettled(
    jobs.map(async (job) => {
      const lessonKey = `l${job.level}-c${job.chapter}-${String(job.lessonNumber).padStart(2, "0")}`
      console.log(`  ⏳ ${lessonKey} — ${job.topic} (${job.lessonType})`)

      const lesson = await generateLesson(
        job.level, job.chapter, job.chapterTitle, job.chapterTitleJp,
        job.lessonNumber, job.topic, job.lessonType,
      )

      lesson.lessonKey = lessonKey
      lesson.lessonNumber = job.lessonNumber
      lesson.lessonType = job.lessonType

      const filename = `${lessonKey}.json`
      writeFileSync(join(outputDir, filename), JSON.stringify(lesson, null, 2))
      console.log(`  ✓ ${lessonKey} — ${job.topic}`)
      return lessonKey
    })
  )

  const succeeded = results.filter((r) => r.status === "fulfilled").length
  const failed = results.filter((r) => r.status === "rejected")
  console.log(`\n${succeeded}/${jobs.length} lessons generated.`)
  if (failed.length > 0) {
    console.log("Failed:")
    failed.forEach((r, i) => {
      if (r.status === "rejected") console.log(`  ✗ ${jobs[i].topic}: ${r.reason}`)
    })
  }
  console.log("\nReview lessons in scripts/output/ before adding to seed.ts")
}

async function runDefault() {
  const outputDir = join(__dirname, "output")
  mkdirSync(outputDir, { recursive: true })

  type Job = { level: number; chapter: number; chapterTitle: string; chapterTitleJp: string; lessonNumber: number; topic: string; lessonType: string }
  const jobs: Job[] = []

  for (const ch of CHAPTERS) {
    const key = `${ch.level}-${ch.chapter}`
    const topics = LESSON_TOPICS[key]
    for (let i = 0; i < topics.length; i++) {
      jobs.push({
        level: ch.level, chapter: ch.chapter,
        chapterTitle: ch.title, chapterTitleJp: ch.titleJp,
        lessonNumber: i + 1, topic: topics[i],
        lessonType: LESSON_TYPE_PATTERN[i],
      })
    }
  }

  console.log(`Generating ${jobs.length} lessons in parallel...\n`)

  const results = await Promise.allSettled(
    jobs.map(async (job) => {
      const lessonKey = `l${job.level}-c${job.chapter}-${String(job.lessonNumber).padStart(2, "0")}`
      console.log(`  ⏳ ${lessonKey} — ${job.topic} (${job.lessonType})`)

      const lesson = await generateLesson(
        job.level, job.chapter, job.chapterTitle, job.chapterTitleJp,
        job.lessonNumber, job.topic, job.lessonType,
      )

      lesson.lessonKey = lessonKey
      lesson.lessonNumber = job.lessonNumber
      lesson.lessonType = job.lessonType

      const filename = `${lessonKey}.json`
      writeFileSync(join(outputDir, filename), JSON.stringify(lesson, null, 2))
      console.log(`  ✓ ${lessonKey} — ${job.topic}`)
      return lessonKey
    })
  )

  const succeeded = results.filter((r) => r.status === "fulfilled").length
  const failed = results.filter((r) => r.status === "rejected")
  console.log(`\n${succeeded}/${jobs.length} lessons generated.`)
  if (failed.length > 0) {
    console.log("Failed:")
    failed.forEach((r, i) => {
      if (r.status === "rejected") console.log(`  ✗ ${jobs[i].topic}: ${r.reason}`)
    })
  }
  console.log("\nReview lessons in scripts/output/ before adding to seed.ts")
}

// CLI: npx tsx scripts/generate-lessons.ts --custom "Cooking & Food" --level 3 --chapter 3
const args = process.argv.slice(2)
const customIdx = args.indexOf("--custom")

if (customIdx !== -1) {
  const interest = args[customIdx + 1]
  if (!interest) {
    console.error('Usage: npx tsx scripts/generate-lessons.ts --custom "Your Interest" [--level 3] [--chapter 3]')
    process.exit(1)
  }
  const levelIdx = args.indexOf("--level")
  const chapterIdx = args.indexOf("--chapter")
  const level = levelIdx !== -1 ? parseInt(args[levelIdx + 1]) : 3
  const chapter = chapterIdx !== -1 ? parseInt(args[chapterIdx + 1]) : 3
  runCustom(interest, level, chapter)
} else {
  runDefault()
}
