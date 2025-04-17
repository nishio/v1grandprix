import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Difficulty } from '../../types/game';

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
}

export function DifficultySelector({ onSelect }: DifficultySelectorProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl text-center">難易度を選択</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={() => onSelect('easy')} 
          className="w-full mb-2"
          variant="outline"
        >
          簡単 (どの言い訳を選んでも続行できます)
        </Button>
        <Button 
          onClick={() => onSelect('hard')} 
          className="w-full"
          variant="destructive"
        >
          難しい (低得点の言い訳を選ぶと即終了です！)
        </Button>
      </CardContent>
    </Card>
  );
}
