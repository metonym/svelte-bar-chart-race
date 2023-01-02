<script lang="ts">
  import { BarChartRace, Slider, Chart } from "svelte-bar-chart-race";
  import { data } from "../data";
</script>

<BarChartRace {data}>
  <Chart />
  <Slider />
</BarChartRace>
