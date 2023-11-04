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
  hideSelected: boolean;

  setCategory: (category?: EmojiCategory) => void;
  setGroup: (group?: string) => void;
  addSelected: (emoji: Emoji) => void;
  removeSelected: (emoji: Emoji) => void;
  clearSelected: () => void;
  toggleHideSelected: () => void;

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
	hideSelected: false,
	setCategory: () => {},
	setGroup: () => {},
	addSelected: () => {},
	removeSelected: () => {},
	clearSelected: () => {},
	toggleHideSelected: () => {},
});

export const EmojiContextProvider: FC<ProviderProperties> = ({ children }) => {
	const [loaded, setLoaded] = useState<Emoji[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<EmojiCategory>();
	const [selectedGroup, setSelectedGroup] = useState<string>();
	const [loading, setLoading] = useState(true);
	const [hideSelected, setHideSelected] = useState(false);

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
        	: emoji.filter(
        		(item) => item.group === selectedGroup.replaceAll('-', ' '),
        	);
		}

		if (selectedCategory === undefined && selectedGroup === undefined) {
			emoji = await getAll();
		}

		setLoading(false);
		setLoaded(emoji);
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
		setLoaded((previous) => {
			const index = previous.findIndex((item) => item.name === emoji.name);
			previous[index].selected = true;

			return [...previous];
		});
	}, []);

	const removeSelected: EmojiContext['removeSelected'] = useCallback(
		(emoji) => {
			setLoaded((previous) => {
				const index = previous.findIndex((item) => item.name === emoji.name);
				previous[index].selected = false;

				return [...previous];
			});
		},
		[],
	);

	const clearSelected: EmojiContext['clearSelected'] = useCallback(() => {
		setLoaded((previous) => {
			for (const emoji of previous) {
				emoji.selected = false;
			}

			return [...previous];
		});
	}, []);

	const toggleHideSelected: EmojiContext['toggleHideSelected'] =
    useCallback(() => {
    	setHideSelected((previous) => !previous);
    }, []);

	const value: EmojiContext = useMemo(
		() => ({
			available: loaded.filter(
				(emoji) => !hideSelected || !(emoji.selected ?? false),
			),
			selected: loaded.filter((emoji) => emoji.selected),
			loading,
			hideSelected,
			selectedCategory,
			selectedGroup,
			setCategory,
			setGroup,
			addSelected,
			removeSelected,
			clearSelected,
			toggleHideSelected,
		}),
		[loaded, loading, hideSelected, selectedCategory, selectedGroup],
	);

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function useEmojiContext(): EmojiContext {
	return useContext(Context);
}
