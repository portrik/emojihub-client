import { createRoot } from 'react-dom/client';

import { EmojiContextProvider, RouterContextProvider } from '$context';

import './index.module.css';

const rootElement = document.querySelector('#root');
if (!rootElement) {
	throw new Error('Could not locate the root React element with id="root"!');
}

const root = createRoot(rootElement);
root.render(
	<EmojiContextProvider>
		<RouterContextProvider />
	</EmojiContextProvider>,
);
