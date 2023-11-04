import { type FC, useCallback } from 'react';

import { type Emoji as EmojiType } from '$api';
import { unicodeToString } from '$utils';

import styles from './Emoji.module.css';
import { useEmojiContext } from '$context';

interface Properties {
  emoji: EmojiType;
}

export const Emoji: FC<Properties> = ({ emoji }) => {
	const { addSelected, removeSelected } = useEmojiContext();

	const onSelection = useCallback(() => {
		emoji.selected === undefined || !emoji.selected
			? addSelected(emoji)
			: removeSelected(emoji);
	}, [emoji.selected]);

	return (
		<button className={`${styles.box} ${emoji.selected === true && styles.selected}`} onClick={onSelection} onKeyDown={onSelection}>
			<span className={styles.tick}>HUH</span>

			<span className={styles.display}>{unicodeToString(emoji.unicode)}</span>

			<span className={styles.info}>
				<h4>{emoji.name}</h4>

				<i>{emoji.category}</i>
				<i>{emoji.group}</i>
			</span>
		</button>
	);
};
