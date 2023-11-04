import { type FC } from 'react';

import { type Emoji as EmojiType } from '$api';
import { Emoji } from '$components/emoji/Emoji';

import styles from './DisplayGrid.module.css';

interface Properties {
  emoji: EmojiType[];
}

export const DisplayGrid: FC<Properties> = ({ emoji }) => {
	return (
		<div className={styles.grid}>
			{emoji.map((item) => (
				<Emoji emoji={item} key={item.name} />
			))}
		</div>
	);
};
