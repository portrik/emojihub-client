import { render } from 'solid-js/web';
import '@fontsource-variable/jost';

import { Home } from './pages/Home';
import { EmojiProvider } from '$store';

import './index.module.css';

const rootElement = document.querySelector('#root');
if (rootElement === null) {
	throw new Error('Could not locate the root Solid element with id="root"!');
}

render(
	() => (
		<EmojiProvider>
			<Home />
		</EmojiProvider>
	),
	rootElement,
);
