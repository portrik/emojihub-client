import { request } from '../request';
import { type Emoji, Route } from '../types';

export async function getAll(): Promise<Emoji[]> {
	const response = await request<Emoji[]>(Route.all);

	if (response instanceof Error) {
		console.error(response);
		return [];
	}

	return response;
}
