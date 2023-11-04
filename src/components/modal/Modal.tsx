/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type Accessor, type Component, createEffect, Show } from 'solid-js';

import { type Emoji as EmojiType } from '$api';
import { Emoji } from '$components/emoji/Emoji';
import { Button } from '$components/button/Button';

import styles from './Modal.module.css';

interface Properties {
  emoji: Accessor<EmojiType | undefined>;
  onClose: () => void;
  onSelection: () => void;
}

export const Modal: Component<Properties> = (properties) => {
	let dialogReference: HTMLDialogElement | undefined;

	createEffect(() => {
		const emoji = properties.emoji();

		if (dialogReference === undefined || emoji === undefined) {
			return;
		}

		dialogReference.showModal();
	});

	return (
		<Show when={properties.emoji() !== undefined}>
			<dialog ref={dialogReference}>
				<Emoji emoji={properties.emoji()!} disableSelection={true} />

				<div class={styles.buttons}>
					<Button onClick={properties.onSelection}>Add to Selection</Button>

					<Button onClick={properties.onClose}>CLose</Button>
				</div>
			</dialog>
		</Show>
	);
};
