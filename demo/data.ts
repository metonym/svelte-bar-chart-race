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

export const dataWithArbitraryValues = data.map((datum) => ({
  ...datum,
  values: datum.values.map((value) => ({
    ...value,
    additionalValue: value.value / 2,
  })),
}));
