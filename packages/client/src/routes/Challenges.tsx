import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faCheck } from '@fortawesome/free-solid-svg-icons';
import { OfficialGuessGameCollection, Difficulty, formatTime } from 'common';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ChallengeResult {
  completed: boolean;
  time: number;
  difficulty: Difficulty;
  completedAt: number;
}

function loadChallengeResult(id: string): ChallengeResult | null {
  const saved = localStorage.getItem(`challengeResult_${id}`);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
}

const difficulties: { key: Difficulty; label: string; score: number }[] = [
  { key: 'easy', label: '简单', score: 1 },
  { key: 'medium', label: '中等', score: 3 },
  { key: 'hard', label: '困难', score: 5 },
];

function getScoreByDifficulty(difficulty: Difficulty): number {
  return difficulties.find((d) => d.key === difficulty)?.score || 0;
}

export default function Challenges() {
  const navigate = useNavigate();
  const [showRules, setShowRules] = useState(false);
  const [challengeResults] = useState<Record<string, ChallengeResult>>(() => {
    const results: Record<string, ChallengeResult> = {};
    OfficialGuessGameCollection.forEach((game) => {
      const result = loadChallengeResult(game.id);
      if (result) {
        results[game.id] = result;
      }
    });
    return results;
  });

  const handleStartChallenge = (gameId: string, difficulty: Difficulty) => {
    navigate(`/challenge/${gameId}?difficulty=${difficulty}`);
  };

  const totalScore = Object.values(challengeResults).reduce(
    (sum, result) => sum + (result.completed ? getScoreByDifficulty(result.difficulty) : 0),
    0
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-center gap-3 mb-8">
        <h1 className="text-3xl font-serif text-ink-dark">题目列表</h1>
        <button
          onClick={() => setShowRules(true)}
          className="text-ink-light hover:text-ink-dark transition-colors"
          aria-label="游戏规则"
        >
          <FontAwesomeIcon icon={faCircleInfo} className="text-xl" />
        </button>
        <span className="ml-4 text-lg text-ink-medium">总分: <span className="text-green font-semibold">{totalScore}</span></span>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {OfficialGuessGameCollection.map((game) => {
          const result = challengeResults[game.id];
          const isCompleted = result?.completed;
          
          return (
            <Card key={game.id} className="paper-texture">
              <CardHeader>
                <CardTitle className="font-serif text-ink-dark flex items-center gap-2">
                  <span
                    className="text-2xl text-green select-none"
                    style={{ filter: isCompleted ? 'none' : 'blur(6px)' }}
                  >
                    {game.char}
                  </span>
                  <span className="text-base text-ink-light">#{game.id}</span>
                  {isCompleted && (
                    <span className="ml-auto text-xs text-cyan flex items-center gap-1">
                      <FontAwesomeIcon icon={faCheck} />
                      已完成
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-ink-medium mb-4">
                  关联词数: {game.relatedChars.length}
                  {isCompleted && (
                    <>
                      <span className="ml-3">用时: {formatTime(result.time)}</span>
                      <span className="ml-3 text-green">+{getScoreByDifficulty(result.difficulty)}分</span>
                    </>
                  )}
                </p>
                <div className="flex gap-2">
                  {difficulties.map(({ key, label }) => (
                    <Button
                      key={key}
                      variant="outline"
                      size="sm"
                      onClick={() => handleStartChallenge(game.id, key)}
                      className="flex-1"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">游戏规则</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-ink-medium leading-relaxed">
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
          <div className="flex justify-center pt-2">
            <Button variant="outline" onClick={() => setShowRules(false)}>
              我知道了
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
