<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import type { BarChartRaceContext, BarChartRaceRange } from "./shared";

  /** Specify a slider id. */
  export let id = "slider-" + Math.random().toString(36);

  /** Specify the slider label text. */
  export let labelText: any = "";

  const ctx: BarChartRaceContext = getContext("BarChartRace");

  let value = -1;
  let range: BarChartRaceRange = [];
  let unsubValue = ctx.value.subscribe((_value) => (value = _value));
  let unsubRange = ctx.range.subscribe((_range) => (range = _range));

  $: max = range[range.length - 1];
  $: min = range[0];

  onDestroy(() => {
    unsubValue();
    unsubRange();
  });
</script>

<input
  {...$$restProps}
  type="range"
  bind:value
  {id}
  {min}
  {max}
  on:input={(e) => ctx.setValue(Number(e.currentTarget.value))}
/>
<label for={id}>{labelText + "" || value}</label>

<!-- @component `Slider` must be descendent of `BarChartRace`. -->
