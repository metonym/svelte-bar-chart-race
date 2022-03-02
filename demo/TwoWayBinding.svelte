<script lang="ts">
  import { BarChartRace, Slider, Chart } from "svelte-bar-chart-race";
  import { data } from "./data";

  let currentValue: null | number = 2018;
</script>

<BarChartRace {data} bind:currentValue>
  <Slider />
  <Chart />
</BarChartRace>

<button on:click={() => (currentValue = 2020)}> Set value to 2020 </button>
<button on:click={() => (currentValue = null)}> Set value to null </button>

Current value:
<strong>{currentValue}</strong>
