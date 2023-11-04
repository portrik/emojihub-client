import { createRoot } from 'react-dom/client';
import '@fontsource-variable/jost';

import { EmojiContextProvider } from '$context';
import { Home } from '$pages';

import './index.module.css';
import { StrictMode } from 'react';

const rootElement = document.querySelector('#root');
if (!rootElement) {
	throw new Error('Could not locate the root React element with id="root"!');
}

const root = createRoot(rootElement);
root.render(
	<StrictMode>
		<EmojiContextProvider>
			<Home />
		</EmojiContextProvider>
	</StrictMode>,
);
