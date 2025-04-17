export type Difficulty = 'easy' | 'hard';

export interface DifficultySettings {
  timeLimit: number; // 秒単位
  penaltyForWrongAnswer: boolean;
  penaltyForLowScoreOptions: boolean; // 低得点の選択肢を選んだときにゲームオーバーにするかどうか
}

export const difficultySettings: Record<Difficulty, DifficultySettings> = {
  easy: {
    timeLimit: 5,
    penaltyForWrongAnswer: false,
    penaltyForLowScoreOptions: false,
  },
  hard: {
    timeLimit: 5,
    penaltyForWrongAnswer: false, // 高得点以外を選んでもゲームオーバーにしない
    penaltyForLowScoreOptions: true, // 低得点の2つの選択肢を選ぶと即座にゲームオーバー
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
