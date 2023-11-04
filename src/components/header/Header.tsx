import {
	type ChangeEvent,
	type FC,
	useCallback,
	useMemo,
	useState,
} from 'react';

import {
	type Emoji,
	EmojiCategoriesWithGroups,
	EmojiCategory,
	EmojiGroups,
	getRandom as getRandomAPI,
} from '$api';
import { useEmojiContext } from '$context';
import { Modal } from '$components/modal/Modal';

import './Header.module.css';

export const Header: FC = () => {
	const {
		toggleHideSelected,
		hideSelected,
		selectedCategory,
		selectedGroup,
		setCategory,
		setGroup,
		addSelected
	} = useEmojiContext();

	const [random, setRandom] = useState<Emoji>();

	const getRandom = useCallback(() => {
		getRandomAPI()
			.then((emoji) => {
				emoji && setRandom(emoji);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const setEmojiCategory = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const category = event.target.value.trim();

			setCategory(
				category.length > 0 ? (category as EmojiCategory) : undefined,
			);
		},
		[setCategory],
	);

	const setEmojiGroup = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const group = event.target.value.trim();

			setGroup(group.length > 0 ? group : undefined);
		},
		[setGroup],
	);

	const groups = useMemo(
		() =>
			selectedCategory == undefined
				? EmojiGroups
				: EmojiCategoriesWithGroups[selectedCategory],
		[selectedCategory],
	);

	const onCloseRandom = useCallback(() => {
		// eslint-disable-next-line unicorn/no-useless-undefined
		setRandom(undefined);
	}, []);

	const onSelectRandom = useCallback(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		addSelected(random!);
		onCloseRandom();
	}, [random]);

	return (
		<header>
			<label htmlFor="select-category">Category: </label>
			<select
				placeholder="Category"
				id="select-category"
				value={selectedCategory}
				onChange={setEmojiCategory}
			>
				<option value="">Select a category</option>

				{Object.keys(EmojiCategory).map((category) => (
					<option value={category} key={category}>
						{category}
					</option>
				))}
			</select>

			<label htmlFor="select-group">Group: </label>
			<select
				placeholder="Category"
				id="select-group"
				value={selectedGroup}
				onChange={setEmojiGroup}
			>
				<option value="">Select a group</option>

				{groups.map((group) => (
					<option value={group} key={group}>
						{group}
					</option>
				))}
			</select>

			<label htmlFor="hide-selected">Hide selected</label>
			<input
				type="checkbox"
				checked={hideSelected}
				onClick={toggleHideSelected}
			/>

			<button onClick={getRandom}>Get Random</button>

			<Modal emoji={random} onClose={onCloseRandom} onSelection={onSelectRandom} />
		</header>
	);
};
