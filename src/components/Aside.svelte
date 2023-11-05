<script lang="ts">
  import { clearSelected, selected } from '../store';
  import { unicodeToString } from '../utils';

  import Button from './Button.svelte';

  function copyToClipboard(): void {
  	void navigator.clipboard.writeText(
  		$selected.map(({ unicode }) => unicodeToString(unicode)).join(' ')
  	// eslint-disable-next-line prettier/prettier
  	);
  }

  function saveToJSON(): void {
  	const saveElement = document.createElement('a');

  	saveElement.href = URL.createObjectURL(
  		new Blob([
  			JSON.stringify(
  				$selected.map((emoji) => ({ ...emoji, selected: undefined })),
  				undefined,
  				2
  			),
  		])
  	);
  	saveElement.setAttribute('download', 'emoji.json');

  	document.body.append(saveElement);
  	saveElement.click();
  	saveElement.remove();
  }
</script>

<aside>
  <span class="head">
    <h2>Selected</h2>

    {#if $selected.length > 0}
      <Button on:click={clearSelected}>Clear Selection</Button>
    {/if}
  </span>

  <div class="list">
    {#if $selected.length > 0}
      {#each $selected as emoji}
        <span>{unicodeToString(emoji.unicode)}</span>
      {/each}
    {:else}
      <h4>Nothing yet</h4>
    {/if}
  </div>

  <div class="buttons">
    <Button on:click={copyToClipboard} disabled={$selected.length === 0}>
      Copy Selection to Clipboard
    </Button>

    <Button on:click={saveToJSON} disabled={$selected.length === 0}>
      Save as JSON
    </Button>
  </div>
</aside>

<style>
  @import "../styles/colors.css";
  @import "../styles/sizing.css";
  @import "../styles/shadow.css";

  aside {
    height: 90vh;
    width: calc(5 * var(--sizing-padding));
    margin: calc(var(--sizing-padding) / 2) calc(var(--sizing-padding) / 4);
    padding: var(--sizing-padding);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: var(--sizing-gap);

    background-color: var(--color-background-elevated);
    box-shadow: var(--shadow);
    border-radius: 1rem;
  }

  h2 {
    text-transform: uppercase;
  }

  .head {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: var(--sizing-gap);
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: calc(var(--sizing-gap) / 4);
    align-items: center;
    justify-content: flex-start;
    flex-grow: 1;
    overflow-y: auto;
    width: 100%;

    transition: 0.25s ease-in-out;
  }

  .list > span {
    font-size: 4rem;
  }
</style>
