import userEvent from "@testing-library/user-event";
import type { SvelteComponent } from "svelte";
import KitchenSink from "../demo/KitchenSink/+page.svelte";
import Simple from "../demo/Simple/+page.svelte";
import TwoWayBinding from "../demo/TwoWayBinding/+page.svelte";

describe("BarChartRace", () => {
  let instance: null | SvelteComponent = null;

  afterEach(() => {
    instance?.$destroy();
    instance = null;
    document.body.innerHTML = "";
  });

  test("Simple", async () => {
    const target = document.body;

    instance = new Simple({ target });

    expect(target.querySelectorAll("li").length).toEqual(5);
    expect(target.querySelectorAll("li")[0].innerHTML).toEqual(
      `Rust: 73.1% <svg width="100%" style=\"\"><rect height="100%" width="73.1%" fill="#dea584"></rect></svg> `,
    );
    expect(target.querySelector("label")!.innerHTML).toEqual("2017");
  });

  test("TwoWayBinding", async () => {
    const target = document.body;

    instance = new TwoWayBinding({
      target,
    });

    expect(target.querySelectorAll("li").length).toEqual(5);
    expect(target.querySelectorAll("li")[0].innerHTML).toEqual(
      `Rust: 78.9% <svg width="100%" style=\"\"><rect height="100%" width="78.9%" fill="#dea584"></rect></svg> `,
    );
    expect(target.querySelector("label")!.innerHTML).toEqual("2018");
    expect(target.querySelector("strong")!.innerHTML).toEqual("2018");

    await userEvent.click(target.querySelectorAll("button")[0]);

    expect(target.querySelectorAll("li")[0].innerHTML).toEqual(
      `Rust: 86.1% <svg width=\"100%\" style=\"\"><rect height=\"100%\" fill=\"#dea584\" width=\"86.1%\"></rect></svg> `,
    );
    expect(target.querySelector("label")!.innerHTML).toEqual("2020");
    expect(target.querySelector("strong")!.innerHTML).toEqual("2020");

    await userEvent.click(target.querySelectorAll("button")[1]);

    expect(target.querySelectorAll("li")[0].innerHTML).toEqual(
      `Rust: 73.1% <svg width=\"100%\" style=\"\"><rect height=\"100%\" fill=\"#dea584\" width=\"73.1%\"></rect></svg> `,
    );
    expect(target.querySelector("label")!.innerHTML).toEqual("2017");
    expect(target.querySelector("strong")!.innerHTML).toEqual("null");
  });

  test("KitchenSink", async () => {
    const target = document.body;

    instance = new KitchenSink({
      target,
    });

    expect(target.querySelectorAll("li").length).toEqual(5);
    expect(target.querySelectorAll("li")[0].innerHTML).toEqual(
      `<strong>Rust</strong> 73.1% <svg width="100%" style=\"\"><rect height="100%" width="73.1%" fill="#dea584"></rect></svg> `,
    );
    expect(target.querySelector("label")!.innerHTML).toEqual("Year: 2017");

    await userEvent.click(target.querySelectorAll("button")[1]);

    expect(target.querySelectorAll("li")[0].innerHTML).toEqual(
      `<strong>Rust</strong> 87.0% <svg width="100%" style=\"\"><rect height="100%" fill=\"#dea584\" width="86.98%"></rect></svg> `,
    );
    expect(target.querySelector("label")!.innerHTML).toEqual("Year: 2021");

    await userEvent.click(target.querySelectorAll("button")[2]);

    expect(target.querySelectorAll("li")[0].innerHTML).toEqual(
      `<strong>Rust</strong> 73.1% <svg width="100%" style=\"\"><rect height="100%" fill="#dea584" width="73.1%"></rect></svg> `,
    );
    expect(target.querySelector("label")!.innerHTML).toEqual("Year: 2017");

    await userEvent.click(target.querySelectorAll("button")[3]);

    expect(target.querySelectorAll("li")[0].innerHTML).toEqual(
      `<strong>Rust</strong> 83.5% <svg width=\"100%\" style=\"\"><rect height=\"100%\" fill=\"#dea584\" width=\"83.5%\"></rect></svg> `,
    );
    expect(target.querySelector("label")!.innerHTML).toEqual("Year: 2019");
  });
});
