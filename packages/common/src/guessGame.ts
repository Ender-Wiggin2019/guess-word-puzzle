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
