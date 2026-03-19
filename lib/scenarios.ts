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
}

export const SCENARIOS: Scenario[] = [
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
