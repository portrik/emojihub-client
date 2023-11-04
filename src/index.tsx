import { render } from 'solid-js/web';

const rootElement = document.querySelector('#root');
if (rootElement === null) {
	throw new Error('Could not locate the root Solid element with id="root"!');
}

render(() => <h1>Hello there!</h1>, rootElement);
