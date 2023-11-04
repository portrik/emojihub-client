import { createStore } from 'solid-js/store';
import { type Accessor, createContext, createMemo, type ParentComponent, useContext } from 'solid-js';

import { type Emoji, type EmojiCategory } from '$api';

interface Store {
  selected: Emoji[];
  loading: boolean;
  hideSelected: boolean;

  selectedCategory?: EmojiCategory;
  selectedGroup?: string;
}

interface InternalStore extends Store {
  loaded: Emoji[];
}

interface EmojiContextProperties extends Store {
  available: Emoji[];

  setCategory: (category?: EmojiCategory) => void;
  setGroup: (group?: string) => void;
  addSelected: (emoji: Emoji) => void;
  removeSelected: (emoji: Emoji) => void;
  clearSelected: () => void;
  toggleHideSelected: () => void;
}

const EmojiContext = createContext<Accessor<EmojiContextProperties>>();

export const EmojiProvider: ParentComponent = (properties) => {
	const [store, setStore] = createStore<InternalStore>(
		{
			loaded: [],
			selected: [],
			loading: false,
			hideSelected: false,
		},
		{ name: 'Emoji Context Store' },
	);

	const setCategory: EmojiContextProperties['setCategory'] = (category) => {
		setStore('selectedCategory', category);
	};

	const setGroup: EmojiContextProperties['setGroup'] = (group) => {
		setStore('selectedGroup', group);
	};

	const addSelected: EmojiContextProperties['addSelected'] = (emoji) => {
		setStore(
			'loaded',
			store.loaded.findIndex((item) => item.name === emoji.name),
			'selected',
			true,
		);
	};

	const removeSelected: EmojiContextProperties['removeSelected'] = (emoji) => {
		setStore(
			'loaded',
			store.loaded.findIndex((item) => item.name === emoji.name),
			'selected',
			false,
		);
	};

	const clearSelected: EmojiContextProperties['clearSelected'] = () => {
		setStore('loaded', [0, store.loaded.length - 1], 'selected', false);
	};

	const toggleHideSelected: EmojiContextProperties['toggleHideSelected'] = () => {
		setStore('hideSelected', (hide) => !hide);
	};

	const value = createMemo<EmojiContextProperties>(() => ({
		available: store.loaded.filter(
			(emoji) => !store.hideSelected || !(emoji.selected ?? false),
		),
		selected: store.loaded.filter((emoji) => emoji.selected),
		loading: store.loading,
		hideSelected: store.hideSelected,
		selectedCategory: store.selectedCategory,
		selectedGroup: store.selectedGroup,
		setCategory,
		setGroup,
		addSelected,
		removeSelected,
		clearSelected,
		toggleHideSelected,
	}));

	return (
		<EmojiContext.Provider value={value}>
			{properties.children}
		</EmojiContext.Provider>
	);
};


export function useEmojiStore(): Accessor<EmojiContextProperties> {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return useContext(EmojiContext)!;
}
