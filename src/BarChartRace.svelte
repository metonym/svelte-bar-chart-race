<script lang="ts">
  import { setContext, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import type { BarChartRaceData, BarChartRaceContext, BarChartRaceOptions } from "./shared";

  export let data: BarChartRaceData = [];

  const DEFAULT_OPTIONS: Required<BarChartRaceOptions> = {
    key: "",
    unit: "%",
    max: 100,
  };

  export let options: BarChartRaceOptions = {
    ...DEFAULT_OPTIONS,
  };

  /** Specify the animation interval in milliseconds (ms). */
  export let interval = 2_000;

  /**
   * Set the current value.
   * `null` denotes "no value."
   *
   * If set to `null`, the Slider input will reset to the minimum value.
   * @example bind:currentValue
   */
  export let currentValue: null | number = null;

  const value = writable(currentValue ?? -1);
  const valuesByKey = writable({});
  const range: BarChartRaceContext["range"] = writable([]);
  const chartOptions = writable({ ...DEFAULT_OPTIONS, ...options });
  const context: BarChartRaceContext = {
    value,
    valuesByKey,
    range,
    chartOptions,
    setValue: (_value) => value.set(_value),
  };

  setContext("BarChartRace", context);

  $: if (!options.key) {
    options = {
      ...options,
      // infer the data key by finding the first field that is not "value"
      key: Object.keys(data[0]?.values[0] ?? {}).find((key) => key !== "value"),
    };
  }
  $: valuesByKey.set(
    data
      .flatMap((datum) => datum.values.map((values) => ({ ...datum, ...values })))
      .reduce(
        (values, value) => ({
          ...values,
          [value[options.key]]: values[value[options.key]]
            ? [...values[value[options.key]], value].sort((a, b) => b.value - a.value)
            : [value],
        }),
        {}
      )
  );
  $: range.set(Object.keys($valuesByKey).map((_value) => Number(_value)));
  $: if ($value === -1) value.set($range[0]);
  $: value.set(currentValue == null ? $range[0] : currentValue);
  $: currentValue = $value;
  $: chartOptions.set({ ...DEFAULT_OPTIONS, ...options });

  let isPlaying = false;
  let timer: NodeJS.Timer;
  let currentIndex = 0;

  $: currentIndex = $range.indexOf($value);
  $: didEnd = currentIndex === $range.length - 1;
  $: if (isPlaying && didEnd) clearTimer();

  const clearTimer = () => {
    isPlaying = false;
    clearInterval(timer);
  };

  const animate = () => {
    currentIndex += 1;
    value.set($range[currentIndex]);
  };

  const play = () => {
    if (didEnd) {
      currentIndex = 0;
      value.set($range[currentIndex]);
    } else {
      animate();
    }

    isPlaying = true;
    timer = setInterval(animate, interval);
  };

  onDestroy(clearTimer);
</script>

<slot
  {currentValue}
  {isPlaying}
  setMax={() => value.set($range[$range.length - 1])}
  setMin={() => value.set($range[0])}
  setValue={context.setValue}
  {play}
  pause={clearTimer}
/>
