import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { OfficialGuessGameCollection, Difficulty } from 'common';
import { useState } from 'react';

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

      <div className="space-y-4 text-ink-medium leading-relaxed bg-paper/50 p-6 rounded-lg border border-ink/10">
        <p className="text-lg font-serif text-ink-dark text-center mb-6">游戏规则</p>
        <p>
          这是一个<span className="text-ink-dark font-medium">猜字游戏</span>
          ，有一个隐藏的中心字目前不为人知。
        </p>
        <p>
          每位玩家会获得一张<span className="text-ink-dark font-medium">提示卡牌</span>
          ，上面有一个单字，可以与中心字构成二字短语。
        </p>
        <p>
          玩家需要根据这个单字，构想出<span className="text-ink-dark font-medium">两个额外的词汇</span>
          ，可以与这个单字组成二字词汇。
        </p>
        <p>
          确定词汇之后，把这两个用于拼词的字展示出来，供其他玩家推测中心字。
        </p>
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
