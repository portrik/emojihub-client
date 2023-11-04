import { type ComponentPropsWithoutRef, type FC } from 'react';

import styles from './Button.module.css';

export const Button: FC<ComponentPropsWithoutRef<'button'>> = (properties) => {
	return <button {...properties} className={styles['custom-button']} />;
};
