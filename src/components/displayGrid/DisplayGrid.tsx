import { type Component, For, type JSX } from 'solid-js';

import { type Emoji as EmojiType } from '$api';

import styles from './DisplayGrid.module.css';
import { Emoji } from '$components/emoji/Emoji';

interface Properties {
  emoji: EmojiType[];
}

export const DisplayGrid: Component<Properties> = (properties) => {
	return (
		<div class={styles.grid}>
			<For each={properties.emoji}>
				{(emoji): JSX.Element => <Emoji emoji={emoji} />}
			</For>
		</div>
	);
};
