import { internalMutation } from "./_generated/server"

const CHAPTER = {
  level: 3,
  chapter: 1,
  title: "Everyday Life",
  titleJp: "日常生活",
}

const lessonsData = [
  {
    lessonKey: "l3-c1-01",
    lessonNumber: 1,
    title: "Mornings",
    titleJp: "朝の日課",
    goal: "I can understand someone's morning routine.",
    goalJp: "誰かの朝の日課を理解できる。",
    lessonType: "LISTENING" as const,
    vocabulary: [
      { word: "alarm", wordJp: "目覚まし", pronunciation: "əˈlɑːrm", exampleEn: "I set my alarm for 6 AM.", exampleJp: "6時にアラームをセットします。" },
      { word: "commute", wordJp: "通勤", pronunciation: "kəˈmjuːt", exampleEn: "My commute takes about 30 minutes.", exampleJp: "通勤は約30分かかります。" },
      { word: "grab", wordJp: "さっと取る", pronunciation: "ɡræb", exampleEn: "I grab a coffee on the way.", exampleJp: "途中でコーヒーを買います。" },
      { word: "rush", wordJp: "急ぐ", pronunciation: "rʌʃ", exampleEn: "I always rush in the morning.", exampleJp: "朝はいつも急いでいます。" },
      { word: "routine", wordJp: "日課", pronunciation: "ruːˈtiːn", exampleEn: "What's your morning routine?", exampleJp: "朝の日課は何ですか？" },
    ],
    grammarTip: {
      ruleEn: "Use 'usually / always / never' before the main verb to describe habits.",
      ruleJp: "習慣を表すときは、usually / always / never を動詞の前に置きます。",
      examples: [
        { en: "I usually wake up at 7.", jp: "私はたいてい7時に起きます。" },
        { en: "She always drinks tea.", jp: "彼女はいつもお茶を飲みます。" },
        { en: "He never skips breakfast.", jp: "彼は朝食を抜くことはありません。" },
      ],
    },
    context: "Yuki asks Tom about his morning routine.",
    contextJp: "ゆきがトムに朝の日課について聞いています。",
    dialogue: [
      { speaker: "Yuki", lineEn: "What time do you usually wake up?", lineJp: "たいてい何時に起きますか？" },
      { speaker: "Tom", lineEn: "I usually wake up at 6:30. My alarm goes off twice!", lineJp: "たいてい6時半に起きます。目覚ましが2回鳴るんです！" },
      { speaker: "Yuki", lineEn: "Do you eat breakfast at home?", lineJp: "朝ごはんは家で食べますか？" },
      { speaker: "Tom", lineEn: "No, I always grab something on the way. I'm always rushing.", lineJp: "いいえ、いつも途中で何か買います。いつも急いでいます。" },
      { speaker: "Yuki", lineEn: "How long is your commute?", lineJp: "通勤はどれくらいかかりますか？" },
      { speaker: "Tom", lineEn: "About 40 minutes by train. I usually read on the train.", lineJp: "電車で約40分です。電車ではたいてい本を読みます。" },
    ],
    flashcards: [
      { front: "I set my alarm for 6 AM.", back: "6時にアラームをセットします。", type: "en-to-jp" },
      { front: "通勤は約30分かかります。", back: "My commute takes about 30 minutes.", type: "jp-to-en" },
      { front: "I always rush in the morning.", back: "朝はいつも急いでいます。", type: "en-to-jp" },
      { front: "朝の日課は何ですか？", back: "What's your morning routine?", type: "jp-to-en" },
    ],
    translate: [
      { sentenceJp: "たいてい何時に起きますか？", correct: "What time do you usually wake up?", wrong: ["What time do you always sleep?", "When do you go to work?"] },
      { sentenceJp: "いつも途中で何か買います。", correct: "I always grab something on the way.", wrong: ["I never eat in the morning.", "I sometimes cook at home."] },
      { sentenceJp: "電車ではたいてい本を読みます。", correct: "I usually read on the train.", wrong: ["I always sleep on the train.", "I never use the train."] },
    ],
    fillBlank: [
      { sentence: "I ___ wake up at 6:30.", blank: "usually", options: ["usually", "yesterday", "tomorrow", "already"] },
      { sentence: "I always ___ something on the way.", blank: "grab", options: ["grab", "throw", "lose", "forget"] },
      { sentence: "My ___ takes about 40 minutes.", blank: "commute", options: ["commute", "homework", "dinner", "vacation"] },
      { sentence: "I set my ___ for 6 AM.", blank: "alarm", options: ["alarm", "lunch", "phone", "meeting"] },
    ],
  },
  {
    lessonKey: "l3-c1-02",
    lessonNumber: 2,
    title: "Evenings",
    titleJp: "夜の過ごし方",
    goal: "I can talk about what I do after work.",
    goalJp: "仕事の後にすることを話せる。",
    lessonType: "SPEAKING" as const,
    vocabulary: [
      { word: "unwind", wordJp: "くつろぐ", pronunciation: "ʌnˈwaɪnd", exampleEn: "I like to unwind after work.", exampleJp: "仕事の後はくつろぐのが好きです。" },
      { word: "binge-watch", wordJp: "一気見する", pronunciation: "bɪndʒ wɒtʃ", exampleEn: "I binge-watch dramas on weekends.", exampleJp: "週末はドラマを一気見します。" },
      { word: "leftovers", wordJp: "残り物", pronunciation: "ˈleftˌoʊvərz", exampleEn: "I usually eat leftovers for dinner.", exampleJp: "夕食はたいてい残り物を食べます。" },
      { word: "exhausted", wordJp: "疲れ果てた", pronunciation: "ɪɡˈzɔːstɪd", exampleEn: "I'm exhausted after a long day.", exampleJp: "長い一日の後は疲れ果てています。" },
      { word: "scroll", wordJp: "スクロールする", pronunciation: "skroʊl", exampleEn: "I scroll through social media before bed.", exampleJp: "寝る前にSNSをスクロールします。" },
    ],
    grammarTip: {
      ruleEn: "Use 'like to + verb' or 'enjoy + verb-ing' to talk about things you do for fun.",
      ruleJp: "楽しみとしてすることには、like to + 動詞 または enjoy + 動詞ing を使います。",
      examples: [
        { en: "I like to cook dinner.", jp: "夕食を作るのが好きです。" },
        { en: "She enjoys reading before bed.", jp: "彼女は寝る前に読書を楽しみます。" },
        { en: "We like to go for walks.", jp: "散歩に行くのが好きです。" },
      ],
    },
    context: "Mika and James talk about their evening routines.",
    contextJp: "ミカとジェームズが夜の過ごし方について話しています。",
    dialogue: [
      { speaker: "Mika", lineEn: "What do you usually do after work?", lineJp: "仕事の後はたいてい何をしますか？" },
      { speaker: "James", lineEn: "I like to unwind by watching TV. I'm usually exhausted.", lineJp: "テレビを見てくつろぐのが好きです。たいてい疲れ果てています。" },
      { speaker: "Mika", lineEn: "Do you cook dinner?", lineJp: "夕食は作りますか？" },
      { speaker: "James", lineEn: "Sometimes. But I usually just eat leftovers.", lineJp: "ときどき。でもたいてい残り物を食べます。" },
      { speaker: "Mika", lineEn: "I enjoy reading before bed. It helps me relax.", lineJp: "寝る前に読書を楽しみます。リラックスできます。" },
      { speaker: "James", lineEn: "I just scroll through my phone. Bad habit!", lineJp: "私はスマホをスクロールするだけです。悪い習慣です！" },
    ],
    flashcards: [
      { front: "I like to unwind after work.", back: "仕事の後はくつろぐのが好きです。", type: "en-to-jp" },
      { front: "夕食はたいてい残り物を食べます。", back: "I usually eat leftovers for dinner.", type: "jp-to-en" },
      { front: "I'm exhausted after a long day.", back: "長い一日の後は疲れ果てています。", type: "en-to-jp" },
      { front: "寝る前にSNSをスクロールします。", back: "I scroll through social media before bed.", type: "jp-to-en" },
    ],
    translate: [
      { sentenceJp: "仕事の後はたいてい何をしますか？", correct: "What do you usually do after work?", wrong: ["What do you do at work?", "Where do you work?"] },
      { sentenceJp: "テレビを見てくつろぐのが好きです。", correct: "I like to unwind by watching TV.", wrong: ["I don't watch TV.", "I watch TV at work."] },
      { sentenceJp: "寝る前に読書を楽しみます。", correct: "I enjoy reading before bed.", wrong: ["I read books at school.", "I don't like reading."] },
    ],
    fillBlank: [
      { sentence: "I like to ___ after work.", blank: "unwind", options: ["unwind", "commute", "alarm", "rush"] },
      { sentence: "I usually just eat ___.", blank: "leftovers", options: ["leftovers", "breakfast", "lunch", "snacks"] },
      { sentence: "I'm ___ after a long day.", blank: "exhausted", options: ["exhausted", "excited", "hungry", "early"] },
      { sentence: "I ___ through social media before bed.", blank: "scroll", options: ["scroll", "jump", "throw", "drive"] },
    ],
  },
  {
    lessonKey: "l3-c1-03",
    lessonNumber: 3,
    title: "Weekends",
    titleJp: "週末の予定",
    goal: "I can understand someone's weekend plans.",
    goalJp: "誰かの週末の予定を理解できる。",
    lessonType: "LISTENING" as const,
    vocabulary: [
      { word: "sleep in", wordJp: "寝坊する", pronunciation: "sliːp ɪn", exampleEn: "I like to sleep in on Saturdays.", exampleJp: "土曜日は寝坊するのが好きです。" },
      { word: "hang out", wordJp: "遊ぶ・過ごす", pronunciation: "hæŋ aʊt", exampleEn: "I hang out with friends on weekends.", exampleJp: "週末は友達と過ごします。" },
      { word: "errands", wordJp: "用事", pronunciation: "ˈerəndz", exampleEn: "I have some errands to run.", exampleJp: "いくつか用事があります。" },
      { word: "catch up", wordJp: "追いつく・話す", pronunciation: "kætʃ ʌp", exampleEn: "Let's catch up over coffee.", exampleJp: "コーヒーでも飲みながら話しましょう。" },
      { word: "recharge", wordJp: "充電する・回復する", pronunciation: "riːˈtʃɑːrdʒ", exampleEn: "I need to recharge on weekends.", exampleJp: "週末は回復が必要です。" },
    ],
    grammarTip: {
      ruleEn: "Use 'going to + verb' for weekend plans you've already decided.",
      ruleJp: "すでに決めた週末の予定には going to + 動詞 を使います。",
      examples: [
        { en: "I'm going to sleep in tomorrow.", jp: "明日は寝坊するつもりです。" },
        { en: "We're going to hang out at the park.", jp: "公園で過ごすつもりです。" },
        { en: "She's going to run some errands.", jp: "彼女はいくつか用事を済ませるつもりです。" },
      ],
    },
    context: "Kenji and Sarah discuss their weekend plans.",
    contextJp: "ケンジとサラが週末の予定について話しています。",
    dialogue: [
      { speaker: "Kenji", lineEn: "Any plans for the weekend?", lineJp: "週末の予定はありますか？" },
      { speaker: "Sarah", lineEn: "I'm going to sleep in on Saturday. I need to recharge!", lineJp: "土曜日は寝坊するつもりです。回復が必要です！" },
      { speaker: "Kenji", lineEn: "Sounds nice. I have some errands to run in the morning.", lineJp: "いいですね。午前中にいくつか用事があります。" },
      { speaker: "Sarah", lineEn: "How about Sunday? Want to hang out?", lineJp: "日曜日はどうですか？遊びませんか？" },
      { speaker: "Kenji", lineEn: "Sure! Let's catch up over lunch.", lineJp: "もちろん！ランチしながら話しましょう。" },
      { speaker: "Sarah", lineEn: "Great! I know a nice place near the station.", lineJp: "いいですね！駅の近くにいい所を知っています。" },
    ],
    flashcards: [
      { front: "I like to sleep in on Saturdays.", back: "土曜日は寝坊するのが好きです。", type: "en-to-jp" },
      { front: "いくつか用事があります。", back: "I have some errands to run.", type: "jp-to-en" },
      { front: "Let's catch up over coffee.", back: "コーヒーでも飲みながら話しましょう。", type: "en-to-jp" },
      { front: "週末は回復が必要です。", back: "I need to recharge on weekends.", type: "jp-to-en" },
    ],
    translate: [
      { sentenceJp: "週末の予定はありますか？", correct: "Any plans for the weekend?", wrong: ["Do you work on weekends?", "Is it the weekend yet?"] },
      { sentenceJp: "土曜日は寝坊するつもりです。", correct: "I'm going to sleep in on Saturday.", wrong: ["I slept well last Saturday.", "I wake up early on Saturday."] },
      { sentenceJp: "ランチしながら話しましょう。", correct: "Let's catch up over lunch.", wrong: ["Let's skip lunch today.", "I had lunch already."] },
    ],
    fillBlank: [
      { sentence: "I like to ___ in on Saturdays.", blank: "sleep", options: ["sleep", "work", "run", "eat"] },
      { sentence: "I have some ___ to run.", blank: "errands", options: ["errands", "alarms", "dinners", "commutes"] },
      { sentence: "Let's ___ up over coffee.", blank: "catch", options: ["catch", "give", "throw", "wake"] },
      { sentence: "I need to ___ on weekends.", blank: "recharge", options: ["recharge", "commute", "rush", "scroll"] },
    ],
  },
  {
    lessonKey: "l3-c1-04",
    lessonNumber: 4,
    title: "Review",
    titleJp: "復習",
    goal: "I can use vocabulary from Lessons 1–3.",
    goalJp: "レッスン1〜3の語彙を使える。",
    lessonType: "REVIEW" as const,
    vocabulary: [
      { word: "routine", wordJp: "日課", pronunciation: "ruːˈtiːn", exampleEn: "What's your daily routine?", exampleJp: "毎日の日課は何ですか？" },
      { word: "unwind", wordJp: "くつろぐ", pronunciation: "ʌnˈwaɪnd", exampleEn: "How do you unwind?", exampleJp: "どうやってくつろぎますか？" },
      { word: "catch up", wordJp: "追いつく・話す", pronunciation: "kætʃ ʌp", exampleEn: "We should catch up soon.", exampleJp: "近いうちに話しましょう。" },
      { word: "exhausted", wordJp: "疲れ果てた", pronunciation: "ɪɡˈzɔːstɪd", exampleEn: "Are you exhausted?", exampleJp: "疲れ果てていますか？" },
      { word: "errands", wordJp: "用事", pronunciation: "ˈerəndz", exampleEn: "I ran all my errands yesterday.", exampleJp: "昨日すべての用事を済ませました。" },
    ],
    grammarTip: {
      ruleEn: "Review: frequency adverbs (always, usually, never) + 'like to / enjoy' + 'going to'",
      ruleJp: "復習：頻度の副詞（always, usually, never）＋ like to / enjoy ＋ going to",
      examples: [
        { en: "I usually unwind by reading.", jp: "たいてい読書でくつろぎます。" },
        { en: "She never sleeps in on weekdays.", jp: "彼女は平日は寝坊しません。" },
        { en: "We're going to catch up tomorrow.", jp: "明日話す予定です。" },
      ],
    },
    context: "A review dialogue combining morning, evening, and weekend topics.",
    contextJp: "朝、夜、週末のトピックを組み合わせた復習ダイアログ。",
    dialogue: [
      { speaker: "Aiko", lineEn: "I'm always rushing in the morning. How about you?", lineJp: "朝はいつも急いでいます。あなたは？" },
      { speaker: "Ben", lineEn: "Me too! I never have time for breakfast.", lineJp: "私もです！朝食の時間がありません。" },
      { speaker: "Aiko", lineEn: "What do you do to unwind after work?", lineJp: "仕事の後は何をしてくつろぎますか？" },
      { speaker: "Ben", lineEn: "I enjoy binge-watching shows. I'm usually exhausted.", lineJp: "ドラマを一気見するのを楽しみます。たいてい疲れ果てています。" },
      { speaker: "Aiko", lineEn: "Are you going to sleep in this weekend?", lineJp: "今週末は寝坊するつもりですか？" },
      { speaker: "Ben", lineEn: "Yes! And I have some errands to run on Sunday.", lineJp: "はい！日曜日にいくつか用事があります。" },
    ],
    flashcards: [
      { front: "朝はいつも急いでいます。", back: "I'm always rushing in the morning.", type: "jp-to-en" },
      { front: "I enjoy binge-watching shows.", back: "ドラマを一気見するのを楽しみます。", type: "en-to-jp" },
      { front: "今週末は寝坊するつもりですか？", back: "Are you going to sleep in this weekend?", type: "jp-to-en" },
      { front: "How do you unwind?", back: "どうやってくつろぎますか？", type: "en-to-jp" },
    ],
    translate: [
      { sentenceJp: "朝食の時間がありません。", correct: "I never have time for breakfast.", wrong: ["I always eat breakfast.", "I like breakfast."] },
      { sentenceJp: "たいてい疲れ果てています。", correct: "I'm usually exhausted.", wrong: ["I'm never tired.", "I'm always excited."] },
      { sentenceJp: "日曜日にいくつか用事があります。", correct: "I have some errands to run on Sunday.", wrong: ["I work every Sunday.", "Sunday is my favorite day."] },
    ],
    fillBlank: [
      { sentence: "I'm always ___ in the morning.", blank: "rushing", options: ["rushing", "sleeping", "cooking", "reading"] },
      { sentence: "I enjoy ___-watching shows.", blank: "binge", options: ["binge", "bird", "back", "base"] },
      { sentence: "What do you do to ___ after work?", blank: "unwind", options: ["unwind", "commute", "alarm", "grab"] },
      { sentence: "I have some ___ to run on Sunday.", blank: "errands", options: ["errands", "routines", "leftovers", "alarms"] },
    ],
  },
]

export const seedLessons = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Check if lessons already exist
    const existing = await ctx.db
      .query("lessons")
      .withIndex("by_lessonKey", (q) => q.eq("lessonKey", "l3-c1-01"))
      .first()

    if (existing) {
      console.log("Lessons already seeded, skipping.")
      return
    }

    for (const lesson of lessonsData) {
      await ctx.db.insert("lessons", {
        ...lesson,
        level: CHAPTER.level,
        chapter: CHAPTER.chapter,
        chapterTitle: CHAPTER.title,
        chapterTitleJp: CHAPTER.titleJp,
      })
    }

    console.log(`Seeded ${lessonsData.length} lessons.`)
  },
})
