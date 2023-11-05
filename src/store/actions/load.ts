import {
	type Emoji,
	type EmojiCategory,
	getAll,
	getCategory,
	getGroup,
} from '$api';

export async function load(
	category?: EmojiCategory,
	group?: string,
): Promise<Emoji[]> {
	let emoji: Emoji[] = [];

	if (category !== undefined) {
		emoji = await getCategory(category);
	}

	if (group !== undefined) {
		emoji =
      category === undefined
      	? await getGroup(group)
      	: emoji.filter((item) => item.group === group);
	}

	if (category === undefined && group === undefined) {
		emoji = await getAll();
	}

	return emoji;
}
