import { derived, readonly, writable } from 'svelte/store';

import { type Emoji, type EmojiCategory } from '$api';

import { load } from './actions/load';

export const selectedCategory = writable<EmojiCategory>();

export const selectedGroup = writable<string>();

export const hideSelectedInternal = writable<boolean>(false);

export const hideSelected = readonly(hideSelectedInternal);

const loadingInternal = writable<boolean>(false);
export const loading = readonly(loadingInternal);

export const loaded = derived<
  [typeof selectedCategory, typeof selectedGroup],
  Emoji[]
>(
	[selectedCategory, selectedGroup],
	([category, group], set) => {
		loadingInternal.set(true);

		void load(category, group).then((emoji) => {
			set(emoji);
			loadingInternal.set(false);
		});
	},
	[],
);

export const selected = writable<Emoji[]>([]);

export const available = derived(
	[loaded, hideSelected, selected],
	([emoji, hide, selected]) =>
		emoji.filter((item) => !hide || !selected.includes(item)),
);
