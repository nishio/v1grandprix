export type Difficulty = 'easy' | 'normal' | 'hard';

export interface DifficultySettings {
  timeLimit: number; // 秒単位
  penaltyForWrongAnswer: boolean;
  pointsMultiplier: number;
}

export const difficultySettings: Record<Difficulty, DifficultySettings> = {
  easy: {
    timeLimit: 8,
    penaltyForWrongAnswer: false,
    pointsMultiplier: 1,
  },
  normal: {
    timeLimit: 5,
    penaltyForWrongAnswer: true,
    pointsMultiplier: 1.5,
  },
  hard: {
    timeLimit: 3,
    penaltyForWrongAnswer: true,
    pointsMultiplier: 2,
  },
};

export interface Option {
  text: string;
  points: number;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionIndex: number;
}

export interface GameState {
  score: number;
  currentQuestionIndex: number;
  gameOver: boolean;
  timeUp: boolean;
}
