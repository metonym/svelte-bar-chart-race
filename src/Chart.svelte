<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import { flip } from "svelte/animate";
  import type { FlipParams } from "svelte/animate";
  import type { BarChartRaceContext, BarChartRaceOptions, BarChartRaceValuesByKey } from "./shared";

  /**
   * Customize the animation delay, duration, and easing.
   * @see https://svelte.dev/docs#run-time-svelte-animate-flip
   */
  export let animate: FlipParams = {};

  const ctx: BarChartRaceContext = getContext("BarChartRace");

  let value = -1;
  let valuesByKey: BarChartRaceValuesByKey = {};
  let options: BarChartRaceOptions = {};
  let unsubValue = ctx.value.subscribe((_value) => (value = _value));
  let unsubValuesByKey = ctx.valuesByKey.subscribe((_valuesByKey) => (valuesByKey = _valuesByKey));
  let unsubOptions = ctx.chartOptions.subscribe((_options) => (options = _options));

  onDestroy(() => {
    unsubValue();
    unsubValuesByKey();
    unsubOptions();
  });
</script>

<ol style:padding="var(--chart-padding, 0)">
  {#each valuesByKey[value] as datum (datum.title)}
    <li animate:flip={animate}>
      <slot {datum}>
        {datum.title}: {datum.value}{options.unit ?? ""}
      </slot>
      <svg
        width="100%"
        style:height="var(--bar-height, 8px)"
        style:margin-top="var(--bar-margin-top, 4px)"
        style:margin-bottom="var(--bar-margin-bottom, 10px)"
      >
        <rect
          height="100%"
          width="{(datum.value / options.max) * 100}%"
          fill={datum.color || "#333"}
        />
      </svg>
    </li>
  {/each}
</ol>

<!-- @component `Chart` must be descendent of `BarChartRace`. -->
