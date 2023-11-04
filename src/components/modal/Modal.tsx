import { type FC, useEffect, useRef } from 'react';

import { type Emoji as EmojiType } from '$api';
import { Emoji } from '$components/emoji/Emoji';
import { Button } from '$components/button/Button';

import styles from './Modal.module.css';

interface Properties {
  emoji?: EmojiType;
  onClose: () => void;
  onSelection: () => void;
}

export const Modal: FC<Properties> = ({ emoji, onClose, onSelection }) => {
	const dialogReference = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (!dialogReference.current || emoji === undefined) {
			return;
		}

		dialogReference.current.showModal();
	}, [emoji, dialogReference]);

	return (
		emoji && (
			<dialog ref={dialogReference}>
				<Emoji emoji={emoji} disableSelection={true} />

				<div className={styles.buttons}>
					<Button onClick={onSelection}>Add to Selection</Button>

					<Button onClick={onClose}>Close</Button>
				</div>
			</dialog>
		)
	);
};
