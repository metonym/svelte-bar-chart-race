import { tick } from "svelte";
import type { SvelteComponent } from "svelte";
import { afterEach, describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { Simple, TwoWayBinding, KitchenSink } from "../demo/exports";

describe("BarChartRace", () => {
  let instance: SvelteComponent = null;

  afterEach(() => {
    instance?.$destroy();
    instance = null;
    document.body.innerHTML = "";
  });

  test("Simple", async () => {
    const target = document.querySelector("body");

    instance = new Simple({ target });

    expect(target.querySelectorAll("li").length).toEqual(5);
    expect(target.querySelectorAll("li")[0].innerHTML).toMatchInlineSnapshot(
      '"Rust: 73.1% <svg width=\\"100%\\"><rect height=\\"100%\\" width=\\"73.1%\\" fill=\\"#dea584\\"></rect></svg> "'
    );
    expect(target.querySelector("label").innerHTML).toEqual("2017");
  });

  test("TwoWayBinding", async () => {
    const target = document.querySelector("body");

    instance = new TwoWayBinding({ target });

    expect(target.querySelectorAll("li").length).toEqual(5);
    expect(target.querySelectorAll("li")[0].innerHTML).toMatchInlineSnapshot(
      '"Rust: 78.9% <svg width=\\"100%\\"><rect height=\\"100%\\" width=\\"78.9%\\" fill=\\"#dea584\\"></rect></svg> "'
    );
    expect(target.querySelector("label").innerHTML).toEqual("2018");
    expect(target.querySelector("strong").innerHTML).toEqual("2018");

    userEvent.click(target.querySelectorAll("button")[0]);
    await tick();

    expect(target.querySelectorAll("li")[0].innerHTML).toMatchInlineSnapshot(
      '"Rust: 86.1% <svg width=\\"100%\\"><rect height=\\"100%\\" width=\\"86.1%\\" fill=\\"#dea584\\"></rect></svg> "'
    );
    expect(target.querySelector("label").innerHTML).toEqual("2020");
    expect(target.querySelector("strong").innerHTML).toEqual("2020");

    userEvent.click(target.querySelectorAll("button")[1]);
    await tick();

    expect(target.querySelectorAll("li")[0].innerHTML).toMatchInlineSnapshot(
      '"Rust: 73.1% <svg width=\\"100%\\"><rect height=\\"100%\\" width=\\"73.1%\\" fill=\\"#dea584\\"></rect></svg> "'
    );
    expect(target.querySelector("label").innerHTML).toEqual("2017");
    expect(target.querySelector("strong").innerHTML).toEqual("null");
  });

  test("KitchenSink", async () => {
    const target = document.querySelector("body");

    instance = new KitchenSink({ target });

    expect(target.querySelectorAll("li").length).toEqual(5);
    expect(target.querySelectorAll("li")[0].innerHTML).toMatchInlineSnapshot(
      '"<strong>Rust</strong> 73.1% <svg width=\\"100%\\"><rect height=\\"100%\\" width=\\"73.1%\\" fill=\\"#dea584\\"></rect></svg> "'
    );
    expect(target.querySelector("label").innerHTML).toEqual("Year: 2017");

    userEvent.click(target.querySelectorAll("button")[1]);
    await tick();

    expect(target.querySelectorAll("li")[0].innerHTML).toMatchInlineSnapshot(
      '"<strong>Rust</strong> 87.0% <svg width=\\"100%\\"><rect height=\\"100%\\" width=\\"86.98%\\" fill=\\"#dea584\\"></rect></svg> "'
    );
    expect(target.querySelector("label").innerHTML).toEqual("Year: 2021");

    userEvent.click(target.querySelectorAll("button")[2]);
    await tick();

    expect(target.querySelectorAll("li")[0].innerHTML).toMatchInlineSnapshot(
      '"<strong>Rust</strong> 73.1% <svg width=\\"100%\\"><rect height=\\"100%\\" width=\\"73.1%\\" fill=\\"#dea584\\"></rect></svg> "'
    );
    expect(target.querySelector("label").innerHTML).toEqual("Year: 2017");

    userEvent.click(target.querySelectorAll("button")[3]);
    await tick();

    expect(target.querySelectorAll("li")[0].innerHTML).toMatchInlineSnapshot(
      '"<strong>Rust</strong> 83.5% <svg width=\\"100%\\"><rect height=\\"100%\\" width=\\"83.5%\\" fill=\\"#dea584\\"></rect></svg> "'
    );
    expect(target.querySelector("label").innerHTML).toEqual("Year: 2019");
  });
});