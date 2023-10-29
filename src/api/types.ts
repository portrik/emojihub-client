export enum Route {
    random = 'random',
    all = 'all',
    category = 'category',
    group = 'group'
}

export enum EmojiCategory {
  smileysAndPeople = 'smileys-and-people',
  animalsAndNature = 'animals-and-nature',
  foodAndDrink = 'food-and-drink',
  travelAndPlace = 'travel-and-places',
  activities = 'activities',
  objects = 'objects',
  symbols = 'symbols',
  flags = 'flags',
}

interface Emoji {
    name: string
    category: string
    group: string
    htmlCode: string[]
    unicode: string[]
}

export type { Emoji };
