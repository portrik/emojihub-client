import { type ParentComponent } from 'solid-js';

import { Aside } from '$components/aside/Aside';
import { Header } from '$components/header/Header';

import styles from './Layout.module.css';

export const Layout: ParentComponent = (properties) => {
	return (
		<div class={styles.wrapper}>
			<Aside />

			<main>
				<Header />

				<div class={styles.content}>{properties.children}</div>
			</main>
		</div>
	);
};
