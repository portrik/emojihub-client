import { type Component } from 'solid-js';

import { type Emoji as EmojiType } from '$api';
import { useEmojiStore } from '$store';
import { unicodeToString } from '$utils';

import styles from './Emoji.module.css';

interface Properties {
  emoji: EmojiType;
  disableSelection?: boolean;
}

export const Emoji: Component<Properties> = (properties) => {
	const store = useEmojiStore();

	function onSelection(): void {
		if (properties.disableSelection === true) {
			return;
		}

		const { selected } = properties.emoji;
		const { addSelected, removeSelected } = store();

		selected === undefined || !selected
			? addSelected(properties.emoji)
			: removeSelected(properties.emoji);
	}

	return (
		<button
			class={`${styles.box} ${
				properties.emoji.selected === true && styles.selected
			}`}
			onClick={onSelection}
		>
			<span class={styles.tick}>✅</span>

			<span class={styles.display}>
				{unicodeToString(properties.emoji.unicode)}
			</span>

			<span class={styles.info}>
				<h4>{properties.emoji.name}</h4>

				<i>{properties.emoji.category}</i>
				<i>{properties.emoji.group}</i>
			</span>
		</button>
	);
};
