'use client';

import { ContentBlock } from '@/lib/types';
import { Explanation } from './blocks/explanation';
import { VocabularyTable } from './blocks/vocabulary-table';
import { GrammarTable } from './blocks/grammar-table';
import { Dialogue } from './blocks/dialogue';
import { QuizMCQ } from './blocks/quiz-mcq';
import { QuizFillBlank } from './blocks/quiz-fill-blank';
import { Tip } from './blocks/tip';
import { CulturalNote } from './blocks/cultural-note';
import { PracticePrompt } from './blocks/practice-prompt';

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'heading':
      return <h2 key={index} className="text-[22px] font-semibold text-text-primary">{block.text}</h2>;
    case 'explanation':
      return <Explanation key={index} html={block.html} />;
    case 'vocabulary_table':
      return <VocabularyTable key={index} words={block.words} />;
    case 'grammar_table':
      return <GrammarTable key={index} rules={block.rules} />;
    case 'dialogue':
      return <Dialogue key={index} lines={block.lines} />;
    case 'quiz_mcq':
      return <QuizMCQ key={index} question={block.question} options={block.options} correctIndex={block.correctIndex} explanation={block.explanation} />;
    case 'quiz_fill_blank':
      return <QuizFillBlank key={index} sentence={block.sentence} blank={block.blank} answer={block.answer} />;
    case 'tip':
      return <Tip key={index} text={block.text} />;
    case 'cultural_note':
      return <CulturalNote key={index} text={block.text} />;
    case 'practice_prompt':
      return <PracticePrompt key={index} text={block.text} />;
    default:
      return null;
  }
}

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}
