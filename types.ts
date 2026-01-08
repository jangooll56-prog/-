
export enum QuizStatus {
  START = 'START',
  QUESTION = 'QUESTION',
  FEEDBACK = 'FEEDBACK',
  RESULTS = 'RESULTS',
  MATCHING = 'MATCHING',
  RIDDLE = 'RIDDLE'
}

export enum GameMode {
  QUIZ = 'QUIZ',
  MATCHING = 'MATCHING',
  RIDDLE = 'RIDDLE'
}

export interface FunctionalGroup {
  id: string;
  formula: string;
  name: string;
  description?: string;
  category: 'Hydrocarbon' | 'Oxygenated' | 'Nitrogenated' | 'Halogenated';
  svgPath: string; // SVG path or mini-component name
}

export interface QuizResult {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

export interface MatchItem {
  id: string;
  content: string;
  type: 'name' | 'formula';
  pairId: string;
}

export interface RiddleData {
  clues: string[];
  answer: string;
}
