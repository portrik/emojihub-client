import { render } from 'solid-js/web';
import '@fontsource-variable/jost';

import './index.module.css';

const rootElement = document.querySelector('#root');
if (rootElement === null) {
	throw new Error('Could not locate the root Solid element with id="root"!');
}

render(() => <h1>Hello there!</h1>, rootElement);
