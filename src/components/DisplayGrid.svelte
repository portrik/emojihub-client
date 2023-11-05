<script lang="ts">
  import { type Emoji as EmojiType } from '../api';

  import Emoji from './Emoji.svelte';

  export let emoji: EmojiType[];
</script>

<div>
  {#each emoji as item}
    <Emoji emoji={item} />
  {/each}
</div>

<style>
  div {
    width: 100%;
    height: 100%;
    padding-left: 1vw;
    padding-top: 2rem;

    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--sizing-emoji-card-width), 1fr)
    );
    column-gap: 1vw;
    row-gap: 1vh;

    overflow-y: scroll;

    transition: 0.25s ease-in-out;
  }
</style>
