import { type FC } from 'react';

import { Layout } from '$components/layout';
import { useEmojiContext } from '$context';
import { DisplayGrid } from '$components/displayGrid/DisplayGrid';

export const Home: FC = () => {
	const { available, loading } = useEmojiContext();

	return (
		<Layout>
			{loading ? (
				<h2>Loading...</h2>
			) : (
				<>
					<DisplayGrid emoji={available} />
				</>
			)}
		</Layout>
	);
};
