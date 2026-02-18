import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDailyLeaderboard, useTotalLeaderboard } from '@/hooks/useChallenge';
import { formatTime, getDailyChallenge, AIGuessGameCollection, type Difficulty, type LeaderboardEntry, type TotalLeaderboardEntry } from 'common';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const difficultyLabels: Record<Difficulty, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
};

function DailyLeaderboardTable({ data }: { data: LeaderboardEntry[] }) {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-ink-medium">
        暂无数据
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-ink/20">
            <th className="py-3 px-4 text-left text-ink-medium font-normal">排名</th>
            <th className="py-3 px-4 text-left text-ink-medium font-normal">用户</th>
            <th className="py-3 px-4 text-right text-ink-medium font-normal">分数</th>
            <th className="py-3 px-4 text-right text-ink-medium font-normal">用时</th>
            <th className="py-3 px-4 text-center text-ink-medium font-normal">难度</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr
              key={entry.userId}
              className="border-b border-ink/10 hover:bg-ink/5 transition-colors"
            >
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm ${
                    index === 0
                      ? 'bg-gold text-white'
                      : index === 1
                        ? 'bg-gray-400 text-white'
                        : index === 2
                          ? 'bg-amber-700 text-white'
                          : 'text-ink-medium'
                  }`}
                >
                  {entry.rank}
                </span>
              </td>
              <td className="py-3 px-4 text-ink-dark">{entry.username}</td>
              <td className="py-3 px-4 text-right font-semibold text-green">
                {entry.score}
              </td>
              <td className="py-3 px-4 text-right text-ink-medium font-mono">
                {formatTime(entry.time)}
              </td>
              <td className="py-3 px-4 text-center">
                <span className="text-xs px-2 py-1 rounded bg-ink/10 text-ink-medium">
                  {difficultyLabels[entry.difficulty]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TotalLeaderboardTable({ data }: { data: TotalLeaderboardEntry[] }) {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-ink-medium">
        暂无数据
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-ink/20">
            <th className="py-3 px-4 text-left text-ink-medium font-normal">排名</th>
            <th className="py-3 px-4 text-left text-ink-medium font-normal">用户</th>
            <th className="py-3 px-4 text-right text-ink-medium font-normal">总分</th>
            <th className="py-3 px-4 text-right text-ink-medium font-normal">完成数</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr
              key={entry.userId}
              className="border-b border-ink/10 hover:bg-ink/5 transition-colors"
            >
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm ${
                    index === 0
                      ? 'bg-gold text-white'
                      : index === 1
                        ? 'bg-gray-400 text-white'
                        : index === 2
                          ? 'bg-amber-700 text-white'
                          : 'text-ink-medium'
                  }`}
                >
                  {entry.rank}
                </span>
              </td>
              <td className="py-3 px-4 text-ink-dark">{entry.username}</td>
              <td className="py-3 px-4 text-right font-semibold text-green">
                {entry.totalScore}
              </td>
              <td className="py-3 px-4 text-right text-ink-medium">
                {entry.completedChallenges}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Leaderboard() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [activeTab, setActiveTab] = useState<'daily' | 'total'>('daily');

  const dailyChallenge = useMemo(() => getDailyChallenge(AIGuessGameCollection), []);
  const effectiveChallengeId = challengeId || dailyChallenge?.id || '';

  const { data: dailyData, isLoading: dailyLoading } = useDailyLeaderboard(effectiveChallengeId);
  const { data: totalData, isLoading: totalLoading } = useTotalLeaderboard();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-center gap-3 mb-8">
        <h1 className="text-3xl font-serif text-ink-dark">排行榜</h1>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant={activeTab === 'daily' ? 'default' : 'outline'}
          onClick={() => setActiveTab('daily')}
        >
          今日挑战榜
        </Button>
        <Button
          variant={activeTab === 'total' ? 'default' : 'outline'}
          onClick={() => setActiveTab('total')}
        >
          总分榜
        </Button>
      </div>

      {activeTab === 'daily' && (
        <Card className="paper-texture">
          <CardHeader>
            <CardTitle className="font-serif text-ink-dark">
              {challengeId ? `挑战 ${challengeId} 排行榜` : '今日挑战排行榜'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dailyLoading ? (
              <div className="text-center py-8 text-ink-medium">加载中...</div>
            ) : (
              <DailyLeaderboardTable data={dailyData || []} />
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'total' && (
        <Card className="paper-texture">
          <CardHeader>
            <CardTitle className="font-serif text-ink-dark">总分排行榜</CardTitle>
          </CardHeader>
          <CardContent>
            {totalLoading ? (
              <div className="text-center py-8 text-ink-medium">加载中...</div>
            ) : (
              <TotalLeaderboardTable data={totalData || []} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
