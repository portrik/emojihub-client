import { createRoot } from 'react-dom/client';

const rootElement = document.querySelector('#root');
if (!rootElement) {
	throw new Error('Could not locate the root React element with id="root"!');
}

const root = createRoot(rootElement);
root.render(<h1>Hello there!</h1>);
