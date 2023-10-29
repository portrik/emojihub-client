import {
	createContext,
	type FC,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	type Emoji,
	type EmojiCategory,
	getAll,
	getCategory,
	getGroup,
} from '$api';

interface EmojiContext {
  available: Emoji[];
  selected: Emoji[];

  setCategory: (category?: EmojiCategory) => void;
  setGroup: (group?: string) => void;
  addSelected: (emoji: Emoji) => void;
  removeSelected: (emoji: Emoji) => void;
  clearSelected: () => void;

  selectedCategory?: EmojiCategory;
  selectedGroup?: string;
}

interface ProviderProperties {
  children: ReactNode;
}

const Context = createContext<EmojiContext>({
	available: [],
	selected: [],
	setCategory: () => {},
	setGroup: () => {},
	addSelected: () => {},
	removeSelected: () => {},
	clearSelected: () => {},
});

export const EmojiContextProvider: FC<ProviderProperties> = ({ children }) => {
	const [available, setAvailable] = useState<Emoji[]>([]);
	const [selected, setSelected] = useState<Emoji[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<EmojiCategory>();
	const [selectedGroup, setSelectedGroup] = useState<string>();

	useEffect(() => {
		void load();
	}, [selectedCategory, selectedGroup]);

	const load = useCallback(async () => {
		let emoji: Emoji[] = [];

		if (selectedCategory !== undefined) {
			emoji = await getCategory(selectedCategory);
		}

		if (selectedGroup !== undefined) {
			emoji =
        selectedCategory === undefined
        	? await getGroup(selectedGroup)
        	: emoji.filter((item) => item.group === selectedGroup);
		}

		if (selectedCategory === undefined && selectedGroup === undefined) {
			emoji = await getAll();
		}

		setAvailable(emoji);
	}, [selectedCategory, selectedGroup]);

	const setCategory: EmojiContext['setCategory'] = useCallback((category) => {
		setSelectedCategory((previous) =>
			previous === category ? previous : category,
		);
	}, []);

	const setGroup: EmojiContext['setGroup'] = useCallback((group) => {
		setSelectedGroup((previous) => (previous === group ? previous : group));
	}, []);

	const addSelected: EmojiContext['addSelected'] = useCallback((emoji) => {
		setSelected((previous) => [...previous, emoji]);
	}, []);

	const removeSelected: EmojiContext['removeSelected'] = useCallback(
		(emoji) => {
			setSelected((previous) => {
				const index = previous.findIndex((item) => item.name === emoji.name);

				return previous.splice(index, 1);
			});
		},
		[],
	);

	const clearSelected: EmojiContext['clearSelected'] = useCallback(() => {
		setSelected([]);
	}, []);

	const value: EmojiContext = useMemo(
		() => ({
			available,
			selected,
			selectedCategory,
			selectedGroup,
			setCategory,
			setGroup,
			addSelected,
			removeSelected,
			clearSelected,
		}),
		[available, selected, selectedCategory, selectedGroup],
	);

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function useEmojiContext(): EmojiContext {
	return useContext(Context);
}
