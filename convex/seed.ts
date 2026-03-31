import { internalMutation } from "./_generated/server"

// Chapter metadata constants
const CHAPTERS = [
  { level: 3, chapter: 1, title: "Everyday Life", titleJp: "日常生活" },
  { level: 3, chapter: 2, title: "Travel & Getting Around", titleJp: "旅行と移動" },
  { level: 4, chapter: 1, title: "Work Life", titleJp: "仕事と職場" },
  { level: 4, chapter: 2, title: "Social Situations", titleJp: "社交の場面" },
]

// ---------------------------------------------------------------------------
// Level 3 — Chapter 1: Everyday Life  (5 lessons)
// ---------------------------------------------------------------------------
const chapter3_1 = [
  {
    lessonKey: "l3-c1-01",
    lessonNumber: 1,
    title: "Mornings",
    titleJp: "朝の日課",
    goal: "I can listen to and understand someone's morning routine.",
    goalJp: "朝の日課を聞いて理解できるようになる。",
    lessonType: "LISTENING" as const,
    vocabulary: [
      {
        word: "wake up",
        wordJp: "起きる",
        pronunciation: "weɪk ʌp",
        exampleEn: "I wake up at 7 a.m.",
        exampleJp: "私は午前7時に起きます。",
      },
      {
        word: "do my hair",
        wordJp: "髪を整える",
        pronunciation: "duː maɪ hɛr",
        exampleEn: "She does her hair every morning.",
        exampleJp: "彼女は毎朝髪を整えます。",
      },
      {
        word: "eat breakfast",
        wordJp: "朝ごはんを食べる",
        pronunciation: "iːt ˈbrɛkfəst",
        exampleEn: "We don't eat breakfast at home.",
        exampleJp: "私たちは家で朝ごはんを食べません。",
      },
      {
        word: "brush my teeth",
        wordJp: "歯を磨く",
        pronunciation: "brʌʃ maɪ tiːθ",
        exampleEn: "He brushes his teeth after breakfast.",
        exampleJp: "彼は朝食の後に歯を磨きます。",
      },
      {
        word: "take a shower",
        wordJp: "シャワーを浴びる",
        pronunciation: "teɪk ə ˈʃaʊər",
        exampleEn: "I take a shower in the morning.",
        exampleJp: "私は朝シャワーを浴びます。",
      },
      {
        word: "get dressed",
        wordJp: "服を着る",
        pronunciation: "ɡɛt drɛst",
        exampleEn: "I get dressed before breakfast.",
        exampleJp: "私は朝食の前に服を着ます。",
      },
    ],
    grammarTip: {
      ruleEn: "Use simple present tense to talk about facts or routine. With I/you/we/they use the base form. With he/she/it add -s or -es. For negatives, use don't or doesn't.",
      ruleJp: "現在形を使って事実や日課について話すことができます。I/you/we/theyには動詞の原形を、he/she/itには-sまたは-esをつけます。否定文にはdon'tまたはdoesn'tを使います。",
      examples: [
        {
          en: "I wake up at 7 a.m.",
          jp: "私は午前7時に起きます。",
        },
        {
          en: "She washes the dishes.",
          jp: "彼女は皿を洗います。",
        },
        {
          en: "He doesn't wake up at 7 a.m.",
          jp: "彼は午前7時に起きません。",
        },
      ],
    },
    context: "Saori and Catherine are visiting Catherine's family in Taiwan.",
    contextJp: "サオリとキャサリンは台湾にいるキャサリンの家族を訪ねています。",
    dialogue: [
      {
        speaker: "Catherine",
        lineEn: "My dad wakes up at 6 a.m. every day.",
        lineJp: "お父さんは毎日午前6時に起きます。",
      },
      {
        speaker: "Saori",
        lineEn: "That's early! Does he eat breakfast at home?",
        lineJp: "早いですね！家で朝ごはんを食べますか？",
      },
      {
        speaker: "Catherine",
        lineEn: "No, we don't eat breakfast at home. We buy breakfast at a food stand.",
        lineJp: "いいえ、家では朝ごはんを食べません。屋台で朝ごはんを買います。",
      },
      {
        speaker: "Saori",
        lineEn: "Really? What does your mom do in the morning?",
        lineJp: "本当ですか？お母さんは朝何をしますか？",
      },
      {
        speaker: "Catherine",
        lineEn: "She does her hair and brushes her teeth. Then we go out together.",
        lineJp: "髪を整えて歯を磨きます。それから一緒に出かけます。",
      },
      {
        speaker: "Saori",
        lineEn: "I take a shower and get dressed first. Then I eat breakfast at home.",
        lineJp: "私はまずシャワーを浴びて服を着ます。それから家で朝ごはんを食べます。",
      },
    ],
    flashcards: [
      {
        front: "wake up",
        back: "起きる",
        type: "en-to-jp",
      },
      {
        front: "朝ごはんを食べる",
        back: "eat breakfast",
        type: "jp-to-en",
      },
      {
        front: "brush my teeth",
        back: "歯を磨く",
        type: "en-to-jp",
      },
      {
        front: "服を着る",
        back: "get dressed",
        type: "jp-to-en",
      },
      {
        front: "do my hair",
        back: "髪を整える",
        type: "en-to-jp",
      },
      {
        front: "シャワーを浴びる",
        back: "take a shower",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "彼は朝ごはんを食べません。",
        correct: "He doesn't eat breakfast.",
        wrong: [
          "He don't eat breakfast.",
          "He isn't eat breakfast.",
        ],
      },
      {
        sentenceJp: "彼女は毎朝髪を整えます。",
        correct: "She does her hair every morning.",
        wrong: [
          "She does she hair every morning.",
          "She do her hair every morning.",
        ],
      },
      {
        sentenceJp: "私は朝食の前に服を着ます。",
        correct: "I get dressed before breakfast.",
        wrong: [
          "I gets dressed before breakfast.",
          "I doesn't get dressed before breakfast.",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "He ___ eat breakfast.",
        blank: "doesn't",
        options: [
          "doesn't",
          "don't",
          "isn't",
          "aren't",
        ],
      },
      {
        sentence: "She does ___ hair for an hour.",
        blank: "her",
        options: [
          "her",
          "she",
          "his",
          "my",
        ],
      },
      {
        sentence: "I ___ dressed before breakfast.",
        blank: "get",
        options: [
          "get",
          "gets",
          "getting",
          "got",
        ],
      },
      {
        sentence: "They ___ drink tea for breakfast.",
        blank: "don't",
        options: [
          "don't",
          "doesn't",
          "isn't",
          "aren't",
        ],
      },
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
      {
        word: "sell",
        wordJp: "売る",
        pronunciation: "sɛl",
        exampleEn: "She sells handmade bags.",
        exampleJp: "彼女は手作りのバッグを売っています。",
      },
      {
        word: "buy",
        wordJp: "買う",
        pronunciation: "baɪ",
        exampleEn: "I buy vegetables at the market.",
        exampleJp: "市場で野菜を買います。",
      },
      {
        word: "handmade",
        wordJp: "手作りの",
        pronunciation: "ˌhændˈmeɪd",
        exampleEn: "These cookies are handmade.",
        exampleJp: "このクッキーは手作りです。",
      },
      {
        word: "price",
        wordJp: "値段",
        pronunciation: "praɪs",
        exampleEn: "What's the price of this bag?",
        exampleJp: "このバッグの値段はいくらですか？",
      },
      {
        word: "cheap",
        wordJp: "安い",
        pronunciation: "tʃiːp",
        exampleEn: "The food here is cheap.",
        exampleJp: "ここの食べ物は安いです。",
      },
      {
        word: "store",
        wordJp: "店",
        pronunciation: "stɔːr",
        exampleEn: "She has a small store.",
        exampleJp: "彼女は小さなお店を持っています。",
      },
    ],
    grammarTip: {
      ruleEn: "Use the simple present tense with he, she, it. Add -s or -es to the verb.",
      ruleJp: "he、she、itが主語のとき、動詞に-sまたは-esをつけます。",
      examples: [
        {
          en: "She sells bags at the market.",
          jp: "彼女は市場でバッグを売っています。",
        },
        {
          en: "He buys coffee every morning.",
          jp: "彼は毎朝コーヒーを買います。",
        },
        {
          en: "It costs 500 yen.",
          jp: "500円します。",
        },
      ],
    },
    context: "Saori visits a street market in Taiwan. She talks to a shopkeeper.",
    contextJp: "サオリは台湾のストリートマーケットを訪れます。店主と話をします。",
    dialogue: [
      {
        speaker: "Saori",
        lineEn: "These bags are beautiful! Are they handmade?",
        lineJp: "このバッグはきれいですね！手作りですか？",
      },
      {
        speaker: "Shopkeeper",
        lineEn: "Yes! My sister makes them. She sells them here every weekend.",
        lineJp: "はい！姉が作っています。毎週末ここで売っています。",
      },
      {
        speaker: "Saori",
        lineEn: "What's the price of this one?",
        lineJp: "これの値段はいくらですか？",
      },
      {
        speaker: "Shopkeeper",
        lineEn: "It's 300 dollars. It's very cheap!",
        lineJp: "300ドルです。とても安いですよ！",
      },
      {
        speaker: "Saori",
        lineEn: "I buy a lot when things are cheap. I'll take two!",
        lineJp: "安いとたくさん買ってしまいます。2つください！",
      },
      {
        speaker: "Shopkeeper",
        lineEn: "Thank you! My store is open every day.",
        lineJp: "ありがとうございます！お店は毎日開いています。",
      },
    ],
    flashcards: [
      {
        front: "She sells handmade bags.",
        back: "彼女は手作りのバッグを売っています。",
        type: "en-to-jp",
      },
      {
        front: "市場で野菜を買います。",
        back: "I buy vegetables at the market.",
        type: "jp-to-en",
      },
      {
        front: "What's the price?",
        back: "値段はいくらですか？",
        type: "en-to-jp",
      },
      {
        front: "ここの食べ物は安いです。",
        back: "The food here is cheap.",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "彼女は毎週末バッグを売っています。",
        correct: "She sells bags every weekend.",
        wrong: [
          "She sell bags every weekend.",
          "She selling bags every weekend.",
        ],
      },
      {
        sentenceJp: "これの値段はいくらですか？",
        correct: "What's the price of this one?",
        wrong: [
          "How much this one?",
          "What this price?",
        ],
      },
      {
        sentenceJp: "彼は毎朝コーヒーを買います。",
        correct: "He buys coffee every morning.",
        wrong: [
          "He buy coffee every morning.",
          "He buying coffee every morning.",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "She ___ handmade bags at the market.",
        blank: "sells",
        options: [
          "sells",
          "sell",
          "selling",
          "sold",
        ],
      },
      {
        sentence: "What's the ___ of this bag?",
        blank: "price",
        options: [
          "price",
          "money",
          "cost",
          "buy",
        ],
      },
      {
        sentence: "These cookies are ___.",
        blank: "handmade",
        options: [
          "handmade",
          "handle",
          "handy",
          "handful",
        ],
      },
      {
        sentence: "The food here is very ___.",
        blank: "cheap",
        options: [
          "cheap",
          "expensive",
          "price",
          "free",
        ],
      },
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
      {
        word: "introduce",
        wordJp: "紹介する",
        pronunciation: "ˌɪntrəˈdjuːs",
        exampleEn: "Let me introduce myself.",
        exampleJp: "自己紹介させてください。",
      },
      {
        word: "hometown",
        wordJp: "出身地",
        pronunciation: "ˈhoʊmˌtaʊn",
        exampleEn: "My hometown is Osaka.",
        exampleJp: "私の出身地は大阪です。",
      },
      {
        word: "occupation",
        wordJp: "職業",
        pronunciation: "ˌɒkjʊˈpeɪʃən",
        exampleEn: "What's your occupation?",
        exampleJp: "ご職業は何ですか？",
      },
      {
        word: "hobby",
        wordJp: "趣味",
        pronunciation: "ˈhɒbi",
        exampleEn: "My hobby is reading.",
        exampleJp: "私の趣味は読書です。",
      },
      {
        word: "pleasure",
        wordJp: "喜び",
        pronunciation: "ˈplɛʒər",
        exampleEn: "Nice to meet you. The pleasure is mine.",
        exampleJp: "はじめまして。こちらこそ。",
      },
      {
        word: "company",
        wordJp: "会社",
        pronunciation: "ˈkʌmpəni",
        exampleEn: "I work at a large company.",
        exampleJp: "大きな会社で働いています。",
      },
    ],
    grammarTip: {
      ruleEn: "Use 'What do you do?' to ask about someone's job. Use 'Where are you from?' to ask about their hometown.",
      ruleJp: "職業を聞くときは 'What do you do?' を、出身地を聞くときは 'Where are you from?' を使います。",
      examples: [
        {
          en: "What do you do?",
          jp: "お仕事は何ですか？",
        },
        {
          en: "Where are you from?",
          jp: "ご出身はどちらですか？",
        },
        {
          en: "What are your hobbies?",
          jp: "趣味は何ですか？",
        },
      ],
    },
    context: "Saori meets Catherine's friend David at a party in Taiwan.",
    contextJp: "サオリは台湾のパーティーでキャサリンの友人デイビッドに会います。",
    dialogue: [
      {
        speaker: "Saori",
        lineEn: "Hi! I'm Saori. Nice to meet you.",
        lineJp: "こんにちは！サオリです。はじめまして。",
      },
      {
        speaker: "David",
        lineEn: "Nice to meet you too! I'm David. Where are you from?",
        lineJp: "こちらこそ！デイビッドです。ご出身はどちらですか？",
      },
      {
        speaker: "Saori",
        lineEn: "I'm from Tokyo. What about you?",
        lineJp: "東京出身です。あなたは？",
      },
      {
        speaker: "David",
        lineEn: "My hometown is Taipei. What do you do?",
        lineJp: "出身は台北です。お仕事は何ですか？",
      },
      {
        speaker: "Saori",
        lineEn: "I work at a design company. How about you?",
        lineJp: "デザイン会社で働いています。あなたは？",
      },
      {
        speaker: "David",
        lineEn: "I'm a teacher. My hobby is cooking. Do you have any hobbies?",
        lineJp: "教師です。趣味は料理です。趣味はありますか？",
      },
    ],
    flashcards: [
      {
        front: "Nice to meet you.",
        back: "はじめまして。",
        type: "en-to-jp",
      },
      {
        front: "ご出身はどちらですか？",
        back: "Where are you from?",
        type: "jp-to-en",
      },
      {
        front: "What do you do?",
        back: "お仕事は何ですか？",
        type: "en-to-jp",
      },
      {
        front: "私の趣味は読書です。",
        back: "My hobby is reading.",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "ご出身はどちらですか？",
        correct: "Where are you from?",
        wrong: [
          "Where do you live?",
          "Where do you work?",
        ],
      },
      {
        sentenceJp: "お仕事は何ですか？",
        correct: "What do you do?",
        wrong: [
          "What are you doing?",
          "What do you like?",
        ],
      },
      {
        sentenceJp: "趣味はありますか？",
        correct: "Do you have any hobbies?",
        wrong: [
          "Are you hobby?",
          "What is hobby?",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "Let me ___ myself. I'm Saori.",
        blank: "introduce",
        options: [
          "introduce",
          "produce",
          "reduce",
          "include",
        ],
      },
      {
        sentence: "My ___ is Osaka.",
        blank: "hometown",
        options: [
          "hometown",
          "house",
          "homework",
          "home",
        ],
      },
      {
        sentence: "___ are you from?",
        blank: "Where",
        options: [
          "Where",
          "What",
          "When",
          "Who",
        ],
      },
      {
        sentence: "I work at a large ___.",
        blank: "company",
        options: [
          "company",
          "country",
          "hobby",
          "family",
        ],
      },
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
      {
        word: "collect",
        wordJp: "集める",
        pronunciation: "kəˈlɛkt",
        exampleEn: "I collect old coins.",
        exampleJp: "古いコインを集めています。",
      },
      {
        word: "practice",
        wordJp: "練習する",
        pronunciation: "ˈpræktɪs",
        exampleEn: "She practices yoga twice a week.",
        exampleJp: "彼女は週に2回ヨガを練習します。",
      },
      {
        word: "creative",
        wordJp: "創造的な",
        pronunciation: "kriˈeɪtɪv",
        exampleEn: "He's very creative.",
        exampleJp: "彼はとても創造的です。",
      },
      {
        word: "once",
        wordJp: "1回",
        pronunciation: "wʌns",
        exampleEn: "I go swimming once a week.",
        exampleJp: "週に1回泳ぎに行きます。",
      },
      {
        word: "twice",
        wordJp: "2回",
        pronunciation: "twaɪs",
        exampleEn: "She plays tennis twice a week.",
        exampleJp: "彼女は週に2回テニスをします。",
      },
      {
        word: "per",
        wordJp: "〜につき",
        pronunciation: "pɜːr",
        exampleEn: "He makes three bottles per week.",
        exampleJp: "彼は週に3本ボトルを作ります。",
      },
    ],
    grammarTip: {
      ruleEn: "Use 'How often...?' to ask about frequency. Answer with once, twice, three times + a day/week/month.",
      ruleJp: "頻度を聞くときは 'How often...?' を使います。once, twice, three times + a day/week/month で答えます。",
      examples: [
        {
          en: "How often do you practice?",
          jp: "どのくらいの頻度で練習しますか？",
        },
        {
          en: "I practice twice a week.",
          jp: "週に2回練習します。",
        },
        {
          en: "He goes swimming once a month.",
          jp: "彼は月に1回泳ぎに行きます。",
        },
      ],
    },
    context: "David tells Saori about his hobbies.",
    contextJp: "デイビッドがサオリに趣味について話しています。",
    dialogue: [
      {
        speaker: "Saori",
        lineEn: "What do you do in your free time?",
        lineJp: "暇なとき何をしますか？",
      },
      {
        speaker: "David",
        lineEn: "I make pottery. I'm very creative!",
        lineJp: "陶芸をしています。とても創造的なんです！",
      },
      {
        speaker: "Saori",
        lineEn: "How often do you practice?",
        lineJp: "どのくらいの頻度で練習しますか？",
      },
      {
        speaker: "David",
        lineEn: "Three times a week. I make about three bottles per week.",
        lineJp: "週に3回です。週に3本くらいボトルを作ります。",
      },
      {
        speaker: "Saori",
        lineEn: "That's amazing! I collect old stamps. It's my hobby.",
        lineJp: "すごいですね！私は古い切手を集めています。それが趣味です。",
      },
      {
        speaker: "David",
        lineEn: "How often do you go to stamp shops?",
        lineJp: "どのくらいの頻度で切手屋さんに行きますか？",
      },
    ],
    flashcards: [
      {
        front: "How often do you practice?",
        back: "どのくらいの頻度で練習しますか？",
        type: "en-to-jp",
      },
      {
        front: "古いコインを集めています。",
        back: "I collect old coins.",
        type: "jp-to-en",
      },
      {
        front: "I go swimming once a week.",
        back: "週に1回泳ぎに行きます。",
        type: "en-to-jp",
      },
      {
        front: "彼女は週に2回テニスをします。",
        back: "She plays tennis twice a week.",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "どのくらいの頻度で練習しますか？",
        correct: "How often do you practice?",
        wrong: [
          "How long do you practice?",
          "When do you practice?",
        ],
      },
      {
        sentenceJp: "週に2回ヨガを練習しています。",
        correct: "I practice yoga twice a week.",
        wrong: [
          "I practice yoga two weeks.",
          "I yoga twice a week.",
        ],
      },
      {
        sentenceJp: "彼は月に1回泳ぎに行きます。",
        correct: "He goes swimming once a month.",
        wrong: [
          "He goes swimming one month.",
          "He swims every month.",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "How ___ do you practice?",
        blank: "often",
        options: [
          "often",
          "long",
          "many",
          "much",
        ],
      },
      {
        sentence: "I go swimming ___ a week.",
        blank: "once",
        options: [
          "once",
          "one",
          "first",
          "only",
        ],
      },
      {
        sentence: "She plays tennis ___ a week.",
        blank: "twice",
        options: [
          "twice",
          "two",
          "second",
          "double",
        ],
      },
      {
        sentence: "He makes three bottles ___ week.",
        blank: "per",
        options: [
          "per",
          "for",
          "by",
          "at",
        ],
      },
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
      {
        word: "wake up",
        wordJp: "起きる",
        pronunciation: "weɪk ʌp",
        exampleEn: "What time do you wake up?",
        exampleJp: "何時に起きますか？",
      },
      {
        word: "sell",
        wordJp: "売る",
        pronunciation: "sɛl",
        exampleEn: "She sells bags at the market.",
        exampleJp: "彼女は市場でバッグを売っています。",
      },
      {
        word: "introduce",
        wordJp: "紹介する",
        pronunciation: "ˌɪntrəˈdjuːs",
        exampleEn: "Let me introduce my friend.",
        exampleJp: "友達を紹介させてください。",
      },
      {
        word: "practice",
        wordJp: "練習する",
        pronunciation: "ˈpræktɪs",
        exampleEn: "I practice every day.",
        exampleJp: "毎日練習しています。",
      },
      {
        word: "hometown",
        wordJp: "出身地",
        pronunciation: "ˈhoʊmˌtaʊn",
        exampleEn: "Where is your hometown?",
        exampleJp: "ご出身はどちらですか？",
      },
    ],
    grammarTip: {
      ruleEn: "Review: simple present tense (-s/-es, don't/doesn't), Wh- questions, frequency expressions (once/twice/three times a week)",
      ruleJp: "復習：現在形（-s/-es、don't/doesn't）、Wh-疑問文、頻度の表現（once/twice/three times a week）",
      examples: [
        {
          en: "She doesn't eat breakfast at home.",
          jp: "彼女は家で朝ごはんを食べません。",
        },
        {
          en: "Where are you from?",
          jp: "ご出身はどちらですか？",
        },
        {
          en: "I practice yoga twice a week.",
          jp: "週に2回ヨガを練習しています。",
        },
      ],
    },
    context: "Saori writes an email to her friend about her trip to Taiwan.",
    contextJp: "サオリは友達に台湾旅行についてのメールを書いています。",
    dialogue: [
      {
        speaker: "Saori",
        lineEn: "I'm in Taiwan! Catherine's family doesn't eat breakfast at home.",
        lineJp: "台湾にいます！キャサリンの家族は家で朝ごはんを食べません。",
      },
      {
        speaker: "Friend",
        lineEn: "Really? Where do they eat?",
        lineJp: "本当ですか？どこで食べるのですか？",
      },
      {
        speaker: "Saori",
        lineEn: "They buy breakfast at a food stand. It's very cheap!",
        lineJp: "屋台で朝ごはんを買います。とても安いです！",
      },
      {
        speaker: "Friend",
        lineEn: "What else do you do there?",
        lineJp: "他に何をしていますか？",
      },
      {
        speaker: "Saori",
        lineEn: "I met David. He makes pottery three times a week. He's very creative!",
        lineJp: "デイビッドに会いました。彼は週に3回陶芸をしています。とても創造的です！",
      },
      {
        speaker: "Friend",
        lineEn: "That sounds fun! How often do you go shopping?",
        lineJp: "楽しそうですね！どのくらいの頻度で買い物に行きますか？",
      },
    ],
    flashcards: [
      {
        front: "彼女は家で朝ごはんを食べません。",
        back: "She doesn't eat breakfast at home.",
        type: "jp-to-en",
      },
      {
        front: "She sells handmade bags.",
        back: "彼女は手作りのバッグを売っています。",
        type: "en-to-jp",
      },
      {
        front: "ご出身はどちらですか？",
        back: "Where are you from?",
        type: "jp-to-en",
      },
      {
        front: "I practice three times a week.",
        back: "週に3回練習しています。",
        type: "en-to-jp",
      },
    ],
    translate: [
      {
        sentenceJp: "彼は家で朝ごはんを食べません。",
        correct: "He doesn't eat breakfast at home.",
        wrong: [
          "He don't eat breakfast at home.",
          "He isn't eat breakfast at home.",
        ],
      },
      {
        sentenceJp: "どのくらいの頻度で買い物に行きますか？",
        correct: "How often do you go shopping?",
        wrong: [
          "How long do you go shopping?",
          "How many shopping do you?",
        ],
      },
      {
        sentenceJp: "彼女は毎週末バッグを売っています。",
        correct: "She sells bags every weekend.",
        wrong: [
          "She sell bags every weekend.",
          "She is sell bags every weekend.",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "He ___ eat breakfast at home.",
        blank: "doesn't",
        options: [
          "doesn't",
          "don't",
          "isn't",
          "not",
        ],
      },
      {
        sentence: "How ___ do you go shopping?",
        blank: "often",
        options: [
          "often",
          "long",
          "many",
          "much",
        ],
      },
      {
        sentence: "She ___ handmade bags.",
        blank: "sells",
        options: [
          "sells",
          "sell",
          "selling",
          "sold",
        ],
      },
      {
        sentence: "___ are you from?",
        blank: "Where",
        options: [
          "Where",
          "What",
          "How",
          "Who",
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Level 3 — Chapter 2: Travel & Getting Around  (5 lessons)
// ---------------------------------------------------------------------------
const chapter3_2 = [
  {
    lessonKey: "l3-c2-01",
    lessonNumber: 1,
    title: "At the Airport",
    titleJp: "空港で",
    goal: "I can listen to and understand common conversations at the airport.",
    goalJp: "空港でのよくある会話を聞いて理解できるようになる。",
    lessonType: "LISTENING" as const,
    vocabulary: [
      {
        word: "passport",
        wordJp: "パスポート",
        pronunciation: "ˈpæspɔːrt",
        exampleEn: "Please show your passport.",
        exampleJp: "パスポートを見せてください。",
      },
      {
        word: "boarding pass",
        wordJp: "搭乗券",
        pronunciation: "ˈbɔːrdɪŋ pæs",
        exampleEn: "I can't find my boarding pass.",
        exampleJp: "搭乗券が見つかりません。",
      },
      {
        word: "check in",
        wordJp: "チェックインする",
        pronunciation: "tʃek ɪn",
        exampleEn: "We need to check in online.",
        exampleJp: "オンラインでチェックインする必要があります。",
      },
      {
        word: "carry-on bag",
        wordJp: "機内持ち込み手荷物",
        pronunciation: "ˈkæri ɑːn bæg",
        exampleEn: "You can take one carry-on bag.",
        exampleJp: "機内持ち込み手荷物は1つ持ち込めます。",
      },
      {
        word: "security check",
        wordJp: "保安検査",
        pronunciation: "sɪˈkjʊrəti tʃek",
        exampleEn: "Take off your shoes at the security check.",
        exampleJp: "保安検査で靴を脱いでください。",
      },
      {
        word: "gate",
        wordJp: "搭乗口",
        pronunciation: "ɡeɪt",
        exampleEn: "Our gate is B12.",
        exampleJp: "私たちの搭乗口はB12です。",
      },
    ],
    grammarTip: {
      ruleEn: "Use have to/don't have to to talk about rules and necessity. Use have to + base verb. Don't have to means 'it is not necessary.' Questions: Do/Does + subject + have to? For he/she/it, use has to.",
      ruleJp: "規則や必要性について話すときは have to / don't have to を使います。have to + 動詞の原形。don't have to は「〜する必要はない」という意味です。疑問文は Do/Does + 主語 + have to?。he/she/it には has to を使います。",
      examples: [
        {
          en: "You have to show your passport.",
          jp: "パスポートを見せなければなりません。",
        },
        {
          en: "She has to check in before 9.",
          jp: "彼女は9時前にチェックインしなければなりません。",
        },
        {
          en: "We don't have to print the ticket.",
          jp: "チケットを印刷する必要はありません。",
        },
      ],
    },
    context: "Saori and Alex are at Haneda Airport, getting ready to fly to Singapore.",
    contextJp: "サオリとアレックスは羽田空港で、シンガポール行きのフライトに乗る準備をしています。",
    dialogue: [
      {
        speaker: "Alex",
        lineEn: "Saori, do we have to check in here?",
        lineJp: "サオリ、ここでチェックインしなければなりませんか？",
      },
      {
        speaker: "Saori",
        lineEn: "Yes, this is the airline's check-in counter.",
        lineJp: "はい、ここがその航空会社のチェックインカウンターです。",
      },
      {
        speaker: "Alex",
        lineEn: "I have my passport, but I can't find my boarding pass.",
        lineJp: "パスポートはありますが、搭乗券が見つかりません。",
      },
      {
        speaker: "Saori",
        lineEn: "No problem. You can get a new one. Show your passport and booking number.",
        lineJp: "大丈夫。新しいものを発行してもらえます。パスポートと予約番号を見せてください。",
      },
      {
        speaker: "Alex",
        lineEn: "After check-in, do we have to go to security check right away?",
        lineJp: "チェックインの後、すぐに保安検査に行かなければなりませんか？",
      },
      {
        speaker: "Saori",
        lineEn: "Yes. Our gate is B12, and boarding starts at 8:30.",
        lineJp: "はい。搭乗口はB12で、8時30分に搭乗開始です。",
      },
    ],
    flashcards: [
      {
        front: "boarding pass",
        back: "搭乗券",
        type: "en-to-jp",
      },
      {
        front: "搭乗口",
        back: "gate",
        type: "jp-to-en",
      },
      {
        front: "check in",
        back: "チェックインする",
        type: "en-to-jp",
      },
      {
        front: "保安検査",
        back: "security check",
        type: "jp-to-en",
      },
      {
        front: "carry-on bag",
        back: "機内持ち込み手荷物",
        type: "en-to-jp",
      },
      {
        front: "パスポート",
        back: "passport",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "パスポートを見せなければなりませんか？",
        correct: "Do I have to show my passport?",
        wrong: [
          "Have I to show my passport?",
          "Do I have to shows my passport?",
        ],
      },
      {
        sentenceJp: "私たちはここでチェックインしません。",
        correct: "We don't check in here.",
        wrong: [
          "We doesn't check in here.",
          "We aren't check in here.",
        ],
      },
      {
        sentenceJp: "搭乗口B12はどこですか？",
        correct: "Where is gate B12?",
        wrong: [
          "Where gate B12 is?",
          "Where is the gate B12?",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "You ___ show your passport at security.",
        blank: "have to",
        options: [
          "have to",
          "has to",
          "must to",
          "have",
        ],
      },
      {
        sentence: "She ___ in online before 8 p.m.",
        blank: "checks",
        options: [
          "checks",
          "check",
          "checking",
          "checkes",
        ],
      },
      {
        sentence: "Where ___ the gate for Flight 23?",
        blank: "is",
        options: [
          "is",
          "are",
          "do",
          "does",
        ],
      },
      {
        sentence: "This is my boarding ___.",
        blank: "pass",
        options: [
          "pass",
          "passport",
          "past",
          "passed",
        ],
      },
    ],
  },
  {
    lessonKey: "l3-c2-02",
    lessonNumber: 2,
    title: "Taking the Train",
    titleJp: "電車に乗る",
    goal: "I can listen to and understand conversations and announcements about taking the train.",
    goalJp: "電車に乗るときの会話やアナウンスを聞いて理解できる。",
    lessonType: "LISTENING" as const,
    vocabulary: [
      {
        word: "platform",
        wordJp: "ホーム（プラットフォーム）",
        pronunciation: "ˈplæt.fɔːrm",
        exampleEn: "The train to Osaka leaves from platform 3.",
        exampleJp: "大阪行きの電車は3番ホームから出ます。",
      },
      {
        word: "ticket machine",
        wordJp: "券売機",
        pronunciation: "ˈtɪkɪt məˈʃiːn",
        exampleEn: "Buy a ticket at the ticket machine.",
        exampleJp: "券売機で切符を買ってください。",
      },
      {
        word: "transfer (verb)",
        wordJp: "乗り換える",
        pronunciation: "trænsˈfɝː",
        exampleEn: "You have to transfer at Shibuya.",
        exampleJp: "渋谷で乗り換えなければなりません。",
      },
      {
        word: "local train",
        wordJp: "各駅停車",
        pronunciation: "ˈloʊkəl treɪn",
        exampleEn: "Take the local train to the next station.",
        exampleJp: "次の駅まで各駅停車に乗ってください。",
      },
      {
        word: "express train",
        wordJp: "急行",
        pronunciation: "ɪkˈsprɛs treɪn",
        exampleEn: "The express train is faster but costs more.",
        exampleJp: "急行は早いですが、料金が高いです。",
      },
      {
        word: "on time",
        wordJp: "時間通りに",
        pronunciation: "ɑːn taɪm",
        exampleEn: "Is the 7:10 train on time today?",
        exampleJp: "今日の7時10分の電車は時間通りですか？",
      },
    ],
    grammarTip: {
      ruleEn: "Have to + base verb expresses necessity. Present tense: I/you/we/they have to; he/she/it has to. Negative: don't/doesn't have to means 'no need,' not 'must not.' Questions: Do/Does + subject + have to...?",
      ruleJp: "「have to + 動詞の原形」で「〜しなければならない」を表します。現在形では I/you/we/they は have to、he/she/it は has to。否定の don't/doesn't have to は「〜する必要はない」（禁止ではない）の意味。疑問文は Do/Does + 主語 + have to...? です。",
      examples: [
        {
          en: "Do I have to transfer at Shibuya?",
          jp: "渋谷で乗り換えなければいけませんか？",
        },
        {
          en: "He has to buy a ticket.",
          jp: "彼は切符を買わなければなりません。",
        },
        {
          en: "You don't have to reserve a seat.",
          jp: "座席を予約する必要はありません。",
        },
      ],
    },
    context: "Saori and Alex are at Shinjuku Station, trying to take a train to Kamakura.",
    contextJp: "サオリとアレックスは新宿駅で、鎌倉行きの電車に乗ろうとしています。",
    dialogue: [
      {
        speaker: "Alex",
        lineEn: "Is this the right platform for Kamakura?",
        lineJp: "鎌倉行きはこのホームでいいですか？",
      },
      {
        speaker: "Saori",
        lineEn: "Yes, platform 7. But we have to buy tickets at the ticket machine.",
        lineJp: "はい、7番ホームです。でも券売機で切符を買わなければなりません。",
      },
      {
        speaker: "Alex",
        lineEn: "Do we have to transfer on the way?",
        lineJp: "途中で乗り換えなければいけませんか？",
      },
      {
        speaker: "Saori",
        lineEn: "No, just take the express train. It's on time today.",
        lineJp: "いいえ、急行に乗るだけです。今日は時間通りです。",
      },
      {
        speaker: "Alex",
        lineEn: "Great. If we miss it, can we take a local train?",
        lineJp: "よかった。乗り遅れたら、各駅停車に乗れますか？",
      },
      {
        speaker: "Saori",
        lineEn: "Yes, but the local train is slower.",
        lineJp: "はい、でも各駅停車は遅いです。",
      },
    ],
    flashcards: [
      {
        front: "platform",
        back: "ホーム（プラットフォーム）",
        type: "en-to-jp",
      },
      {
        front: "券売機",
        back: "ticket machine",
        type: "jp-to-en",
      },
      {
        front: "transfer (v.)",
        back: "乗り換える",
        type: "en-to-jp",
      },
      {
        front: "各駅停車",
        back: "local train",
        type: "jp-to-en",
      },
      {
        front: "express train",
        back: "急行",
        type: "en-to-jp",
      },
      {
        front: "時間通りに",
        back: "on time",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "私は渋谷で乗り換えなければなりません。",
        correct: "I have to transfer at Shibuya.",
        wrong: [
          "I has to transfer at Shibuya.",
          "I must to transfer at Shibuya.",
        ],
      },
      {
        sentenceJp: "彼は切符を買う必要はありません。",
        correct: "He doesn't have to buy a ticket.",
        wrong: [
          "He don't have to buy a ticket.",
          "He doesn't has to buy a ticket.",
        ],
      },
      {
        sentenceJp: "急行は時間通りですか？",
        correct: "Is the express train on time?",
        wrong: [
          "Does the express train is on time?",
          "Is the express train in time?",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "He ___ to transfer at Tokyo Station.",
        blank: "has",
        options: [
          "has",
          "have",
          "hasn't",
          "is",
        ],
      },
      {
        sentence: "Do we ___ to buy tickets here?",
        blank: "have",
        options: [
          "have",
          "has",
          "are",
          "having",
        ],
      },
      {
        sentence: "The train leaves from ___ 4.",
        blank: "platform",
        options: [
          "platform",
          "station",
          "line",
          "home",
        ],
      },
      {
        sentence: "The local train is slower, ___ it's cheaper.",
        blank: "but",
        options: [
          "but",
          "and",
          "so",
          "because",
        ],
      },
    ],
  },
  {
    lessonKey: "l3-c2-03",
    lessonNumber: 3,
    title: "Asking for Directions",
    titleJp: "道をたずねる",
    goal: "I can ask for and give simple directions politely.",
    goalJp: "丁寧に道をたずねて、簡単に道案内ができる。",
    lessonType: "SPEAKING" as const,
    vocabulary: [
      {
        word: "go straight",
        wordJp: "まっすぐ行く",
        pronunciation: "ɡoʊ streɪt",
        exampleEn: "Go straight for two blocks.",
        exampleJp: "2ブロックまっすぐ行ってください。",
      },
      {
        word: "turn right",
        wordJp: "右に曲がる",
        pronunciation: "tɜːrn raɪt",
        exampleEn: "Turn right at the bank.",
        exampleJp: "銀行で右に曲がってください。",
      },
      {
        word: "turn left",
        wordJp: "左に曲がる",
        pronunciation: "tɜːrn lɛft",
        exampleEn: "Turn left at the traffic light.",
        exampleJp: "信号で左に曲がってください。",
      },
      {
        word: "traffic light",
        wordJp: "信号",
        pronunciation: "ˈtræfɪk laɪt",
        exampleEn: "There is a traffic light at the corner.",
        exampleJp: "角に信号があります。",
      },
      {
        word: "block",
        wordJp: "ブロック（街区）",
        pronunciation: "blɑːk",
        exampleEn: "It's three blocks from here.",
        exampleJp: "ここから3ブロックです。",
      },
      {
        word: "across from",
        wordJp: "〜の向かいに",
        pronunciation: "əˈkrɔːs frəm",
        exampleEn: "The station is across from the park.",
        exampleJp: "駅は公園の向かいにあります。",
      },
    ],
    grammarTip: {
      ruleEn: "To ask politely for directions, use 'Could you...?' or 'How do I get to ...?'. To give directions, use imperatives (base-form verbs): 'Go...', 'Turn...'. Use place prepositions: 'across from', 'next to', 'between A and B'.",
      ruleJp: "道を丁寧にたずねるときは「Could you...?」や「How do I get to ...?」を使います。道案内には命令形（動詞の原形）「Go...」「Turn...」を使います。位置を説明するときは「across from（〜の向かい）」「next to（〜の隣）」「between A and B（AとBの間）」を使います。",
      examples: [
        {
          en: "Could you tell me how to get to the station?",
          jp: "駅へはどうやって行けばいいか教えていただけますか。",
        },
        {
          en: "Go straight and turn left at the traffic light.",
          jp: "まっすぐ行って、信号で左に曲がってください。",
        },
        {
          en: "It's between the bank and the post office.",
          jp: "銀行と郵便局の間にあります。",
        },
      ],
    },
    context: "Saori and Ben are visiting Osaka and looking for the subway entrance.",
    contextJp: "サオリとベンは大阪を訪れており、地下鉄の入口を探しています。",
    dialogue: [
      {
        speaker: "Saori",
        lineEn: "Excuse me. Could you tell me how to get to Namba Station?",
        lineJp: "すみません。なんば駅へはどうやって行けばいいですか。",
      },
      {
        speaker: "Ben",
        lineEn: "Sure. Go straight for two blocks.",
        lineJp: "いいですよ。2ブロックまっすぐ行ってください。",
      },
      {
        speaker: "Saori",
        lineEn: "Then turn right at the traffic light?",
        lineJp: "それから信号で右に曲がるんですか？",
      },
      {
        speaker: "Ben",
        lineEn: "Yes, turn right, and the station is across from a big bookstore.",
        lineJp: "はい、右に曲がると、駅は大きな本屋の向かいにあります。",
      },
      {
        speaker: "Saori",
        lineEn: "Is it far from here?",
        lineJp: "ここから遠いですか？",
      },
      {
        speaker: "Ben",
        lineEn: "Not really. It's about five minutes on foot.",
        lineJp: "そんなに遠くないですよ。徒歩で5分くらいです。",
      },
    ],
    flashcards: [
      {
        front: "go straight",
        back: "まっすぐ行く",
        type: "en-to-jp",
      },
      {
        front: "右に曲がる",
        back: "turn right",
        type: "jp-to-en",
      },
      {
        front: "traffic light",
        back: "信号",
        type: "en-to-jp",
      },
      {
        front: "〜の向かいに",
        back: "across from",
        type: "jp-to-en",
      },
      {
        front: "turn left",
        back: "左に曲がる",
        type: "en-to-jp",
      },
      {
        front: "ブロック（街区）",
        back: "block",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "すみません、駅へはどうやって行けばいいですか。",
        correct: "Excuse me, how do I get to the station?",
        wrong: [
          "Excuse me, how do I go to the station?",
          "Excuse me, how I get to the station?",
        ],
      },
      {
        sentenceJp: "信号で左に曲がってください。",
        correct: "Turn left at the traffic light.",
        wrong: [
          "Turn left on the traffic light.",
          "Turn left at traffic light.",
        ],
      },
      {
        sentenceJp: "銀行と郵便局の間にあります。",
        correct: "It's between the bank and the post office.",
        wrong: [
          "It's between of the bank and the post office.",
          "It's among the bank and the post office.",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "Could you ___ me how to get to the museum?",
        blank: "tell",
        options: [
          "tell",
          "to tell",
          "tells",
          "say",
        ],
      },
      {
        sentence: "Go ___ for two blocks.",
        blank: "straight",
        options: [
          "straight",
          "straightly",
          "aheads",
          "forward",
        ],
      },
      {
        sentence: "It's ___ the bank and the post office.",
        blank: "between",
        options: [
          "between",
          "among",
          "next",
          "beside",
        ],
      },
      {
        sentence: "Then ___ right at the traffic light.",
        blank: "turn",
        options: [
          "turn",
          "turns",
          "to turn",
          "turning",
        ],
      },
    ],
  },
  {
    lessonKey: "l3-c2-04",
    lessonNumber: 4,
    title: "At the Hotel",
    titleJp: "ホテルで",
    goal: "I can speak and role-play checking in and asking for help at a hotel.",
    goalJp: "ホテルでのチェックインや問い合わせをロールプレイで話せるようになる。",
    lessonType: "SPEAKING" as const,
    vocabulary: [
      {
        word: "reservation",
        wordJp: "予約",
        pronunciation: "ˌrɛzərˈveɪʃən",
        exampleEn: "I have a reservation under Yuki Tanaka.",
        exampleJp: "ユキ・タナカの名前で予約があります。",
      },
      {
        word: "check in",
        wordJp: "チェックインする",
        pronunciation: "tʃɛk ɪn",
        exampleEn: "We’d like to check in, please.",
        exampleJp: "チェックインをお願いします。",
      },
      {
        word: "passport",
        wordJp: "パスポート",
        pronunciation: "ˈpæspɔrt",
        exampleEn: "May I see your passport?",
        exampleJp: "パスポートを見せていただけますか？",
      },
      {
        word: "double room",
        wordJp: "ダブルルーム（2名用1ベッド）",
        pronunciation: "ˈdʌbəl ruːm",
        exampleEn: "Do you have a double room?",
        exampleJp: "ダブルルームはありますか？",
      },
      {
        word: "key card",
        wordJp: "キー・カード",
        pronunciation: "ˈkiː kɑrd",
        exampleEn: "Here is your key card.",
        exampleJp: "こちらがキー・カードです。",
      },
      {
        word: "Wi-Fi password",
        wordJp: "Wi-Fiのパスワード",
        pronunciation: "ˈwaɪfaɪ ˈpæsˌwɝːd",
        exampleEn: "What is the Wi-Fi password?",
        exampleJp: "Wi-Fiのパスワードは何ですか？",
      },
    ],
    grammarTip: {
      ruleEn: "Use “I’d like …” to make polite requests or say what you want. Use “Could you …?” to politely ask someone to do something. Use “Can I …?” to ask for permission.",
      ruleJp: "丁寧に依頼や希望を言うときは “I’d like …” を使います。相手に何かしてほしいときは “Could you …?”、許可を求めるときは “Can I …?” を使います。",
      examples: [
        {
          en: "I’d like to check in.",
          jp: "チェックインをしたいのですが。",
        },
        {
          en: "Could you give me a room on a higher floor?",
          jp: "もっと上の階の部屋をいただけますか。",
        },
        {
          en: "Can I have a late checkout?",
          jp: "レイトチェックアウトはできますか。",
        },
      ],
    },
    context: "Saori arrives at a business hotel and speaks with Emma at the front desk to check in.",
    contextJp: "サオリはビジネスホテルに到着し、フロントのエマとチェックインの会話をします。",
    dialogue: [
      {
        speaker: "Emma",
        lineEn: "Welcome to Sakura Hotel. How can I help you?",
        lineJp: "さくらホテルへようこそ。ご用件をお伺いします。",
      },
      {
        speaker: "Saori",
        lineEn: "Hello, we’d like to check in. It’s under Saori Saito.",
        lineJp: "こんにちは、チェックインをお願いします。サオリ・サイトウの名前です。",
      },
      {
        speaker: "Emma",
        lineEn: "May I see your passport, please?",
        lineJp: "パスポートを拝見できますか？",
      },
      {
        speaker: "Saori",
        lineEn: "Sure. Also, do you have a double room?",
        lineJp: "はい。あと、ダブルルームはありますか？",
      },
      {
        speaker: "Emma",
        lineEn: "Yes, a double room on the 8th floor. Here is your key card.",
        lineJp: "はい、8階にダブルルームがあります。こちらがキー・カードです。",
      },
      {
        speaker: "Saori",
        lineEn: "Thank you. What is the Wi-Fi password?",
        lineJp: "ありがとうございます。Wi-Fiのパスワードは何ですか？",
      },
    ],
    flashcards: [
      {
        front: "reservation",
        back: "予約",
        type: "en-to-jp",
      },
      {
        front: "チェックインする",
        back: "check in",
        type: "jp-to-en",
      },
      {
        front: "passport",
        back: "パスポート",
        type: "en-to-jp",
      },
      {
        front: "ダブルルーム",
        back: "double room",
        type: "jp-to-en",
      },
      {
        front: "key card",
        back: "キー・カード",
        type: "en-to-jp",
      },
      {
        front: "Wi-Fiのパスワード",
        back: "Wi-Fi password",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "チェックインをしたいです。",
        correct: "I’d like to check in.",
        wrong: [
          "I like to check in.",
          "I want check in.",
        ],
      },
      {
        sentenceJp: "Wi-Fiのパスワードは何ですか。",
        correct: "What is the Wi-Fi password?",
        wrong: [
          "What is Wi-Fi password?",
          "How is the Wi-Fi password?",
        ],
      },
      {
        sentenceJp: "ダブルルームはありますか？",
        correct: "Do you have a double room?",
        wrong: [
          "Have you a double room?",
          "Do you have double room?",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "___ like to check in, please.",
        blank: "I’d",
        options: [
          "I’d",
          "I",
          "I am",
          "I will",
        ],
      },
      {
        sentence: "Could you ___ me your passport, please?",
        blank: "show",
        options: [
          "show",
          "shows",
          "to show",
          "showing",
        ],
      },
      {
        sentence: "Do you ___ a reservation?",
        blank: "have",
        options: [
          "have",
          "has",
          "are",
          "do",
        ],
      },
      {
        sentence: "The Wi-Fi password ___ on the key card.",
        blank: "is",
        options: [
          "is",
          "are",
          "be",
          "has",
        ],
      },
    ],
  },
  {
    lessonKey: "l3-c2-05",
    lessonNumber: 5,
    title: "Travel & Getting Around — Review",
    titleJp: "旅行と移動：復習",
    goal: "I can review and use travel phrases to ask for directions, buy tickets, and talk about plans.",
    goalJp: "道をたずねる、切符を買う、計画について話す表現を復習して使えるようになる。",
    lessonType: "REVIEW" as const,
    vocabulary: [
      {
        word: "platform",
        wordJp: "プラットホーム（番線）",
        pronunciation: "ˈplætˌfɔːrm",
        exampleEn: "Our train leaves from Platform 2.",
        exampleJp: "電車は2番線から出ます。",
      },
      {
        word: "transfer",
        wordJp: "乗り換える",
        pronunciation: "trænsˈfɜːr",
        exampleEn: "We transfer at Shinjuku.",
        exampleJp: "私たちは新宿で乗り換えます。",
      },
      {
        word: "fare",
        wordJp: "運賃",
        pronunciation: "fɛr",
        exampleEn: "The bus fare is 210 yen.",
        exampleJp: "バスの運賃は210円です。",
      },
      {
        word: "timetable",
        wordJp: "時刻表",
        pronunciation: "ˈtaɪmˌteɪbəl",
        exampleEn: "I checked the timetable online.",
        exampleJp: "オンラインで時刻表を確認しました。",
      },
      {
        word: "across from",
        wordJp: "〜の向かいに",
        pronunciation: "əˈkrɔːs frəm",
        exampleEn: "The station is across from the hotel.",
        exampleJp: "駅はホテルの向かいにあります。",
      },
      {
        word: "go straight",
        wordJp: "まっすぐ進む",
        pronunciation: "ɡoʊ streɪt",
        exampleEn: "Go straight for two blocks.",
        exampleJp: "2ブロックまっすぐ進んでください。",
      },
    ],
    grammarTip: {
      ruleEn: "To ask for directions politely, use patterns like “Could you tell me how to get to…?” or “How do I get to…?”. To give directions, use imperatives (Go/Turn/Take) and prepositions of place (next to, across from, between A and B, at the corner). Use at/in/on correctly with places: at the station, on Line 2, in front of the museum.",
      ruleJp: "丁寧に道をたずねるときは “Could you tell me how to get to …?” や “How do I get to …?” を使います。道案内では命令形（Go/Turn/Take）と場所の前置詞（next to, across from, between A and B, at the corner）を使います。場所には at/in/on を適切に使います（例：at the station, on Line 2, in front of the museum）。",
      examples: [
        {
          en: "Could you tell me how to get to the station?",
          jp: "駅への行き方を教えていただけますか。",
        },
        {
          en: "Go straight and turn right at the second light.",
          jp: "まっすぐ進んで、2つ目の信号で右に曲がってください。",
        },
        {
          en: "The museum is across from the park.",
          jp: "博物館は公園の向かいにあります。",
        },
      ],
    },
    context: "Saori and Alex are in Osaka, reviewing their travel plans and asking for directions to a ferry terminal.",
    contextJp: "サオリとアレックスは大阪で、旅行計画を復習し、フェリーターミナルへの行き方を尋ねています。",
    dialogue: [
      {
        speaker: "Saori",
        lineEn: "Alex, are we going to take the subway or the bus to the ferry terminal?",
        lineJp: "アレックス、フェリーターミナルへは地下鉄とバス、どちらで行く予定？",
      },
      {
        speaker: "Alex",
        lineEn: "Let's take the subway. We need to transfer at Namba and go to Platform 3.",
        lineJp: "地下鉄にしよう。難波で乗り換えて、3番線に行くよ。",
      },
      {
        speaker: "Saori",
        lineEn: "How long does it take from here?",
        lineJp: "ここからどのくらいかかる？",
      },
      {
        speaker: "Alex",
        lineEn: "About twenty minutes. After the gate, go straight; the subway entrance is across from the bank.",
        lineJp: "だいたい20分。改札を出たらまっすぐ進んで、地下鉄の入口は銀行の向かいだよ。",
      },
      {
        speaker: "Saori",
        lineEn: "Okay. Two round-trip tickets, please—how much is the fare?",
        lineJp: "わかった。往復券を2枚ください。運賃はいくらですか？",
      },
      {
        speaker: "Alex",
        lineEn: "It's 560 yen each. I already checked the timetable.",
        lineJp: "一人560円だよ。時刻表はもう確認したから大丈夫。",
      },
    ],
    flashcards: [
      {
        front: "platform",
        back: "プラットホーム（番線）",
        type: "en-to-jp",
      },
      {
        front: "時刻表",
        back: "timetable",
        type: "jp-to-en",
      },
      {
        front: "across from",
        back: "〜の向かいに",
        type: "en-to-jp",
      },
      {
        front: "乗り換える",
        back: "transfer",
        type: "jp-to-en",
      },
      {
        front: "round-trip ticket",
        back: "往復券",
        type: "en-to-jp",
      },
      {
        front: "運賃",
        back: "fare",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "駅は銀行の向かいにあります。",
        correct: "The station is across from the bank.",
        wrong: [
          "The station is across the bank.",
          "Station is across from bank.",
        ],
      },
      {
        sentenceJp: "新宿で地下鉄に乗り換えてください。",
        correct: "Please transfer to the subway at Shinjuku.",
        wrong: [
          "Please transfer subway at Shinjuku.",
          "Please change to subway at Shinjuku.",
        ],
      },
      {
        sentenceJp: "渋谷までどのくらいかかりますか？",
        correct: "How long does it take to get to Shibuya?",
        wrong: [
          "How long does it take to Shibuya?",
          "How long time does it take to get Shibuya?",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "Could you ___ me how to get to the museum?",
        blank: "tell",
        options: [
          "tell",
          "to tell",
          "telling",
          "says",
        ],
      },
      {
        sentence: "Go ___ and turn left at the station.",
        blank: "straight",
        options: [
          "straight",
          "strait",
          "straightly",
          "straight ahead",
        ],
      },
      {
        sentence: "You need to ___ at Platform 3.",
        blank: "transfer",
        options: [
          "transfer",
          "transfers",
          "to transfer",
          "transfer to",
        ],
      },
      {
        sentence: "How much is the ___ to Kyoto?",
        blank: "fare",
        options: [
          "fare",
          "fee",
          "price",
          "cost",
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Level 4 — Chapter 1: Work Life  (5 lessons)
// ---------------------------------------------------------------------------
const chapter4_1 = [
  {
    lessonKey: "l4-c1-01",
    lessonNumber: 1,
    title: "Office Introductions",
    titleJp: "職場での自己紹介",
    goal: "I can listen to and understand office introductions.",
    goalJp: "職場での自己紹介を聞いて理解できるようになる。",
    lessonType: "LISTENING" as const,
    vocabulary: [
      {
        word: "introduce myself",
        wordJp: "自己紹介する",
        pronunciation: "ˌɪntrəˈduːs maɪˈsɛlf",
        exampleEn: "Let me introduce myself. I'm Kenji from the Sales Department.",
        exampleJp: "自己紹介させてください。営業部のケンジです。",
      },
      {
        word: "department",
        wordJp: "部署",
        pronunciation: "dɪˈpɑːrtmənt",
        exampleEn: "I work in the Marketing Department.",
        exampleJp: "私はマーケティング部署で働いています。",
      },
      {
        word: "coworker",
        wordJp: "同僚",
        pronunciation: "ˈkoʊˌwɜːrkər",
        exampleEn: "This is my coworker, Yuki.",
        exampleJp: "こちらは同僚のユキです。",
      },
      {
        word: "position",
        wordJp: "役職",
        pronunciation: "pəˈzɪʃən",
        exampleEn: "My position is project manager.",
        exampleJp: "私の役職はプロジェクトマネージャーです。",
      },
      {
        word: "in charge of",
        wordJp: "〜の担当で",
        pronunciation: "ɪn ˈtʃɑːrdʒ əv",
        exampleEn: "I'm in charge of new client support.",
        exampleJp: "新規顧客の対応を担当しています。",
      },
      {
        word: "join the company",
        wordJp: "入社する",
        pronunciation: "dʒɔɪn ðə ˈkʌmpəni",
        exampleEn: "I joined the company last April.",
        exampleJp: "私は昨年4月に入社しました。",
      },
    ],
    grammarTip: {
      ruleEn: "To talk about your job and responsibilities, use: work in + field/department; work for + company; work as + job title; be in charge of + noun/gerund. Use the simple present for roles and duties.",
      ruleJp: "仕事や担当を表すときは次の表現を使います：work in + 分野/部署、work for + 会社、work as + 職種、be in charge of + 名詞/動名詞。役割や職務は現在形で表します。",
      examples: [
        {
          en: "I work in the Sales Department.",
          jp: "私は営業部で働いています。",
        },
        {
          en: "I work for ABC Corporation as a designer.",
          jp: "私はABC社でデザイナーとして働いています。",
        },
        {
          en: "She's in charge of client support.",
          jp: "彼女は顧客サポートの担当です。",
        },
      ],
    },
    context: "It's Saori's first day at a global company. In the office lobby, she's introduced to a new colleague, Alex.",
    contextJp: "サオリはグローバル企業での初出勤の日。オフィスのロビーで新しい同僚のアレックスを紹介されます。",
    dialogue: [
      {
        speaker: "Alex",
        lineEn: "Hi, I'm Alex. Welcome to the Tokyo office.",
        lineJp: "こんにちは、アレックスです。東京オフィスへようこそ。",
      },
      {
        speaker: "Saori",
        lineEn: "Nice to meet you, I'm Saori. I work in the Marketing Department.",
        lineJp: "はじめまして、サオリです。マーケティング部署で働いています。",
      },
      {
        speaker: "Alex",
        lineEn: "Great. I'm in charge of the product launch team. What's your position?",
        lineJp: "いいですね。私は製品ローンチチームの担当です。あなたの役職は何ですか？",
      },
      {
        speaker: "Saori",
        lineEn: "I'm a marketing analyst. I joined the company last month.",
        lineJp: "マーケティングアナリストです。先月入社しました。",
      },
      {
        speaker: "Alex",
        lineEn: "Awesome. Let me introduce you to my coworker, Emma.",
        lineJp: "いいですね。同僚のエマを紹介します。",
      },
      {
        speaker: "Saori",
        lineEn: "Thank you! I'm happy to be here.",
        lineJp: "ありがとうございます！ここで働けて嬉しいです。",
      },
    ],
    flashcards: [
      {
        front: "introduce myself",
        back: "自己紹介する",
        type: "en-to-jp",
      },
      {
        front: "部署",
        back: "department",
        type: "jp-to-en",
      },
      {
        front: "coworker",
        back: "同僚",
        type: "en-to-jp",
      },
      {
        front: "役職",
        back: "position",
        type: "jp-to-en",
      },
      {
        front: "in charge of",
        back: "〜の担当で",
        type: "en-to-jp",
      },
      {
        front: "入社する",
        back: "join the company",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "私は営業部で働いています。",
        correct: "I work in the Sales Department.",
        wrong: [
          "I work at the Sales Department.",
          "I am working in the Sales Department.",
        ],
      },
      {
        sentenceJp: "彼女は新規顧客の対応を担当しています。",
        correct: "She is in charge of new client support.",
        wrong: [
          "She is in charge for new client support.",
          "She in charge of new client support.",
        ],
      },
      {
        sentenceJp: "彼の役職はプロジェクトマネージャーです。",
        correct: "His position is project manager.",
        wrong: [
          "His position is a project manager.",
          "He is a project manager of sales department.",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "I ___ in the Marketing Department.",
        blank: "work",
        options: [
          "work",
          "works",
          "am work",
          "working",
        ],
      },
      {
        sentence: "She is in charge ___ onboarding new clients.",
        blank: "of",
        options: [
          "of",
          "for",
          "to",
          "about",
        ],
      },
      {
        sentence: "I work ___ sales.",
        blank: "in",
        options: [
          "in",
          "at",
          "for",
          "on",
        ],
      },
      {
        sentence: "Let me ___ myself.",
        blank: "introduce",
        options: [
          "introduce",
          "introduction",
          "introduced",
          "introducing",
        ],
      },
    ],
  },
  {
    lessonKey: "l4-c1-02",
    lessonNumber: 2,
    title: "Email & Messages",
    titleJp: "メールとメッセージ",
    goal: "I can listen to and understand an office conversation about emails and messages.",
    goalJp: "職場のメールやメッセージに関する会話を聞いて理解できる。",
    lessonType: "LISTENING" as const,
    vocabulary: [
      {
        word: "follow up",
        wordJp: "フォローアップする、後で対応する",
        pronunciation: "ˈfɑːloʊ ʌp",
        exampleEn: "I'll follow up with the client tomorrow.",
        exampleJp: "明日、クライアントにフォローアップします。",
      },
      {
        word: "CC (someone)",
        wordJp: "（人を）CCに入れる",
        pronunciation: "siː siː",
        exampleEn: "Please CC Yuki on the email.",
        exampleJp: "メールでユキをCCに入れてください。",
      },
      {
        word: "attachment",
        wordJp: "添付ファイル",
        pronunciation: "əˈtætʃmənt",
        exampleEn: "The attachment is too large.",
        exampleJp: "添付ファイルが大きすぎます。",
      },
      {
        word: "clarify",
        wordJp: "明確にする、はっきりさせる",
        pronunciation: "ˈklærəfaɪ",
        exampleEn: "Could you clarify the deadline?",
        exampleJp: "締め切りを明確にしていただけますか。",
      },
      {
        word: "deadline",
        wordJp: "締め切り",
        pronunciation: "ˈdedlaɪn",
        exampleEn: "Our deadline is next Friday.",
        exampleJp: "締め切りは来週の金曜日です。",
      },
      {
        word: "forward (an email)",
        wordJp: "（メールを）転送する",
        pronunciation: "ˈfɔrwərd",
        exampleEn: "I'll forward the message to Kenji.",
        exampleJp: "そのメッセージをケンジに転送します。",
      },
    ],
    grammarTip: {
      ruleEn: "For polite requests in emails and messages, use 'Could you + base verb...?' or 'Would you mind + V-ing...?' Add softeners like 'please', 'just', or 'when you have a moment' to sound more natural.",
      ruleJp: "メールやメッセージで丁寧に依頼するときは「Could you + 動詞の原形...?」や「Would you mind + 動名詞...?」を使います。さらに、please / just / when you have a moment などを加えると、より丁寧で自然になります。",
      examples: [
        {
          en: "Could you send the attachment when you have a moment?",
          jp: "お手すきのときに添付ファイルを送っていただけますか。",
        },
        {
          en: "Would you mind clarifying the deadline?",
          jp: "締め切りを明確にしていただけませんか。",
        },
        {
          en: "Please CC Kenji on your reply.",
          jp: "返信にケンジをCCに入れてください。",
        },
      ],
    },
    context: "Saori and Michael are at the office. They listen to a voice message from a client and discuss how to reply by email.",
    contextJp: "サオリとマイケルはオフィスにいて、クライアントからのボイスメッセージを聞き、メールでの返信内容を相談します。",
    dialogue: [
      {
        speaker: "Michael",
        lineEn: "Hey Saori, I just listened to the client's voice message.",
        lineJp: "サオリ、今クライアントからのボイスメッセージを聞きました。",
      },
      {
        speaker: "Saori",
        lineEn: "What did they say?",
        lineJp: "何と言っていましたか？",
      },
      {
        speaker: "Michael",
        lineEn: "The file wouldn't open. They asked us to forward a PDF and CC Yuki.",
        lineJp: "ファイルが開けなかったそうです。PDFを転送して、ユキをCCに入れてほしいと言っていました。",
      },
      {
        speaker: "Saori",
        lineEn: "Okay, I'll attach the PDF and follow up about the deadline.",
        lineJp: "わかりました。PDFを添付して、締め切りについてフォローアップします。",
      },
      {
        speaker: "Michael",
        lineEn: "Great. Could you also clarify which version they need?",
        lineJp: "いいですね。どのバージョンが必要かも明確にしてもらえますか？",
      },
      {
        speaker: "Saori",
        lineEn: "Sure. I'll write, 'Please confirm the deadline, and I'll CC Yuki.'",
        lineJp: "はい。「締め切りをご確認ください。ユキをCCに入れます。」と書きます。",
      },
    ],
    flashcards: [
      {
        front: "follow up",
        back: "フォローアップする、後で対応する",
        type: "en-to-jp",
      },
      {
        front: "添付ファイル",
        back: "attachment",
        type: "jp-to-en",
      },
      {
        front: "deadline",
        back: "締め切り",
        type: "en-to-jp",
      },
      {
        front: "（人を）CCに入れる",
        back: "CC (someone)",
        type: "jp-to-en",
      },
      {
        front: "forward (an email)",
        back: "（メールを）転送する",
        type: "en-to-jp",
      },
      {
        front: "明確にする、はっきりさせる",
        back: "clarify",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "締め切りについて確認していただけますか？",
        correct: "Could you confirm the deadline?",
        wrong: [
          "Could you confirm about the deadline?",
          "Can you confirms the deadline?",
        ],
      },
      {
        sentenceJp: "あなたをCCに入れました。",
        correct: "I CC'd you.",
        wrong: [
          "I CC you.",
          "I added you in CC.",
        ],
      },
      {
        sentenceJp: "添付ファイルをご確認ください。",
        correct: "Please check the attachment.",
        wrong: [
          "Please check attachment.",
          "Please check the attach file.",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "Please ___ me on your reply.",
        blank: "CC",
        options: [
          "CC",
          "copy",
          "CCs",
          "to CC",
        ],
      },
      {
        sentence: "I ___ the report to this email.",
        blank: "attached",
        options: [
          "attached",
          "attach",
          "attachment",
          "attaching",
        ],
      },
      {
        sentence: "Could you ___ the details so the team is clear?",
        blank: "clarify",
        options: [
          "clarify",
          "clear",
          "explain about",
          "clarifies",
        ],
      },
      {
        sentence: "Please ___ this to Kenji as soon as possible.",
        blank: "forward",
        options: [
          "forward",
          "send",
          "transfer",
          "pass",
        ],
      },
    ],
  },
  {
    lessonKey: "l4-c1-03",
    lessonNumber: 3,
    title: "Meetings",
    titleJp: "会議",
    goal: "I can make polite suggestions and manage turn-taking in a meeting.",
    goalJp: "会議で丁寧に提案し、発言の順番をうまく調整できる。",
    lessonType: "SPEAKING" as const,
    vocabulary: [
      {
        word: "agenda",
        wordJp: "議題（アジェンダ）",
        pronunciation: "əˈdʒendə",
        exampleEn: "Let's check the agenda first.",
        exampleJp: "まず議題を確認しましょう。",
      },
      {
        word: "minutes",
        wordJp: "議事録",
        pronunciation: "ˈmɪnɪts",
        exampleEn: "Kenji will take the minutes.",
        exampleJp: "ケンジが議事録を取ります。",
      },
      {
        word: "action item",
        wordJp: "アクション項目（対応事項）",
        pronunciation: "ˈækʃən ˈaɪtəm",
        exampleEn: "We listed three action items.",
        exampleJp: "アクション項目を3つ挙げました。",
      },
      {
        word: "postpone",
        wordJp: "延期する",
        pronunciation: "poʊsˈpoʊn",
        exampleEn: "Can we postpone the meeting to Friday?",
        exampleJp: "会議を金曜日に延期できますか？",
      },
      {
        word: "consensus",
        wordJp: "合意（コンセンサス）",
        pronunciation: "kənˈsɛnsəs",
        exampleEn: "Do we have a consensus on this plan?",
        exampleJp: "この計画について合意は得られていますか？",
      },
      {
        word: "follow up",
        wordJp: "フォローアップする（追って対応する）",
        pronunciation: "ˈfɑːloʊ ʌp",
        exampleEn: "I'll follow up with an email.",
        exampleJp: "メールでフォローアップします。",
      },
    ],
    grammarTip: {
      ruleEn: "In meetings, use modal verbs and softeners for polite suggestions and requests: suggestions—'Shall we...?', 'How about ...ing?', 'Let's + base verb'; requests—'Could you...?', 'Would you mind ...ing?'.",
      ruleJp: "会議で丁寧に提案・依頼をするには、助動詞や緩和表現を使います。提案：「Shall we...?」「How about ～ing?」「Let's + 動詞原形」。依頼：「Could you...?」「Would you mind ～ing?」。",
      examples: [
        {
          en: "Could we move on to the next item?",
          jp: "次の議題に移ってもいいですか？",
        },
        {
          en: "Would you mind sharing the slides?",
          jp: "スライドを共有していただけますか？",
        },
        {
          en: "How about postponing it until Friday?",
          jp: "金曜日まで延期するのはどうでしょうか？",
        },
      ],
    },
    context: "Saori and Michael are leading a weekly project meeting on Zoom.",
    contextJp: "サオリとマイケルはZoomで週次プロジェクト会議を進行しています。",
    dialogue: [
      {
        speaker: "Saori",
        lineEn: "Shall we start? Today's agenda is the timeline and budget.",
        lineJp: "始めましょうか？今日の議題はスケジュールと予算です。",
      },
      {
        speaker: "Michael",
        lineEn: "Sounds good. Could you share the slides?",
        lineJp: "いいですね。スライドを共有していただけますか？",
      },
      {
        speaker: "Saori",
        lineEn: "Sure. Also, Kenji will take the minutes today.",
        lineJp: "もちろん。あと、今日はケンジが議事録を取ります。",
      },
      {
        speaker: "Michael",
        lineEn: "Thanks. If time is tight, could we postpone the Q&A?",
        lineJp: "ありがとうございます。時間が厳しければ、質疑応答を延期してもいいですか？",
      },
      {
        speaker: "Saori",
        lineEn: "How about moving it to the end? Then we can confirm the action items first.",
        lineJp: "最後に回すのはどうでしょう？そうすれば、先にアクション項目を確認できます。",
      },
      {
        speaker: "Michael",
        lineEn: "Good idea. After the meeting, I'll follow up with an email to get consensus.",
        lineJp: "いい考えです。会議後、合意を得るためにメールでフォローアップします。",
      },
    ],
    flashcards: [
      {
        front: "agenda",
        back: "議題（アジェンダ）",
        type: "en-to-jp",
      },
      {
        front: "議事録",
        back: "minutes",
        type: "jp-to-en",
      },
      {
        front: "action item",
        back: "アクション項目（対応事項）",
        type: "en-to-jp",
      },
      {
        front: "延期する",
        back: "postpone",
        type: "jp-to-en",
      },
      {
        front: "consensus",
        back: "合意（コンセンサス）",
        type: "en-to-jp",
      },
      {
        front: "フォローアップする",
        back: "follow up",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "今日の会議で予算について話し合いましょう。",
        correct: "Let's discuss the budget in today's meeting.",
        wrong: [
          "Let's discuss about the budget in today's meeting.",
          "Let's talk about the budget in today meeting.",
        ],
      },
      {
        sentenceJp: "5分だけ会議を延長してもいいですか？",
        correct: "Could we extend the meeting by five minutes?",
        wrong: [
          "Can we extend meeting by five minutes?",
          "Could we extend the meeting five minutes?",
        ],
      },
      {
        sentenceJp: "次の議題に移ってもいいですか？",
        correct: "Shall we move on to the next agenda item?",
        wrong: [
          "Shall we move to next agenda item?",
          "Shall we move on the next agenda item?",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "Could you ___ the slides with us?",
        blank: "share",
        options: [
          "share",
          "shares",
          "sharing",
          "to share",
        ],
      },
      {
        sentence: "Let's ___ the action items before we finish.",
        blank: "review",
        options: [
          "review",
          "reviews",
          "reviewed",
          "reviewing",
        ],
      },
      {
        sentence: "Sorry to ___, but can I add one point?",
        blank: "interrupt",
        options: [
          "interrupt",
          "interrupts",
          "interruption",
          "interrupted",
        ],
      },
      {
        sentence: "Shall we move on ___ item three on the agenda?",
        blank: "to",
        options: [
          "to",
          "at",
          "on",
          "for",
        ],
      },
    ],
  },
  {
    lessonKey: "l4-c1-04",
    lessonNumber: 4,
    title: "Giving Presentations",
    titleJp: "プレゼンテーションをする",
    goal: "I can give a clear short presentation and handle basic Q&A.",
    goalJp: "短く明確なプレゼンを行い、基本的な質疑応答に対応できる。",
    lessonType: "SPEAKING" as const,
    vocabulary: [
      {
        word: "slide deck",
        wordJp: "スライド資料",
        pronunciation: "slaɪd dɛk",
        exampleEn: "Our slide deck has ten slides.",
        exampleJp: "私たちのスライド資料は10枚あります。",
      },
      {
        word: "agenda",
        wordJp: "議題（アジェンダ）",
        pronunciation: "əˈdʒɛndə",
        exampleEn: "Here is today's agenda.",
        exampleJp: "こちらが本日の議題です。",
      },
      {
        word: "key takeaway",
        wordJp: "重要なポイント",
        pronunciation: "kiː ˈteɪkəweɪ",
        exampleEn: "The key takeaway is that sales are rising.",
        exampleJp: "重要なポイントは、売上が伸びていることです。",
      },
      {
        word: "eye contact",
        wordJp: "アイコンタクト",
        pronunciation: "aɪ ˈkɒntækt",
        exampleEn: "Make eye contact with the audience.",
        exampleJp: "聴衆とアイコンタクトを取りましょう。",
      },
      {
        word: "rehearse",
        wordJp: "リハーサルをする",
        pronunciation: "rɪˈhɜːrs",
        exampleEn: "I rehearsed my presentation twice.",
        exampleJp: "私はプレゼンを2回リハーサルしました。",
      },
      {
        word: "Q&A",
        wordJp: "質疑応答",
        pronunciation: "ˌkjuː ən ˈeɪ",
        exampleEn: "We'll have Q&A at the end.",
        exampleJp: "最後に質疑応答があります。",
      },
    ],
    grammarTip: {
      ruleEn: "In presentations, use polite signposting: 'I'd like to + verb' to state your intention, 'I'm going to + verb' to outline the plan, and 'Let me + verb' to guide the audience. Do not say 'explain about'—use 'explain + noun'.",
      ruleJp: "プレゼンでは丁寧なサインポスト表現を使いましょう。意図を述べるときは “I'd like to + 動詞”、計画を示すときは “I'm going to + 動詞”、聴衆を導くときは “Let me + 動詞” を使います。“explain about” は誤用で、“explain + 名詞” とします。",
      examples: [
        {
          en: "I'd like to start with the agenda.",
          jp: "まず議題から始めたいと思います。",
        },
        {
          en: "Today I'm going to talk about our new product.",
          jp: "今日は新製品についてお話しします。",
        },
        {
          en: "Let me explain our timeline.",
          jp: "タイムラインをご説明します。",
        },
      ],
    },
    context: "Saori is practicing a short presentation about a new service with Michael at work.",
    contextJp: "サオリは職場で新サービスの短いプレゼンをマイケルと一緒に練習しています。",
    dialogue: [
      {
        speaker: "Saori",
        lineEn: "I'd like to run through my slide deck. Can you give me feedback?",
        lineJp: "スライド資料を一通り確認したいです。フィードバックをいただけますか？",
      },
      {
        speaker: "Michael",
        lineEn: "Sure. Start with the agenda so the audience knows the flow.",
        lineJp: "もちろん。流れが伝わるように、まず議題から始めてください。",
      },
      {
        speaker: "Saori",
        lineEn: "Okay. Today I'm going to introduce the service and explain the timeline.",
        lineJp: "わかりました。今日はサービスを紹介して、タイムラインを説明します。",
      },
      {
        speaker: "Michael",
        lineEn: "Good. Remember to make eye contact and speak slowly.",
        lineJp: "いいですね。アイコンタクトを取り、ゆっくり話すのを忘れないで。",
      },
      {
        speaker: "Saori",
        lineEn: "Got it. We'll have Q&A at the end, and the key takeaway is our launch date.",
        lineJp: "了解です。最後に質疑応答があり、重要なポイントは発売日です。",
      },
      {
        speaker: "Michael",
        lineEn: "Great. If you rehearse once more, you'll sound confident.",
        lineJp: "素晴らしい。もう一度リハーサルすれば、自信があるように聞こえますよ。",
      },
    ],
    flashcards: [
      {
        front: "agenda",
        back: "議題（アジェンダ）",
        type: "en-to-jp",
      },
      {
        front: "質疑応答",
        back: "Q&A",
        type: "jp-to-en",
      },
      {
        front: "rehearse",
        back: "リハーサルをする",
        type: "en-to-jp",
      },
      {
        front: "アイコンタクトを取る",
        back: "make eye contact",
        type: "jp-to-en",
      },
      {
        front: "slide deck",
        back: "スライド資料",
        type: "en-to-jp",
      },
      {
        front: "重要なポイント",
        back: "key takeaway",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "本日の議題から始めます。",
        correct: "I'd like to start with today's agenda.",
        wrong: [
          "I like to start with today's agenda.",
          "I will start from today's agenda.",
        ],
      },
      {
        sentenceJp: "最後に質疑応答があります。",
        correct: "We will have Q&A at the end.",
        wrong: [
          "We have Q&A in the end.",
          "We will have Q&A on the end.",
        ],
      },
      {
        sentenceJp: "時間があれば、タイムラインを説明します。",
        correct: "If we have time, I'll explain the timeline.",
        wrong: [
          "If we have time, I'll explain about the timeline.",
          "If we have time, I explain the timeline.",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "Today ___ going to talk about our new project.",
        blank: "I'm",
        options: [
          "I'm",
          "I",
          "I am",
          "I be",
        ],
      },
      {
        sentence: "Let me ___ the agenda first.",
        blank: "explain",
        options: [
          "explain",
          "explain about",
          "to explain",
          "explains",
        ],
      },
      {
        sentence: "Please make ___ contact with the audience.",
        blank: "eye",
        options: [
          "eye",
          "eyes",
          "a eye",
          "an eye",
        ],
      },
      {
        sentence: "We will have Q&A ___ the end.",
        blank: "at",
        options: [
          "at",
          "in",
          "on",
          "to",
        ],
      },
    ],
  },
  {
    lessonKey: "l4-c1-05",
    lessonNumber: 5,
    title: "Review — Work Life",
    titleJp: "復習 — 仕事と職場",
    goal: "I can review and confidently use key language about work life (commute, meetings, deadlines, overtime, remote work, promotions).",
    goalJp: "通勤、会議、締め切り、残業、リモートワーク、昇進など、仕事に関する重要な表現と文法を復習して使えるようになる。",
    lessonType: "REVIEW" as const,
    vocabulary: [
      {
        word: "commute",
        wordJp: "通勤する",
        pronunciation: "kəˈmjuːt",
        exampleEn: "I commute by train to our Tokyo office.",
        exampleJp: "私は電車で東京オフィスに通勤します。",
      },
      {
        word: "coworker",
        wordJp: "同僚",
        pronunciation: "ˈkoʊˌwɜːrkər",
        exampleEn: "My coworker helps me with reports.",
        exampleJp: "同僚が報告書を手伝ってくれます。",
      },
      {
        word: "deadline",
        wordJp: "締め切り",
        pronunciation: "ˈdedlaɪn",
        exampleEn: "We have a deadline on Friday.",
        exampleJp: "金曜日に締め切りがあります。",
      },
      {
        word: "overtime",
        wordJp: "残業",
        pronunciation: "ˈoʊvərˌtaɪm",
        exampleEn: "Kenji worked overtime to finish the project.",
        exampleJp: "健司はプロジェクトを終えるために残業しました。",
      },
      {
        word: "remote work",
        wordJp: "リモートワーク",
        pronunciation: "rɪˈmoʊt wɜːrk",
        exampleEn: "I do remote work twice a week.",
        exampleJp: "私は週に2回リモートワークをします。",
      },
      {
        word: "promotion",
        wordJp: "昇進",
        pronunciation: "prəˈmoʊʃən",
        exampleEn: "She got a promotion last month.",
        exampleJp: "彼女は先月昇進しました。",
      },
    ],
    grammarTip: {
      ruleEn: "Use the present perfect (have/has + past participle) to talk about: 1) life/work experience, 2) changes or results that affect now, and 3) states that started in the past and continue now. Common time words: for, since, already, yet, ever, never. Do not use it with finished past times (yesterday, last week).",
      ruleJp: "現在完了形（have/has + 過去分詞）は、①人生・仕事の経験、②今に影響する変化や結果、③過去に始まり今も続く状態を表します。よく使う語：for, since, already, yet, ever, never。昨日・先週などの完了した過去の時間表現とは一緒に使いません。",
      examples: [
        {
          en: "I have worked here for three years.",
          jp: "私はここで3年間働いています。",
        },
        {
          en: "Have you ever led a meeting?",
          jp: "今までに会議を主導したことはありますか？",
        },
        {
          en: "He hasn't finished the report yet.",
          jp: "彼はまだ報告書を終えていません。",
        },
      ],
    },
    context: "Saori and Alex are reviewing their work goals at a café after a team meeting.",
    contextJp: "サオリとアレックスはチーム会議の後、カフェで仕事の目標を振り返っています。",
    dialogue: [
      {
        speaker: "Saori",
        lineEn: "Have you ever worked remotely, Alex?",
        lineJp: "アレックス、今までにリモートで働いたことはありますか？",
      },
      {
        speaker: "Alex",
        lineEn: "Yes, I've done remote work since last year, but I still commute twice a week.",
        lineJp: "はい、昨年からリモートワークをしていますが、週に2回はまだ通勤しています。",
      },
      {
        speaker: "Saori",
        lineEn: "Nice. My coworker Maria has already finished the report.",
        lineJp: "いいですね。私の同僚のマリアはもう報告書を終えています。",
      },
      {
        speaker: "Alex",
        lineEn: "Great! Have we met the deadline yet?",
        lineJp: "よかった！私たちはもう締め切りに間に合いましたか？",
      },
      {
        speaker: "Saori",
        lineEn: "Not yet. Kenji is working overtime tonight to double-check it.",
        lineJp: "まだです。健司は確認のために今夜残業しています。",
      },
      {
        speaker: "Alex",
        lineEn: "He's dedicated. By the way, I've heard Yuki might get a promotion.",
        lineJp: "彼は熱心ですね。ところで、ユキが昇進するかもしれないと聞きました。",
      },
    ],
    flashcards: [
      {
        front: "commute",
        back: "通勤する",
        type: "en-to-jp",
      },
      {
        front: "同僚",
        back: "coworker",
        type: "jp-to-en",
      },
      {
        front: "deadline",
        back: "締め切り",
        type: "en-to-jp",
      },
      {
        front: "残業",
        back: "overtime",
        type: "jp-to-en",
      },
      {
        front: "remote work",
        back: "リモートワーク",
        type: "en-to-jp",
      },
      {
        front: "昇進",
        back: "promotion",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "私はこの会社で3年間働いています。",
        correct: "I have worked at this company for three years.",
        wrong: [
          "I work at this company since three years.",
          "I am working at this company for three years.",
        ],
      },
      {
        sentenceJp: "彼はもう報告書を終えましたか。",
        correct: "Has he finished the report yet?",
        wrong: [
          "Did he finished the report yet?",
          "Has he finish the report yet?",
        ],
      },
      {
        sentenceJp: "私たちは今週ずっとリモートワークをしています。",
        correct: "We have worked remotely all week.",
        wrong: [
          "We worked remote all week.",
          "We are working remote all week.",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "I ___ worked here since 2021.",
        blank: "have",
        options: [
          "have",
          "has",
          "am",
          "did",
        ],
      },
      {
        sentence: "Has Kenji ___ the report yet?",
        blank: "finished",
        options: [
          "finished",
          "finish",
          "finishes",
          "finishing",
        ],
      },
      {
        sentence: "We usually ___ the office at 7 p.m., so overtime is rare.",
        blank: "leave",
        options: [
          "leave",
          "leaves",
          "left",
          "leaving",
        ],
      },
      {
        sentence: "She has ___ three promotions in her career.",
        blank: "had",
        options: [
          "had",
          "has",
          "have",
          "having",
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Level 4 — Chapter 2: Social Situations  (5 lessons)
// ---------------------------------------------------------------------------
const chapter4_2 = [
  {
    lessonKey: "l4-c2-01",
    lessonNumber: 1,
    title: "Making Plans",
    titleJp: "予定を立てる",
    goal: "I can listen to and understand people making plans in social situations.",
    goalJp: "社交の場面で予定を立てる会話を聞いて理解できる。",
    lessonType: "LISTENING" as const,
    vocabulary: [
      {
        word: "make plans",
        wordJp: "予定を立てる",
        pronunciation: "meɪk plænz",
        exampleEn: "Let's make plans for the weekend.",
        exampleJp: "週末の予定を立てましょう。",
      },
      {
        word: "check my schedule",
        wordJp: "予定を確認する",
        pronunciation: "tʃɛk maɪ ˈskɛdʒuːl",
        exampleEn: "I'm going to check my schedule and text you.",
        exampleJp: "予定を確認してメッセージします。",
      },
      {
        word: "be available",
        wordJp: "空いている／都合がつく",
        pronunciation: "bi əˈveɪləbəl",
        exampleEn: "Are you available on Thursday?",
        exampleJp: "木曜日は空いていますか？",
      },
      {
        word: "meet up",
        wordJp: "会う／集まる",
        pronunciation: "miːt ʌp",
        exampleEn: "We can meet up after work.",
        exampleJp: "仕事の後に会えます。",
      },
      {
        word: "rain check",
        wordJp: "また今度にする",
        pronunciation: "reɪn tʃɛk",
        exampleEn: "Can I take a rain check on dinner?",
        exampleJp: "夕食はまた今度でもいいですか？",
      },
      {
        word: "reschedule",
        wordJp: "予定を変更する",
        pronunciation: "ˌriːˈskɛdʒuːl",
        exampleEn: "Can we reschedule for next Friday?",
        exampleJp: "来週の金曜日に変更できますか？",
      },
    ],
    grammarTip: {
      ruleEn: "Use the present continuous to talk about fixed future arrangements (be + -ing). Use 'be going to' for plans or intentions without a fixed arrangement.",
      ruleJp: "確定した近い未来の予定には現在進行形（be + -ing）を使います。まだ確定していない意図・計画には be going to を使います。",
      examples: [
        {
          en: "We're meeting at 7 p.m. this Friday.",
          jp: "私たちは今週金曜の午後7時に会う予定です。",
        },
        {
          en: "I'm going to check my schedule tonight.",
          jp: "私は今夜スケジュールを確認するつもりです。",
        },
        {
          en: "Kenji isn't coming on Sunday; he's working late.",
          jp: "健司は日曜日は来ません。遅くまで働く予定です。",
        },
      ],
    },
    context: "Saori and Nick are making weekend plans over the phone.",
    contextJp: "サオリとニックは電話で週末の予定を立てています。",
    dialogue: [
      {
        speaker: "Nick",
        lineEn: "Hey Saori, are you free on Saturday evening?",
        lineJp: "ねえサオリ、土曜の夜は空いてる？",
      },
      {
        speaker: "Saori",
        lineEn: "Maybe. I'm going to check my schedule after work.",
        lineJp: "たぶん。仕事の後に予定を確認するつもりです。",
      },
      {
        speaker: "Nick",
        lineEn: "No problem. We're meeting some friends at a new ramen place at seven.",
        lineJp: "大丈夫。7時に新しいラーメン屋で友だちと会う予定なんだ。",
      },
      {
        speaker: "Saori",
        lineEn: "Sounds good! If I can't make it, can I take a rain check?",
        lineJp: "いいね！もし行けなかったら、また今度でもいい？",
      },
      {
        speaker: "Nick",
        lineEn: "Sure. If Saturday doesn't work, we can reschedule for Sunday.",
        lineJp: "もちろん。土曜日が無理なら、日曜日に変更できるよ。",
      },
      {
        speaker: "Saori",
        lineEn: "Okay, I'll text you in an hour to confirm.",
        lineJp: "わかった。1時間後に確認のメッセージを送るね。",
      },
    ],
    flashcards: [
      {
        front: "make plans",
        back: "予定を立てる",
        type: "en-to-jp",
      },
      {
        front: "空いている（都合がつく）",
        back: "be available",
        type: "jp-to-en",
      },
      {
        front: "meet up",
        back: "会う／集まる",
        type: "en-to-jp",
      },
      {
        front: "予定を変更する",
        back: "reschedule",
        type: "jp-to-en",
      },
      {
        front: "rain check",
        back: "また今度にする",
        type: "en-to-jp",
      },
      {
        front: "予定を確認する",
        back: "check my schedule",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "土曜日は空いていますか？",
        correct: "Are you free on Saturday?",
        wrong: [
          "Are you free in Saturday?",
          "Do you free on Saturday?",
        ],
      },
      {
        sentenceJp: "7時に会って映画を見ましょう。",
        correct: "Let's meet at seven and watch a movie.",
        wrong: [
          "Let's meet seven and watch a movie.",
          "Let's we meet at seven and watch a movie.",
        ],
      },
      {
        sentenceJp: "私は今夜スケジュールを確認するつもりです。",
        correct: "I'm going to check my schedule tonight.",
        wrong: [
          "I am check my schedule tonight.",
          "I check my schedule tonight.",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "We ___ at 7 p.m. on Friday.",
        blank: "are meeting",
        options: [
          "are meeting",
          "meet",
          "are meet",
          "meeting",
        ],
      },
      {
        sentence: "I'm going to ___ my schedule tonight.",
        blank: "check",
        options: [
          "check",
          "checked",
          "checking",
          "to check",
        ],
      },
      {
        sentence: "Are you free ___ Sunday?",
        blank: "on",
        options: [
          "on",
          "in",
          "at",
          "for",
        ],
      },
      {
        sentence: "Saori ___ coming if she has to work late.",
        blank: "isn't",
        options: [
          "isn't",
          "don't",
          "not",
          "doesn't",
        ],
      },
    ],
  },
  {
    lessonKey: "l4-c2-02",
    lessonNumber: 2,
    title: "At a Restaurant",
    titleJp: "レストランで",
    goal: "I can listen to and understand conversations for ordering and paying at a restaurant.",
    goalJp: "レストランでの注文や会計の会話を聞いて理解できるようになる。",
    lessonType: "LISTENING" as const,
    vocabulary: [
      {
        word: "reservation",
        wordJp: "予約",
        pronunciation: "ˌrɛzərˈveɪʃən",
        exampleEn: "We have a reservation under Tanaka.",
        exampleJp: "田中の名前で予約があります。",
      },
      {
        word: "menu",
        wordJp: "メニュー",
        pronunciation: "ˈmɛnju",
        exampleEn: "Could I see the menu, please?",
        exampleJp: "メニューを見せていただけますか？",
      },
      {
        word: "order",
        wordJp: "注文する",
        pronunciation: "ˈɔːrdər",
        exampleEn: "I'd like to order the pasta.",
        exampleJp: "パスタを注文したいです。",
      },
      {
        word: "appetizer",
        wordJp: "前菜",
        pronunciation: "ˈæpɪtaɪzər",
        exampleEn: "Let's share an appetizer.",
        exampleJp: "前菜をシェアしましょう。",
      },
      {
        word: "main course",
        wordJp: "メイン料理",
        pronunciation: "meɪn kɔːrs",
        exampleEn: "What is today's main course?",
        exampleJp: "今日のメイン料理は何ですか。",
      },
      {
        word: "the bill",
        wordJp: "お会計",
        pronunciation: "ðə bɪl",
        exampleEn: "Could we have the bill, please?",
        exampleJp: "お会計をお願いします。",
      },
    ],
    grammarTip: {
      ruleEn: "Use 'would like' to make polite requests or orders in restaurants. Form: Subject + would like + noun/to-infinitive. Questions: Would you like ...? Use 'I'd like ...' to order politely.",
      ruleJp: "レストランで丁寧に頼むときは“would like”を使います。形：主語 + would like + 名詞／不定詞(to + 動詞)。疑問文：Would you like ...? 自分の希望は “I'd like ...” を使います。",
      examples: [
        {
          en: "I'd like the grilled salmon, please.",
          jp: "グリルサーモンをお願いします。",
        },
        {
          en: "Would you like still or sparkling water?",
          jp: "炭酸なしの水と炭酸水、どちらになさいますか？",
        },
        {
          en: "She would like to sit by the window.",
          jp: "彼女は窓際に座りたいです。",
        },
      ],
    },
    context: "Saori is dining with a colleague, and the server Alex comes to take her order at a busy Italian restaurant.",
    contextJp: "サオリは同僚と食事中で、にぎやかなイタリア料理店で店員のアレックスが注文を取りに来ます。",
    dialogue: [
      {
        speaker: "Alex",
        lineEn: "Good evening. Do you have a reservation?",
        lineJp: "こんばんは。ご予約はございますか？",
      },
      {
        speaker: "Saori",
        lineEn: "Yes, a table for two under Tanaka.",
        lineJp: "はい、田中の名前で2名です。",
      },
      {
        speaker: "Alex",
        lineEn: "Great. Here's the menu. Can I get you something to drink?",
        lineJp: "かしこまりました。メニューです。お飲み物はいかがですか？",
      },
      {
        speaker: "Saori",
        lineEn: "I'd like still water and a glass of red wine, please.",
        lineJp: "お水（炭酸なし）と赤ワインを一杯お願いします。",
      },
      {
        speaker: "Alex",
        lineEn: "Of course. Are you ready to order?",
        lineJp: "かしこまりました。ご注文はお決まりですか？",
      },
      {
        speaker: "Saori",
        lineEn: "Yes. I'd like the tomato bruschetta to start and the seafood pasta as my main.",
        lineJp: "はい。前菜にトマトのブルスケッタ、メインにシーフードパスタをお願いします。",
      },
    ],
    flashcards: [
      {
        front: "reservation",
        back: "予約",
        type: "en-to-jp",
      },
      {
        front: "メイン料理",
        back: "main course",
        type: "jp-to-en",
      },
      {
        front: "order",
        back: "注文する",
        type: "en-to-jp",
      },
      {
        front: "お会計",
        back: "the bill",
        type: "jp-to-en",
      },
      {
        front: "appetizer",
        back: "前菜",
        type: "en-to-jp",
      },
      {
        front: "メニュー",
        back: "menu",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "田中の名前で予約があります。",
        correct: "We have a reservation under Tanaka.",
        wrong: [
          "We has a reservation under Tanaka.",
          "We have reservation under Tanaka.",
        ],
      },
      {
        sentenceJp: "おすすめは何ですか。",
        correct: "What do you recommend?",
        wrong: [
          "What do you recommend me?",
          "What is your recommend?",
        ],
      },
      {
        sentenceJp: "お会計をお願いします。",
        correct: "Could we have the bill, please?",
        wrong: [
          "Can we have bill, please?",
          "We want the bill, please.",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "___ we have a table by the window?",
        blank: "Could",
        options: [
          "Could",
          "Can",
          "Do",
          "Are",
        ],
      },
      {
        sentence: "I'd ___ to try the chef's special.",
        blank: "like",
        options: [
          "like",
          "want",
          "likes",
          "liking",
        ],
      },
      {
        sentence: "She ___ a reservation at seven.",
        blank: "has",
        options: [
          "has",
          "have",
          "is",
          "do",
        ],
      },
      {
        sentence: "What do you ___ for a main course?",
        blank: "recommend",
        options: [
          "recommend",
          "recommends",
          "recommendation",
          "recommended",
        ],
      },
    ],
  },
  {
    lessonKey: "l4-c2-03",
    lessonNumber: 3,
    title: "Compliments & Small Talk",
    titleJp: "褒め言葉とスモールトーク",
    goal: "I can give and respond to compliments and start small talk in social situations.",
    goalJp: "社交の場面で褒めたり返答したり、スモールトークを始められるようになる。",
    lessonType: "SPEAKING" as const,
    vocabulary: [
      {
        word: "small talk",
        wordJp: "雑談（スモールトーク）",
        pronunciation: "smɔl tɔk",
        exampleEn: "We made small talk about the weather.",
        exampleJp: "天気について雑談しました。",
      },
      {
        word: "give a compliment",
        wordJp: "褒め言葉を言う",
        pronunciation: "ɡɪv ə ˈkɑːmpləmənt",
        exampleEn: "She gave me a compliment on my presentation.",
        exampleJp: "彼女は私の発表を褒めてくれました。",
      },
      {
        word: "go well with",
        wordJp: "〜によく合う",
        pronunciation: "ɡoʊ wɛl wɪð",
        exampleEn: "Your shoes go well with that dress.",
        exampleJp: "あなたの靴はそのドレスによく合います。",
      },
      {
        word: "break the ice",
        wordJp: "緊張をほぐす（場の空気を和らげる）",
        pronunciation: "breɪk ði aɪs",
        exampleEn: "A joke can help break the ice.",
        exampleJp: "冗談は場の空気を和らげるのに役立ちます。",
      },
      {
        word: "polite",
        wordJp: "丁寧な",
        pronunciation: "pəˈlaɪt",
        exampleEn: "It's polite to say thank you.",
        exampleJp: "ありがとうと言うのは丁寧です。",
      },
      {
        word: "How's it going?",
        wordJp: "調子はどうですか？",
        pronunciation: "haʊz ɪt ˈɡoʊɪŋ",
        exampleEn: "How's it going? I'm Kenji.",
        exampleJp: "調子はどうですか？ケンジです。",
      },
    ],
    grammarTip: {
      ruleEn: "To give natural compliments, use these patterns: 1) I like/love + your + noun. 2) It/They look + adjective. Use it for singular items and they for plural items (e.g., shoes). 3) X goes well with Y to show a good match.",
      ruleJp: "自然な褒め方には次の型を使います：1) I like/love + your + 名詞。2) It/They look + 形容詞。単数はit、複数（shoesなど）はtheyを使います。3) X goes well with Y（XはYによく合う）。",
      examples: [
        {
          en: "I love your jacket. It looks great.",
          jp: "あなたのジャケット、素敵ですね。とても似合っています。",
        },
        {
          en: "Your shoes look comfortable. They go well with your suit.",
          jp: "あなたの靴は履き心地がよさそうですね。スーツによく合っています。",
        },
        {
          en: "I like your glasses. They look good on you.",
          jp: "眼鏡いいですね。よく似合っています。",
        },
      ],
    },
    context: "At a networking reception, Saori meets Alex for the first time.",
    contextJp: "ネットワーキングのレセプションで、サオリは初めてアレックスに会います。",
    dialogue: [
      {
        speaker: "Saori",
        lineEn: "Hi, I'm Saori. How's it going?",
        lineJp: "こんにちは、サオリです。調子はどうですか？",
      },
      {
        speaker: "Alex",
        lineEn: "Nice to meet you, Saori. I'm Alex. I love your jacket; it looks great.",
        lineJp: "はじめまして、サオリ。アレックスです。そのジャケット素敵ですね。とても似合っています。",
      },
      {
        speaker: "Saori",
        lineEn: "Thank you! Your tie goes well with your shirt.",
        lineJp: "ありがとうございます！ネクタイがシャツによく合っていますね。",
      },
      {
        speaker: "Alex",
        lineEn: "Thanks. Is this your first time at this event?",
        lineJp: "ありがとう。このイベントは初めてですか？",
      },
      {
        speaker: "Saori",
        lineEn: "Yes, it is. By the way, what do you do?",
        lineJp: "はい、そうです。ところで、お仕事は何をされていますか？",
      },
      {
        speaker: "Alex",
        lineEn: "I'm a designer. How about you?",
        lineJp: "デザイナーです。あなたは？",
      },
    ],
    flashcards: [
      {
        front: "small talk",
        back: "雑談（スモールトーク）",
        type: "en-to-jp",
      },
      {
        front: "褒め言葉を言う",
        back: "give a compliment",
        type: "jp-to-en",
      },
      {
        front: "go well with",
        back: "〜によく合う",
        type: "en-to-jp",
      },
      {
        front: "緊張をほぐす（場を和らげる）",
        back: "break the ice",
        type: "jp-to-en",
      },
      {
        front: "polite",
        back: "丁寧な",
        type: "en-to-jp",
      },
      {
        front: "調子はどうですか？",
        back: "How's it going?",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "そのネクタイ、シャツによく合いますね。",
        correct: "That tie goes well with your shirt.",
        wrong: [
          "That tie go well with your shirt.",
          "That tie goes good with your shirt.",
        ],
      },
      {
        sentenceJp: "素敵な時計ですね。どこで買いましたか？",
        correct: "I like your watch. Where did you buy it?",
        wrong: [
          "I like you watch. Where did you bought it?",
          "I am like your watch. Where do you buy it?",
        ],
      },
      {
        sentenceJp: "ところで、お仕事は何をされていますか？",
        correct: "By the way, what do you do?",
        wrong: [
          "By the way, what are you do?",
          "By the way, what do you doing?",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "That jacket ___ great on you.",
        blank: "looks",
        options: [
          "looks",
          "look",
          "is looking",
          "looking",
        ],
      },
      {
        sentence: "Your shoes ___ really nice.",
        blank: "are",
        options: [
          "are",
          "is",
          "be",
          "were",
        ],
      },
      {
        sentence: "These colors ___ well together.",
        blank: "go",
        options: [
          "go",
          "goes",
          "are go",
          "going",
        ],
      },
      {
        sentence: "By the way, what do you ___?",
        blank: "do",
        options: [
          "do",
          "doing",
          "does",
          "did",
        ],
      },
    ],
  },
  {
    lessonKey: "l4-c2-04",
    lessonNumber: 4,
    title: "Invitations",
    titleJp: "招待",
    goal: "I can invite someone, accept or decline politely, and suggest another time.",
    goalJp: "相手を誘い、丁寧に承諾・断り、別の時間を提案できる。",
    lessonType: "SPEAKING" as const,
    vocabulary: [
      {
        word: "invite",
        wordJp: "招待する",
        pronunciation: "ɪnˈvaɪt",
        exampleEn: "I'd like to invite you to my party.",
        exampleJp: "パーティーにあなたを招待したいです。",
      },
      {
        word: "be free",
        wordJp: "（予定が）空いている",
        pronunciation: "biː friː",
        exampleEn: "Are you free next Friday?",
        exampleJp: "来週の金曜日は空いていますか？",
      },
      {
        word: "join us",
        wordJp: "参加する／ご一緒する",
        pronunciation: "dʒɔɪn ʌs",
        exampleEn: "Would you like to join us for dinner?",
        exampleJp: "夕食にご一緒しませんか？",
      },
      {
        word: "make it",
        wordJp: "都合をつけて来る",
        pronunciation: "meɪk ɪt",
        exampleEn: "Can you make it to the meeting at 6?",
        exampleJp: "6時の会議に来られますか？",
      },
      {
        word: "rain check",
        wordJp: "また今度にする",
        pronunciation: "reɪn tʃɛk",
        exampleEn: "Can I take a rain check on tonight?",
        exampleJp: "今夜はまた今度にしてもいいですか？",
      },
      {
        word: "host",
        wordJp: "主催者／主催する",
        pronunciation: "hoʊst",
        exampleEn: "Kenji will host the event at his office.",
        exampleJp: "ケンジがオフィスでイベントを主催します。",
      },
    ],
    grammarTip: {
      ruleEn: "For polite invitations, use: 'Would you like to + base verb?' or 'How about + -ing?'. To decline softly, use 'I'm afraid + clause' or 'I can't make it + time/day', and suggest an alternative with 'How about/Maybe + time/day?'.",
      ruleJp: "丁寧に誘うときは「Would you like to + 動詞の原形?」や「How about + 動名詞?」を使います。やんわり断るときは「I'm afraid + 文」や「I can't make it + 時間/曜日」を使い、「How about / Maybe + 時間/曜日?」で代案を提案します。",
      examples: [
        {
          en: "Would you like to come to our get-together on Saturday?",
          jp: "土曜日の集まりに来ませんか。",
        },
        {
          en: "How about meeting at 7 p.m.?",
          jp: "午後7時に会うのはどうですか。",
        },
        {
          en: "I'm afraid I can't make it on Saturday. How about Sunday instead?",
          jp: "すみませんが、土曜日は都合がつきません。代わりに日曜日はどうですか。",
        },
      ],
    },
    context: "Saori is organizing a casual dinner and wants to invite Daniel.",
    contextJp: "サオリはカジュアルな夕食会を企画しており、ダニエルを誘いたがっています。",
    dialogue: [
      {
        speaker: "Saori",
        lineEn: "Hey Daniel, would you like to join us for a small get-together this Saturday?",
        lineJp: "ねえダニエル、今週の土曜日にちょっとした集まりに参加しませんか？",
      },
      {
        speaker: "Daniel",
        lineEn: "That sounds great! What time does it start?",
        lineJp: "いいですね！何時に始まりますか？",
      },
      {
        speaker: "Saori",
        lineEn: "How about meeting at 6 p.m. at Kanda Station?",
        lineJp: "午後6時に神田駅で会うのはどうですか？",
      },
      {
        speaker: "Daniel",
        lineEn: "I might not make it by six. Could we meet a bit later?",
        lineJp: "6時までに行けないかもしれません。少し遅く会えますか？",
      },
      {
        speaker: "Saori",
        lineEn: "No problem. Let's meet at 6:30 then.",
        lineJp: "大丈夫です。では6時30分に会いましょう。",
      },
      {
        speaker: "Daniel",
        lineEn: "Perfect. I'll be there. Thanks for the invitation!",
        lineJp: "完璧です。行きます。誘ってくれてありがとう！",
      },
    ],
    flashcards: [
      {
        front: "invite",
        back: "招待する",
        type: "en-to-jp",
      },
      {
        front: "（予定が）空いている",
        back: "be free",
        type: "jp-to-en",
      },
      {
        front: "join us",
        back: "参加する／ご一緒する",
        type: "en-to-jp",
      },
      {
        front: "都合をつけて来る",
        back: "make it",
        type: "jp-to-en",
      },
      {
        front: "rain check",
        back: "また今度にする",
        type: "en-to-jp",
      },
      {
        front: "主催者／主催する",
        back: "host",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "土曜日に私たちの集まりに来ませんか。",
        correct: "Would you like to join us on Saturday?",
        wrong: [
          "Do you like to join us on Saturday?",
          "Would you like join us on Saturday?",
        ],
      },
      {
        sentenceJp: "7時に会うのはどうですか。",
        correct: "How about meeting at 7?",
        wrong: [
          "How about meet at 7?",
          "How about to meet at 7?",
        ],
      },
      {
        sentenceJp: "申し訳ないですが、今日は都合がつきません。",
        correct: "I'm afraid I can't make it today.",
        wrong: [
          "I'm afraid I can't make today.",
          "I can't go to today.",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "Would you like ___ come to my place?",
        blank: "to",
        options: [
          "to",
          "for",
          "at",
          "-",
        ],
      },
      {
        sentence: "Are you ___ this Friday evening?",
        blank: "free",
        options: [
          "free",
          "freely",
          "open",
          "empty",
        ],
      },
      {
        sentence: "I'm afraid I can't ___ it on Tuesday.",
        blank: "make",
        options: [
          "make",
          "do",
          "go",
          "making",
        ],
      },
      {
        sentence: "How about ___ dinner at 6:30?",
        blank: "having",
        options: [
          "having",
          "to have",
          "have",
          "has",
        ],
      },
    ],
  },
  {
    lessonKey: "l4-c2-05",
    lessonNumber: 5,
    title: "Review (Social Situations)",
    titleJp: "復習（社交の場面）",
    goal: "I can review and handle common social situations: make small talk, make polite requests and offers, accept or decline invitations, and exchange contact details.",
    goalJp: "社交の場面でよくある状況を復習し、世間話をしたり、丁寧に依頼・申し出をしたり、招待を受ける／断る、連絡先を交換することができる。",
    lessonType: "REVIEW" as const,
    vocabulary: [
      {
        word: "make small talk",
        wordJp: "世間話をする",
        pronunciation: "meɪk smɔːl tɔːk",
        exampleEn: "We made small talk about the weather.",
        exampleJp: "私たちは天気について世間話をしました。",
      },
      {
        word: "break the ice",
        wordJp: "場の雰囲気を和ませる",
        pronunciation: "breɪk ðə aɪs",
        exampleEn: "A joke helped us break the ice.",
        exampleJp: "冗談がきっかけで打ち解けました。",
      },
      {
        word: "introduce (someone) to ~",
        wordJp: "（人を〜に）紹介する",
        pronunciation: "ˌɪntrəˈduːs",
        exampleEn: "May I introduce you to my colleague?",
        exampleJp: "あなたを私の同僚に紹介してもいいですか？",
      },
      {
        word: "exchange contact details",
        wordJp: "連絡先を交換する",
        pronunciation: "ɪksˈtʃeɪndʒ ˈkɒntækt ˈdiːteɪlz",
        exampleEn: "Shall we exchange contact details?",
        exampleJp: "連絡先を交換しませんか？",
      },
      {
        word: "RSVP",
        wordJp: "出欠を知らせる",
        pronunciation: "ˌɑːr ˌɛs ˌviː ˈpiː",
        exampleEn: "Please RSVP by Friday.",
        exampleJp: "金曜までに出欠をお知らせください。",
      },
      {
        word: "compliment",
        wordJp: "ほめ言葉／ほめる",
        pronunciation: "ˈkɒmplɪmənt",
        exampleEn: "He gave me a nice compliment.",
        exampleJp: "彼は私に素敵なほめ言葉をくれました。",
      },
    ],
    grammarTip: {
      ruleEn: "To be polite in social situations, use modal verbs for requests and offers. Use could/would for requests, would you mind + verb-ing for softer requests, and suggestions with shall we ...? or how about + verb-ing.",
      ruleJp: "社交の場面で丁寧に話すには、依頼・申し出に助動詞を使います。依頼には could/would、さらに柔らかくするには would you mind + 動詞-ing、誘いには shall we ～? や how about + 動詞-ing を使います。",
      examples: [
        {
          en: "Could you introduce me to the host?",
          jp: "主催者に私を紹介していただけますか？",
        },
        {
          en: "Would you mind waiting a minute?",
          jp: "1分ほど待っていただけますか？",
        },
        {
          en: "How about meeting after the talk?",
          jp: "発表の後に会いませんか？",
        },
      ],
    },
    context: "At a business networking event in Tokyo, Saori meets Daniel.",
    contextJp: "東京のビジネス交流会で、サオリはダニエルと出会います。",
    dialogue: [
      {
        speaker: "Saori",
        lineEn: "Hi, I'm Saori. May I introduce you to my colleague, Kenji?",
        lineJp: "こんにちは、サオリです。同僚のケンジを紹介してもいいですか？",
      },
      {
        speaker: "Daniel",
        lineEn: "Nice to meet you, Saori. Sure—and the MC's joke really broke the ice, didn't it?",
        lineJp: "はじめまして、サオリ。いいですよ。司会者のジョークで本当に場が和みましたよね？",
      },
      {
        speaker: "Saori",
        lineEn: "It did! Could you wait a moment while I get Kenji?",
        lineJp: "そうですね！私がケンジを呼んでくる間、少し待っていただけますか？",
      },
      {
        speaker: "Daniel",
        lineEn: "No problem. Also, would you mind opening this window? It's a bit warm.",
        lineJp: "大丈夫です。ついでに、この窓を開けてもらってもいいですか？少し暑いです。",
      },
      {
        speaker: "Saori",
        lineEn: "Not at all. By the way, shall we exchange contact details after you meet Kenji?",
        lineJp: "いいですよ。ところで、ケンジと会った後に連絡先を交換しませんか？",
      },
      {
        speaker: "Daniel",
        lineEn: "I'd love to. Thanks, and nice presentation—you got a lot of compliments.",
        lineJp: "ぜひ。ありがとう。それから発表、よかったですよ。たくさん褒められていました。",
      },
    ],
    flashcards: [
      {
        front: "break the ice",
        back: "場の雰囲気を和ませる",
        type: "en-to-jp",
      },
      {
        front: "世間話をする",
        back: "make small talk",
        type: "jp-to-en",
      },
      {
        front: "introduce (someone) to ~",
        back: "（人を〜に）紹介する",
        type: "en-to-jp",
      },
      {
        front: "連絡先を交換する",
        back: "exchange contact details",
        type: "jp-to-en",
      },
      {
        front: "compliment",
        back: "ほめ言葉／ほめる",
        type: "en-to-jp",
      },
      {
        front: "出欠を知らせる",
        back: "RSVP",
        type: "jp-to-en",
      },
    ],
    translate: [
      {
        sentenceJp: "連絡先を交換しませんか？",
        correct: "Shall we exchange contact details?",
        wrong: [
          "Do we exchange contact details?",
          "Let's exchange our contact.",
        ],
      },
      {
        sentenceJp: "失礼ですが、窓を開けていただけますか？",
        correct: "Excuse me, could you open the window?",
        wrong: [
          "Please open the window.",
          "Can you to open the window?",
        ],
      },
      {
        sentenceJp: "同僚をあなたに紹介してもいいですか？",
        correct: "May I introduce my colleague to you?",
        wrong: [
          "May I introduce my colleague for you?",
          "May I introduce you my colleague?",
        ],
      },
    ],
    fillBlank: [
      {
        sentence: "Would you mind ___ the window?",
        blank: "opening",
        options: [
          "opening",
          "to open",
          "open",
          "opened",
        ],
      },
      {
        sentence: "How about ___ small talk before the meeting?",
        blank: "making",
        options: [
          "making",
          "to make",
          "make",
          "made",
        ],
      },
      {
        sentence: "Could you ___ me to the host?",
        blank: "introduce",
        options: [
          "introduce",
          "introduces",
          "introducing",
          "to introduce",
        ],
      },
      {
        sentence: "Thanks for ___ me to your friends.",
        blank: "introducing",
        options: [
          "introducing",
          "introduce",
          "to introduce",
          "introduced",
        ],
      },
    ],
  },
]

const ALL_CHAPTERS = [
  { meta: CHAPTERS[0], lessons: chapter3_1 },
  { meta: CHAPTERS[1], lessons: chapter3_2 },
  { meta: CHAPTERS[2], lessons: chapter4_1 },
  { meta: CHAPTERS[3], lessons: chapter4_2 },
]

export const seedLessons = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("lessons").collect()
    for (const lesson of existing) {
      await ctx.db.delete(lesson._id)
    }
    if (existing.length > 0) {
      console.log(`Deleted ${existing.length} old lessons.`)
    }

    let count = 0
    for (const { meta, lessons } of ALL_CHAPTERS) {
      for (const lesson of lessons) {
        await ctx.db.insert("lessons", {
          ...lesson,
          level: meta.level,
          chapter: meta.chapter,
          chapterTitle: meta.title,
          chapterTitleJp: meta.titleJp,
        })
        count++
      }
    }
    console.log(`Seeded ${count} lessons across ${ALL_CHAPTERS.length} chapters.`)
  },
})
