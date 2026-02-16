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
  {
    id: 'A002',
    char: '心',
    relatedChars: [
      {
        id: 'A002_1',
        char: '情',
        concatChars: ['感', '热'],
      },
      {
        id: 'A002_2',
        char: '小',
        concatChars: ['大', '时'],
      },
      {
        id: 'A002_3',
        char: '关',
        concatChars: ['开', '闭'],
      },
      {
        id: 'A002_4',
        char: '中',
        concatChars: ['其', '间'],
      },
    ],
  },
  {
    id: 'A003',
    char: '手',
    relatedChars: [
      {
        id: 'A003_1',
        char: '机',
        concatChars: ['会', '场'],
      },
      {
        id: 'A003_2',
        char: '段',
        concatChars: ['阶', '落'],
      },
      {
        id: 'A003_3',
        char: '动',
        concatChars: ['活', '运'],
      },
      {
        id: 'A003_4',
        char: '高',
        concatChars: ['兴', '度'],
      },
    ],
  },
  {
    id: 'A004',
    char: '气',
    relatedChars: [
      {
        id: 'A004_1',
        char: '天',
        concatChars: ['堂', '空'],
      },
      {
        id: 'A004_2',
        char: '生',
        concatChars: ['产', '命'],
      },
      {
        id: 'A004_3',
        char: '客',
        concatChars: ['人', '厅'],
      },
      {
        id: 'A004_4',
        char: '人',
        concatChars: ['才', '口'],
      },
    ],
  },
  {
    id: 'A005',
    char: '道',
    relatedChars: [
      {
        id: 'A005_1',
        char: '知',
        concatChars: ['识', '名'],
      },
      {
        id: 'A005_2',
        char: '理',
        concatChars: ['解', '由'],
      },
      {
        id: 'A005_3',
        char: '路',
        concatChars: ['口', '边'],
      },
      {
        id: 'A005_4',
        char: '说',
        concatChars: ['话', '明'],
      },
    ],
  },
  {
    id: 'A006',
    char: '面',
    relatedChars: [
      {
        id: 'A006_1',
        char: '方',
        concatChars: ['法', '便'],
      },
      {
        id: 'A006_2',
        char: '对',
        concatChars: ['比', '象'],
      },
      {
        id: 'A006_3',
        char: '全',
        concatChars: ['部', '安'],
      },
      {
        id: 'A006_4',
        char: '外',
        concatChars: ['国', '出'],
      },
    ],
  },
  {
    id: 'A007',
    char: '点',
    relatedChars: [
      {
        id: 'A007_1',
        char: '地',
        concatChars: ['方', '球'],
      },
      {
        id: 'A007_2',
        char: '心',
        concatChars: ['情', '愿'],
      },
      {
        id: 'A007_3',
        char: '缺',
        concatChars: ['少', '乏'],
      },
      {
        id: 'A007_4',
        char: '重',
        concatChars: ['要', '量'],
      },
    ],
  },
  {
    id: 'A008',
    char: '水',
    relatedChars: [
      {
        id: 'A008_1',
        char: '平',
        concatChars: ['安', '等'],
      },
      {
        id: 'A008_2',
        char: '果',
        concatChars: ['结', '如'],
      },
      {
        id: 'A008_3',
        char: '开',
        concatChars: ['打', '张'],
      },
      {
        id: 'A008_4',
        char: '下',
        concatChars: ['午', '降'],
      },
    ],
  },
  {
    id: 'A009',
    char: '火',
    relatedChars: [
      {
        id: 'A009_1',
        char: '车',
        concatChars: ['汽', '单'],
      },
      {
        id: 'A009_2',
        char: '锅',
        concatChars: ['汤', '底'],
      },
      {
        id: 'A009_3',
        char: '发',
        concatChars: ['现', '明'],
      },
      {
        id: 'A009_4',
        char: '灯',
        concatChars: ['光', '台'],
      },
    ],
  },
  {
    id: 'A010',
    char: '头',
    relatedChars: [
      {
        id: 'A010_1',
        char: '发',
        concatChars: ['理', '黑'],
      },
      {
        id: 'A010_2',
        char: '开',
        concatChars: ['始', '先'],
      },
      {
        id: 'A010_3',
        char: '回',
        concatChars: ['来', '去'],
      },
      {
        id: 'A010_4',
        char: '尽',
        concatChars: ['力', '管'],
      },
    ],
  },
  {
    id: 'A011',
    char: '风',
    relatedChars: [
      {
        id: 'A011_1',
        char: '景',
        concatChars: ['色', '物'],
      },
      {
        id: 'A011_2',
        char: '作',
        concatChars: ['工', '品'],
      },
      {
        id: 'A011_3',
        char: '雨',
        concatChars: ['下', '雷'],
      },
      {
        id: 'A011_4',
        char: '格',
        concatChars: ['价', '外'],
      },
    ],
  },
  {
    id: 'A012',
    char: '光',
    relatedChars: [
      {
        id: 'A012_1',
        char: '明',
        concatChars: ['说', '白'],
      },
      {
        id: 'A012_2',
        char: '阳',
        concatChars: ['太', '历'],
      },
      {
        id: 'A012_3',
        char: '灯',
        concatChars: ['红', '路'],
      },
      {
        id: 'A012_4',
        char: '眼',
        concatChars: ['双', '睁'],
      },
    ],
  },
  {
    id: 'A013',
    char: '电',
    relatedChars: [
      {
        id: 'A013_1',
        char: '话',
        concatChars: ['说', '对'],
      },
      {
        id: 'A013_2',
        char: '视',
        concatChars: ['重', '忽'],
      },
      {
        id: 'A013_3',
        char: '影',
        concatChars: ['合', '拍'],
      },
      {
        id: 'A013_4',
        char: '脑',
        concatChars: ['头', '袋'],
      },
    ],
  },
  {
    id: 'A014',
    char: '车',
    relatedChars: [
      {
        id: 'A014_1',
        char: '公',
        concatChars: ['司', '园'],
      },
      {
        id: 'A014_2',
        char: '火',
        concatChars: ['大', '灭'],
      },
      {
        id: 'A014_3',
        char: '门',
        concatChars: ['大', '专'],
      },
      {
        id: 'A014_4',
        char: '汽',
        concatChars: ['油', '水'],
      },
    ],
  },
  {
    id: 'A015',
    char: '花',
    relatedChars: [
      {
        id: 'A015_1',
        char: '草',
        concatChars: ['香', '药'],
      },
      {
        id: 'A015_2',
        char: '钱',
        concatChars: ['金', '纸'],
      },
      {
        id: 'A015_3',
        char: '园',
        concatChars: ['公', '林'],
      },
      {
        id: 'A015_4',
        char: '开',
        concatChars: ['打', '张'],
      },
    ],
  },
  {
    id: 'A016',
    char: '书',
    relatedChars: [
      {
        id: 'A016_1',
        char: '本',
        concatChars: ['根', '基'],
      },
      {
        id: 'A016_2',
        char: '包',
        concatChars: ['面', '书'],
      },
      {
        id: 'A016_3',
        char: '店',
        concatChars: ['商', '酒'],
      },
      {
        id: 'A016_4',
        char: '图',
        concatChars: ['地', '画'],
      },
    ],
  },
  {
    id: 'A017',
    char: '音',
    relatedChars: [
      {
        id: 'A017_1',
        char: '乐',
        concatChars: ['快', '俱'],
      },
      {
        id: 'A017_2',
        char: '声',
        concatChars: ['大', '歌'],
      },
      {
        id: 'A017_3',
        char: '信',
        concatChars: ['相', '写'],
      },
      {
        id: 'A017_4',
        char: '收',
        concatChars: ['接', '吸'],
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
      game.relatedChars.forEach((related) => {
        items.push({
          inputKey: related.id,
          displayChars: related.concatChars || [],
          correctAnswer: related.char,
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
