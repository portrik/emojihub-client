import { type Emoji, type EmojiCategory, Route } from '../types';
import { type EmojiCategoriesWithGroups } from '../const';
import { request } from '../request';

export async function getGroup(
	group: (typeof EmojiCategoriesWithGroups)[EmojiCategory][number],
): Promise<Emoji[]> {
	const response = await request<Emoji[]>(`${Route.all}${Route.group}/${group}`);

	if (response instanceof Error) {
		console.error(response);
		return [];
	}

	return response;
}

export async function getRandomInGroup(group: string): Promise<Emoji | undefined> {
	const response = await request<Emoji>(`${Route.all}/${Route.group}/${group}`);

	if (response instanceof Error) {
		console.error(response);
		return undefined;
	}

	return response;
}
