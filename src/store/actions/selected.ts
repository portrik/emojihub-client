import { type Emoji } from '$api';

import { selected } from '../store';

export function addSelected(emoji: Emoji): void {
	selected.update((previous) => [...previous, emoji]);
}

export function removeSelected(emoji: Emoji): void {
	selected.update((previous) => {
		const index = previous.findIndex((item) => item.name === emoji.name);

		return previous.splice(index, 1);
	});
}

export function clearSelected(): void {
	selected.set([]);
}
