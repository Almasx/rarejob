export type Scenario = {
  id: string
  title: string
  titleJp: string
  userRole: string
  aiRole: string
  goal: string
  goalJp: string
  difficulty: "beginner" | "intermediate" | "advanced"
  firstMessage: string
  curriculumSource?: string
  tutorPrompt?: string
}

export const SCENARIOS: Scenario[] = [
  {
    id: "mornings-discuss-ideas",
    title: "Mornings — Discuss Your Ideas",
    titleJp: "朝のルーティン — あなたの意見を言いましょう",
    userRole: "Student",
    aiRole: "RareJob Tutor",
    goal: "Discuss your morning routine and routine activities with the tutor",
    goalJp: "チューターと朝の日課と日々の活動について話し合う",
    difficulty: "beginner",
    curriculumSource: "Jitsuyo-Eikaiwa Level 3, Chapter 1, Lesson 1",
    firstMessage:
      "Hi! Welcome to today's lesson. We're going to practice talking about morning routines. To start, can you tell me — do you wake up early?",
    tutorPrompt: `This is the Jitsuyo-Eikaiwa Level 3 "Mornings" lesson, Challenge 2: Discuss Your Ideas.

Lesson goal: The student can discuss their morning routine and routine activities using simple present tense.

Today's grammar tip to reinforce gently (do NOT explicitly teach it):
- Simple present tense (-s / -es for he/she/it)
- don't / doesn't for negatives
- Possessive adjectives (my, your, his, her, our, their)

Target vocabulary the student may use: wake up, do my hair, eat breakfast, brush my teeth, take a shower, get dressed.

Discussion flow — cover Topic 1 first, then Topic 2. Ask one question at a time. After each student answer, react naturally (1 short sentence) and ask a follow-up that invites more detail, then move to the next question.

TOPIC 1 — MORNING ROUTINE:
1. Do you wake up early?
2. Do you always eat breakfast?
3. Do you exercise in the morning?
4. Do you have the same morning routine every day?

TOPIC 2 — ROUTINE ACTIVITIES:
1. What do you usually eat for breakfast (e.g. bread, rice)?
2. What do you usually drink in the morning (e.g. tea, coffee)?
3. Do you take a shower or a bath?
4. What's your night routine?

When both topics are covered (or the student has produced substantial answers across at least 6 of the 8 questions), wrap up warmly with a short affirmation and append [SCENARIO_COMPLETE] on its own line at the end.`,
  },
  {
    id: "ordering-coffee",
    title: "Ordering Coffee",
    titleJp: "コーヒーを注文する",
    userRole: "Customer",
    aiRole: "Barista",
    goal: "Order a drink with customizations and pay",
    goalJp: "カスタマイズしたドリンクを注文して支払いを完了する",
    difficulty: "beginner",
    firstMessage: "Hi there! Welcome to Sunrise Cafe. What can I get for you today?",
  },
  {
    id: "job-interview",
    title: "Job Interview",
    titleJp: "就職面接",
    userRole: "Job Applicant",
    aiRole: "Interviewer",
    goal: "Answer questions about your experience and ask about the role",
    goalJp: "経験について質問に答え、役割について質問する",
    difficulty: "advanced",
    firstMessage: "Good morning! Please have a seat. Thank you for coming in today. Could you start by telling me a little about yourself?",
  },
  {
    id: "asking-directions",
    title: "Asking for Directions",
    titleJp: "道を尋ねる",
    userRole: "Tourist",
    aiRole: "Local Resident",
    goal: "Get directions to a specific place and confirm you understand",
    goalJp: "特定の場所への道を聞いて理解を確認する",
    difficulty: "beginner",
    firstMessage: "Oh, hello! You look a bit lost. Can I help you find something?",
  },
  {
    id: "hotel-checkin",
    title: "Hotel Check-in",
    titleJp: "ホテルのチェックイン",
    userRole: "Guest",
    aiRole: "Hotel Receptionist",
    goal: "Check in, confirm your reservation, and ask about hotel amenities",
    goalJp: "チェックインし、予約内容を確認し、ホテルの設備について質問する",
    difficulty: "intermediate",
    firstMessage: "Good evening and welcome to the Grand Oak Hotel! Do you have a reservation with us?",
  },
  {
    id: "making-complaint",
    title: "Making a Complaint",
    titleJp: "苦情を伝える",
    userRole: "Customer",
    aiRole: "Store Manager",
    goal: "Explain the problem politely, request a solution, and reach an agreement",
    goalJp: "問題を丁寧に説明し、解決策を求め、合意に達する",
    difficulty: "advanced",
    firstMessage: "Hello, I'm the store manager. I understand you'd like to speak with me about something. How can I help?",
  },
  {
    id: "meeting-colleague",
    title: "Meeting a New Colleague",
    titleJp: "新しい同僚に会う",
    userRole: "New Employee",
    aiRole: "Colleague",
    goal: "Introduce yourself, learn about the workplace, and make plans for lunch",
    goalJp: "自己紹介をし、職場について学び、ランチの予定を立てる",
    difficulty: "intermediate",
    firstMessage: "Hey! You must be the new person joining our team. I'm Alex. It's great to meet you! How's your first day going so far?",
  },
]
