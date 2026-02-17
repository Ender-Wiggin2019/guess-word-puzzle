import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { OfficialGuessGameCollection, Difficulty } from 'common';
import { useState } from 'react';
import { GameRules } from '@/components/GameRules';

interface ChallengeResult {
  completed: boolean;
  difficulty: Difficulty;
}

function getTotalScore(): number {
  const scoreMap: Record<Difficulty, number> = { easy: 1, medium: 3, hard: 5 };
  let total = 0;
  OfficialGuessGameCollection.forEach((game) => {
    const saved = localStorage.getItem(`challengeResult_${game.id}`);
    if (saved) {
      try {
        const result: ChallengeResult = JSON.parse(saved);
        if (result.completed) {
          total += scoreMap[result.difficulty];
        }
      } catch {
        return;
      }
    }
  });
  return total;
}

export default function Home() {
  const { data: user } = useUser();
  const navigate = useNavigate();
  const [totalScore] = useState(getTotalScore);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 space-y-10">
      <header className="text-center space-y-3">
        <h1 className="text-3xl font-serif font-semibold tracking-tight text-ink-dark">
          猜字解底
        </h1>
        <p className="text-cyan">
          {user ? `欢迎回来，${user.username}` : '以字会友，以词传情'}
        </p>
        <p className="text-ink-medium">
          当前总分: <span className="text-green font-semibold">{totalScore}</span>
        </p>
      </header>

      <div className="bg-paper/50 p-6 rounded-lg border border-ink/10">
        <p className="text-lg font-serif text-ink-dark text-center mb-6">单人挑战模式</p>
        <GameRules />
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={() => navigate('/challenges')}
          className="px-8"
        >
          开始挑战
        </Button>
      </div>

      <footer className="text-center pt-4">
        <p className="text-sm text-cyan-light">
          Made by Ender
        </p>
      </footer>
    </div>
  );
}
