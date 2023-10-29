import { type FC } from 'react';

import { type Emoji as EmojiType } from '$api';
import { unicodeToString } from '$utils';

import style from './Emoji.module.css';

interface Properties {
  emoji: EmojiType;
}

export const Emoji: FC<Properties> = ({ emoji }) => {
	return (
		<div className={style.box}>
			<span className={style.display}>
				{unicodeToString(emoji.unicode)}
			</span>
		</div>
	);
};
