import { type FC } from 'react';

import { useEmojiContext } from '$context';

import './Aside.module.css';

export const Aside: FC = () => {
	const { selected } = useEmojiContext();

	return <aside>
		{selected.length === 0 && 'No emoji selected yet'}
	</aside>;
};
