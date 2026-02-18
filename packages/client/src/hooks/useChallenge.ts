import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  submitChallengeResult,
  getDailyLeaderboard,
  getTotalLeaderboard,
  getMyResults,
} from '@/services/challenge';
import type { Difficulty } from 'common';

export function useSubmitChallengeResult() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      challengeId: string;
      time: number;
      score: number;
      difficulty: Difficulty;
    }) => submitChallengeResult(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      queryClient.invalidateQueries({ queryKey: ['myResults'] });
    },
  });
}

export function useDailyLeaderboard(challengeId: string) {
  return useQuery({
    queryKey: ['leaderboard', 'daily', challengeId],
    queryFn: () => getDailyLeaderboard(challengeId),
    enabled: !!challengeId,
  });
}

export function useTotalLeaderboard() {
  return useQuery({
    queryKey: ['leaderboard', 'total'],
    queryFn: getTotalLeaderboard,
  });
}

export function useMyResults() {
  return useQuery({
    queryKey: ['myResults'],
    queryFn: getMyResults,
    retry: false,
  });
}

interface LocalChallengeResult {
  completed: boolean;
  time: number;
  score?: number;
  completedAt: number;
}

export function useSyncChallengeResults() {
  const { data: myResults, isSuccess } = useMyResults();
  const submitMutation = useSubmitChallengeResult();

  useEffect(() => {
    if (!isSuccess || !myResults) return;

    const serverIds = new Set(myResults.map((r: { challengeId: string }) => r.challengeId));

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('challengeResult_')) {
        const challengeId = key.replace('challengeResult_', '');
        if (!serverIds.has(challengeId)) {
          const saved = localStorage.getItem(key);
          if (saved) {
            try {
              const result: LocalChallengeResult = JSON.parse(saved);
              if (result.completed && result.score !== undefined) {
                submitMutation.mutate({
                  challengeId,
                  time: result.time,
                  score: result.score,
                  difficulty: 'hard' as Difficulty,
                });
              }
            } catch {
              // ignore parse errors
            }
          }
        }
      }
    }
  }, [isSuccess, myResults, submitMutation]);
}
