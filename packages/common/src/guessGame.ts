export interface RelatedCharItem {
  id: string;
  char: string;
  concatChars?: string[];
}

export interface GuessGameItem {
  id: string;
  char: string;
  relatedChars: RelatedCharItem[];
}

export const OfficialGuessGameCollection: GuessGameItem[] = [
  {
    id: 'A001',
    char: '问',
    relatedChars: [
      {
        id: 'A001_1',
        char: '号',
        concatChars: ['码', '编'],
      },
      {
        id: 'A001_2',
        char: '设',
        concatChars: ['计', '想'],
      },
      {
        id: 'A001_3',
        char: '反',
        concatChars: ['造', '对'],
      },
      {
        id: 'A001_4',
        char: '学',
        concatChars: ['习', '生'],
      },
    ],
  },
];

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface PlayerOption {
  playerId?: string;
  playerPosition: number;
  answers: Record<string, string>;
}

export const defaultPlayerOption: PlayerOption = {
  playerId: undefined,
  playerPosition: 0,
  answers: {},
};

export interface ChallengeDisplayItem {
  inputKey: string;
  displayChars: string[];
  correctAnswer: string;
  needsInput: boolean;
}

export interface ChallengeDisplayData {
  centerChar: string;
  centerAnswer: string;
  centerInputKey: string;
  items: ChallengeDisplayItem[];
}

export function getChallengeDisplayItems(
  game: GuessGameItem,
  difficulty: Difficulty,
  playerPosition: number
): ChallengeDisplayData {
  const items: ChallengeDisplayItem[] = [];

  switch (difficulty) {
    case 'easy':
      game.relatedChars.forEach((related) => {
        items.push({
          inputKey: related.id,
          displayChars: [related.char],
          correctAnswer: game.char,
          needsInput: false,
        });
      });
      break;

    case 'medium':
      game.relatedChars.forEach((related, index) => {
        if (index === playerPosition) {
          items.push({
            inputKey: related.id,
            displayChars: [related.char],
            correctAnswer: game.char,
            needsInput: false,
          });
        } else {
          items.push({
            inputKey: related.id,
            displayChars: related.concatChars || [],
            correctAnswer: related.char,
            needsInput: true,
          });
        }
      });
      break;

    case 'hard':
      game.relatedChars.forEach((related, index) => {
        items.push({
          inputKey: related.id,
          displayChars: related.concatChars || [],
          correctAnswer: index === playerPosition ? game.char : related.char,
          needsInput: true,
        });
      });
      break;
  }

  return {
    centerChar: '?',
    centerAnswer: game.char,
    centerInputKey: 'center',
    items,
  };
}

export interface ValidationResult {
  isComplete: boolean;
  isCorrect: boolean;
  wrongCount: number;
  wrongKeys: string[];
}

export function validateAnswers(
  displayData: ChallengeDisplayData,
  answers: Record<string, string>
): ValidationResult {
  const wrongKeys: string[] = [];
  let allFilled = true;

  const centerAnswer = answers[displayData.centerInputKey];
  if (!centerAnswer || centerAnswer.trim() === '') {
    allFilled = false;
  } else if (centerAnswer !== displayData.centerAnswer) {
    wrongKeys.push(displayData.centerInputKey);
  }

  displayData.items.forEach((item) => {
    if (!item.needsInput) return;

    const answer = answers[item.inputKey];
    if (!answer || answer.trim() === '') {
      allFilled = false;
    } else if (answer !== item.correctAnswer) {
      wrongKeys.push(item.inputKey);
    }
  });

  return {
    isComplete: allFilled,
    isCorrect: allFilled && wrongKeys.length === 0,
    wrongCount: wrongKeys.length,
    wrongKeys,
  };
}

export function formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const remainingMs = Math.floor((milliseconds % 1000) / 10);

  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${remainingMs.toString().padStart(2, '0')}`;
  }
  return `${remainingSeconds}.${remainingMs.toString().padStart(2, '0')}s`;
}
