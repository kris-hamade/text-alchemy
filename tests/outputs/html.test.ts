import { prepareHtmlOutput } from "../../src/outputs/html";

describe("prepareHtmlOutput", () => {
  it("wraps content in simple template by default", () => {
    const result = prepareHtmlOutput("<div>Hello</div>");
    expect(result).toContain("<main");
    expect(result).toContain("Hello");
  });

  it("supports template selection", () => {
    const result = prepareHtmlOutput("<div>Hello</div>", { template: "professional" });
    expect(result).toContain("ta-pro");
  });

  it("passes through email option", () => {
    const result = prepareHtmlOutput("<div>Hello</div>", { template: "beautiful", for: "email" });
    expect(result).toContain("padding: 24px");
  });
});
