import App from './App.svelte';

const rootElement = document.querySelector('#root');
if (!rootElement) {
	throw new Error('Could not locate the root Svelte element with id="root"!');
}

const app = new App({
	target: rootElement
});

export default app;
