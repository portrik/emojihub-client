<script lang="ts">
  import { type Emoji } from '../api';
  import { addSelected, removeSelected, selected } from '../store';
  import { unicodeToString } from '../utils';

  export let emoji: Emoji;
  export let disableSelection = false;

  $: isSelected = $selected.includes(emoji);

  function onSelection(): void {
  	if (disableSelection) {
  		return;
  	}

  	isSelected ? removeSelected(emoji) : addSelected(emoji);
  }
</script>

<button on:click={onSelection} class={`box ${isSelected && 'selected'}`}>
  <span class="tick">✅</span>

  <span class="display">
    {unicodeToString(emoji.unicode)}
  </span>

  <span class="info">
    <h4>{emoji.name}</h4>

    <i>{emoji.category}</i>
    <i>{emoji.group}</i>
  </span>
</button>

<style>
  @import "../styles/colors.css";
  @import "../styles/shadow.css";
  @import "../styles/sizing.css";

  .box {
    width: var(--sizing-emoji-card-width);
    height: 15rem;

    display: flex;
    flex-direction: column;

    border-radius: 1rem;
    border: 0;
    cursor: pointer;

    background-color: var(--color-background-elevated);
    box-shadow: var(--shadow);

    transition: 0.25s ease-in-out;
  }

  .box:hover {
    background-color: var(--color-background-hover);
    box-shadow: var(--shadow-hover);
  }

  .tick {
    display: none;
    position: relative;
    top: 1rem;
    left: 1rem;
    transition: 0.25s ease-in-out;
  }

  .box.selected > .tick {
    display: inherit;
    content: "✔";
  }

  .display {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
  }

  .info {
    padding: 0 2rem 0.5rem;
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
  }

  .info h4 {
    text-transform: uppercase;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .info i {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
