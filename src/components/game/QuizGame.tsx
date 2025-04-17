import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Timer } from './Timer';
import { Question, Difficulty, difficultySettings } from '../../types/game';
import { DifficultySelector } from './DifficultySelector';
import { loadQuestions } from '../../services/questionService';

interface QuizGameProps {
  onGameEnd: (score: number) => void;
}

export function QuizGame({ onGameEnd }: QuizGameProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const loadedQuestions = await loadQuestions();
      setQuestions(loadedQuestions);
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;
  const settings = difficulty ? difficultySettings[difficulty] : null;

  useEffect(() => {
    if (gameOver || timeUp) {
      onGameEnd(score);
    }
  }, [gameOver, timeUp, score, onGameEnd]);

  const handleOptionClick = (optionIndex: number) => {
    if (!currentQuestion) return;

    if (optionIndex === currentQuestion.correctOptionIndex) {
      // 正解 - 点数を加算
      const pointsMultiplier = settings?.pointsMultiplier || 1;
      const pointsEarned = currentQuestion.options[optionIndex].points * pointsMultiplier;
      setScore(score + pointsEarned);
      
      // 次の問題へ
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // 全問題終了
        setGameOver(true);
      }
    } else {
      // 不正解
      if (settings?.penaltyForWrongAnswer) {
        // ゲーム終了
        setGameOver(true);
      } else {
        // 次の問題へ（簡単モードではミスしても続行）
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setGameOver(true);
        }
      }
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
  };

  const handleDifficultySelect = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-8">
          <p>問題を読み込み中...</p>
        </CardContent>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-8">
          <p className="text-red-500">問題データが見つかりません。</p>
        </CardContent>
      </Card>
    );
  }

  if (!difficulty) {
    return <DifficultySelector onSelect={handleDifficultySelect} />;
  }

  if (!gameStarted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">プレイヤーコメンテーターゲーム</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">あなたはプレイヤーコメンテーターです。</p>
          <p className="mb-4">炎上発言に対する言い訳を選んでください！</p>
          <p className="mb-4">最も高得点の言い訳を選ぶとスコアが加算されます。</p>
          {settings?.penaltyForWrongAnswer ? (
            <p className="mb-4 text-red-500">最高得点以外の言い訳を選ぶと即終了です！</p>
          ) : (
            <p className="mb-4 text-green-500">最高得点以外の言い訳を選んでも次の問題に進めます。</p>
          )}
          <p className="text-sm text-gray-500">制限時間内に回答してください。</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => setGameStarted(true)} className="w-full">
            ゲームスタート
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!currentQuestion) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-8">
          <p className="text-red-500">問題データが見つかりません。</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          問題 {currentQuestionIndex + 1}/{questions.length} 
          <span className="text-sm ml-2">
            難易度: {difficulty === 'easy' ? '簡単' : difficulty === 'normal' ? '普通' : '難しい'}
          </span>
        </CardTitle>
        <div className="mt-2">
          <Timer 
            duration={settings?.timeLimit || 5} 
            onTimeUp={handleTimeUp} 
            isActive={true} 
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <p className="text-lg font-medium mb-4">{currentQuestion.text}</p>
          <div className="grid grid-cols-1 gap-2">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto py-3 px-4"
                onClick={() => handleOptionClick(index)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm">スコア: {score}</div>
      </CardFooter>
    </Card>
  );
}
