import { type FC } from 'react';

import { Layout } from '$components/layout';
import { useEmojiContext } from '$context';
import { Emoji } from '$components/emoji/Emoji';

export const Home: FC = () => {
	const { available } = useEmojiContext();

	return (
		<Layout>
			{available.map((emoji) => (
				<Emoji emoji={emoji} key={emoji.name} />
			))}
		</Layout>
	);
};
