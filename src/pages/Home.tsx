import { type Component, Show } from 'solid-js';

import { useEmojiStore } from '$store';
import { Layout } from '$components/layout/Layout';
import { DisplayGrid } from '$components/displayGrid/DisplayGrid';

export const Home: Component = () => {
	const store = useEmojiStore();

	return (
		<Layout>
			<Show when={!store().loading} fallback={<h2>Loading...</h2>}>
				<DisplayGrid emoji={store().available} />
			</Show>
		</Layout>
	);
};
