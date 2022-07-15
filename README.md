# svelte-bar-chart-race

[![NPM][npm]][npm-url]

> Bar chart race visualization for Svelte

A bar chart race is a horizontal bar chart that animates bars over an interval (usually time). The x-axis represents the bar chart values. The bars are sorted based on their value from highest to lowest as the interval changes.

This component library provides:

- **BarChartRace.svelte**: Parent component that accepts data, options and manages internal state
- **Chart.svelte**: Child component that displays the chart with the ability to customize the chart display and animation
- **Slider.svelte**: Child component that shows the range input to control the interval (current value)

## [Demo](https://svelte-bar-chart-race.onrender.com/) · [Svelte REPL](https://svelte.dev/repl/b9a14f3b6db9448486392dfc2728d6d7)

## Installation

```bash
# Yarn
yarn add -D svelte-bar-chart-race

# NPM
npm i -D svelte-bar-chart-race

# pnpm
pnpm i -D svelte-bar-chart-race
```

## Usage

The examples use [data](demo/data.ts) sampled from [StackOverflow's annual developer survey](https://insights.stackoverflow.com/survey) for "Most Loved Languages."

<details>
<summary><b>Sample data</b></summary>

```ts
// demo/data.ts
export const data = [
  {
    title: "Rust",
    color: "#dea584",
    values: [
      { year: 2021, value: 86.98 },
      { year: 2020, value: 86.1 },
      { year: 2019, value: 83.5 },
      { year: 2018, value: 78.9 },
      { year: 2017, value: 73.1 },
    ],
  },
  {
    title: "TypeScript",
    color: "#2b7489",
    values: [
      { year: 2021, value: 72.73 },
      { year: 2020, value: 67.1 },
      { year: 2019, value: 73.1 },
      { year: 2018, value: 67.0 },
      { year: 2017, value: 64.1 },
    ],
  },
  {
    title: "Python",
    color: "#3572A5",
    values: [
      { year: 2021, value: 67.83 },
      { year: 2020, value: 66.7 },
      { year: 2019, value: 73.1 },
      { year: 2018, value: 68.0 },
      { year: 2017, value: 62.7 },
    ],
  },
  {
    title: "Go",
    color: "#00ADD8",
    values: [
      { year: 2021, value: 62.74 },
      { year: 2020, value: 62.3 },
      { year: 2019, value: 67.9 },
      { year: 2018, value: 65.6 },
      { year: 2017, value: 63.3 },
    ],
  },
  {
    title: "Swift",
    color: "#F05138",
    values: [
      { year: 2021, value: 63.56 },
      { year: 2020, value: 59.5 },
      { year: 2019, value: 69.2 },
      { year: 2018, value: 65.1 },
      { year: 2017, value: 63.7 },
    ],
  },
];
```

</details>

### Simple

In the simplest example, all you need is to pass `data` to `BarChartRace`.

Then, pass `Chart` and `Slider` through its default slot.

```svelte
<script>
  import { BarChartRace, Slider, Chart } from "svelte-bar-chart-race";
  import { data } from "./data";
</script>

<BarChartRace {data}>
  <Chart />
  <Slider />
</BarChartRace>
```

**Source**: [demo/Simple.svelte](demo/Simple.svelte)

### Two-way Binding

The `currentValue` prop supports two-way binding.

In this example, the initial value is `2018`. Any change to the `currentValue` via `Slider` will be reflected to the bound value.

`currentValue` can also be programmatically updated.

Finally, setting `currentValue` to `null` resets the value to the lowest value (in this case, `2017`).

```svelte
<script>
  import { BarChartRace, Slider, Chart } from "svelte-bar-chart-race";
  import { data } from "./data";

  let currentValue = 2018;
</script>

<BarChartRace {data} bind:currentValue>
  <Slider />
  <Chart />
</BarChartRace>

<button on:click={() => (currentValue = 2020)}> Set value to 2020 </button>
<button on:click={() => (currentValue = null)}> Set value to null </button>

Current value:
<strong>{currentValue}</strong>
```

**Source**: [demo/TwoWayBinding.svelte](demo/TwoWayBinding.svelte)

### Kitchen Sink

The kitchen sink showcases all available features.

An alternative to accessing the `currentValue` is to destructure it from the `BarChartRace` slot using the [`let:` directive](https://svelte.dev/docs#template-syntax-slot-slot-key-value).

Other slot props include:

- **setMax** (`() => void`): sets the current value to the maximum value defined in `data`
- **setMin** (`() => void`): sets the current value to the minimum value defined in `data`
- **setValue** (`(value: number) => void`): sets the current value to the provided value
- **play** (`() => void`): function to animate the bar chart
- **pause** (`() => void`): function to pause the animation
- **isPlaying** (`boolean`): `true` if the chart is currently animating

```svelte
<script>
  import { BarChartRace, Slider, Chart } from "svelte-bar-chart-race";
  import { quadOut } from "svelte/easing";
  import { data } from "./data";
</script>

<BarChartRace
  {data}
  interval={1_500}
  options={{ key: "year" }}
  let:currentValue={value}
  let:setMax
  let:setMin
  let:setValue
  let:play
  let:pause
  let:isPlaying
>
  <Slider labelText="Year: {value}" />
  <Chart
    --bar-height="10px"
    --bar-margin-bottom="12px"
    animate={{
      easing: quadOut,
      duration: 400,
      delay: 50,
    }}
    let:datum
  >
    <strong>{datum.title}</strong>
    {datum.value.toFixed(1)}%
  </Chart>
  <button on:click={isPlaying ? pause : play}>
    {isPlaying ? "Pause" : "Play"}
  </button>
  <button on:click={setMax}>Set max</button>
  <button on:click={setMin}>Set min</button>
  <button on:click={() => setValue(2019)}> Set value to 2019 </button>
</BarChartRace>
```

**Source**: [demo/KitchenSink.svelte](demo/KitchenSink.svelte)

## API

### BarChartRace

#### Props

| Prop     | Type                  | Default value                      |
| :------- | :-------------------- | :--------------------------------- |
| data     | `BarChartRaceDatum[]` | `[]`                               |
| options  | `BarChartRaceOptions` | `{ key: "", unit: "%", max: 100 }` |
| interval | `number`              | `2_000`                            |

If no `key` is explicitly provided to `options`, `BarChartRace` will infer the key by finding the first key that is not `"value"` in `data[0].values`.

```ts
interface BarChartRaceDatum {
  /**
   * Title must be unique because it's
   * used as a key in `Chart.svelte`.
   */
  title: string;

  /**
   * Specify the chart bar color.
   * @default "#333"
   * @example "red"
   * @example "#f00"
   */
  color?: string;

  /**
   * Tabular data used as values for each bar.
   * @example
   * [
      { key: 2021, value: 63.56 },
      { key: 2020, value: 59.5 },
      // ...
     ]
   */
  values: BarChartRaceValue[];
}

interface BarChartRaceOptions {
  /**
   * Specify the key used to normalize values in the `data.values` array.
   * If no key is specified, it will be inferred.
   * @example
   * For a value object { year: 2021, value: 62.74 },
   * the inferred key would be "year".
   */
  key?: any;

  /**
   * Specify the unit.
   * @default "%"
   */
  unit?: string;

  /**
   * Specify the maximum value the
   * chart value should be divided by.
   * @default 100
   */
  max?: number;
}
```

#### Slots

Use the default slot to pass through the `Chart` and `Slider` components or any other element.

```svelte
<BarChartRace
  {data}
  let:currentValue
  let:isPlaying
  let:setMax
  let:setMin
  let:setValue
  let:play
  let:pause
>
  <!-- Default slot -->
</BarChartRace>
```

### Chart

#### Props

| Prop    | Type         | Default value                                                       |
| :------ | :----------- | :------------------------------------------------------------------ |
| animate | `FlipParams` | `{ delay: 0, duration: d => Math.sqrt(d) * 120, easing: cubicOut }` |

The `Chart` component uses the [flip function](https://svelte.dev/docs#run-time-svelte-animate-flip) to animate the bar chart.

Svelte provides numerous [easing functions](https://svelte.dev/docs#run-time-svelte-easing) you can use to customize the animation.

```svelte
<script>
  import { quadOut } from "svelte/easing";
</script>

<Chart
  animate={{
    easing: quadOut,
    duration: 400,
    delay: 50,
  }}
/>
```

#### Style Props

Customize the chart styles using [--style-props](https://svelte.dev/docs#template-syntax-component-directives---style-props).

| Style prop          | Description             | Default value |
| :------------------ | :---------------------- | :------------ |
| --bar-height        | Chart bar height        | `6px`         |
| --bar-margin-top    | Chart bar margin top    | `4px`         |
| --bar-margin-bottom | Chart bar margin bottom | `10px`        |
| --chart-padding     | `ol` element padding    | `0`           |

<!-- prettier-ignore-start -->
```svelte
<Chart
  --bar-height="10px"
  --margin-top="20px"
  --margin-bottom="20px"
  --chart-padding="40px"
/>
```
<!-- prettier-ignore-end -->

#### Slots

Use the default slot to customize the bar chart display value.

Access arbitrary values from `data` values.

```svelte
<Chart let:datum>
  <strong>{datum.title}</strong>
  {datum.value}%
  {datum.additionalValue ?? ""}
</Chart>
```

### Slider

#### Props

| Name      | Type     | Default value                            |
| :-------- | :------- | :--------------------------------------- |
| id        | `string` | `"slider-" + Math.random().toString(36)` |
| labelText | `any`    | `""`                                     |

The current value from `BarChartRace` will be used as the `labelText`.

Customize `labelText` to override this behavior.

```svelte
<Slider labelText="Year: {value}" />
```

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/svelte-bar-chart-race.svg?color=%23ff3e00&style=for-the-badge
[npm-url]: https://npmjs.com/package/svelte-bar-chart-race
