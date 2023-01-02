import { describe, expect, it } from "vitest";
import * as pkg from "../package.json";
import * as API from "../src";

describe(pkg.name, () => {
  it("has 0 dependencies", () => {
    // @ts-expect-error
    expect(Object.keys(pkg.dependencies ?? {}).length).toEqual(0);
  });

  it("has named exports", () => {
    // @ts-expect-error
    expect(API.default).toBeUndefined();
    expect(Object.keys(API)).toMatchInlineSnapshot(`
        [
          "BarChartRace",
          "Chart",
          "Slider",
        ]
      `);
  });
});
