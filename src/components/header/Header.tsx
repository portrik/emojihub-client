import { type FC } from 'react';

import './Header.module.css';

export const Header: FC = () => {
	return (
		<header>
			<label htmlFor="select-category">Category: </label>
			<select placeholder="Category" id="select-category"></select>

			<label htmlFor="select-group">Group: </label>
			<select placeholder="Category" id="select-group"></select>

			<label htmlFor="hide-selected">Hide selected</label>
			<input type="checkbox" />
		</header>
	);
};
