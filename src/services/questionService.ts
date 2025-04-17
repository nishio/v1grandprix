import { Question } from '../types/game';

export async function loadQuestions(): Promise<Question[]> {
  try {
    const response = await fetch('/data/questions.json');
    if (!response.ok) {
      throw new Error('Failed to load questions');
    }
    
    const data = await response.json();
    
    // 受け取ったJSONデータを適切な形式に変換
    return data.map((q: any) => ({
      id: q.id,
      text: q.質問文,
      options: q.選択肢.map((opt: any) => ({
        text: opt.text,
        points: opt.score
      })),
      // 最も高いスコアを持つ選択肢を正解とする
      correctOptionIndex: q.選択肢.reduce((maxIndex: number, current: any, index: number, array: any[]) => {
        return current.score > array[maxIndex].score ? index : maxIndex;
      }, 0)
    }));
  } catch (error) {
    console.error('Error loading questions:', error);
    return [];
  }
}

export function saveHighScore(score: number): void {
  const currentHighScore = getHighScore();
  if (score > currentHighScore) {
    localStorage.setItem('highScore', score.toString());
  }
}

export function getHighScore(): number {
  const highScore = localStorage.getItem('highScore');
  return highScore ? parseInt(highScore, 10) : 0;
}
