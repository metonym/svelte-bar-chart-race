import * as pkg from "../package.json";
import * as API from "../src";

it("has 0 dependencies", () => {
  // @ts-expect-error
  expect(Object.keys(pkg.dependencies ?? {}).length).toEqual(0);
});

it("has named exports", () => {
  // @ts-expect-error
  expect(API.default).toBeUndefined();
  expect(Object.keys(API)).toEqual(["BarChartRace", "Chart", "Slider"]);
});
