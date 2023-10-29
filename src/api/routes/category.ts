import { request } from '../request';
import { type Emoji, type EmojiCategory, Route } from '../types';

export async function getCategory(category: EmojiCategory): Promise<Emoji[]> {
	const response = await request<Emoji[]>(`${Route.category}/${category}`);

	if (response instanceof Error) {
		console.error(response);
		return [];
	}

	return response;
}
