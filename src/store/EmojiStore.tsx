/* eslint-disable unicorn/consistent-destructuring */
import { createStore } from 'solid-js/store';
import {
	type Accessor,
	createContext,
	createEffect,
	createMemo,
	createResource,
	type ParentComponent,
	useContext,
} from 'solid-js';

import {
	type Emoji,
	type EmojiCategory,
	getAll,
	getCategory,
	getGroup,
} from '$api';

interface Store {
  selected: Emoji[];
  hideSelected: boolean;

  selectedCategory?: EmojiCategory;
  selectedGroup?: string;
}

interface InternalStore extends Store {
  loaded: Emoji[];
}

interface EmojiContextProperties extends Store {
  available: Emoji[];
  loading: boolean;

  setCategory: (category?: EmojiCategory) => void;
  setGroup: (group?: string) => void;
  addSelected: (emoji: Emoji) => void;
  removeSelected: (emoji: Emoji) => void;
  clearSelected: () => void;
  toggleHideSelected: () => void;
}

const EmojiContext = createContext<Accessor<EmojiContextProperties>>();

async function fetcher({
	category,
	group,
}: {
  category?: EmojiCategory;
  group?: string;
}): Promise<Emoji[]> {
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

export const EmojiProvider: ParentComponent = (properties) => {
	const [store, setStore] = createStore<InternalStore>(
		{
			loaded: [],
			selected: [],
			hideSelected: false,
		},
		{ name: 'Emoji Context Store' },
	);

	const [data, { refetch }] = createResource(
		() => ({ category: store.selectedCategory, group: store.selectedGroup }),
		fetcher,
	);

	createEffect(() => {
		if (data.latest !== undefined) {
			setStore('loaded', data.latest);
		}
	});

	const setCategory: EmojiContextProperties['setCategory'] = (category) => {
		setStore('selectedCategory', category);
		void refetch();
	};

	const setGroup: EmojiContextProperties['setGroup'] = (group) => {
		setStore('selectedGroup', group);
		void refetch();
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
		setStore('loaded', (emoji) => emoji.selected === true, 'selected', false);
	};

	const toggleHideSelected: EmojiContextProperties['toggleHideSelected'] =
    () => {
    	setStore('hideSelected', (hide) => !hide);
    };

	const value = createMemo<EmojiContextProperties>(() => ({
		available: store.loaded.filter(
			(emoji) => !store.hideSelected || !(emoji.selected ?? false),
		),
		selected: store.loaded.filter((emoji) => emoji.selected),
		loading: data.loading,
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
