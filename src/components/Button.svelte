<button on:click {...$$restProps}>
  <slot />
</button>

<style>
  @import "../styles/colors.css";
  @import "../styles/shadow.css";

  button {
    padding: 1.25rem 0.625rem;

    border-radius: 0.5rem;
    border-width: 0;
    box-shadow: var(--shadow);

    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;

    color: var(--color-main-text);
    background-color: var(--color-main);

    cursor: pointer;
  }

  button:hover {
    background-color: var(--color-main-hover);

    box-shadow: var(--shadow-hover);
  }
</style>
