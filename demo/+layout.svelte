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
    --background: #fff;
    --border: #e2e2e2;
    --border-interactive: #0d0d0d;
    --background-hover: #0d0d0d;
    --color: #181b38;
    --color-hover: #fff;
  }

  :global(body) {
    margin: 0;
    font-family: -apple-system, sans-serif;
    font-size: 0.875rem;
    letter-spacing: 0.01rem;
    color: var(--color);
  }

  :global(h1) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  :global(main) {
    margin: 1rem auto 0 auto;
    padding: 1.5rem 3rem;
    max-width: 900px;
    border: 1px solid var(--border);
    background: var(--background);
  }

  :global(button) {
    margin-right: 4px;
    margin-bottom: 12px;
    padding: 6px 15px;
    font-size: inherit;
    border: 1px solid var(--border-interactive);
    background: var(--background);
    cursor: pointer;
  }

  :global(button:hover) {
    background: var(--background-hover);
    color: var(--color-hover);
  }
</style>
