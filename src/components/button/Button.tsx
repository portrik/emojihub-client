import { type Component, type JSX } from 'solid-js';

import styles from  './Button.module.css';

export const Button: Component<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = (
	properties,
) => {
	return <button {...properties} class={styles['custom-button']} />;
};
