import { type FC, useCallback } from 'react';

import { useEmojiContext } from '$context';
import { unicodeToString } from '$utils';

import './Aside.module.css';

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
			<h2>
        Selected
				{selected.length > 0 && (
					<button onClick={clearSelected}>Clear Selection</button>
				)}
			</h2>

			{selected.length === 0 && 'Nothing yet'}

			{selected.map((emoji) => (
				<span key={emoji.name}>{unicodeToString(emoji.unicode)}</span>
			))}

			<div>
				<button onClick={copyToClipboard}>Copy Selection to Clipboard</button>

				<button onClick={saveToJSON}>Save as JSON</button>
			</div>
		</aside>
	);
};
