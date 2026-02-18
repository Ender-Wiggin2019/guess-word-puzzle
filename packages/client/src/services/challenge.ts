import { get, post } from '@/lib/request';
import type { LeaderboardEntry, TotalLeaderboardEntry, MyChallengeResult, Difficulty } from 'common';

export const submitChallengeResult = (data: {
  challengeId: string;
  time: number;
  score: number;
  difficulty: Difficulty;
}) => post<{ success: boolean }>('/challenge-results', data);

export const getDailyLeaderboard = (challengeId: string) =>
  get<LeaderboardEntry[]>(`/daily-leaderboard/${challengeId}`);

export const getTotalLeaderboard = () =>
  get<TotalLeaderboardEntry[]>('/total-leaderboard');

export const getMyResults = () =>
  get<MyChallengeResult[]>('/my-results');
