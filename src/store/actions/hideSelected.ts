import { hideSelectedInternal } from '../store';

export function toggleHideSelected(): void {
	hideSelectedInternal.update((previous) => !previous);
}
