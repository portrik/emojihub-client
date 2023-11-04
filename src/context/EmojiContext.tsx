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
  loading: boolean;

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
	loading: false,
	setCategory: () => {},
	setGroup: () => {},
	addSelected: () => {},
	removeSelected: () => {},
	clearSelected: () => {},
});

export const EmojiContextProvider: FC<ProviderProperties> = ({ children }) => {
	const [available, setAvailable] = useState<Emoji[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<EmojiCategory>();
	const [selectedGroup, setSelectedGroup] = useState<string>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		void load();
	}, [selectedCategory, selectedGroup]);

	const load = useCallback(async () => {
		setLoading(true);

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

		setLoading(false);
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
		setAvailable((previous) => {
			const index = previous.findIndex((item) => item.name === emoji.name);
			previous[index].selected = true;

			return [...previous];
		});
	}, []);

	const removeSelected: EmojiContext['removeSelected'] = useCallback(
		(emoji) => {
			setAvailable((previous) => {
				const index = previous.findIndex((item) => item.name === emoji.name);
				previous[index].selected = false;

				return [...previous];
			});
		},
		[],
	);

	const clearSelected: EmojiContext['clearSelected'] = useCallback(() => {
		setAvailable((previous) => {
			for (const emoji of previous) {
				emoji.selected = false;
			}

			return [...previous];
		});
	}, []);

	const value: EmojiContext = useMemo(
		() => ({
			available,
			selected: available.filter((emoji) => emoji.selected),
			loading,
			selectedCategory,
			selectedGroup,
			setCategory,
			setGroup,
			addSelected,
			removeSelected,
			clearSelected,
		}),
		[available, loading, selectedCategory, selectedGroup],
	);

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function useEmojiContext(): EmojiContext {
	return useContext(Context);
}
