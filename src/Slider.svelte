<script lang="ts">
  import { getContext } from "svelte";
  import type { BarChartRaceContext } from "./shared";

  /** Specify a slider id. */
  export let id = "slider-" + Math.random().toString(36);

  /** Specify the slider label text. */
  export let labelText: any = "";

  const { value, range, setValue }: BarChartRaceContext =
    getContext("BarChartRace");

  $: max = $range[$range.length - 1];
  $: min = $range[0];
</script>

<input
  {...$$restProps}
  type="range"
  bind:value={$value}
  {id}
  {min}
  {max}
  on:input={(e) => setValue(Number(e.currentTarget.value))}
/>
<label for={id}>{labelText + "" || $value}</label>

<!-- @component `Slider` must be descendent of `BarChartRace`. -->
