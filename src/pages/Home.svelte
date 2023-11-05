<script lang="ts">
  import DisplayGrid from '../components/DisplayGrid.svelte';
  import Layout from '../components/Layout.svelte';
  import { available, loading } from '../store';
</script>

<Layout>
  {#if $loading}
    <h2>Loading...</h2>
  {:else}
    <DisplayGrid emoji={$available} />
  {/if}
</Layout>
