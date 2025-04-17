import { useState, useEffect } from 'react';
import { Progress } from '../ui/progress';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export function Timer({ duration, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 0.1;
        if (newTime <= 0) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return newTime;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    setProgress((timeLeft / duration) * 100);
  }, [timeLeft, duration]);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm">残り時間</span>
        <span className="text-sm">{timeLeft.toFixed(1)}秒</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
