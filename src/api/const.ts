import { type EmojiCategory } from './types';

export const API = 'https://emojihub.yurace.pro/api/';

export const EmojiCategoriesWithGroups: Record<EmojiCategory, string[]> = {
	'smileys-and-people': [
		'body',
		'cat-face',
		'clothing',
		'creature-face',
		'emotion',
		'face-negative',
		'face-neutral',
		'face-positive',
		'face-positive',
		'face-role',
		'face-sick',
		'family',
		'monkey-face',
		'person',
		'person-activity',
		'person-gesture',
		'person-role',
		'skin-tone',
	],
	'animals-and-nature': [
		'animal-amphibian',
		'animal-bird',
		'animal-bug',
		'animal-mammal',
		'animal-marine',
		'animal-reptile',
		'plant-flower',
		'plant-other',
	],
	'food-and-drink': [
		'dishware',
		'drink',
		'food-asian',
		'food-fruit',
		'food-prepared',
		'food-sweat',
		'food-vegetable',
	],
	'travel-and-places': ['travel-and-places'],
	activities: ['activities'],
	objects: ['objects'],
	symbols: ['symbols'],
	flags: ['flags'],
};

export const EmojiGroups = Object.values(EmojiCategoriesWithGroups).flat();
