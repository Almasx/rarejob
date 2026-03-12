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
    goal: "I can listen to and understand someone's morning routine.",
    goalJp: "朝の日課を聞いて理解できるようになる。",
    lessonType: "LISTENING" as const,
    vocabulary: [
      { word: "wake up", wordJp: "起きる", pronunciation: "weɪk ʌp", exampleEn: "I wake up at 7 a.m.", exampleJp: "私は午前7時に起きます。" },
      { word: "do my hair", wordJp: "髪を整える", pronunciation: "duː maɪ hɛr", exampleEn: "She does her hair every morning.", exampleJp: "彼女は毎朝髪を整えます。" },
      { word: "eat breakfast", wordJp: "朝ごはんを食べる", pronunciation: "iːt ˈbrɛkfəst", exampleEn: "We don't eat breakfast at home.", exampleJp: "私たちは家で朝ごはんを食べません。" },
      { word: "brush my teeth", wordJp: "歯を磨く", pronunciation: "brʌʃ maɪ tiːθ", exampleEn: "He brushes his teeth after breakfast.", exampleJp: "彼は朝食の後に歯を磨きます。" },
      { word: "take a shower", wordJp: "シャワーを浴びる", pronunciation: "teɪk ə ˈʃaʊər", exampleEn: "I take a shower in the morning.", exampleJp: "私は朝シャワーを浴びます。" },
      { word: "get dressed", wordJp: "服を着る", pronunciation: "ɡɛt drɛst", exampleEn: "I get dressed before breakfast.", exampleJp: "私は朝食の前に服を着ます。" },
    ],
    grammarTip: {
      ruleEn: "Use simple present tense to talk about facts or routine. With I/you/we/they use the base form. With he/she/it add -s or -es. For negatives, use don't or doesn't.",
      ruleJp: "現在形を使って事実や日課について話すことができます。I/you/we/theyには動詞の原形を、he/she/itには-sまたは-esをつけます。否定文にはdon'tまたはdoesn'tを使います。",
      examples: [
        { en: "I wake up at 7 a.m.", jp: "私は午前7時に起きます。" },
        { en: "She washes the dishes.", jp: "彼女は皿を洗います。" },
        { en: "He doesn't wake up at 7 a.m.", jp: "彼は午前7時に起きません。" },
      ],
    },
    context: "Saori and Catherine are visiting Catherine's family in Taiwan.",
    contextJp: "サオリとキャサリンは台湾にいるキャサリンの家族を訪ねています。",
    dialogue: [
      { speaker: "Catherine", lineEn: "My dad wakes up at 6 a.m. every day.", lineJp: "お父さんは毎日午前6時に起きます。" },
      { speaker: "Saori", lineEn: "That's early! Does he eat breakfast at home?", lineJp: "早いですね！家で朝ごはんを食べますか？" },
      { speaker: "Catherine", lineEn: "No, we don't eat breakfast at home. We buy breakfast at a food stand.", lineJp: "いいえ、家では朝ごはんを食べません。屋台で朝ごはんを買います。" },
      { speaker: "Saori", lineEn: "Really? What does your mom do in the morning?", lineJp: "本当ですか？お母さんは朝何をしますか？" },
      { speaker: "Catherine", lineEn: "She does her hair and brushes her teeth. Then we go out together.", lineJp: "髪を整えて歯を磨きます。それから一緒に出かけます。" },
      { speaker: "Saori", lineEn: "I take a shower and get dressed first. Then I eat breakfast at home.", lineJp: "私はまずシャワーを浴びて服を着ます。それから家で朝ごはんを食べます。" },
    ],
    flashcards: [
      { front: "wake up", back: "起きる", type: "en-to-jp" },
      { front: "朝ごはんを食べる", back: "eat breakfast", type: "jp-to-en" },
      { front: "brush my teeth", back: "歯を磨く", type: "en-to-jp" },
      { front: "服を着る", back: "get dressed", type: "jp-to-en" },
      { front: "do my hair", back: "髪を整える", type: "en-to-jp" },
      { front: "シャワーを浴びる", back: "take a shower", type: "jp-to-en" },
    ],
    translate: [
      { sentenceJp: "彼は朝ごはんを食べません。", correct: "He doesn't eat breakfast.", wrong: ["He don't eat breakfast.", "He isn't eat breakfast."] },
      { sentenceJp: "彼女は毎朝髪を整えます。", correct: "She does her hair every morning.", wrong: ["She does she hair every morning.", "She do her hair every morning."] },
      { sentenceJp: "私は朝食の前に服を着ます。", correct: "I get dressed before breakfast.", wrong: ["I gets dressed before breakfast.", "I doesn't get dressed before breakfast."] },
    ],
    fillBlank: [
      { sentence: "He ___ eat breakfast.", blank: "doesn't", options: ["doesn't", "don't", "isn't", "aren't"] },
      { sentence: "She does ___ hair for an hour.", blank: "her", options: ["her", "she", "his", "my"] },
      { sentence: "I ___ dressed before breakfast.", blank: "get", options: ["get", "gets", "getting", "got"] },
      { sentence: "They ___ drink tea for breakfast.", blank: "don't", options: ["don't", "doesn't", "isn't", "aren't"] },
    ],
  },
  {
    lessonKey: "l3-c1-02",
    lessonNumber: 2,
    title: "Shopping",
    titleJp: "買い物",
    goal: "I can listen to and understand someone talking about shopping.",
    goalJp: "買い物について話しているのを聞いて理解できるようになる。",
    lessonType: "LISTENING" as const,
    vocabulary: [
      { word: "sell", wordJp: "売る", pronunciation: "sɛl", exampleEn: "She sells handmade bags.", exampleJp: "彼女は手作りのバッグを売っています。" },
      { word: "buy", wordJp: "買う", pronunciation: "baɪ", exampleEn: "I buy vegetables at the market.", exampleJp: "市場で野菜を買います。" },
      { word: "handmade", wordJp: "手作りの", pronunciation: "ˌhændˈmeɪd", exampleEn: "These cookies are handmade.", exampleJp: "このクッキーは手作りです。" },
      { word: "price", wordJp: "値段", pronunciation: "praɪs", exampleEn: "What's the price of this bag?", exampleJp: "このバッグの値段はいくらですか？" },
      { word: "cheap", wordJp: "安い", pronunciation: "tʃiːp", exampleEn: "The food here is cheap.", exampleJp: "ここの食べ物は安いです。" },
      { word: "store", wordJp: "店", pronunciation: "stɔːr", exampleEn: "She has a small store.", exampleJp: "彼女は小さなお店を持っています。" },
    ],
    grammarTip: {
      ruleEn: "Use the simple present tense with he, she, it. Add -s or -es to the verb.",
      ruleJp: "he、she、itが主語のとき、動詞に-sまたは-esをつけます。",
      examples: [
        { en: "She sells bags at the market.", jp: "彼女は市場でバッグを売っています。" },
        { en: "He buys coffee every morning.", jp: "彼は毎朝コーヒーを買います。" },
        { en: "It costs 500 yen.", jp: "500円します。" },
      ],
    },
    context: "Saori visits a street market in Taiwan. She talks to a shopkeeper.",
    contextJp: "サオリは台湾のストリートマーケットを訪れます。店主と話をします。",
    dialogue: [
      { speaker: "Saori", lineEn: "These bags are beautiful! Are they handmade?", lineJp: "このバッグはきれいですね！手作りですか？" },
      { speaker: "Shopkeeper", lineEn: "Yes! My sister makes them. She sells them here every weekend.", lineJp: "はい！姉が作っています。毎週末ここで売っています。" },
      { speaker: "Saori", lineEn: "What's the price of this one?", lineJp: "これの値段はいくらですか？" },
      { speaker: "Shopkeeper", lineEn: "It's 300 dollars. It's very cheap!", lineJp: "300ドルです。とても安いですよ！" },
      { speaker: "Saori", lineEn: "I buy a lot when things are cheap. I'll take two!", lineJp: "安いとたくさん買ってしまいます。2つください！" },
      { speaker: "Shopkeeper", lineEn: "Thank you! My store is open every day.", lineJp: "ありがとうございます！お店は毎日開いています。" },
    ],
    flashcards: [
      { front: "She sells handmade bags.", back: "彼女は手作りのバッグを売っています。", type: "en-to-jp" },
      { front: "市場で野菜を買います。", back: "I buy vegetables at the market.", type: "jp-to-en" },
      { front: "What's the price?", back: "値段はいくらですか？", type: "en-to-jp" },
      { front: "ここの食べ物は安いです。", back: "The food here is cheap.", type: "jp-to-en" },
    ],
    translate: [
      { sentenceJp: "彼女は毎週末バッグを売っています。", correct: "She sells bags every weekend.", wrong: ["She sell bags every weekend.", "She selling bags every weekend."] },
      { sentenceJp: "これの値段はいくらですか？", correct: "What's the price of this one?", wrong: ["How much this one?", "What this price?"] },
      { sentenceJp: "彼は毎朝コーヒーを買います。", correct: "He buys coffee every morning.", wrong: ["He buy coffee every morning.", "He buying coffee every morning."] },
    ],
    fillBlank: [
      { sentence: "She ___ handmade bags at the market.", blank: "sells", options: ["sells", "sell", "selling", "sold"] },
      { sentence: "What's the ___ of this bag?", blank: "price", options: ["price", "money", "cost", "buy"] },
      { sentence: "These cookies are ___.", blank: "handmade", options: ["handmade", "handle", "handy", "handful"] },
      { sentence: "The food here is very ___.", blank: "cheap", options: ["cheap", "expensive", "price", "free"] },
    ],
  },
  {
    lessonKey: "l3-c1-03",
    lessonNumber: 3,
    title: "Opening Conversations",
    titleJp: "会話のきっかけ",
    goal: "I can start a conversation with someone I just met.",
    goalJp: "初めて会った人と会話を始めることができるようになる。",
    lessonType: "SPEAKING" as const,
    vocabulary: [
      { word: "introduce", wordJp: "紹介する", pronunciation: "ˌɪntrəˈdjuːs", exampleEn: "Let me introduce myself.", exampleJp: "自己紹介させてください。" },
      { word: "hometown", wordJp: "出身地", pronunciation: "ˈhoʊmˌtaʊn", exampleEn: "My hometown is Osaka.", exampleJp: "私の出身地は大阪です。" },
      { word: "occupation", wordJp: "職業", pronunciation: "ˌɒkjʊˈpeɪʃən", exampleEn: "What's your occupation?", exampleJp: "ご職業は何ですか？" },
      { word: "hobby", wordJp: "趣味", pronunciation: "ˈhɒbi", exampleEn: "My hobby is reading.", exampleJp: "私の趣味は読書です。" },
      { word: "pleasure", wordJp: "喜び", pronunciation: "ˈplɛʒər", exampleEn: "Nice to meet you. The pleasure is mine.", exampleJp: "はじめまして。こちらこそ。" },
      { word: "company", wordJp: "会社", pronunciation: "ˈkʌmpəni", exampleEn: "I work at a large company.", exampleJp: "大きな会社で働いています。" },
    ],
    grammarTip: {
      ruleEn: "Use 'What do you do?' to ask about someone's job. Use 'Where are you from?' to ask about their hometown.",
      ruleJp: "職業を聞くときは 'What do you do?' を、出身地を聞くときは 'Where are you from?' を使います。",
      examples: [
        { en: "What do you do?", jp: "お仕事は何ですか？" },
        { en: "Where are you from?", jp: "ご出身はどちらですか？" },
        { en: "What are your hobbies?", jp: "趣味は何ですか？" },
      ],
    },
    context: "Saori meets Catherine's friend David at a party in Taiwan.",
    contextJp: "サオリは台湾のパーティーでキャサリンの友人デイビッドに会います。",
    dialogue: [
      { speaker: "Saori", lineEn: "Hi! I'm Saori. Nice to meet you.", lineJp: "こんにちは！サオリです。はじめまして。" },
      { speaker: "David", lineEn: "Nice to meet you too! I'm David. Where are you from?", lineJp: "こちらこそ！デイビッドです。ご出身はどちらですか？" },
      { speaker: "Saori", lineEn: "I'm from Tokyo. What about you?", lineJp: "東京出身です。あなたは？" },
      { speaker: "David", lineEn: "My hometown is Taipei. What do you do?", lineJp: "出身は台北です。お仕事は何ですか？" },
      { speaker: "Saori", lineEn: "I work at a design company. How about you?", lineJp: "デザイン会社で働いています。あなたは？" },
      { speaker: "David", lineEn: "I'm a teacher. My hobby is cooking. Do you have any hobbies?", lineJp: "教師です。趣味は料理です。趣味はありますか？" },
    ],
    flashcards: [
      { front: "Nice to meet you.", back: "はじめまして。", type: "en-to-jp" },
      { front: "ご出身はどちらですか？", back: "Where are you from?", type: "jp-to-en" },
      { front: "What do you do?", back: "お仕事は何ですか？", type: "en-to-jp" },
      { front: "私の趣味は読書です。", back: "My hobby is reading.", type: "jp-to-en" },
    ],
    translate: [
      { sentenceJp: "ご出身はどちらですか？", correct: "Where are you from?", wrong: ["Where do you live?", "Where do you work?"] },
      { sentenceJp: "お仕事は何ですか？", correct: "What do you do?", wrong: ["What are you doing?", "What do you like?"] },
      { sentenceJp: "趣味はありますか？", correct: "Do you have any hobbies?", wrong: ["Are you hobby?", "What is hobby?"] },
    ],
    fillBlank: [
      { sentence: "Let me ___ myself. I'm Saori.", blank: "introduce", options: ["introduce", "produce", "reduce", "include"] },
      { sentence: "My ___ is Osaka.", blank: "hometown", options: ["hometown", "house", "homework", "home"] },
      { sentence: "___ are you from?", blank: "Where", options: ["Where", "What", "When", "Who"] },
      { sentence: "I work at a large ___.", blank: "company", options: ["company", "country", "hobby", "family"] },
    ],
  },
  {
    lessonKey: "l3-c1-04",
    lessonNumber: 4,
    title: "Hobbies",
    titleJp: "趣味",
    goal: "I can talk about my hobbies and how often I do them.",
    goalJp: "自分の趣味やその頻度について話せるようになる。",
    lessonType: "SPEAKING" as const,
    vocabulary: [
      { word: "collect", wordJp: "集める", pronunciation: "kəˈlɛkt", exampleEn: "I collect old coins.", exampleJp: "古いコインを集めています。" },
      { word: "practice", wordJp: "練習する", pronunciation: "ˈpræktɪs", exampleEn: "She practices yoga twice a week.", exampleJp: "彼女は週に2回ヨガを練習します。" },
      { word: "creative", wordJp: "創造的な", pronunciation: "kriˈeɪtɪv", exampleEn: "He's very creative.", exampleJp: "彼はとても創造的です。" },
      { word: "once", wordJp: "1回", pronunciation: "wʌns", exampleEn: "I go swimming once a week.", exampleJp: "週に1回泳ぎに行きます。" },
      { word: "twice", wordJp: "2回", pronunciation: "twaɪs", exampleEn: "She plays tennis twice a week.", exampleJp: "彼女は週に2回テニスをします。" },
      { word: "per", wordJp: "〜につき", pronunciation: "pɜːr", exampleEn: "He makes three bottles per week.", exampleJp: "彼は週に3本ボトルを作ります。" },
    ],
    grammarTip: {
      ruleEn: "Use 'How often...?' to ask about frequency. Answer with once, twice, three times + a day/week/month.",
      ruleJp: "頻度を聞くときは 'How often...?' を使います。once, twice, three times + a day/week/month で答えます。",
      examples: [
        { en: "How often do you practice?", jp: "どのくらいの頻度で練習しますか？" },
        { en: "I practice twice a week.", jp: "週に2回練習します。" },
        { en: "He goes swimming once a month.", jp: "彼は月に1回泳ぎに行きます。" },
      ],
    },
    context: "David tells Saori about his hobbies.",
    contextJp: "デイビッドがサオリに趣味について話しています。",
    dialogue: [
      { speaker: "Saori", lineEn: "What do you do in your free time?", lineJp: "暇なとき何をしますか？" },
      { speaker: "David", lineEn: "I make pottery. I'm very creative!", lineJp: "陶芸をしています。とても創造的なんです！" },
      { speaker: "Saori", lineEn: "How often do you practice?", lineJp: "どのくらいの頻度で練習しますか？" },
      { speaker: "David", lineEn: "Three times a week. I make about three bottles per week.", lineJp: "週に3回です。週に3本くらいボトルを作ります。" },
      { speaker: "Saori", lineEn: "That's amazing! I collect old stamps. It's my hobby.", lineJp: "すごいですね！私は古い切手を集めています。それが趣味です。" },
      { speaker: "David", lineEn: "How often do you go to stamp shops?", lineJp: "どのくらいの頻度で切手屋さんに行きますか？" },
    ],
    flashcards: [
      { front: "How often do you practice?", back: "どのくらいの頻度で練習しますか？", type: "en-to-jp" },
      { front: "古いコインを集めています。", back: "I collect old coins.", type: "jp-to-en" },
      { front: "I go swimming once a week.", back: "週に1回泳ぎに行きます。", type: "en-to-jp" },
      { front: "彼女は週に2回テニスをします。", back: "She plays tennis twice a week.", type: "jp-to-en" },
    ],
    translate: [
      { sentenceJp: "どのくらいの頻度で練習しますか？", correct: "How often do you practice?", wrong: ["How long do you practice?", "When do you practice?"] },
      { sentenceJp: "週に2回ヨガを練習しています。", correct: "I practice yoga twice a week.", wrong: ["I practice yoga two weeks.", "I yoga twice a week."] },
      { sentenceJp: "彼は月に1回泳ぎに行きます。", correct: "He goes swimming once a month.", wrong: ["He goes swimming one month.", "He swims every month."] },
    ],
    fillBlank: [
      { sentence: "How ___ do you practice?", blank: "often", options: ["often", "long", "many", "much"] },
      { sentence: "I go swimming ___ a week.", blank: "once", options: ["once", "one", "first", "only"] },
      { sentence: "She plays tennis ___ a week.", blank: "twice", options: ["twice", "two", "second", "double"] },
      { sentence: "He makes three bottles ___ week.", blank: "per", options: ["per", "for", "by", "at"] },
    ],
  },
  {
    lessonKey: "l3-c1-05",
    lessonNumber: 5,
    title: "Review",
    titleJp: "復習",
    goal: "I can use vocabulary and grammar from Lessons 1–4.",
    goalJp: "レッスン1〜4の語彙と文法を使える。",
    lessonType: "REVIEW" as const,
    vocabulary: [
      { word: "wake up", wordJp: "起きる", pronunciation: "weɪk ʌp", exampleEn: "What time do you wake up?", exampleJp: "何時に起きますか？" },
      { word: "sell", wordJp: "売る", pronunciation: "sɛl", exampleEn: "She sells bags at the market.", exampleJp: "彼女は市場でバッグを売っています。" },
      { word: "introduce", wordJp: "紹介する", pronunciation: "ˌɪntrəˈdjuːs", exampleEn: "Let me introduce my friend.", exampleJp: "友達を紹介させてください。" },
      { word: "practice", wordJp: "練習する", pronunciation: "ˈpræktɪs", exampleEn: "I practice every day.", exampleJp: "毎日練習しています。" },
      { word: "hometown", wordJp: "出身地", pronunciation: "ˈhoʊmˌtaʊn", exampleEn: "Where is your hometown?", exampleJp: "ご出身はどちらですか？" },
    ],
    grammarTip: {
      ruleEn: "Review: simple present tense (-s/-es, don't/doesn't), Wh- questions, frequency expressions (once/twice/three times a week)",
      ruleJp: "復習：現在形（-s/-es、don't/doesn't）、Wh-疑問文、頻度の表現（once/twice/three times a week）",
      examples: [
        { en: "She doesn't eat breakfast at home.", jp: "彼女は家で朝ごはんを食べません。" },
        { en: "Where are you from?", jp: "ご出身はどちらですか？" },
        { en: "I practice yoga twice a week.", jp: "週に2回ヨガを練習しています。" },
      ],
    },
    context: "Saori writes an email to her friend about her trip to Taiwan.",
    contextJp: "サオリは友達に台湾旅行についてのメールを書いています。",
    dialogue: [
      { speaker: "Saori", lineEn: "I'm in Taiwan! Catherine's family doesn't eat breakfast at home.", lineJp: "台湾にいます！キャサリンの家族は家で朝ごはんを食べません。" },
      { speaker: "Friend", lineEn: "Really? Where do they eat?", lineJp: "本当ですか？どこで食べるのですか？" },
      { speaker: "Saori", lineEn: "They buy breakfast at a food stand. It's very cheap!", lineJp: "屋台で朝ごはんを買います。とても安いです！" },
      { speaker: "Friend", lineEn: "What else do you do there?", lineJp: "他に何をしていますか？" },
      { speaker: "Saori", lineEn: "I met David. He makes pottery three times a week. He's very creative!", lineJp: "デイビッドに会いました。彼は週に3回陶芸をしています。とても創造的です！" },
      { speaker: "Friend", lineEn: "That sounds fun! How often do you go shopping?", lineJp: "楽しそうですね！どのくらいの頻度で買い物に行きますか？" },
    ],
    flashcards: [
      { front: "彼女は家で朝ごはんを食べません。", back: "She doesn't eat breakfast at home.", type: "jp-to-en" },
      { front: "She sells handmade bags.", back: "彼女は手作りのバッグを売っています。", type: "en-to-jp" },
      { front: "ご出身はどちらですか？", back: "Where are you from?", type: "jp-to-en" },
      { front: "I practice three times a week.", back: "週に3回練習しています。", type: "en-to-jp" },
    ],
    translate: [
      { sentenceJp: "彼は家で朝ごはんを食べません。", correct: "He doesn't eat breakfast at home.", wrong: ["He don't eat breakfast at home.", "He isn't eat breakfast at home."] },
      { sentenceJp: "どのくらいの頻度で買い物に行きますか？", correct: "How often do you go shopping?", wrong: ["How long do you go shopping?", "How many shopping do you?"] },
      { sentenceJp: "彼女は毎週末バッグを売っています。", correct: "She sells bags every weekend.", wrong: ["She sell bags every weekend.", "She is sell bags every weekend."] },
    ],
    fillBlank: [
      { sentence: "He ___ eat breakfast at home.", blank: "doesn't", options: ["doesn't", "don't", "isn't", "not"] },
      { sentence: "How ___ do you go shopping?", blank: "often", options: ["often", "long", "many", "much"] },
      { sentence: "She ___ handmade bags.", blank: "sells", options: ["sells", "sell", "selling", "sold"] },
      { sentence: "___ are you from?", blank: "Where", options: ["Where", "What", "How", "Who"] },
    ],
  },
]

export const seedLessons = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Delete existing chapter 1 lessons to reseed with correct content
    const existing = await ctx.db
      .query("lessons")
      .withIndex("by_level_chapter", (q) => q.eq("level", 3).eq("chapter", 1))
      .collect()

    for (const lesson of existing) {
      await ctx.db.delete(lesson._id)
    }

    if (existing.length > 0) {
      console.log(`Deleted ${existing.length} old lessons.`)
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
