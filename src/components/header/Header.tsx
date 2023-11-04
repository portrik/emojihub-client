/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
	type Component,
	createMemo,
	createSignal,
	For,
	type JSX
} from 'solid-js';

import {
	type Emoji,
	EmojiCategoriesWithGroups,
	EmojiCategory,
	EmojiGroups,
	getRandom as getRandomAPI,
} from '$api';
import { useEmojiStore } from '$store';
import { Button } from '$components/button/Button';
import { Modal } from '$components/modal/Modal';

import './Header.module.css';

export const Header: Component = () => {
	const store = useEmojiStore();

	const [random, setRandom] = createSignal<Emoji>();

	async function getRandom(): Promise<void> {
		setRandom(await getRandomAPI());
	}

	function setCategory(category: string): void {
		store().setCategory(
			category.trim().length > 0
				? (category.trim() as EmojiCategory)
				: undefined,
		);
	}

	function setGroup(group: string): void {
		store().setGroup(group.trim().length > 0 ? group.trim() : undefined);
	}

	const groups = createMemo(() => {
		const { selectedCategory } = store();

		return selectedCategory === undefined
			? EmojiGroups
			: EmojiCategoriesWithGroups[selectedCategory];
	});

	function onCloseRandom(): void {
		setRandom(undefined);
	}

	function onSelectRandom(): void {
		const { addSelected } = store();

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		addSelected(random()!);
		onCloseRandom();
	}

	return (
		<header>
			<select
				value={store().selectedCategory}
				onChange={(event): void => {
					setCategory(event.currentTarget.value);
				}}
			>
				<option value="">Select a Category</option>

				<For each={Object.keys(EmojiCategory)}>
					{(category): JSX.Element => (
						<option value={category}>{category}</option>
					)}
				</For>
			</select>

			<select
				value={store().selectedGroup}
				onChange={(event): void => {
					setGroup(event.currentTarget.value);
				}}
			>
				<option value="">Select a Group</option>

				<For each={groups()}>
					{(group): JSX.Element => (
						<option value={group}>{group}</option>
					)}
				</For>
			</select>

			<label for="hide-selected">Hide Selected</label>
			<input
				type="checkbox"
				checked={store().hideSelected}
				onClick={store().toggleHideSelected}
				id="hide-selected"
			/>

			<Button onClick={(): void => {void getRandom();}}>Get Random</Button>

			<Modal
				emoji={random}
				onClose={onCloseRandom}
				onSelection={onSelectRandom}
			/>
		</header>
	);
};
