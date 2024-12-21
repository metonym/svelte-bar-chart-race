# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3](https://github.com/metonym/svelte-bar-chart-race/releases/tag/v0.1.3) - 2024-12-21

**Fixes**

- use `ReturnType<typeof setInterval>` instead of `NodeJS.Timeout` in `BarChartRace.svelte`

## [0.1.2](https://github.com/metonym/svelte-bar-chart-race/releases/tag/v0.1.2) - 2023-12-17

**Fixes**

- fix `NodeJS.Timer` type in `BarChartRace.svelte`
- update `package.json#exports` to include mappings for `./*.svelte` files

## [0.1.1](https://github.com/metonym/svelte-bar-chart-race/releases/tag/v0.1.1) - 2023-06-10

**Performance**

- Save reference when reducing `valuesByKey` in `BarChartRace`

## [0.1.0](https://github.com/metonym/svelte-bar-chart-race/releases/tag/v0.1.0) - 2022-03-02

- Initial release
