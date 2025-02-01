<script lang="ts">
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>{$page.url.pathname.slice(1) || "Home"}</title>
</svelte:head>

<main>
  <h1>StackOverflow: Most Loved Languages</h1>
  <slot />
</main>

<style>
  :root {
    --background: #191919;
    --border-interactive: #5a5a5a;
    --border-interactive-hover: #8f8f8f;
    --color: #eee;
  }

  :global(body) {
    margin: 0;
    font-family: -apple-system, sans-serif;
    font-size: 0.875rem;
    letter-spacing: 0.01rem;
    color: var(--color);
    background: var(--background);
  }

  :global(a) {
    color: var(--color);
  }

  :global(h1) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  :global(main) {
    margin: 1rem auto 0 auto;
    padding: 1rem 2rem;
    max-width: 900px;
    background: var(--background);
  }

  :global(button) {
    margin-right: 4px;
    margin-bottom: 12px;
    padding: 6px 15px;
    border: 1px solid var(--border-interactive);
    background: var(--background);
    color: var(--color);
    cursor: pointer;
    font-size: inherit;
  }

  :global(button:hover) {
    border-color: var(--border-interactive-hover);
  }
</style>
