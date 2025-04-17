import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { getHighScore } from '../../services/questionService';

interface GameOverProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function GameOver({ score, totalQuestions, onRestart }: GameOverProps) {
  const highScore = getHighScore();
  const isNewHighScore = score > highScore;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">ゲーム終了</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-lg mb-4">あなたのスコア: {score} / {totalQuestions}</p>
        <p className="mb-2">ハイスコア: {isNewHighScore ? score : highScore}</p>
        {isNewHighScore && <p className="text-yellow-500 font-bold mb-4">新記録達成！</p>}
        {score > 500 ? (
          <p className="text-green-600 font-bold mb-4">素晴らしい言い訳力です！</p>
        ) : score > 300 ? (
          <p className="text-blue-600 mb-4">なかなかの言い訳力です！</p>
        ) : (
          <p className="text-gray-600 mb-4">もう少し言い訳の練習が必要かも？</p>
        )}
        <p className="text-sm text-gray-500">もう一度挑戦してみましょう！</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onRestart} className="w-full">
          もう一度プレイ
        </Button>
      </CardFooter>
    </Card>
  );
}
