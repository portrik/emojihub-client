import { type FC } from 'react';

import { useEmojiContext } from '$context';
import { unicodeToString } from '$utils';

import './Aside.module.css';

export const Aside: FC = () => {
	const { selected } = useEmojiContext();

	return (
		<aside>
			{selected.length === 0 && 'Nothing selected yet'}

			{selected.map((emoji) => (
				<span key={emoji.name}>{unicodeToString(emoji.unicode)}</span>
			))}
		</aside>
	);
};
