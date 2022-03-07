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

<style global>
  :root {
    --background: #fff;
    --border: #dfe6f5;
  }

  body {
    margin: 0;
    font-family: -apple-system, sans-serif;
    font-size: 1rem;
    letter-spacing: 0.01rem;
    color: var(--color);
  }

  h1 {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
  main {
    margin: 2rem auto;
    padding: 1.5rem 3rem;
    max-width: 900px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--background);
  }

  button {
    margin-right: 4px;
    margin-bottom: 12px;
    padding: 6px 15px;
    font-size: 14px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--background);
    cursor: pointer;
  }
</style>
