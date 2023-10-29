import { type FC } from 'react';
import { Link } from 'react-router-dom';

import './Header.module.css';

interface PageLink {
  name: string;
  path: string;
}

const Pages: PageLink[] = [
	{ name: 'Home', path: '/' },
	{ name: 'Selected', path: '/selected' },
	{ name: 'Categories', path: '/categories' },
];

export const Header: FC = () => {
	return (
		<header>
			{Pages.map(({ name, path }) => (
				<Link to={path} key={name}>{name}</Link>
			))}
		</header>
	);
};
