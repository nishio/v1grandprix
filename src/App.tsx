import { useState, useEffect } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { QuizGame } from './components/game/QuizGame'
import { GameOver } from './components/game/GameOver'
import { loadQuestions } from './services/questionService'
import { saveHighScore, getHighScore } from './services/questionService'
import { Question } from './types/game'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const loadedQuestions = await loadQuestions();
      setQuestions(loadedQuestions);
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  const highScore = getHighScore();

  const handleGameStart = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
  }

  const handleGameEnd = (finalScore: number) => {
    setScore(finalScore)
    saveHighScore(finalScore)
    setGameOver(true)
    setGameStarted(false)
  }

  const handleRestart = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-[350px]">
          <CardContent className="text-center py-8">
            <p>問題を読み込み中...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-[350px]">
          <CardContent className="text-center py-8">
            <p className="text-red-500">問題データが見つかりません。</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <GameOver 
          score={score} 
          totalQuestions={questions.length} 
          onRestart={handleRestart} 
        />
      </div>
    )
  }

  if (gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <QuizGame onGameEnd={handleGameEnd} />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">V1グランプリ</CardTitle>
          <CardDescription className="text-center">失言言い訳ゲーム</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="mb-4">ようこそ！</p>
            <p className="mb-2">あなたはプレイヤーコメンテーターとして、炎上発言に対する最も説得力のある言い訳を選ぶ必要があります。</p>
            <p className="mb-2">最も高得点の言い訳を選びましょう！</p>
            <p className="mb-4">制限時間は5秒です。素早く判断してください！</p>
            {highScore > 0 && (
              <p className="text-sm text-blue-600 font-bold mb-2">現在のハイスコア: {highScore}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={handleGameStart}
            className="w-full"
          >
            ゲームを始める
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
