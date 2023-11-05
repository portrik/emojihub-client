<script lang="ts">
  import { type Emoji as EmojiType } from '../api';
  import Button from './Button.svelte';
  import Emoji from './Emoji.svelte';

  export let emoji: EmojiType | undefined;
  export let onClose: () => void;
  export let onSelection: () => void;

  let dialog: HTMLDialogElement | undefined;

  $: emoji !== undefined && dialog?.showModal();
</script>

{#if emoji !== undefined}
  <dialog bind:this={dialog}>
    <Emoji {emoji} disableSelection={true} />

    <div class="buttons">
      <Button on:click={onSelection}>Add to Selection</Button>

      <Button on:click={onClose}>Close</Button>
    </div>
  </dialog>
{/if}

<style>
  @import "../styles/sizing.css";

  :modal {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--sizing-gap);

    background-color: rgba(1, 1, 1, 0.1);
  }

  .buttons {
    display: flex;
    flex: row;
    gap: var(--sizing-gap);
  }
</style>
