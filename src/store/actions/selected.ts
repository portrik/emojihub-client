import { type Emoji } from '$api';

import { selected } from '../store';

export function addSelected(emoji: Emoji): void {
	selected.update((previous) => [...previous, emoji]);
}

export function removeSelected(emoji: Emoji): void {
	selected.update((previous) => previous.filter((item) => item.name !== emoji.name));
}

export function clearSelected(): void {
	console.log('NOW');
	selected.set([]);
}
