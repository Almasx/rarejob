export type LessonType = "LISTENING" | "SPEAKING" | "REVIEW"

export type Vocabulary = {
  word: string
  wordJp: string
  pronunciation: string
  exampleEn: string
  exampleJp: string
}

export type GrammarTip = {
  ruleEn: string
  ruleJp: string
  examples: { en: string; jp: string }[]
}

export type DialogueLine = {
  speaker: string
  lineEn: string
  lineJp: string
}

export type Flashcard = {
  front: string
  back: string
  type: "en-to-jp" | "jp-to-en"
}

export type TranslateItem = {
  sentenceJp: string
  correct: string
  wrong: string[]
}

export type FillBlankItem = {
  sentence: string
  blank: string
  options: string[]
}

export type Lesson = {
  id: string
  number: number
  title: string
  titleJp: string
  goal: string
  goalJp: string
  lessonType: LessonType
  present: {
    vocabulary: Vocabulary[]
    grammarTip: GrammarTip
  }
  comprehend: {
    context: string
    contextJp: string
    dialogue: DialogueLine[]
  }
  practice: {
    flashcards: Flashcard[]
    translate: TranslateItem[]
    fillBlank: FillBlankItem[]
  }
}

export type ShadowingItem = {
  speaker: string
  lineEn: string
  lineJp: string
}

export type ExerciseType = "flashcard" | "translate" | "fill-blank" | "shadowing"

export type Exercise =
  | { type: "flashcard"; data: Flashcard }
  | { type: "translate"; data: TranslateItem }
  | { type: "fill-blank"; data: FillBlankItem }
  | { type: "shadowing"; data: ShadowingItem }

export type AnswerResult = {
  exercise: Exercise
  correct: boolean
  userAnswer: string
}

export type UserProgress = {
  streak: number
  lastPracticeDate: string | null
  completedLessons: string[]
  weakPoints: WeakPoint[]
  practiceHistory: Record<string, boolean> // date -> practiced
}

export type WeakPoint = {
  term: string
  translation: string
  wrongCount: number
}
