import { type FC, type ReactNode } from 'react';

import { Header } from '../header/Header';
import { Aside } from '../aside/Aside';
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
