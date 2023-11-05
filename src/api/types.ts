export enum Route {
    random = 'random',
    all = 'all',
    category = 'category',
    group = 'group',
  }

export enum EmojiCategory {
    'smileys-and-people' = 'smileys-and-people',
    'animals-and-nature' = 'animals-and-nature',
    'food-and-drink' = 'food-and-drink',
    'travel-and-places' = 'travel-and-places',
    'activities' = 'activities',
    'objects' = 'objects',
    'symbols' = 'symbols',
    'flags' = 'flags',
  }

  interface Emoji {
    name: string;
    category: string;
    group: string;
    htmlCode: string[];
    unicode: string[];
  }

export type { Emoji };
