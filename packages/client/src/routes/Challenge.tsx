import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  OfficialGuessGameCollection,
  AIGuessGameCollection,
  Difficulty,
  defaultPlayerOption,
  getChallengeDisplayItems,
  validateAnswers,
  formatTime,
  calculateScore,
  ChallengeDisplayItem,
  PlayerOption,
} from 'common';
import { useSubmitChallengeResult } from '@/hooks/useChallenge';
import { useUser } from '@/hooks/useAuth';
import { CharItem } from '@/components/CharItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type DialogState = {
  open: boolean;
  type: 'success' | 'error' | 'incomplete' | 'completed' | null;
  wrongCount?: number;
  finalScore?: number;
};

function loadSavedPlayerOption(id: string | undefined): PlayerOption {
  if (!id) return defaultPlayerOption;
  const saved = localStorage.getItem(`playerOption_${id}`);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return { ...defaultPlayerOption, ...parsed };
    } catch {
      return defaultPlayerOption;
    }
  }
  return defaultPlayerOption;
}

function loadChallengeResult(id: string | undefined): { completed: boolean; time: number; score?: number } | null {
  if (!id) return null;
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

export default function Challenge() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const submitResult = useSubmitChallengeResult();

  const difficulty = (searchParams.get('difficulty') as Difficulty) || 'easy';
  const existingResult = loadChallengeResult(id);
  const isAlreadyCompleted = existingResult?.completed ?? false;
  const savedTime = existingResult?.time || 0;

  const playerOption = useMemo(() => loadSavedPlayerOption(id), [id]);
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const saved = loadSavedPlayerOption(id);
    return saved.answers || {};
  });
  const [wrongCount, setWrongCount] = useState<number | null>(null);
  const [wrongKeys, setWrongKeys] = useState<string[]>([]);
  const [elapsedTime, setElapsedTime] = useState(savedTime);
  const [penaltyTime, setPenaltyTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(isAlreadyCompleted);
  const [dialogState, setDialogState] = useState<DialogState>({ open: false, type: null });
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const game = useMemo(() => {
    let found = OfficialGuessGameCollection.find((g) => g.id === id);
    if (!found) {
      found = AIGuessGameCollection.find((g) => g.id === id);
    }
    return found;
  }, [id]);

  const displayData = useMemo(() => {
    if (!game) return null;
    return getChallengeDisplayItems(game, difficulty, playerOption.playerPosition);
  }, [game, difficulty, playerOption.playerPosition]);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `playerOption_${id}`,
      JSON.stringify({ ...playerOption, answers: formData })
    );
  }, [id, playerOption, formData]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    timerRef.current = window.setInterval(() => {
      if (!isCompleted) {
        setElapsedTime(Date.now() - startTimeRef.current);
      }
    }, 100);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isCompleted]);

  const handleFieldChange = useCallback((key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setWrongKeys((prev) => prev.filter((k) => k !== key));
    setWrongCount(null);
  }, []);

  const handleSubmit = () => {
    if (!displayData) return;

    const result = validateAnswers(displayData, formData);
    setWrongKeys(result.wrongKeys);

    if (!result.isComplete) {
      setDialogState({ open: true, type: 'incomplete' });
      return;
    }

    if (result.isCorrect) {
      completeChallenge();
    } else {
      setWrongCount(result.wrongCount);
      setPenaltyTime((prev) => prev + 10000);
      setDialogState({ open: true, type: 'error', wrongCount: result.wrongCount });
    }
  };

  const handleForceSubmit = () => {
    completeChallenge();
  };

  const completeChallenge = () => {
    if (!displayData || !id) return;

    setIsCompleted(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    const finalTime = elapsedTime + penaltyTime;
    const finalScore = calculateScore(displayData, formData);

    localStorage.setItem(
      `challengeResult_${id}`,
      JSON.stringify({
        completed: true,
        time: finalTime,
        score: finalScore,
        completedAt: Date.now(),
      })
    );
    if (user && id) {
      submitResult.mutate({
        challengeId: id,
        time: finalTime,
        score: finalScore,
        difficulty,
      });
    }
    setDialogState({ open: true, type: 'success', finalScore });
  };

  const closeDialog = () => {
    setDialogState({ open: false, type: null });
  };

  if (!game || !displayData) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-serif text-ink-dark">题目不存在</h1>
        <Button className="mt-4" onClick={() => navigate('/challenges')}>
          返回列表
        </Button>
      </div>
    );
  }

  const getDifficultyLabel = (d: Difficulty) => {
    switch (d) {
      case 'easy':
        return '简单';
      case 'medium':
        return '中等';
      case 'hard':
        return '困难';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-serif text-ink-dark">
          挑战 - {getDifficultyLabel(difficulty)}
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-ink-medium font-mono text-lg">
            {formatTime(elapsedTime + penaltyTime)}
          </div>
          <Button variant="outline" onClick={() => navigate('/challenges')}>
            返回
          </Button>
        </div>
      </div>

      <Card className="paper-texture mb-6">
        <CardHeader>
          <CardTitle className="font-serif text-ink-dark text-lg">中心词</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center gap-4">
            {isCompleted ? (
              <>
                <CharItem
                  readonly
                  char={formData[displayData.centerInputKey] || ''}
                  borderColor="rgb(56 142 142)"
                />
                <span className="text-ink-light text-sm">正确答案:</span>
                <CharItem
                  readonly
                  char={displayData.centerAnswer}
                  borderColor="rgb(76 135 76)"
                />
              </>
            ) : (
              <CharItem
                readonly={false}
                value={formData[displayData.centerInputKey] || ''}
                onChange={(val) => handleFieldChange(displayData.centerInputKey, val)}
                borderColor={wrongKeys.includes(displayData.centerInputKey) ? 'rgb(196 92 72)' : 'rgb(56 142 142)'}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="paper-texture mb-6">
        <CardHeader>
          <CardTitle className="font-serif text-ink-dark text-lg">玩家词汇</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayData.items.map((item, index) => (
              <ChallengeRow
                key={item.inputKey}
                item={item}
                value={formData[item.inputKey] || ''}
                onChange={handleFieldChange}
                isWrong={wrongKeys.includes(item.inputKey)}
                rowIndex={index}
                isCompleted={isCompleted}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {wrongCount !== null && wrongCount > 0 && (
        <div className="mb-4 text-center text-vermilion">
          有 {wrongCount} 个答案不正确
        </div>
      )}

      {isCompleted && (
        <div className="mb-4 text-center text-ink-dark font-serif">
          完成用时: {formatTime(elapsedTime + penaltyTime)}
        </div>
      )}

      <div className="flex justify-center gap-4">
        {isCompleted ? (
          <>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/challenges')}
              className="px-8"
            >
              返回列表
            </Button>
            <Button
              size="lg"
              onClick={() => navigate(`/leaderboard/${id}`)}
              className="px-8"
            >
              查看排行榜
            </Button>
          </>
        ) : (
          <Button
            size="lg"
            onClick={handleSubmit}
            className="px-8"
          >
            提交答案
          </Button>
        )}
      </div>

      <Dialog open={dialogState.open} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          {dialogState.type === 'success' && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-cyan">挑战完成</DialogTitle>
                <DialogDescription className="text-center text-lg font-serif text-ink-dark pt-2">
                  <div>得分: <span className="text-green font-semibold">{dialogState.finalScore}</span> 分</div>
                  <div className="mt-1">用时: {formatTime(elapsedTime + penaltyTime)}</div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-center gap-2">
                <Button variant="outline" onClick={() => navigate('/challenges')}>返回列表</Button>
                {id && (
                  <Button onClick={() => navigate(`/leaderboard/${id}`)}>查看排行榜</Button>
                )}
              </DialogFooter>
            </>
          )}
          {dialogState.type === 'error' && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-vermilion">答案有误</DialogTitle>
                <DialogDescription className="text-center pt-2">
                  有 {dialogState.wrongCount} 个答案不正确，请检查标红的格子
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-center gap-2">
                <Button variant="outline" onClick={closeDialog}>继续答题</Button>
                <Button onClick={handleForceSubmit}>强制提交</Button>
              </DialogFooter>
            </>
          )}
          {dialogState.type === 'incomplete' && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-ink-dark">未完成</DialogTitle>
                <DialogDescription className="text-center pt-2">
                  请填写所有需要猜测的空格
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-center">
                <Button variant="outline" onClick={closeDialog}>继续答题</Button>
              </DialogFooter>
            </>
          )}
          {dialogState.type === 'completed' && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-green">已完成</DialogTitle>
                <DialogDescription className="text-center text-lg font-serif text-ink-dark pt-2">
                  <div>得分: <span className="text-green font-semibold">{dialogState.finalScore}</span> 分</div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-center gap-2">
                <Button variant="outline" onClick={() => navigate('/challenges')}>返回列表</Button>
                {id && (
                  <Button onClick={() => navigate(`/leaderboard/${id}`)}>查看排行榜</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const guohuaColors = [
  'rgb(56 142 142)',
  'rgb(76 135 76)',
  'rgb(92 108 139)',
  'rgb(159 121 81)',
];

interface ChallengeRowProps {
  item: ChallengeDisplayItem;
  value: string;
  onChange: (key: string, value: string) => void;
  isWrong: boolean;
  rowIndex: number;
  isCompleted: boolean;
}

function ChallengeRow({ item, value, onChange, isWrong, rowIndex, isCompleted }: ChallengeRowProps) {
  const rowColor = guohuaColors[rowIndex % guohuaColors.length];

  if (!item.needsInput) {
    return (
      <div className="flex items-center gap-2 justify-center">
        {item.displayChars.map((char, index) => (
          <CharItem key={index} readonly char={char} borderColor={rowColor} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 justify-center">
      {item.displayChars.map((char, index) => (
        <CharItem key={index} readonly char={char} borderColor={rowColor} />
      ))}
      <div className="flex items-center justify-center w-6 text-ink-medium">|</div>
      {isCompleted ? (
        <div className="flex items-center gap-2">
          <CharItem readonly char={value} borderColor={rowColor} />
          <span className="text-ink-light text-sm">正确答案:</span>
          <CharItem readonly char={item.correctAnswer} borderColor="rgb(76 135 76)" />
        </div>
      ) : (
        <CharItem
          readonly={false}
          value={value}
          onChange={(val) => onChange(item.inputKey, val)}
          borderColor={isWrong ? 'rgb(196 92 72)' : rowColor}
        />
      )}
    </div>
  );
}
