<script lang="ts">
  import { getContext } from "svelte";
  import { flip } from "svelte/animate";
  import type { FlipParams } from "svelte/animate";
  import type { BarChartRaceContext } from "./shared";

  /**
   * Customize the animation delay, duration, and easing.
   * @see https://svelte.dev/docs#run-time-svelte-animate-flip
   */
  export let animate: FlipParams = {};

  const { value, valuesByKey, chartOptions }: BarChartRaceContext = getContext("BarChartRace");
</script>

<ol style:padding="var(--chart-padding, 0)">
  {#each $valuesByKey[$value] as datum (datum.title)}
    <li animate:flip={animate}>
      <slot {datum}>
        {datum.title}: {datum.value}{$chartOptions.unit ?? ""}
      </slot>
      <svg
        width="100%"
        style:height="var(--bar-height, 8px)"
        style:margin-top="var(--bar-margin-top, 4px)"
        style:margin-bottom="var(--bar-margin-bottom, 10px)"
      >
        <rect
          height="100%"
          width="{(datum.value / $chartOptions.max) * 100}%"
          fill={datum.color || "#333"}
        />
      </svg>
    </li>
  {/each}
</ol>

<!-- @component `Chart` must be descendent of `BarChartRace`. -->
