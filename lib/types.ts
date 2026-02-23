export type UserProfile = {
  name: string;
  level: 'beginner' | 'high-beginner' | 'intermediate' | 'high-intermediate';
  interests: string[];
  nativeLanguage: string;
};

export type VocabRow = {
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
};

export type GrammarRow = {
  tense: string;
  structure: string;
  useCase: string;
  example: string;
};

export type DialogueLine = {
  speaker: string;
  text: string;
};

export type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'explanation'; html: string }
  | { type: 'vocabulary_table'; words: VocabRow[] }
  | { type: 'grammar_table'; rules: GrammarRow[] }
  | { type: 'dialogue'; lines: DialogueLine[] }
  | { type: 'quiz_mcq'; question: string; options: string[]; correctIndex: number; explanation: string }
  | { type: 'quiz_fill_blank'; sentence: string; blank: string; answer: string }
  | { type: 'tip'; text: string }
  | { type: 'cultural_note'; text: string }
  | { type: 'practice_prompt'; text: string };

export type Chapter = {
  id: string;
  title: string;
  icon: string;
  blocks: ContentBlock[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  coverEmoji: string;
  level: string;
  chapters: Chapter[];
};
