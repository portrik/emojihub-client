<script lang="ts">
  import { type Emoji, EmojiCategoriesWithGroups, EmojiCategory, EmojiGroups, getRandom } from '../api';
  import {
  	addSelected,
  	hideSelected,
  	selectedCategory,
  	selectedGroup,
  	toggleHideSelected,
  } from '../store';

  import Button from './Button.svelte';
  import Modal from './Modal.svelte';

  let random: Emoji | undefined;

  $: groups =
    $selectedCategory === undefined
    	? EmojiGroups
    	: EmojiCategoriesWithGroups[$selectedCategory];

  function onCategoryChange(event: Event): void {
  	const category = (event.target as HTMLSelectElement).value.trim();

  	selectedCategory.set(
  		category.length > 0 ? (category as EmojiCategory) : undefined
  	);
  	selectedGroup.set(undefined);
  }

  function onGroupChange(event: Event): void {
  	const group = (event.target as HTMLSelectElement).value.trim();

  	selectedGroup.set(group.length > 0 ? group : undefined);
  }

  function loadRandom(): void {
  	void getRandom().then((emoji) => random = emoji);
  }

  function onRandomClose(): void {
  	random = undefined;
  }

  function onRandomSelection(): void {
  	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  	addSelected(random!);
  	onRandomClose();
  }
</script>

<header>
  <select value={$selectedCategory ?? ''} on:change={onCategoryChange}>
    <option value="">Select a Category</option>

    {#each Object.keys(EmojiCategory) as category}
      <option value={category}>{category}</option>
    {/each}
  </select>

  <select value={$selectedGroup ?? ''} on:change={onGroupChange}>
    <option value="">Select a Group</option>

    {#each groups as group}
      <option value={group}>{group}</option>
    {/each}
  </select>

  <label for="hide-selected">Hide Selected</label>
  <input
    type="checkbox"
    checked={$hideSelected}
    on:click={toggleHideSelected}
    id="hide-selected"
  />

  <Button on:click={loadRandom}>Get Random</Button>

  <Modal emoji={random} onClose={onRandomClose} onSelection={onRandomSelection} />
</header>

<style>
  @import "../styles/colors.css";
  @import "../styles/sizing.css";

  header {
    width: 95%;
    margin: calc(var(--sizing-padding) / 2) calc(var(--sizing-padding) / 4);
    padding: var(--sizing-padding);

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--sizing-gap);

    background-color: var(--color-background-elevated);
    box-shadow: var(--shadow);
    border-radius: 1rem;
  }

  label {
    display: block;

    font-weight: 500;
    font-size: 1.1rem;
  }

  select {
    background-color: transparent;
    padding: 0.25rem;

    border: 1px solid var(--color-main);
    border-radius: 0.5rem;
  }
</style>
