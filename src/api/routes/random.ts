import { request } from '../request';
import { type Emoji, Route } from '../types';

export async function getRandom(): Promise<Emoji | undefined> {
	const response = await request<Emoji>(Route.random);

	if (response instanceof Error) {
		console.error(response);
		return undefined;
	}

	return response;
}
