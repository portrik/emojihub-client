import { type FC, useCallback } from 'react';

import { type Emoji as EmojiType } from '$api';
import { useEmojiContext } from '$context';
import { unicodeToString } from '$utils';

import styles from './Emoji.module.css';

interface Properties {
  emoji: EmojiType;
  disableSelection?: boolean;
}

export const Emoji: FC<Properties> = ({ emoji, disableSelection = false }) => {
	const { addSelected, removeSelected } = useEmojiContext();

	const onSelection = useCallback(() => {
		if (disableSelection === true) {
			return;
		}

		emoji.selected === undefined || !emoji.selected
			? addSelected(emoji)
			: removeSelected(emoji);
	}, [emoji.selected, disableSelection]);

	return (
		<button
			className={`${styles.box} ${emoji.selected === true && styles.selected}`}
			onClick={onSelection}
			onKeyDown={onSelection}
		>
			<span className={styles.tick}>✅</span>

			<span className={styles.display}>{unicodeToString(emoji.unicode)}</span>

			<span className={styles.info}>
				<h4>{emoji.name}</h4>

				<i>{emoji.category}</i>
				<i>{emoji.group}</i>
			</span>
		</button>
	);
};
