import { type FC, type ReactNode } from 'react';

import { Aside } from '$components/aside/Aside';
import { Header } from '$components/header/Header';

import styles from './Layout.module.css';

interface Properties {
  children: ReactNode;
}

export const Layout: FC<Properties> = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<Aside />

			<main>
				<Header />

				<div className={styles.content}>{children}</div>
			</main>
		</div>
	);
};
