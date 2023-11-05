<script lang="ts">
  import Aside from './Aside.svelte';
  import Header from './Header.svelte';
</script>

<div class="wrapper">
  <Aside />

  <main>
    <Header />

    <div class="content">
      <slot />
    </div>
  </main>
</div>

<style>
  @import "../styles/colors.css";
  @import "../styles/sizing.css";

  .wrapper {
    display: flex;
    flex-direction: row;

    height: 100vh;
    width: 100vw;
    overflow: hidden;

    background-color: var(--color-background);
    color: var(--color-foreground);
  }

  .content {
    width: 100%;
    height: 100%;
  }

  main {
    display: flex !important;
    flex-direction: column !important;
    height: 100%;
    width: 100%;
  }
</style>
