import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faCheck, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { OfficialGuessGameCollection, AIGuessGameCollection, Difficulty, formatTime, getDailyChallenge } from 'common';
import { useUser } from '@/hooks/useAuth';
import { useSyncChallengeResults } from '@/hooks/useChallenge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GameRules } from '@/components/GameRules';

interface ChallengeResult {
  completed: boolean;
  time: number;
  score?: number;
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

const difficulties: { key: Difficulty; label: string }[] = [
  { key: 'easy', label: '简单' },
  { key: 'medium', label: '中等' },
  { key: 'hard', label: '困难' },
];

export default function Challenges() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const [showRules, setShowRules] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useSyncChallengeResults();

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
    (sum, result) => sum + (result.completed ? (result.score || 0) : 0),
    0
  );

  const dailyChallenge = getDailyChallenge(AIGuessGameCollection);
  const dailyChallengeResult = dailyChallenge ? loadChallengeResult(dailyChallenge.id) : null;
  const isDailyCompleted = dailyChallengeResult?.completed ?? false;

  const handleDailyChallenge = () => {
    if (dailyChallenge) {
      if (!user) {
        setShowLoginPrompt(true);
      } else {
        navigate(`/challenge/${dailyChallenge.id}?difficulty=hard`);
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-center gap-3 mb-6">
        <h1 className="text-3xl font-serif text-ink-dark">每日挑战</h1>
        <button
          onClick={() => setShowRules(true)}
          className="text-ink-light hover:text-ink-dark transition-colors"
          aria-label="游戏规则"
        >
          <FontAwesomeIcon icon={faCircleInfo} className="text-xl" />
        </button>
      </div>

      {dailyChallenge && (
        <button
          onClick={handleDailyChallenge}
          className={`w-full mb-8 py-8 px-6 rounded border transition-all ${
            isDailyCompleted
              ? 'bg-green/5 border-green/20 hover:border-green/40 hover:shadow-md group'
              : 'bg-cyan/8 border-cyan/20 hover:border-cyan/40 hover:shadow-md group'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
              isDailyCompleted
                ? 'bg-green/15 group-hover:bg-green/25 transition-colors'
                : 'bg-cyan/15 group-hover:bg-cyan/25 transition-colors'
            }`}>
              <FontAwesomeIcon
                icon={isDailyCompleted ? faCheck : faPaintBrush}
                className={`text-lg ${isDailyCompleted ? 'text-green' : 'text-cyan'}`}
              />
            </div>
            <div className={`font-serif text-xl tracking-wider ${
              isDailyCompleted ? 'text-green group-hover:text-green transition-colors' : 'text-ink-dark group-hover:text-cyan transition-colors'
            }`}>
              {isDailyCompleted ? '今日已完成' : '每日一题'}
            </div>
            <div className="text-sm text-ink-light mt-2 tracking-wide">
              {isDailyCompleted
                ? `得分 ${dailyChallengeResult?.score || 0} 分 · 点击查看答案`
                : '困难模式 · 挑战自我'
              }
            </div>
          </div>
        </button>
      )}

      <div className="flex items-center justify-center gap-3 mb-6">
        <h2 className="text-2xl font-serif text-ink-dark">题目列表</h2>
        <span className="text-lg text-ink-medium">总分: <span className="text-green font-semibold">{totalScore}</span></span>
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
                      <span className="ml-3 text-green">+{result.score || 0}分</span>
                    </>
                  )}
                </p>
                <div className="flex gap-2">
                  {isCompleted ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStartChallenge(game.id, 'hard')}
                      className="flex-1"
                    >
                      查看答案
                    </Button>
                  ) : (
                    difficulties.map(({ key, label }) => (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartChallenge(game.id, key)}
                        className="flex-1"
                      >
                        {label}
                      </Button>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center">单人挑战模式</DialogTitle>
          </DialogHeader>
          <GameRules />
          <div className="flex justify-center pt-2">
            <Button variant="outline" onClick={() => setShowRules(false)}>
              我知道了
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">需要登录</DialogTitle>
          </DialogHeader>
          <p className="text-center text-ink-medium">每日挑战需要登录后才能参与</p>
          <div className="flex justify-center gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowLoginPrompt(false)}>
              取消
            </Button>
            <Button onClick={() => navigate('/login')}>
              去登录
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
