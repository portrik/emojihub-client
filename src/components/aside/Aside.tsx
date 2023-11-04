import { type Component, For, type JSX, Show } from 'solid-js';

import { Button } from '$components/button/Button';
import { useEmojiStore } from '$store';
import { unicodeToString } from '$utils';

import styles from './Aside.module.css';

export const Aside: Component = () => {
	const store = useEmojiStore();

	function copyToClipboard(): void {
		void navigator.clipboard.writeText(
			store()
				.selected.map(({ unicode }) => unicodeToString(unicode))
				.join(' '),
		);
	}

	function saveToJSON(): void {
		const saveElement = document.createElement('a');

		saveElement.href = URL.createObjectURL(
			new Blob([
				JSON.stringify(
					store().selected.map((emoji) => ({ ...emoji, selected: undefined })),
					undefined,
					2,
				),
			]),
		);
		saveElement.setAttribute('download', 'emoji.json');

		document.body.append(saveElement);
		saveElement.click();
		saveElement.remove();
	}

	return (
		<aside>
			<span class={styles.head}>
				<h2>Selected</h2>

				<Show when={store().selected.length > 0}>
					<Button onClick={store().clearSelected}>Clear Selection</Button>
				</Show>
			</span>

			<div class={styles.list}>
				<Show
					when={store().selected.length > 0}
					fallback={<h4>Nothing yet</h4>}
				>
					<For each={store().selected}>
						{({ unicode }): JSX.Element => (
							<span>{unicodeToString(unicode)}</span>
						)}
					</For>
				</Show>
			</div>

			<div class={styles.buttons}>
				<Button
					onClick={copyToClipboard}
					disabled={store().selected.length === 0}
				>
                    Copy Selection to Clipboard
				</Button>

				<Button onClick={saveToJSON} disabled={store().selected.length === 0}>
                    Save as JSON
				</Button>
			</div>
		</aside>
	);
};
