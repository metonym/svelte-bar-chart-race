import type { Writable } from "svelte/store";

interface BarChartRaceValue {
  value: number;
  [key: string]: any;
}

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

export interface BarChartRaceOptions {
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

/**
 * Array of unique values
 */
export type BarChartRaceRange = number[];

export type BarChartRaceValuesByKey = Record<string, Array<BarChartRaceDatum & BarChartRaceValue>>;

export type BarChartRaceData = BarChartRaceDatum[];

export interface BarChartRaceContext {
  value: Writable<number>;
  valuesByKey: Writable<BarChartRaceValuesByKey>;
  range: Writable<BarChartRaceRange>;
  chartOptions: Writable<Required<BarChartRaceOptions>>;
  setValue: (value: number) => void;
}
