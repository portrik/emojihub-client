import { type FC, useCallback } from 'react';

import { Button } from '$components/button/Button';
import { useEmojiContext } from '$context';
import { unicodeToString } from '$utils';

import styles from './Aside.module.css';

export const Aside: FC = () => {
	const { selected, clearSelected } = useEmojiContext();

	const copyToClipboard = useCallback(() => {
		void navigator.clipboard.writeText(
			selected.map(({ unicode }) => unicodeToString(unicode)).join(' '),
		);
	}, [selected]);

	const saveToJSON = useCallback(() => {
		const saveElement = document.createElement('a');

		saveElement.href = URL.createObjectURL(
			new Blob([
				JSON.stringify(
					selected.map((emoji) => ({ ...emoji, selected: undefined })),
					undefined,
					2,
				),
			]),
		);
		saveElement.setAttribute('download', 'emoji.json');

		document.body.append(saveElement);
		saveElement.click();
		saveElement.remove();
	}, [selected]);

	return (
		<aside>
			<span className={styles.head}>
				<h2>Selected</h2>

				{selected.length > 0 && (
					<Button onClick={clearSelected}>Clear Selection</Button>
				)}
			</span>

			<div className={styles.list}>
				{selected.length === 0 && <h4>Nothing yet</h4>}

				{selected.map((emoji) => (
					<span key={emoji.name}>{unicodeToString(emoji.unicode)}</span>
				))}
			</div>

			<div className={styles.buttons}>
				<Button onClick={copyToClipboard} disabled={selected.length === 0}>
          Copy Selection to Clipboard
				</Button>

				<Button onClick={saveToJSON} disabled={selected.length === 0}>
          Save as JSON
				</Button>
			</div>
		</aside>
	);
};
